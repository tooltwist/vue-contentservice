/*
 *	Copyright ToolTwist Ltd. 2015, 2016, 2017. All rights reserved.
 */
var Curia = (function(){

	var _SERVER_URL = _SERVER_URL || 'http://forums.tooltwist.com:4000',
        _API_VERSION = _API_VERSION || '2.0',
        _TENANT = _TENANT || "",
        _API_URL = null;

	//var _rootId = -1;
	var _thread = null;
	var _user = null;
	var _currentUserData = null;
	var _authenticationToken = null;

	var _config = { }; // Set by init();

	var _templates = [ ];  // Key -> HTML. Key starts with # (DOM element), or / (URL on Curia server)

	/**
	 *	Functions called to preprocess selected elements.
	 *	More may be defined in the config passed to init().
	 */
	var _cookers = [
		{ name: "user",			fn: cook_user },		// Add user details
		{ name: "deleted",		fn: cook_deleted },		// Hide or redact deleted elements, except from moderator
		{ name: "pending",		fn: cook_pending },		// Hide pending elements, except from moderator and author
		{ name: "abuse",		fn: cook_abuse },		// Hide abuse from the reporter
		{ name: "permissions",	fn: cook_permissions },	// Set permissions
		{ name: "dateFromNow",	fn: cook_dateFromNow },	// relative times
//		{ name: "currentUser",	fn: cook_currentUser },	// add currentUser to every element
		{ name: "childCount",	fn: cook_childCount },	// count of number of children

	];
	var _cookersByName = { }; // name -> cooker


	var LOAD_FUNCTION_DATA_NAME = 'load-function';

    /*
     * EXTERNAL INTERFACE
     * The JSON functions in the returned object will be available to the Curia class.
     *
     * init - Initialize the configuration.
     * loadTemplate - Load a template into our cache list.
     * getElementTemplate - Get the template for a theme/level.
     * getHtmlForElement - Get the HTML for a specific posting element and it's children.
     * displayCategories - Retrieve categories and its children.
     * displayUsersWithAccess - Retrieve users with access to the element.
     * displayThread - Retrieve posts and places results into specified selector, replacing its current contents.
     * prependPosts - Retrieve posts and prepends results into specified selector, results are displayed on top of current contents.
     * appendPosts - Retrieve posts and appends results into specified selector, results are displayed on below current contents.
     * changeProject - Change the project displayed on the page.
     *
     */
	return {
		init: initialize,

		// Users
		displayUsersWithAccess: displayUsersWithAccess,
		addAuthenticationToken: addAuthenticationToken,

		// Threads
		displayThread: displayThread,
		displayThreadsForElementType: displayThreadsForElementType,
		displayWall: displayWall,
		prependPosts: prependPosts, // used ?
		appendPosts: appendPosts, // used ?
		changeProject: changeProject, // used ?

		// Votes
		getVoteTotals: getVoteTotals,
		getVotes: getVotes,
		getMyVotes: getMyVotes,
		saveVote: saveVote,
		// Vote functions for UI
		displayVoteTotals: displayVoteTotals,
		displayMyVotes: displayMyVotes,

		// Views
		getViewCount: getViewCount,
		incrementViewCount: incrementViewCount,

		// Search related
		displaySearchResult: displaySearchResult,
		getHtmlForSearchResult: getHtmlForSearchResult,
		createLinksForMentions: createLinksForMentions,
		createLinksForTags: createLinksForTags,

		// Page manipulation utility functions
		loadTemplate: loadTemplate,
		getElementTemplate: getElementTemplate,
		getHtmlForElement: getHtmlForElement,
		displayCategories: displayCategories, // used ?

		// Select, cook, render
		setLoader: setLoader,
		setAndCallLoader: setAndCallLoader,
		select: select,
		cook: cook,
		render: render,
		load: load,
		update: update,

		// Miscellaneous
		dateFromNow: dateFromNow,
		traverse: traverse,
		traverseDebug: traverseDebug,
		isFunction: isFunction,

		// Shortcut functions
		simpleCommentSection: simpleCommentSection,

        // nocomma
        nocomma: null
	};

    /*
     * PUBLIC FUNCTIONS
     * Place functions that will be exposed to the external interface here.
     */
    function initialize(config, callback) {
        console.log('Curia.initialize() config=' , config);

        if (config) {
            if(config.serverUrl){
                _SERVER_URL = config.serverUrl;
            }
            if(config.apiVersion) {
                _API_VERSION = config.apiVersion;
            }
            if(config.tenantId){
                _TENANT = config.tenantId;
            }
        }
        _API_URL = [_SERVER_URL, "api", _API_VERSION, _TENANT].join("/");
        _config = config || {};

        // Add our default themes to the config
        if (!_config.themes){
            _config.themes = {};
        }
        _config.themes['default'] = {
            "project_0": '/templates/post-0.html',
            "message_1": '/templates/post-1.html',
            "file_0": '/templates/post-1.html',
            "link_0": '/templates/post-1.html',
            "post_0": '/templates/post-1.html',
        };

		// Remember any provided cookers
		if (_config.cookers) {
			if (Array.isArray(_config.cookers)) {

				// Array - add in order
				for (var i = 0; i < _config.cookers.length; i++) {
					var cooker = _config.cookers[i];
					if (typeof(cooker.name)==='string' && typeof(cooker.fn)==='function') {
						_cookers.push(cooker);
					}
					else {
						console.log('Invalid definition for \'cookers\' parameter');
						return;
					}
				}
			}
			else if (typeof(_config.cookers) === 'object') {

				// Not an array, will be added in random order.
				for (var name in _config.cookers) {
					var func = _config.cookers[name];
					_cookers.push({ name: name, fn: func });
				}
			}
			else {
				console.log('Invalid definition for \'cookers\' parameter (expected object or array)');
				return;
			}
		}

		// Index the cookers by name
		for (var i = 0; i < _cookers.length; i++) {
			var cooker = _cookers[i];
			_cookersByName[cooker.name] = cooker;
		}


		// Check the page for threads to be automatically displayed
		var $elementsToLoad = $('.curia-autoload, .curia-autoload-NEW');
		//alert('Have autoloads: ' + $elementsToLoad.length)
		for (var i = 0; i < $elementsToLoad.length; i++) {
			$element = $($elementsToLoad[i])
//			alert('el = ' + $element.attr("id"))
			var threadId = $element.attr('data-curia-threadId-NEW');
			if (threadId == null) {
				threadId = $element.attr('data-curia-threadId');
			}
			var theme = $element.attr('data-curia-theme-NEW');
			if (theme == null) {
				theme = $element.attr('data-curia-theme');
			}
			var anchorType = $element.attr('data-curia-anchorType');
console.log('have autoload: ' + threadId + ' with theme ' + theme  + ' and anchorType ' + anchorType);
			//console.log('threadId =' + threadId)

			if (anchorType) {
				displayThread($element, threadId, theme, anchorType, function(err) {
					if (_config.afterDisplayThread) {
						_config.afterDisplayThread('pageLoad');
					}
				});
			}
			else {
				displayThread($element, threadId, theme, function(err) {
					if (_config.afterDisplayThread) {
						_config.afterDisplayThread('pageLoad');
					}
				});
			}
		}

		/*
         *		Perhaps set up URLive, a third party jQuery plugin that provides
         *		a live preview of images or URLs entered into the description.
         *		See http://markserbol.github.io/urlive/
         */
		if (_config.urlive) {
			//console.log('Set up URLive')
			$('#curia-posts').on('input propertychange', '.curia-urlive, .curia-urlive-NEW', function (e) {
				// Get the element details
				var $field = $(e.currentTarget);
				var $element = $field.closest('.curia-element, .curia-element-NEW');
				var elementId = $element.attr('data-curia-elementId');
				//console.log('elementId=' + elementId);

				var $previewDiv = $element.find('.curia-edit-previewarea, .curia-edit-previewarea-NEW').first();
				var $loadicon = $element.find('.curia-edit-loadicon, .curia-edit-loadicon-NEW').first();
				$previewDiv.show();

				// Use the field's value to create the preview area.
				$field.urlive({
					container: $previewDiv,
					callbacks: {
						onStart: function () {
							$loadicon.show();
							$previewDiv.urlive('remove');
						},
						onSuccess: function (data) {
							$loadicon.hide();
							$previewDiv.urlive('remove');
						}
					}
				});
			});
		}

        /*
         *		Set up event handlers for element buttons.
         *
         *		Note that these use a delegate. The elements aren't loaded when the
         *		page is initialized here, and will be added and replaced throughout
         *		the life of the page. By using a delegate, we don't need to specifically
         *		attach handlers to the individual button elements.
         *
         *		Buttons need to be enclosed within an element div (a div with the
         *		class 'curia-element-NEW' and attribute 'data-curia-elementId').
         */
     	$(document).on('click', '.curia-button, .curia-button-NEW', function __clickOnCuriaButton(e) {
			if (_config.debug) {
				console.log('Clicked on button with class .curia-button');
			}


			var $button = $(e.currentTarget);
			var op = $button.attr('data-curia-op');
console.log('Clicked a curia-button. op='+op)
			if (op === 'test') {
				alert('pressed a test button');
				return false;
			}

			if (op === 'delete') {
				return handleDeleteButton($button);
			} else if (op === 'restore') {
				return handleRestoreButton($button);
			}

			// Get the element details
			var $element = $button.closest('.curia-element, .curia-element-NEW');
			if ($element.length < 1) {
				alert('Error: .curia-button element is not enclosed within a .curia-element element.');
				return;
			}
			var elementId = $element.attr('data-curia-elementId');
			var rootId = $element.attr('data-curia-rootId');
			var parentId = $element.attr('data-curia-parentId');

			// Find the thread surrounding this element.
			var $thread = $button.closest('.curia-thread, .curia-thread-NEW');
	    		//alert('elementId=' + elementId);
			// console.log('$thread ' + $thread.length);
			// if ($thread.length < 1) {
			// 	alert('Error: .curia-element element is not enclosed within a .curia-thread element.');
			// 	return;
			// }
			if (_config.debug || true) {
				console.log('\nClicked on curia button.')
				console.log('elementId=' + elementId);
				console.log('rootId=' + rootId);
				console.log('parentId=' + parentId);
			}

			var $displayDiv = findUnderThisElementButNotInChildren($element, '.curia-displayarea, .curia-displayarea-NEW');
			var $workareaDiv = findUnderThisElementButNotInChildren($element, '.curia-workarea, .curia-workarea-NEW');
			var $statusDiv = findUnderThisElementButNotInChildren($element, '.curia-status, .curia-status-NEW');

			if (_config.debug || 1) {
				console.log('op=' + op)
				console.log('$displayDiv.length=' + $displayDiv)
				console.log('$workareaDiv.length=' + $workareaDiv)
				console.log('$statusDiv.length=' + $statusDiv)
			}
			if (! $displayDiv) {
				alert('Error: .curia-element does not contain a .curia-displayarea element.');
				return false;
			}
			if (! $workareaDiv) {
				alert('Error: .curia-element does not contain a .curia-workarea element.');
				return false;
			}
			if (! $statusDiv) {
				alert('Error: .curia-element does not contain a .curia-status element.');
				return false;
			}


			// Remember the current scroll position of the page.
			var scrollPosition = $(document).scrollTop();

		if (op === 'show-create-form' || op === 'show-edit-form') {
			/*
			 *	Show a form to create a new element or edit an eisting element.
			 *	The data-curia-form attribute on the button tells us which form to use.
			 */
			var reference = $button.attr('data-curia-form');
			if ( !reference || reference==='') {
				console.log('Curia button element is missing data-curia-form attribute.');
			}
			// console.log('reference=' + reference)
			var $form = $(reference);
			if ($form.length == 0) {
				console.log('Unknown form specified by data-curia-form attribute: ' + reference);
			}
			var $inputField_title = $form.find('input[name="title"],textarea[name="title"]');
			var $inputField_summary = $form.find('input[name="summary"],textarea[name="summary"]');
			var $inputField_description = $form.find('input[name="description"],textarea[name="description"]');


			// If there is an existing form in the workarea div, move it
			// to a safe place so we can use it later.
			var $workareaChildren = $workareaDiv.children();

			// console.log('qq workarea children to keep safe=' + $workareaChildren.length);
			$workareaChildren.detach();
			var $createForms = $workareaChildren.filter('.curia-form, .curia-form-NEW');
			// console.log('qq workarea forms to keep safe=' + $createForms.length)
			// console.log('qq forms:' + $('#id-curia-forms').children().length)
			$('#id-curia-forms').append($createForms);
			// console.log('qq forms:' + $('#id-curia-forms').children().length)



			if (op === 'show-create-form') {

				/***********************************************************************
				 *
				 *		Show the form for adding a new element.
				 */

				// See if we want to use Froala editor
				// If so, check froala.xxx.js is included on the page.
				var useFroala = false;
				var editor = $inputField_description.attr("editor");
				if ( !editor) {
					// No edit specified in edit form. Use Froala if it's a TEXTAREA and froala was specified in the config params.
					var tagname = $inputField_description.prop("tagName");
					useFroala = (_config.froala && tagname === "TEXTAREA");
				}
				else if (editor === 'froala') {
					// Specifically asking to use Froala.
					useFroala = true;
					if (!_config.froala) _config.froala = { };
				}
				if (useFroala && !$.FroalaEditor) {
					alert('Error: Curia is being initialize to use Froala, but Froala Javascript files are not included on this page.');
					useFroala = false;
				}


				// Take the type of the new element from the button.
				var type = $button.data('curia-type');
				$form.find('[name=type]').val(type);

				// If the type of the new element is email and we have an #email-options div, show it.
				var emailOptions = $form.find('#email-options');
				if (emailOptions.length > 0) {
					var categoryId = $element.data('curia-categoryid');
					emailOptions.data('curia-parentid',categoryId);
					if (type==='email') {
						emailOptions.show();
					}
					else {
						emailOptions.hide();
					}
				}

    			// Make sure the element is visible, and hide all create/edit
				// forms - the correct form will be made visible below.
				$displayDiv.show();
				jQuery('.curia-form, .curia-form-NEW').hide();

				// Initialize inputs and buttons
				$inputField_title.val('');
				$inputField_summary.val('');
				$inputField_description.val('');


				// If requested in the options, use the Froala richtext editor.
				// See https://www.froala.com/wysiwyg-editor
				if (useFroala) {

					// Provide backwards compatibility.
					if (_config.richtext && _config.richtext.options && !_config.froala) {
						_config.froala = _config.richtext.options;
					}

					// See if we want to upload images with Froala.
					if (_config.uploadImages) {
					    var requestData = {
							// "file" : ....,  will be set by Froala
							"type" : 'image',
							"rootId" : rootId,
							"parentId" : parentId,
							"description": "image"
					    };
					    if (_config.authenticationToken){
							requestData.authenticationToken = _config.authenticationToken;
					    }

						_config.froala.imageUploadParam = 'file';
						_config.froala.imageUploadURL = _API_URL + '/element';
						_config.froala.imageUploadParams = requestData;
						_config.froala.imageUploadMethod = 'POST';
						_config.froala.requestWithCORS = false;
					}


					// Set up the Froala editor
console.log('froala options: ', _config.froala);
					$inputField_description.froalaEditor(_config.froala);

					// Start without text
					$inputField_description.froalaEditor("html.set", '', false);

					// Perhaps set event handlers for uploading of images in Froala.
					// See https://www.froala.com/wysiwyg-editor/docs/concepts/image-upload
					if (_config.uploadImages) {

						// Set parameters just prior to the upload
						// $inputField_description.on('froalaEditor.image.beforeUpload', function(e, editor, images) {
						// });

						// Process the reply
						$inputField_description.on('froalaEditor.image.afterImageUpload', function(e, editor, response) {
console.log('response is ', response);
						    response = JSON.parse(response);
console.log('response is ', response);
						    response.link = addAuthenticationToken(response.link);
						});

						// Handle any image uploading error
						$inputField_description.on('froalaEditor.image.error', function(e, editor, error) {
							showErrorStatus_NEW($thread, elementId, "An error occurred uploading the image.", 8000);
							console.log('Upload error:', error);
						});
					}

					// We'll move the work area to the top of the screen
					//scrollPosition = $workareaDiv.offset().top;

				} // useFroala

				$form.find('[data-curia-op="put"]').attr('data-curia-op','post');
				$form.find('[data-curia-op="submit"]').attr('data-curia-op','post');
				$form.find('.curia-edit-previewarea, .curia-edit-previewarea-NEW').html('');
				$form.addClass('curia-form-indented');

				// Reposition the page, back where it was.
				setTimeout(function() { $(document).scrollTop(scrollPosition); }, 100);

			} // op === 'show-create-form'
			else if (op === 'show-edit-form') {
console.log('show-edit-form')
					/***********************************************************************
					 *
					 *		Show the pane for editing an element.
					 */

					// // Check Froala is included on this page, if it is being used.
					// var tagname = $inputField_description.prop("tagName");
					// var useFroala = (_config.froala && tagname === "TEXTAREA");
					// if (useFroala && !$.FroalaEditor) {
					// 	alert('Error: Curia is being initialized to use Froala, but Froala Javascript files are not included on this page.');
					// 	useFroala = false;
					// }
					// See if we want to use Froala editor
					// If so, check froala.xxx.js is included on the page.
					var useFroala = false;
					var editor = $inputField_description.attr("editor");
					if ( !editor) {
						// No edit specified in edit form. Use Froala if it's a TEXTAREA and froala was specified in the config params.
						var tagname = $inputField_description.prop("tagName");
						useFroala = (_config.froala && tagname === "TEXTAREA");
					}
					else if (editor === 'froala') {
						// Specifically asking to use Froala.
						useFroala = true;
						if (!_config.froala) _config.froala = { };
					}
					if (useFroala && !$.FroalaEditor) {
						alert('Error: Curia is being initialize to use Froala, but Froala Javascript files are not included on this page.');
						useFroala = false;
					}

        			// Hide the element and any create forms.
        			$displayDiv.hide();
        			$workareaDiv.show();
            		jQuery('.curia-form, .curia-form-NEW').hide();

            		// Initialize inputs and buttons
            		var title = $displayDiv.find('.curia-title, .curia-title-NEW').val();
            		var summary = $displayDiv.find('.curia-summary, .curia-summary-NEW').val();
            		var description = $displayDiv.find('.curia-description, .curia-description-NEW').val();

					// Initialize the text field
                    $inputField_title.val(title);
                    $inputField_summary.val(summary);
                    $inputField_description.val(description);


					// If requested in the options, use the Froala richtext editor (https://www.froala.com/wysiwyg-editor)
					if (useFroala) {

						// Provide backwards compatibility.
						if (_config.richtext && _config.richtext.options && !_config.froala) {
							_config.froala = _config.richtext.options;
						}

						// See if we want to upload images with Froala.
						if (_config.uploadImages) {
						    var requestData = {
								// "file" : ....,  will be set by Froala
								"type" : 'image',
								"rootId" : rootId,
								"parentId" : parentId,
								"description": "image"
						    };
						    if (_config.authenticationToken){
								requestData.authenticationToken = _config.authenticationToken;
						    }

							_config.froala.imageUploadParam = 'file';
							_config.froala.imageUploadURL = _API_URL + '/element';
							_config.froala.imageUploadParams = requestData;
							_config.froala.imageUploadMethod = 'POST';
							_config.froala.requestWithCORS = false;
						}

						// Initialize the Froala editor
console.log('froala options: ', _config.froala);
						$inputField_description.froalaEditor(_config.froala);

						// Edit the existing description.
                        $inputField_description.froalaEditor("html.set", description);


						// Perhaps set event handlers for uploading of images in Froala.
						// See https://www.froala.com/wysiwyg-editor/docs/concepts/image-upload
						if (_config.uploadImages) {

							// Set parameters just prior to the upload
							// $inputField_description.on('froalaEditor.image.beforeUpload', function(e, editor, images) {
							// });

							// Process the reply
							$inputField_description.on('froalaEditor.image.afterImageUpload', function(e, editor, response) {
	console.log('response is ', response);
							    response = JSON.parse(response);
	console.log('response is ', response);
							    response.link = addAuthenticationToken(response.link);
							});

							// Handle any image uploading error
							$inputField_description.on('froalaEditor.image.error', function(e, editor, error) {
								showErrorStatus_NEW($thread, elementId, "An error occurred uploading the image.", 8000);
								console.log('Upload error:', error);
							});
						}

						// We'll move the work area to the top of the screen
						//scrollPosition = $workareaDiv.offset().top;

					}// useFroala
            		$form.find('textarea[name="summary"]').val(summary);
            		$form.find('[data-curia-op="post"]').attr('data-curia-op','put');
                    $form.find('[data-curia-op="submit"]').attr('data-curia-op','put');
					$form.find('.curia-edit-previewarea, .curia-edit-previewarea-NEW').html('');
					$form.removeClass('curia-form-indented');
    			}

        		// Now move the form into the workarea for the element.
        		$form.detach();
        		$workareaDiv.show().append($form);
        		$form.slideDown();
        		$form.find('textarea[name="description"]').focus();

				// Reposition the page, back where it was.
				setTimeout(function() { $(document).scrollTop(scrollPosition); }, 100);

    		}
			else if (op === 'cancel') {

				/***********************************************************************
				 *
				 *		Cancel editing or adding a new element.
				 */
				var scrollPosition = $(document).scrollTop();

    			/*
    			 *  Pressed the cancel button on an edit or create form.
    			 */
    			//alert('cancel!');
    			closeNewMessageForm();
        		// jQuery('.curia-form-NEW').hide();
        		$workareaDiv.hide();
        		$displayDiv.show();

				// Reposition the page, back where it was.
				setTimeout(function() { $(document).scrollTop(scrollPosition); }, 100);
				return true; // Allow event propagation
    		}
			else if (op === 'put' || op === 'post') {

    			/*
    			 *  Save changes after EDITING the element.
    			 */
                clearStatus_NEW($thread, elementId);

                // Add key fields, if required
				var $form = $workareaDiv.find("form")
                // var title = $form.find('input[name="title"],textarea[name="title"]').val();
                // var summary = $form.find('input[name="summary"],textarea[name="summary"]').val();
                // var description = $form.find('input[name="description"],textarea[name="description"]').val();
                // var topic = $form.find('input[name="topic"],textarea[name="topic"]').val(); // Obsolete?

                var $title = $form.find('input[name="title"],textarea[name="title"]');
				var title = $title.val();
				if (!title) {
					if ($title.attr("data-curia-mandatory") === 'true') {
						showError($statusDiv, "Please enter the required fields");
						return;
					}
					title = $title.attr("data-curia-default");
				}
                var $summary = $form.find('input[name="summary"],textarea[name="summary"]');
				var summary = $summary.val();
				if (!summary) {
					if ($summary.attr("data-curia-mandatory") === 'true') {
						showError($statusDiv, "Please enter the required fields");
						return;
					}
					summary = $summary.attr("data-curia-default");
				}
                var $description = $form.find('input[name="description"],textarea[name="description"]');
				var description = $description.val();
				if (!description) {
					if ($description.attr("data-curia-mandatory") === 'true') {
						showError($statusDiv, "Please enter the required fields");
						return;
					}
					description = $description.attr("data-curia-default");
				}
                var $topic = $form.find('input[name="topic"],textarea[name="topic"]'); // Obsolete?
				var topic = $topic.val();
				if (!topic) {
					if ($topic.attr("data-curia-mandatory") === 'true') {
						showError($statusDiv, "Please enter the required fields");
						return;
					}
					topic = $topic.attr("data-curia-default");
				}


				// var rootId = $element.attr('data-curia-rootId');
				if (op === 'post') {

					// POST = Add a new child element
					var type = $form.find('[name=type]').val();

					// var parentId = $element.attr('data-curia-parentId');
                    var url = _API_URL + '/element';
					url = addAuthenticationToken(url);
                    // if (!description) {
                    //     showErrorStatus_NEW($thread, elementId, "Please fill in the content.");
                    //     return;
                    // }
			        var data = {
			        	"type" : type,
			        	"rootId" : rootId,
			        	"parentId" : elementId,
			        };
					if (title) data.title = title;
					if (summary) data.summary = summary;
					if (description) data.description = description;
					if (topic) data.topic = topic; // Obsolete?
console.log('POST data is', data);
					if (type==='email') {
						var contactsId = [];
						$.each($element.find('#email-options input.curia-contacts-checkbox:checked'),function(a,b){
						   contactsId.push($(b).data('curia-userid'));
						});
                        if (contactsId.length<=0){
                            showErrorStatus_NEW($thread, elementId, "Please select a recipient.");
                            return;
                        }
						data.extraProperties = {
							users:contactsId
						}
					}
			        var method = 'POST'
				}
				else if (op === 'put') {

					// PUT = Updating an existing element
					var id = $element.attr('data-curia-elementId');
                    var url = _API_URL + '/element/' + rootId + '/' + elementId;
					url = addAuthenticationToken(url);


			        var data = {
			            // "topic": $form.find('textarea[name="topic"]').val(),
			            // "summary": $form.find('textarea[name="summary"],input[name="summary"]').val(),
			            //"description": $form.find('textarea[name="description"]').val(),
                        "parentId" : elementId
			        };
					if (title) data.title = title;
					if (summary) data.summary = summary;
					if (description) data.description = description;
					if (topic) data.topic = topic; // Obsolete?
console.log('PUT data is', data);
			        var method = 'PUT';
				}

				if (_config.debug) {
					console.log('Calling Curia server:')
					console.log('url=' + url)
					console.log('data=', data)
				}

        		//$workareaDiv.hide();
        		$displayDiv.show();

        		// For some reason rootId isn't available in the closures below.

				// Note: If we ever have trouble calling from IE, this info might help:
				// http://thejackalofjavascript.com/cross-domain-ajax-with-cross-browser-support/
				if (_config.debug) {
					console.log('url: ' + url);
					console.log('data: ', data);
				}
        		$.ajax({
                    type: method,
                    url: url,
                    data: data,
                    success: function _ajaxReply(messageResponse){
console.log('Response from Curia is', messageResponse)

						if (_config.debug) {
							console.log('success. response is ', messageResponse)
						}

                        // If there is an existing create form in the workarea div, move it
                        // to a safe place so we can use it later. Note that generated edit
                        // forms do not fall into this category - they will get freed up.
                        var $workareaChildren = $workareaDiv.children();
//console.log('qqr to save:' + $workareaChildren.length)
                        $workareaChildren.detach();
                        var $createForms = $workareaChildren.filter('.curia-form, .curia-form-NEW');
//console.log('qqr to save:' + $createForms.length)
//console.log('qqr forms:' + $('#id-curia-forms').children().length)
                        $('#id-curia-forms').append($createForms);
//console.log('qqr forms:' + $('#id-curia-forms').children().length)

						// We've got a reply from the server
	            		jQuery('.curia-form, .curia-form-NEW').hide();
						if (messageResponse && messageResponse.status && messageResponse.status === "ok"){

							// If a loader function has been specified for this part of the page,
							// call it now. The loader function is specified by providing a DOM
							// element with class .crowdhound-loader somewhere above the element,
							// and calling setLoader() to provide the (re)loading function.
							var loader = getLoader($element);
							if (loader) {

								// Call the load function, to reload the thread.
								loader(function(err) {

									// Reposition the page, back where it was.
									setTimeout(function() { $(document).scrollTop(scrollPosition); }, 100);


									// Finished reloading
	    	                    	if (data.type==='email') {
						            	showSuccessStatus_NEW($loaderElement, elementId, "Email successfully sent.");
										// if (_config.afterDisplayThread) {
										// 	//alert('calling afterDisplayThread - email');
										// 	_config.afterDisplayThread('email');
										// }
	                    			}
									else {

						            	showSuccessStatus_NEW($loaderElement, elementId, "Update complete.");
						        	}
								});
							} // loader

                        }
						else {

							// Incorrect response code
							console.log('Error: Unexpected response while saving element');
							console.log('url=' + url);
							console.log('method=' + method);
							console.log('data=', data);
							console.log('Response: ', messageResponse);
							showError($element, elementId, "Update failed. Please try again.");
                        }
                    },

                    error: function(qXHR, textStatus, errorThrown){

                        // Bad Request. Probably a validation failed (e.g. profanity)
                        var errorMsg = null;
						if (qXHR && qXHR.responseJSON) {
							//console.log('responseJSON is:', qXHR.responseJSON);
							if (qXHR.responseJSON.message) {
								errorMsg = qXHR.responseJSON.message;
							}
							else if (qXHR.responseJSON.result) {
								errorMsg = qXHR.responseJSON.result;
							}
						}

						if ( !errorMsg) {
							// Don't have nice error details. Do what we can...
	                        console.log('  qXHR=', qXHR);
	                        console.log('  textStatus=' + textStatus)
	                        console.log('  errorThrown=' + errorThrown)
	                        errorMsg = "An error occurred contacting the Curia server. Please try again.";
						}
						console.log('\nERROR calling ajax:\n' + errorMsg + '\n');
                        //showError($element, elementId, 'Update failed. Please try again.', 5000);
						showError($element, elementId, errorMsg, 5000); //use response error message
                    }
				});

    		}
			else if (op === 'show-delete-modal' || op==='show-restore-modal' || (op==='show-report-modal' || op==='show-abuse-modal')) {
				//alert("SHOW MODAL")

				// Check we have a valid confirmation form
    			var reference = $button.attr('data-curia-modal');
				if ( !reference || reference==='') {
					console.log('Curia button element is missing data-curia-modal attribute.');
					return;
				}
				console.log('reference=' + reference)
				var $modal = $(reference);
				if ($modal.length == 0) {
					console.log('Unknown form specified by data-curia-modal: ' + reference)
					return;
				}
				if ( !$modal.hasClass('curia-delete-modal') && op==='show-delete-modal') {
					console.log('Error: Delete modal selected by ' + reference + ' does not have class "curia-delete-modal".');
					return;
				}
				else if (!$modal.hasClass('curia-restore-modal') && op==='show-restore-modal') {

					console.log('Error: Restore modal selected by ' + reference + ' does not have class "curia-restore-modal".');
					return;
				}

				// If we have a loaderElement specified as an ancestor of this element, remember it in the modal so we can call it later.
				var $loaderElement = getLoaderElement($element);
				var loaderElementId = $loaderElement.attr('id');
				if ( !loaderElementId || loaderElementId==='') {
					console.log('Error: .crowdhound-loader element has no id.')
					return;
				}

				//         		// If there is an existing form in the workarea div, move it
				//         		// to a safe place so we can use it later.
				//     			var $workareaChildren = $workareaDiv.children();
				// $workareaChildren.detach();
				// var $createForms = $workareaChildren.filter('.curia-form-NEW');
				//     			$('#id-curia-forms').append($createForms);

				// Remember details of this element
				$modal.attr('data-curia-rootId', rootId)
				$modal.attr('data-curia-parentId', parentId)
				$modal.attr('data-curia-elementId', elementId)
				$modal.attr('data-curia-loaderElementId', loaderElementId)
				// $modal.find('input[name="threadDomElementId"]').attr('value', threadDomElementId);
				// $modal.find('input[name="rootId"]').attr('value', rootId);
				// $modal.find('input[name="elementId"]').attr('value', elementId);

				// Display the delete confirmation dialog box.
				$modal.modal('show');

    		}

console.log('returning true')
			return true;
    	});

		/*
		 *	Set up handlers for vote buttons and fields.
		 */
		$(document).on('click', '.curia-vote-button, .curia-vote-button-NEW', function __clickOnCuriaVoteButton(e){
    		var $button = $(e.currentTarget);
    		var $div = $button.closest('.curia-vote, .curia-vote-NEW');
			var aspect = $div.attr('data-curia-aspect');
			var parentId = $div.attr('data-curia-parentId')
			var rootId = $div.attr('data-curia-rootId')
//console.log('ok 1')

			// Find out the elementId
			var elementId = $div.attr('data-curia-elementId');
			if (!elementId) elementId = $div.closest('.curia-element, .curia-element-NEW').attr('data-curia-elementId');
			if (!elementId) return; // Nothing we can do

			// Find out which element this is voting on
			var aggregateElementId = $div.attr('data-curia-for');
			if (!aggregateElementId)
				aggregateElementId = elementId;

			// Decide what we're doing, since this has been clicked
			switch (aspect) {
			case 'like':
				// var $button = $div.find('.curia-vote-button-NEW');
				if ($button.hasClass('selected')) {
					$button.toggleClass('selected');
					var score = 0;
				}
				else {
					$button.toggleClass('selected');
					var score = 1;
				}
				break;

			case 'likedislike':
//console.log('ok2')
				if ($button.attr('data-curia-value') == "like") {
					// Pressed the like button
					if ($button.hasClass('selected')) {
						// Remove the like
						var score = 0;
						$button.removeClass('selected');
					}
					else {
						// Add the like
						var score = 1;
						$button.addClass('selected');
					}
				}
				else {
					// Pressed the dislike button
					if ($button.hasClass('selected')) {
						// Remove the dislike
						var score = 0;
						$button.removeClass('selected');
					}
					else {
						// Add the like
						var score = -1;
						$button.addClass('selected');
					}
				}
				break;

			case 'stars':
				var score = -1;
				var value = $button.attr('data-curia-value');
				switch (value) {
				case "1star":
				case "1stars":
						score = 1;
						break;
				case '2stars':score = 2; break;
				case '3stars': score = 3; break;
				case '4stars': score = 4; break;
				case '5stars': score = 5; break;
				default:
					console.log('Unrecognised value for data-curia-value: ' + value)
					return;
				}
				$div.find('.curia-vote-button, .curia-vote-button-NEW').removeClass('selected');
				if (score >= 1) $div.find('.curia-vote-button[data-curia-value="1stars"]').addClass('selected');
				if (score >= 1) $div.find('.curia-vote-button-NEW[data-curia-value="1stars"]').addClass('selected');
				if (score >= 2) $div.find('.curia-vote-button[data-curia-value="2stars"]').addClass('selected');
				if (score >= 2) $div.find('.curia-vote-button-NEW[data-curia-value="2stars"]').addClass('selected');
				if (score >= 3) $div.find('.curia-vote-button[data-curia-value="3stars"]').addClass('selected');
				if (score >= 3) $div.find('.curia-vote-button-NEW[data-curia-value="3stars"]').addClass('selected');
				if (score >= 4) $div.find('.curia-vote-button[data-curia-value="4stars"]').addClass('selected');
				if (score >= 4) $div.find('.curia-vote-button-NEW[data-curia-value="4stars"]').addClass('selected');
				if (score >= 5) $div.find('.curia-vote-button[data-curia-value="5stars"]').addClass('selected');
				if (score >= 5) $div.find('.curia-vote-button-NEW[data-curia-value="5stars"]').addClass('selected');
				break;

			default:
				// Nothing to do
				console.log('Unknown button type ' + aspect);
				return;
			}

			// Save the vote on the server
 			var $thread = $div.closest('.curia-thread, .curia-thread-NEW')
			saveVote(aggregateElementId, elementId, aspect, score, function(success){
				// Reload the votes for the thread
				// We reload the entire thread, because it's too hard to work out
				// which element is for the aggregationElement.
				displayVoteTotals($thread, function(){

					// Show my votes
					displayMyVotes($thread, function(){
						// do nothing
						//alert('finished')
					})
				});
			});
		});

		// Handler for votes with text entry
		$(document).on('change', '.curia-vote-input, .curia-vote-input-NEW', function(e){
    		var $input = $(e.currentTarget);
    		var $div = $input.closest('.curia-vote, .curia-vote-NEW');
			var aspect = $div.attr('data-curia-aspect');
			var parentId = $div.attr('data-curia-parentId')
			var rootId = $div.attr('data-curia-rootId')

			// Find out the elementId
			var elementId = $div.attr('data-curia-elementId');
			if (!elementId) elementId = $div.closest('.curia-element, .curia-element-NEW').attr('data-curia-elementId');
			if (!elementId) return; // Nothing we can do

			// Find out which element this is voting on
			var aggregateElementId = $div.attr('data-curia-for');
			if (!aggregateElementId)
				aggregateElementId = elementId;

			// Decide what we're doing, since this has been clicked
			switch (aspect) {
			case 'percentage':
				// Get the previous value (if it's there). We use this to prevent unnecessarily updating the vote.
				var previousScore = parseInt($input.attr('data-curia-previous-score'));
				if (isNaN(previousScore)) previousScore = '';

				// Get the new value
				var str = $input.val();
				if (str == '') {
					// Null vote
					score = 0;
				}
				else {
					// Should be a numeric score
					var score = parseInt(str);
					if (isNaN(score)) {
						// Invalid number
						alert('A percentage value must be between 0 and 100.')
						$input.val(previousScore);
						setTimeout(function(){ $input.focus(); }, 100);
						return false;
					}
					if (score < 0) {
						score = 0;
					}
					else if (score > 100) {
						score = 100;
					}
				}

				// See if the score has changed
				if (score == previousScore) {
					alert('No change')
					return true;
				}
				$input.val(score);
				$input.attr('data-curia-previous-score', score);
				var previousScore = parseInt($input.attr('data-curia-previous-score'));
				break;

			default:
				console.log('Unknown vote input type ' + aspect);
				return;
			}

			// Save the vote on the server
 			var $thread = $div.closest('.curia-thread, .curia-thread-NEW')
			saveVote(rootId, aggregateElementId, elementId, aspect, score, function(success){
				// Reload the votes for the thread
				// We reload the entire thread, because it's too hard to work out
				// which element is for the aggregationElement.
				displayVoteTotals($thread, function(){

					// Show my votes
					displayMyVotes($thread, function(){
						// do nothing
						//alert('finished')
					})
				});
			});
		});
		if (!!(callback && callback.constructor && callback.call && callback.apply)) {
			callback();
		}
	} // end initialize method


	/**
	 *	A delete button should have been placed on a Bootstrap modal dialog.
	 *	(See http://getbootstrap.com/javascript/#modals)
	 *
	 *	Provided the dialog was instantiated using a 'show-restore-dialog' button, the
	 *	dialog object will contain all the information we need to delete the element
	 *	from Crowdhound and to reload the screen.
	 */
	function handleDeleteButton($button) {
		console.log('handleDeleteButton()');
		/*
		 *  DELETE the element.
		 */
//QQ		clearStatus_NEW($thread, elementId);
		console.log("DELETE");
		var $modal;
		$modal = $button.closest('.curia-delete-modal');
		if ($modal.length === 0) {
			console.log('Delete button is not inside a form with class "curia-delete-modal".')
			return;
		}

		// Get the element details and hide the modal dialog box.
		rootId = $modal.attr('data-curia-rootId');
		elementId = $modal.attr('data-curia-elementId');
		parentId = $modal.attr('data-curia-parentId');
		var loaderElementId = $modal.attr('data-curia-loaderElementId');
		//				var rootId = $modal.find('input[name="rootId"]').val();
		//				var elementId = $modal.find('input[name="elementId"]').val();
		console.log('root=' + rootId + ', id=' + elementId + ', loaderElementId=' + loaderElementId);
		$modal.modal('hide');

		// Get the thread DOM element, so we can reload it
		var $loader = $('#' + loaderElementId);
		if ($loader.length === 0) {
			console.log('Error: Could not find .crowdhound-loader element #' + loaderElementId);
			return;
		}


		// var $form = $workareaDiv.find("form")
		// var rootId = $element.attr('data-curia-rootId');
		// var id = $element.attr('data-curia-elementId');
		var url = _API_URL + '/element/' + rootId + '/' + elementId;
		url = addAuthenticationToken(url);
		data = {
			parentId: parentId
		};
		console.log('url=' + url)
		console.log('data=', data)
//QQ		$workareaDiv.hide();
//QQ		$displayDiv.show();
		// For some reason rootId isn't available in the closures below.

		var fancyRootId = rootId;
		// Note: If we ever have trouble calling from IE, this info might help:
		// http://thejackalofjavascript.com/cross-domain-ajax-with-cross-browser-support/
		$.ajax({
		    type: 'DELETE',
		    url: url,
		    data: data,
		    success: function(messageResponse, textStatus, jqXHR){

				console.log('Have response', messageResponse)
				if (messageResponse && messageResponse.status && messageResponse.status === "ok") {

					var loader = getLoader('#' + loaderElementId);
					if (loader) {

						// Call the load function, to reload the thread.
						var scrollPosition = $(document).scrollTop();
						loader(function(err) {

							// Reposition the page, back where it was.
							setTimeout(function() { $(document).scrollTop(scrollPosition); }, 100);

				            showSuccessStatus_NEW('#'+loaderElementId, elementId, "Element deleted.");
						});
					}

					if (_config.afterDisplayThread) {
						//alert('calling afterDisplayThread - delete');
						_config.afterDisplayThread();
					}

					// // The delete worked fine - reload the thread.
					// var theme = $thread.attr("data-curia-theme");
					// 			        displayThread($thread, fancyRootId, theme, function(){
					// 			            showSuccessStatus_NEW($thread, elementId, "Comment deleted.");
					// 	if (_config.afterDisplayThread) {
					// 		//alert('calling afterDisplayThread - delete');
					// 		_config.afterDisplayThread(op);
					// 	}
					// 			        });

		        } else {

					// Incorrect response code
	        		showErrorStatus_NEW($thread, elementId, "Failed to delete comment.  Please try again.");
		        }

		    },

		    error: function(qXHR, textStatus, errorThrown ){
		        console.log('textStatus=' + textStatus)
		        console.log('errorThrown=' + errorThrown)
		        alert('An error occurred contacting the Curia server.')
		        //ZZZZ  Maybe display a message on-screen.
		    }
		});
	}


	/**
	 *	A restore button should have been placed on a Bootstrap modal dialog.
	 *	(See http://getbootstrap.com/javascript/#modals)
	 *
	 *	Provided the dialog was instantiated using a 'show-restore-dialog' button, the
	 *	dialog object will contain all the information we need to delete the element
	 *	from Crowdhound and to reload the screen.
	 */
	function handleRestoreButton($button) {
		console.log('handleRestoreButton()');

		/*
		 *  RESTORE the element.
		 */
//QQ        clearStatus_NEW($thread, elementId);
		console.log("RESTORE");
		var $modal;
		$modal = $button.closest('.curia-restore-modal');
		if ($modal.length === 0) {
			console.log('Restore button is not inside a form with class ".curia-restore-modal".')
			return;
		}

		// Get the element details and hide the modal dialog box.
		rootId = $modal.attr('data-curia-rootId');
		elementId = $modal.attr('data-curia-elementId');
		parentId = $modal.attr('data-curia-parentId');
		var loaderElementId = $modal.attr('data-curia-loaderElementId');
//				var rootId = $modal.find('input[name="rootId"]').val();
//				var elementId = $modal.find('input[name="elementId"]').val();
		console.log('root=' + rootId + ', id=' + elementId + ', loaderElementId=' + loaderElementId);
		$modal.modal('hide');

		// Get the thread DOM element, so we can reload it
		var $loader = $('#' + loaderElementId);
		if ($loader.length === 0) {
			console.log('Error: Could not find .crowdhound-loader element #' + loaderElementId);
			return;
		}


        var url = _API_URL + '/element/' + rootId + '/' + elementId;
		url = addAuthenticationToken(url);
		data ={
			parentId: parentId,
			deleted: 0
		};
		console.log('url=' + url)
		console.log('data=', data)
//QQ		$workareaDiv.hide();
//QQ		$displayDiv.show();
		// For some reason rootId isn't available in the closures below.

		var fancyRootId = rootId;
		// Note: If we ever have trouble calling from IE, this info might help:
		// http://thejackalofjavascript.com/cross-domain-ajax-with-cross-browser-support/
		$.ajax({
            type: 'PUT',
            url: url,
            data: data,
            success: function(messageResponse, textStatus, jqXHR){

				console.log('Have response', messageResponse)
				if (messageResponse && messageResponse.status && messageResponse.status === "ok"){

					// Reload stuff
					var loader = getLoader('#' + loaderElementId);
					if (loader) {

						// Call the load function, to reload the thread.
						var scrollPosition = $(document).scrollTop();
						loader(function(err) {

							// Reposition the page, back where it was.
							setTimeout(function() { $(document).scrollTop(scrollPosition); }, 100);

				            showSuccessStatus_NEW('#'+loaderElementId, elementId, "Element restored.");
						});
					}

					if (_config.afterDisplayThread) {
						//alert('calling afterDisplayThread - delete');
						_config.afterDisplayThread();
					}

					// // The restore worked fine - reload the thread.
					// var theme = $thread.attr("data-curia-theme")
					// 			        displayThread($thread, fancyRootId, theme, function(){
					// 			            showSuccessStatus_NEW($thread, elementId, "Restored");
					// 	if (_config.afterDisplayThread) {
					// 		//alert('calling afterDisplayThread - comment restored');
					// 		_config.afterDisplayThread(op);
					// 	}
					// 			        });

                } else {

            		// Incorrect response code
            		showErrorStatus_NEW($thread, elementId, "Failed to restore.  Please try again.");

                }

            },

            error: function(qXHR, textStatus, errorThrown ){
                console.log('textStatus=' + textStatus)
                console.log('errorThrown=' + errorThrown)
                alert('An error occurred contacting the Curia server.')
                //ZZZZ  Maybe display a message on-screen.
            }
        });
	}

	function getLoaderElement(elementSelector) {
		//console.log('getLoaderElement(): ', elementSelector);
		var $element = $(elementSelector);
		//console.log('$element=' + $element.length)
		if ($element.hasClass('crowdhound-loader') || $element.hasClass('curia-thread')) {
			return $element;
		}
		//console.log('$element has no class')
		var $loaderElement = $element.closest('.crowdhound-loader, .curia-thread');
		//console.log('$loaderElement=' + $loaderElement.length)
		return $loaderElement;
	}

	/**
	 *	Store a loader function against the closest DOM ancestor with
	 *	class .crowdhound-loader. When any DOM element below this gets
	 *	modified by these functions, Curia will look upwards from that
	 *	modified element to find this .crowdhound-loader element and
	 *	then call the loader function.
	 */
	function setLoader(elementSelector, loadFunction/*(callback)*/) {

		// Remember this so we can call it after posts, etc
		getLoaderElement(elementSelector).data(LOAD_FUNCTION_DATA_NAME, loadFunction);
	}

	/**
	 *	Store a loader function against the closest DOM ancestor with
	 *	class .crowdhound-loader. When any DOM element below this gets
	 *	modified by these functions, Curia will look upwards from that
	 *	modified element to find this .crowdhound-loader element and
	 *	then call the loader function.
	 */
	function setAndCallLoader(elementSelector, loadFunction/*(callback)*/) {

		// Remember this so we can call it after posts, etc
		getLoaderElement(elementSelector).data(LOAD_FUNCTION_DATA_NAME, loadFunction);

		// Now call the loader function
		loadFunction(function(){ /* do nothing */});
	}

	/**
	 *	Retrieve the previously set loader function.
	 */
	function getLoader(elementSelector) {
		var loadFunction = getLoaderElement(elementSelector).data(LOAD_FUNCTION_DATA_NAME);
		if (isFunction(loadFunction)) {
			return loadFunction;
		}
		return null;
	}


	/**
	 *	Save a vote to the server.
	 *	The aggregate element is the element that tallies this vote (and others).
	 *	For a 'like' the aggregateElementId and elementId are usually the same.
	 *	When a post is rating a different element, the aggregateElementId is the
	 *	element being voted on, and the elementId is the element for a single vote.
	 *
	 *	To automatically create elements to hang votes off, pass anchors for
	 *	aggregationElement and voteElementId, and provide both aggregationElementType
	 *	and voteElementType.
	 */
	function saveVote(aggregationElementId, voteElementId, aspect, score, anchorElementType/*optional*/, callback/*(err)*/){
//console.log('setVote ' + score)

		// Juggle values if the optional parameter is missing.
		if (typeof(anchorElementType) == 'function') {
			// Did not receive the optional parameters.
			callback = anchorElementType;
			anchorElementType = null;
		}

		// Prepare the data to send to the API call.
		var url = _API_URL + '/vote';
		url = addAuthenticationToken(url);
		var data = {
			"aggregationElementId": aggregationElementId,
			"voteElementId": voteElementId,
			"aspect": aspect,
			"score": score
		};
		if (anchorElementType) {
			data.anchorElementType = anchorElementType;
		}

		// Call the Crowdhound server using AJAX.
		// Note: If we ever have trouble calling from IE, this info might help:
		// http://thejackalofjavascript.com/cross-domain-ajax-with-cross-browser-support/
		$.ajax({
			type: 'POST',
			url: url,
			data: data,

      success: function(messageResponse) {
				return callback(null);
/*
				// We've got a reply from the server
        		jQuery('.curia-form-NEW').hide();
				if (messageResponse && messageResponse.status && messageResponse.status === "ok"){

					// The update worked fine - reload the thread.
                    var newId = messageResponse.elementId;
					var theme = $thread.attr("data-curia-theme")
			        displayThread($thread, fancyRootId, theme, function(){
			            showSuccessStatus_NEW($thread, elementId, "Comment successfully posted.");
						if (_config.afterDisplayThread) {
							alert('calling afterDisplayThread - vote');
							_config.afterDisplayThread('vote');
						}
			        });

                }
				else {

					// Incorrect response code
                    showErrorStatus_NEW($thread, elementId, "Failed to post comment.  Please try again.");
                }
				*/
			},
			error: function(jqxhr, textStatus, errorThrown){
				// Failed AJAX call
				return callback(niceError(jqxhr, textStatus, errorThrown));
			}
		});
	}

	/*
	 *	Convert an AJAX error into something we can use.
	 */
	function niceError(jqxhr, testStatus, errorThrown) {
		console.log('niceError: ', jqxhr, testStatus, errorThrown);
		var err = {
			statusCode: jqxhr.status, // {number} – HTTP status code of the response.
			statusText: jqxhr.statusText, // {string} null, "timeout", "error", "abort", or "parsererror"
			error: errorThrown // {string} "When an HTTP error occurs, errorThrown receives the textual portion of the HTTP status."
		}
		return err;
	}

	/**
	 *	Find a DOM element under a Crowdhound element, but not within the children
	 *	of that element. The children will have their own Crowdhound element, which
	 *	can be identified by class .curia-element.
	 *
	 *	Be careful not to confuse DOM elements with Curia elements!
	 */
	function findUnderThisElementButNotInChildren($element, selector) {
		//console.log('findUnderThisElementButNotInChildren($element, "' + selector + '")');
		var requiredElementId = $element.attr('data-curia-elementId');
		var $list = $element.find(selector);
		for (var i = 0; i < $list.length; i++) {
			var $object = $($list[i]);

			// Check that's the elementId above this node matches our required elementId
			var $objectsElement = $object.closest('.curia-element, .curia-element-NEW');
			var objectsElementId = $objectsElement.attr('data-curia-elementId');
			if (objectsElementId != requiredElementId) {
				// This must be within a child
				continue;
			}
			return $object;
		}
		return null;
	}


    /*
     *	Load a template into our cache list.
     *	If the key starts with a hash, it refers to a DOM element.
     *	If the key starts with a '/', it refers to a URL in the Curia server.
     */
    function loadTemplate(key, callback) {
        //console.log('loadTemplate(' + key + ')');
        closeNewMessageForm();
        // See if it is already loaded
        if (_templates[key]) {
            //console.log('- already loaded');
            return callback(null, _templates[key]);
        }

        // Maybe it is a DOM element
        if (key.charAt(0) == '#') {
            var $elem = $(key);
			if ($elem.length == 0) {
				console.log('Error: Unknown template specified for Curia: ' + key)
			}
            if ($elem[0]) {
                var template = $elem.html();
                //console.log('- have element: ' + template.substring(0, 30))
                _templates[key] = template;
                return callback(null, template);
            }
            return callback(new Error('Unknown DOM element ' + key));
        }

        // Must be a URL suffix
		prefixHttp = 'http';
		prefixTemplate = '/templates/';
		if (key.substring(0, prefixHttp.length) === prefixHttp) {
			// e.g. http://a.b.com/x/
			var url = key;
		}
		else if (key.substring(0, prefixTemplate.length) === prefixTemplate) {
			// e.g. /templates/basic/element-0
			var url = _SERVER_URL + '/' + key;
		}
		else {
			// e.g. /basic/element-0
	        var url = _SERVER_URL + '/templates/' + key;
		}
        url = addAuthenticationToken(url);

        //console.log('key=' + key)
        //console.log('Loading template from ' + url)

        $.ajax({
			url: url,
			dataType: 'text'
		}).done(function(template) {
            //console.log('- replied: ' + template.substring(0, 30))
            if (template == null) {
                return callback(new Error('Could not load ' + url));
            }
            _templates[key] = template;
            return callback(null, template);
        }).fail(function(err) {
            console.log('Unknown template: ' + url);
            template = '';
            _templates[key] = template;
            return callback(null, template);
        });

    }

	function getTheme(themeId) {

        // See if this template theme is defined
        if (_config.themes && _config.themes[themeId]) {
            // Have theme
        }
		else {
            // Use default theme
            console.log('Curia: Theme not defined (' + themeId + '). Using the default theme.');
            themeId = 'default';
        }
		return _config.themes[themeId];
	}

    /*
     *	Get the template for a theme/level.
     */
    function getElementTemplate(theme, type, level, callback/*(err,template,templateDescription)*/) {
		if (_config.debug) {
	        console.log('getElementTemplate(' + theme + ', ' + type + ', ' + level + ')')
		}
//type = 'message'
        // // See if this template theme is defined
        // if (_config.themes && _config.themes[theme]) {
        //     // Have theme
        // }
		// else {
        //     // Use default theme
        //     console.log('Curia: Theme not defined (' + theme + '). Using the default theme.');
        //     theme = 'default';
        // }

        // Find the template for this level
//        var themeDef = _config.themes[theme];
        var themeDef = getTheme(theme);
        var useLevel = level;
        var templateKey = '';
        var templateProperty = '';
		if (type === 'wrapper') {
			// console.log('looking for wrapper in theme ' + theme);

			// Find a wrapper to go around the whole lot
			var property = 'wrapper';
			var template = themeDef['wrapper'];
			if (template) {
				// console.log('FOUND WRAPPER TEMPLATE')
				useLevel = 0;
				templateKey = themeDef[property];
				templateProperty = property;

			}
			else {
				// console.log('NO WRAPPER TEMPLATE')
//				template = "<<#childrenHtml>><<{childrenHtml}>><</childrenHtml>>";
				return callback(null, null, 'Wrapper not found');
			}
		}
		else if (type === 'options') {
				// console.log('looking for wrapper in theme ' + theme);

				// Find a wrapper to go around the whole lot
				var property = 'options';
				var themeOptions = themeDef['options'];
				if (themeOptions) {
					return callback(null, themeOptions, 'Theme options');
				}
				else {
					return callback(null, null, 'Theme Options not found');
				}
		}
		else {

			// Look for the highest <level>_<type>, where level
			// is greater than the current element's level.
	        for ( ; useLevel >= 0; useLevel--) {
	            var property = type + '_' + useLevel;
	            if (themeDef[property]) {
	                //console.log('use ' + property)
	                templateKey = themeDef[property];
	                templateProperty = property;
	                break;
	            }
	        }
		}
        //console.log('templateKey=' + templateKey)


        if (useLevel < 0) {
            // Could not find a template, at any level, for this type
			if (type != '*') {
				return getElementTemplate(theme, '*', level, callback);
			}
            console.log('Curia: could not find any template.');
			console.log('  theme=' + theme + ' element type=' + type + ' level=' + level);
            var template = '';
            return callback(null, template, '=[ no template for ' + theme + '/' + level + ' found in config ]');

        }
		else if (templateKey == null) {
            // Use a default named element
            //console.log('CASE 1')
            var templateKey = '#curia-template-' + theme + '-' + useLevel;
            return loadTemplate(templateKey, function(err, template) {
                var desc = templateProperty + '=default=[ DOM ' + templateKey + ' ]';
                return callback(err, template, desc)
            });

        }
		else if (templateKey.charAt(0) == '#') {

            // The key refers to an element
            //console.log('CASE 2')
            return loadTemplate(templateKey, function(err, template) {
                var desc = templateProperty + '=[ DOM ' + templateKey + ' ]';
                return callback(err, template, desc)
            });

        }
		else if (templateKey.charAt(0) === '/' || templateKey.substring(0,4) === 'http') {

            // The key refers to a URL
            //console.log('CASE 3')
            return loadTemplate(templateKey, function __loadTemplate(err, template) {
                var desc = templateProperty + '=[ AJAX ' + templateKey + ' ]';
                return callback(err, template, desc)
            });
        }
		else {

            // The key is the template
            //console.log('CASE 4')
            var template = templateKey;
            var desc = templateProperty + '=[HTML]';
            return callback(null, template, desc);
        }

    }

    /*
     *	Get the HTML for a specific posting element and it's children.
     */
    function getHtmlForElement(currentUser, element, theme, level, themeOptions/*optional*/, callback) {

		// The 'options' parameter is optional (for backwards compatibility).
		if (!callback) {
			callback = themeOptions;
			themeOptions = null;
		}
		if (_config.debug) {
			console.log('getHtmlForElement(currentUser, element=' + element.id + ', theme=' + theme + ', level=' + level + ', themeOptions=' + themeOptions + ', callback=' + typeof(callback) + ')')
		}
        //console.log('------------')
        //console.log('getHtmlForElement(): theme=' + theme + ', level=' + level + ', id=' + element.id);
        //console.log('getHtmlForElement(): theme=' + theme + ', level=' + level + ', id=' + element.id + ', currentUser=', currentUser, 'element=', element);

        getElementTemplate(theme, element.type, level, function(err, template, templateDescription) {
			if (_config.debug) {
				console.log('using template ' + templateDescription)
			}

            // First collect the information for the children, and then create the element HTML (including the children).
            var numChildren = element.children ? element.children.length : 0;
            var childrenHtml = '';
            (function nextChild(index) { // Closure

                if (index < numChildren) {
                    // Create the HTML for this index'th child

					// If this element is deleted, we might show it (with an
					// appropriate message), but we won't show it's children.
					if (element.deleted) {
                        return index % 50 ? setTimeout(function(){nextChild(index + 1);},0) : nextChild(index + 1);
					}

                    //console.log('doing the child node ' + index)
                    getHtmlForElement(currentUser, element.children[index], theme, level + 1, themeOptions, function(err, html) {
                        childrenHtml += html;
                        return index % 50 ? setTimeout(function(){nextChild(index + 1);},0) : nextChild(index + 1);
                    });

                }
				else {

                    // We have the HTML for all the children. Now create the HTML for this element.
                    var data = {
                        currentUser: currentUser,
                        element: element,
						theme: themeOptions,
                        childrenHtml: childrenHtml,
						// These should be created by cookers, not here.
                        isProject: (element.type == 'project'),
                        isMessage: (element.type == 'message'),
                        isFile: (element.type == 'file'),
                        isLink: (element.type == 'link')
                    };

                    var html = '';
                    if (_config.debug) {
                        html += '<span style="background-color:magenta;color:white;font:arial 11px;">';
                        html += '&nbsp;element='+element.id + '&nbsp;&nbsp; type='+element.type + '&nbsp;&nbsp; level=' + level + '&nbsp;&nbsp; config=' + templateDescription + '<br>';
                        var desc = (element.summary) ? ('' + element.summary.length + ' bytes') : 'null';
                        html += '&nbsp; summary: ' + desc + '<br/>';
                        var desc = (element.description) ? ('' + element.description.length + ' bytes') : 'null';
                        html += '&nbsp; description: ' + desc + '<br/>';
                        html += '&nbsp; d_modified_fromNow: ' + element.d_modified_fromNow + '<br/>';
                        html += '&nbsp; filename: ' + element.filename + '<br/>';
                        html += '&nbsp; url: ' + element.url + '<br/>';
                        html += '</span><br/>';
                    }
//template = 'hello <<element.id>><br><<&childrenHtml>><br>'
                    var convertedTemplate = "{{=<< >>=}}" + template + "<<={{ }}=>>";
                    html += Mustache.to_html(convertedTemplate, data);
                    return callback(null, html);
                }

            })(0); // Start with the first element.
        });
    }

	/*
	 * OBSOLETE - Move to forum.js
	 */
    function displayCategories(template, div) {
        //alert('displayCategories()');
        var url = _API_URL + '/elementsByType/project';
        url = addAuthenticationToken(url);
        // console.log('projectsUrl is: ' + url)

        var projects;
        $.when(
            $.get(url, function(reply) {
                projects = reply;
            }, 'json')
        ).then(function() {

                // Update the screen
                // console.log('projects=', projects);

                var previousGroup = null;
                var mustacheData = { line: [ ] };
                for (var i = 0; i < projects.length; i++) {
                    var project = projects[i];
                    var group = project.description;
                    var topic = project.summary;
                    var elementId = project.id;

                    if (group != previousGroup) {
                        previousGroup = group;
                        // console.log('-> ' + group);
                        mustacheData.line.push({ label: group, isGroup: true });
                    }
                    // console.log('' + topic);
                    mustacheData.line.push({ label: topic, elementId: elementId, isGroup: false });
                }

                // console.log('mustacheData=', mustacheData);
                var template2 = $('#curia-categories-templateZ').html();
                //var template = template.html();

                //console.log('template 2:' + template2);

                var template3 = "{{=<< >>=}}" + template2 + "<<={{ }}=>>";
                var html = Mustache.to_html(template3, mustacheData);
                $('#curia-categories').html(html);
                div.html(html);
                return;
            });
    }

    function displayUsersWithAccess(template, div, elementId) {
        elementId = Curia_current_project;
        //alert('displayUsersWithAccess()');
        var url = _API_URL + '/accessToElement/' + elementId;
        url = addAuthenticationToken(url);
        // console.log('url is: ' + url)

        var users;
        $.when(
            $.get(url, function(reply) {
                users = reply;
            }, 'json')
        ).then(function() {

                // Update the screen
                // console.log('users=', users);

                var mustacheData = {
                    elementId: elementId,
                    users: users
                };
                // console.log('mustacheData=', mustacheData);

                var template2 = "{{=<< >>=}}" + template + "<<={{ }}=>>";
                var html = Mustache.to_html(template2, mustacheData);
                div.html(html);
            });
    }

    /*
     *	Change the project displayed on this page.
	 *	OBSOLETE
     */
    function changeProject(projectId, development_userId) {

        if (projectId == null) {
            projectId = _rootId;
        }

        var params = "?project=" + projectId;

        // ZZZ Hack for development, to force user
        if (development_userId != null) {
            params += "&development_userId=" + development_userId;
        }
		else if (_config.development_userId) {
            params += "&development_userId=" + _config.development_userId;
        }

        var url = '' + window.location;
        var i = url.indexOf('?');
        if (i > 0) url = url.substring(0, i);
        url += params;

        window.location.replace(url);
    }

	/**
	 * Display a thread, identified by either it's rootId or it's anchor.
	 */
	function displayThread(selector, rootId, theme, anchorType, callback/*(err)*/) {

		// Handle optional parameters (anchorType and callback)
		if (anchorType == null) {
			callback = null;
			anchorType = null;
		}
		else if (typeof anchorType === "function") {
			callback = anchorType;
			anchorType = null;
		}

		// console.log('displayThread(' + selector + ', ' + id + ', ' + theme + ', callback)')
		closeNewMessageForm();
		// Remember the theme so we can reload after changes
		var $target = $(selector);
		$target.attr('data-curia-theme', theme);

		// Load the HTML and place it on the page
        getHtmlForThread(selector, rootId, theme, anchorType, function(err, html) {
			if (err) return callback(err);
			var $html = $(html); // Convert from string to DOM
			if (_config.urlive) setupURLive($html);
            $(selector).html($html);

			if ($.dropdown) {
	            $('[data-toggle="dropdown"]').dropdown();
			}

			if (callback) {
				callback(null);
			}
        });
    }

	/**
	 *	Select elements of a particular type, and trace the hierarchy up to their roots,
	 *	and then display these threads (usually just one).
	 *
	 *	This function is used to display elements with ACLs, where the current user
	 *	only has access to relatively few of the elements of that type. For example,
	 *	to display a hierarchy of category-list -> categories -> topics, where the user
	 *	only has access to some of the topics, we can call this function for type 'project'.
	 *
	 *	ACLs are not required for the elements higher up than the specified type (In the
	 *	example above, not ACLS are required for category and category-list).
	 *
	 *	Note that this function will not display the complete hierarchy below the thread
	 *	root(s) - just the paths down to the elements of the specified type are shown.
	 */
    function displayThreadsForElementType(selector, elementType, theme, filter, callback) {
		// console.log('displayThreadsForElementType(' + selector + ', ' + elementType + ', ' + theme + ', callback)')

		// Remember the theme so we can reload after changes
		var $target = $(selector);
		$target.attr('data-curia-theme', theme);

		// Load the HTML and place it on the page
        getHtmlForThreadsForElementType(selector, elementType, theme, filter, function(err, html){
			var $html = $(html); // Convert from string to DOM
			if (_config.urlive) setupURLive($html);
            $(selector).html($html);
            $('[data-toggle="dropdown"]').dropdown();
			if (callback) {
				callback();
			}
        });
    }

	/**
	 * Display multiple threads merged together.
	 */
    function displayWall(selector, threadIds, theme, callback) {
		// console.log('displayWall(' + selector + ', ' + id + ', ' + theme + ', callback)')

		// Remember the theme so we can reload after changes
		var $target = $(selector);
		$target.attr('data-curia-theme', theme);

		// Load the HTML and place it on the page
        getHtmlForWall(selector, threadIds, theme, function(err, html){
			var $html = $(html); // Convert from string to DOM
			if (_config.urlive) setupURLive($html);
            $(selector).html($html);
			if (callback) {
				callback();
			}
        });
    }

    function prependPosts(selector, elementId, theme, callback) {
        closeNewMessageForm();
		var $target = $(selector);
		$target.attr('data-curia-theme', theme);
        getHtmlForThread(selector, elementId, theme, function(err, html){
			var $html = $(html); // Convert from string to DOM
			if (_config.urlive) setupURLive($html);
            $(selector).prepend($html);
			if (callback) callback();
        });
    }

    function appendPosts(selector, elementId, theme, callback) {
        closeNewMessageForm();
		var $target = $(selector);
		$target.attr('data-curia-theme', theme);
        getHtmlForThread(selector, elementId, theme, function(err, html){
			if (err) return callback(err);

			var $html = $(html); // Convert from string to DOM
			if (_config.urlive) setupURLive($html);
            $(selector).append($html);
			if (callback) callback();
        });
    }

    function displayVoteTotals(selector, callback) {
		//alert('Curia.displayVoteTotals(' + selector + ', callback)')

		var $target = $(selector);
		var $arr = $('.curia-vote-totals, .curia-vote-totals-NEW');
		//alert('Found ' + $arr.length + ' vote elements')

		// Get the vote types and elementIds
		var types = { };
		for (var i = 0; i < $arr.length; i++) {
			var $totalDiv = $($arr[i]);
			var aspect = $totalDiv.attr('data-curia-aspect');
			var elementId = $totalDiv.attr('data-curia-elementId');
			if (!elementId) {
				// Get the elementId from the enclosing element div
				elementId = $totalDiv.closest('.curia-element, .curia-element-NEW').attr('data-curia-elementId');
			}
			if (!elementId) {
				continue; // Not much we can do
			}

			var elementIdsForType = types[aspect];
			if (elementIdsForType) {
				elementIdsForType[elementId] = $totalDiv;
			}
			else {
				elementIdsForType = { };
				elementIdsForType[elementId] = $totalDiv;
				types[aspect] = elementIdsForType;
			}
		}

		// console.log('aspects=', types)
		// console.log('\n\n*********************************\n')

		// Now let's get the votes, one type at a time
		var typeArray = [ ];
		for (aspect in types) {
			typeArray.push(aspect);
		}

		// Iterate over the array of types
		function _nextType(index) {

			// Check we haven't run off the end
			if (index >= typeArray.length){
				//alert('all done');
				return callback();
			}

			var type = typeArray[index];

			// Create a comma separated list of element Ids
			var elementIds = types[type];
			var sep = '';
			var list = '';
			for (id in elementIds) {
				list += sep + id;
				sep=','
			}
			// console.log('list=' + list)

			// Get the aggregated vote data for these element Ids
			getVoteTotals(list, type, function(err, reply){

				for (var i = 0; i < reply.length; i++){
					var obj = reply[i];
					var elementId = obj.elementId;
					var total = obj.total;
					var num = obj.num;

					// Put the data on the screen
					var $element = elementIds[elementId];
					switch (type) {
					case 'like':
						$element.find('.num').html('' + num);
						$element.find('.like').html('' + total);
						break;

					case 'likedislike':
						$element.find('.num').html('' + num);
						$element.find('.total').html('' + total);
						$element.find('.likes').html('' + (obj['likes'] ? obj['likes'] : 0));
						$element.find('.dislikes').html('' + (obj['dislikes'] ? obj['dislikes'] : 0));
						break;

					case 'stars':
						$element.find('.num').html('' + num);
						$element.find('.1stars').html('' + (obj['1star'] ? obj['1star'] : 0));
						$element.find('.2stars').html('' + (obj['2star'] ? obj['2star'] : 0));
						$element.find('.3stars').html('' + (obj['3star'] ? obj['3star'] : 0));
						$element.find('.4stars').html('' + (obj['4star'] ? obj['4star'] : 0));
						$element.find('.5stars').html('' + (obj['5star'] ? obj['5star'] : 0));
						break;

					case 'percentage':
						var average = (num == 0) ? 0 : Math.round(total / num);
						$element.find('.num').html('' + num);
						$element.find('.percentage').html('' + average);
						$element.find('.0to10').html('' + (obj['0to10'] ? obj['0to10'] : 0));
						$element.find('.11to20').html('' + (obj['11to20'] ? obj['11to20'] : 0));
						$element.find('.21to30').html('' + (obj['21to30'] ? obj['21to30'] : 0));
						$element.find('.31to40').html('' + (obj['31to40'] ? obj['31to40'] : 0));
						$element.find('.41to50').html('' + (obj['41to50'] ? obj['41to50'] : 0));
						$element.find('.51to60').html('' + (obj['51to60'] ? obj['51to60'] : 0));
						$element.find('.61to70').html('' + (obj['61to70'] ? obj['61to70'] : 0));
						$element.find('.71to80').html('' + (obj['71to80'] ? obj['71to80'] : 0));
						$element.find('.81to90').html('' + (obj['81to90'] ? obj['81to90'] : 0));
						$element.find('.91to100').html('' + (obj['91to100'] ? obj['91to100'] : 0));
						break;
					}
				}

				// Move on to the next vote type
				_nextType(index + 1);

			});//getVoteTotals
		}

		// Start the iterating.
		_nextType(0);
	}



	/**
	 *	Select the aggregated totals for a list of elements.
	 */
	function getVoteTotals(elementIds, type, callback/*(err, reply)*/) {

		if (elementIds==null || elementIds=='') {
			return callback(new Error('getVoteTotals: invalid elementIds'));
		}
		var votesUrl = _API_URL + '/vote/totals/' + elementIds + '/' + type;
		votesUrl = addAuthenticationToken(votesUrl);

		$.ajax({
			type : 'GET',
			url : votesUrl,
			//data : element,
			success : function(response) {
				// Good reply.
				return callback(null, response);
			},
			error : function(jqxhr, textStatus, errorThrown) {
				// Failed AJAX call.
				return callback(niceError(jqxhr, textStatus, errorThrown));
			}
		});

	}// getVoteTotals



	/**
	 *	Select the aggregated totals for a list of elements.
	 */
	function getVotes(elementIds, callback/*(err, reply)*/) {
		console.log('getVotes():', elementIds);

		var votesUrl = _API_URL + '/votes/' + elementIds;
		votesUrl = addAuthenticationToken(votesUrl);

		$.ajax({
			type : 'GET',
			url : votesUrl,
			//data : element,
			success : function(response) {
				// Good reply.
				return callback(null, response);
			},
			error : function(jqxhr, textStatus, errorThrown) {
				// Failed AJAX call.
				return callback(niceError(jqxhr, textStatus, errorThrown));
			}
		});

	}// getVoteTotals



  function displayMyVotes(selector, callback) {
		//console.log('Curia.displayMyVotes(' + selector + ', callback)')

		var $target = $(selector);
		var $arr = $('.curia-vote, .curia-vote-NEW');

		// Get the vote elementIds. Where the elementId is not specified by a
		// 'data-curia-elementid' attribute get it from the enclosing element div.
		var types = { };
		var elementIdsObj = { };
		for (var i = 0; i < $arr.length; i++) {
			var $voteDiv = $($arr[i]);
			var aspect = $voteDiv.attr('data-curia-aspect');
			var elementId = $voteDiv.attr('data-curia-elementId');
			if (!elementId) {
				elementId = $voteDiv.closest('.curia-element, .curia-element-NEW').attr('data-curia-elementId');
			}
			if (elementId) {
				elementIdsObj[elementId] = '-';
			}
		}

		var elementIds = [ ];
		for (var id in elementIdsObj) {
			elementIds.push(id);
		}
		if (elementIds.length == 0) {
			// No elements for my vote
			//alert('No elements for my vote')
			return callback();
		}

		// Get the votes for the current user and update the screen
		getMyVotes(elementIds, function(err, votes){

			for (var i = 0; i < votes.length; i++) {
				var vote = votes[i];
				//console.log('Checking ', vote)
				switch (vote.aspect) {

				case 'like':
					var voteElementId = vote.voteElementId;
					var $divs = $target.find('.curia-vote[data-curia-aspect="like"]');
					if ($divs.length == 0) {
						var $divs = $target.find('.curia-vote-NEW[data-curia-aspect="like"]');
					}
					for (var j = 0; j < $divs.length; j++) {
						var $voteDiv = $($divs[j]);

						// See if we have the right elementId
						var elementId = $voteDiv.attr('data-curia-elementId');
						if (!elementId) elementId = $voteDiv.closest('.curia-element, .curia-element-NEW').attr('data-curia-elementId');
						if (elementId == voteElementId) {

							// Element is for this vote
							if (vote.score > 0) {
								$voteDiv.find('.curia-vote-button, .curia-vote-button-NEW').addClass('selected');
							}
							else {
								$voteDiv.find('.curia-vote-button, .curia-vote-button-NEW').removeClass('selected');
							}
						}
					}
					break;

				case 'likedislike':
					var voteElementId = vote.voteElementId;
					var $divs = $target.find('.curia-vote[data-curia-aspect="likedislike"]');
					if ($divs.length == 0) {
						$divs = $target.find('.curia-vote-NEW[data-curia-aspect="likedislike"]');
					}
					for (var j = 0; j < $divs.length; j++) {
						var $voteDiv = $($divs[j]);

						// See if we have the right elementId
						var elementId = $voteDiv.attr('data-curia-elementId');
						if (!elementId) elementId = $voteDiv.closest('.curia-element, .curia-element-NEW').attr('data-curia-elementId');
						if (elementId == voteElementId) {

							// Element is for this vote
							if (vote.score > 0) {
								// Liked
								$voteDiv.find('.curia-vote-button[data-curia-value="like"]').addClass('selected');
								$voteDiv.find('.curia-vote-button-NEW[data-curia-value="like"]').addClass('selected');
								$voteDiv.find('.curia-vote-button[data-curia-value="dislike"]').removeClass('selected');
								$voteDiv.find('.curia-vote-button-NEW[data-curia-value="dislike"]').removeClass('selected');
							}
							else if (vote.score < 0){
								// Disliked
								$voteDiv.find('.curia-vote-button[data-curia-value="dislike"]').addClass('selected');
								$voteDiv.find('.curia-vote-button-NEW[data-curia-value="dislike"]').addClass('selected');
								$voteDiv.find('.curia-vote-button[data-curia-value="like"]').removeClass('selected');
								$voteDiv.find('.curia-vote-button-NEW[data-curia-value="like"]').removeClass('selected');
							}
							else {
								// Neither liked nor disliked
								$voteDiv.find('.curia-vote-button[data-curia-value="dislike"]').removeClass('selected');
								$voteDiv.find('.curia-vote-button-NEW[data-curia-value="dislike"]').removeClass('selected');
								$voteDiv.find('.curia-vote-button[data-curia-value="like"]').removeClass('selected');
								$voteDiv.find('.curia-vote-button-NEW[data-curia-value="like"]').removeClass('selected');
							}
						}
					}
					break;

				case 'stars':
					var voteElementId = vote.voteElementId;
					var $divs = $target.find('.curia-vote[data-curia-aspect="stars"]');
					if ($divs.length == 0) {
						$divs = $target.find('.curia-vote-NEW[data-curia-aspect="stars"]');
					}
					for (var j = 0; j < $divs.length; j++) {
						var $voteDiv = $($divs[j]);
						// See if we have the right elementId
						var elementId = $voteDiv.attr('data-curia-elementId');
						if (!elementId) elementId = $voteDiv.closest('.curia-element, .curia-element-NEW').attr('data-curia-elementId');
						if (elementId == voteElementId) {

							// Element is for this vote
							$voteDiv.find('.curia-vote-button, .curia-vote-button-NEW').removeClass('selected');
							if (vote.score >= 1) $voteDiv.find('.curia-vote-button[data-curia-value="1stars"]').addClass('selected');
							if (vote.score >= 1) $voteDiv.find('.curia-vote-button-NEW[data-curia-value="1stars"]').addClass('selected');
							if (vote.score >= 2) $voteDiv.find('.curia-vote-button[data-curia-value="2stars"]').addClass('selected');
							if (vote.score >= 2) $voteDiv.find('.curia-vote-button-NEW[data-curia-value="2stars"]').addClass('selected');
							if (vote.score >= 3) $voteDiv.find('.curia-vote-button[data-curia-value="3stars"]').addClass('selected');
							if (vote.score >= 3) $voteDiv.find('.curia-vote-button-NEW[data-curia-value="3stars"]').addClass('selected');
							if (vote.score >= 4) $voteDiv.find('.curia-vote-button[data-curia-value="4stars"]').addClass('selected');
							if (vote.score >= 4) $voteDiv.find('.curia-vote-button-NEW[data-curia-value="4stars"]').addClass('selected');
							if (vote.score >= 5) $voteDiv.find('.curia-vote-button[data-curia-value="5stars"]').addClass('selected');
							if (vote.score >= 5) $voteDiv.find('.curia-vote-button-NEW[data-curia-value="5stars"]').addClass('selected');
						}
					}
					break;

				case 'percentage':
					var voteElementId = vote.voteElementId;
					var $divs = $target.find('.curia-vote[data-curia-aspect="percentage"]');
					if ($divs.length == 0) {
						$divs = $target.find('.curia-vote-NEW[data-curia-aspect="percentage"]');
					}
					for (var j = 0; j < $divs.length; j++) {
						var $voteDiv = $($divs[j]);
						var elementId = $voteDiv.attr('data-curia-elementId');
						if (!elementId) elementId = $voteDiv.closest('.curia-element, .curia-element-NEW').attr('data-curia-elementId');
						if (elementId == voteElementId) {

							// Element is for this vote
							$voteDiv.find('.curia-vote-input, .curia-vote-input-NEW').val(vote.score).attr('data-curia-previous-score',vote.score);
						}
					}
					break;

				default:
					console.log('Unknown aspect ' + vote.aspect);
					break;
				}
			}
			return callback();
		});
	}

	/**
	 *	Select only votes that I have created.
	 */
	function getMyVotes(elementIds, callback/*(err, reply)*/) {

    var votesUrl = _API_URL + '/votes/mine/' + elementIds;
		votesUrl = addAuthenticationToken(votesUrl);
		console.log('URL=', votesUrl)

		$.ajax({
			type : 'GET',
			url : votesUrl,
			//data : element,
			success : function(response) {
				// Good reply.
				return callback(null, response);
			},
			error : function(jqxhr, textStatus, errorThrown) {
				// Failed AJAX call.
				return callback(niceError(jqxhr, textStatus, errorThrown));
			}
		});
	}// getMyVotes

    /*
     *
     * PRIVATE FUNCTIONS
     * Place functions that will be hidden from the external interface here.
     *
     */
     /**
	 *Close the active new message form by referencing the element and putting it back to its initial location.
	 */
    function closeNewMessageForm() {
    	//Cache our form DOM
		var form = $("#id-curia-create-message, #id-curia-create-message-NEW").first();
		//Test if it exists.
		if (!form) {
			console.log('id-curia-create-message-NEW element is not found!');
		}
		else {
			//Test if form parent is not the default location.
			if (form.parent().attr("id")!="id-curia-forms") {
				//Detach it from its parent.
				form.detach();
				//Cache the default location of our form
				var formHolder = $("#id-curia-forms").first();
				//Test if the default location exists.
				if (!formHolder) {
					console.log('Cant find id-curia-forms element.');
				}
				else {
					//Attach the form to its default location.
					formHolder.append(form);
					//Hide the form containers
					jQuery('.curia-form, .curia-form-NEW').hide();
				}
				// var $displayDiv = $element.find('.curia-displayarea-NEW').first();
				// if (!$displayDiv) {
				// 	console.log('.curia-displayarea-NEW element is not found!');
				// }
				// var $workareaDiv = $element.find('.curia-workarea-NEW').first();
				// if (!$workareaDiv) {
				// 	console.log('.curia-workarea-NEW element is not found!');
				// }
				// $workareaDiv.hide();
				// $displayDiv.show();
			}
		}

	}

    function isFunction(callback){
        return !!(callback && callback.constructor && callback.call && callback.apply);
    }

	/**
	 *	Get the HTML for thread, using either the rootId or the anchor of the root element.
	 */
	function getHtmlForThread(selector, id, theme, anchorType, displayFunction) {
		if (_config.debug) {
			console.log('getHtmlForThread(selector=' + selector + ', id=' + id + ', theme=' + theme + ', anchorType=' + anchorType + ', displayFunction=' + typeof(displayFunction) + ')')
		}

		// Handle optional parameters (anchorType)
		if (typeof anchorType === "function") {
			anchorType = null;
			displayFunction = anchorType;
		}

		// Get the theme and the pre and post processing functions.
        if (theme === null) theme = 'default';
        var themeDef = getTheme(theme);
		var preprocessor = themeDef.preprocessor;
		var postprocessor = themeDef.postprocessor;

		// See what we are selecting. We might have a pseudo-anchor.
		var LATEST_PREFIX = 'latest:';
		var TRENDING_PREFIX = 'trending:';
console.log('id is ', id)
		id = '' + id; // Ensure it is a string
		if (id.substring(0, LATEST_PREFIX.length) === LATEST_PREFIX) {

			// Select the latest posts of the specified type
			var elementType = id.substring(LATEST_PREFIX.length);
            var threadUrl = _API_URL + '/elements?type=' + elementType;
		}
		else if (id.substring(0, TRENDING_PREFIX.latest) === TRENDING_PREFIX) {

			// Select the trending posts of the specified type
			var elementType = id.substring(TRENDING_PREFIX.length);
            var threadUrl = _API_URL + '/trending/' + elementType;
		}
		else {

			// Select by a regular thread ID (either rootId or an anchor)
	        var threadUrl = _API_URL + '/thread/' + id;
			if (anchorType) {
	            threadUrl += '?newAnchorType=' + anchorType;
			}
		}
		threadUrl = addAuthenticationToken(threadUrl);
		if (_config.debug) {
			console.log('URL= ' + threadUrl)
		}
console.log('url is ' + threadUrl)

		// Call the server to get the thread.
        $.when(
            $.get(threadUrl, function getHtmlForThread_gotit(reply) {

console.log('reply is ', reply)
				if (reply instanceof Array) {
					//alert('is an array')
					_thread = {
						type: 'latest',
						id: 0,
						children: reply,
						created: 1,
						modified: 1,

						rootViews: 0

					};
				}
				else {
	                _thread = reply.thread;
					_thread.rootViews = reply.updatedRootViews;
				}
//                _rootId = _thread.id;
            }, 'json')
        ).then(function getHtmlForThread_then() {
            // Give the client the chance to add extra information for use by Mustache.
            if (isFunction(preprocessor)){
                preprocessor(_thread, selector, 0, function getHtmlForThread_preprocessed(){
                    // Update the screen
                    return getHtmlForElement(_user, _thread, theme, /*level*/ 0, displayFunction);
                });
            }
			else {
                // Update the screen
                return getHtmlForElement(_user, _thread, theme, /*level*/ 0, displayFunction);
            }
        }).then(function getHtmlForThread_afterwards(){
            if (isFunction(postprocessor)){
                postprocessor(_thread, selector, 0);
            }
            return;
        });
    }

	/**
	 *	Get the HTML for thread, using either the rootId or the anchor of the root element.
	 */
	function getHtmlForThreadsForElementType(selector, elementType, theme, filter, displayFunction) {
//console.log('getHtmlForThreadsForElementType(' + elementType + ')');
		// Get the theme and the pre and post processing functions.
        if (theme === null) theme = 'default';
        var themeDef = getTheme(theme);
		var preprocessor = themeDef.preprocessor;
		var postprocessor = themeDef.postprocessor;

		// Call the server to get the thread.
		// e.g. http://localhost:4000/api/${tenant}/elementsByType/${type}?findRoots=true
        var threadUrl = _API_URL + '/elementsByType/' + elementType + '?findRoots=true' + '&filter=' + filter;

		threadUrl = addAuthenticationToken(threadUrl);

		var start = new Date().getTime();
        $.when(
            $.get(threadUrl, function(reply) {
				// console.log('getHtmlForThreadsForElementType: got ', reply)
                _thread = reply[0] || {type: 'category-list'};
				// console.log('getHtmlForThreadsForElementType: thread is ', _thread)
                if (_thread && _thread.updatedRootViews){
		      	   _thread.rootViews = reply.updatedRootViews;
                }
//                _rootId = _thread.id;
            }, 'json')
        ).then(function() {
			var end = new Date().getTime();
			var time = end - start;
			//console.log('  GET ' + threadUrl + ' took ' + time + 'ms');

            // Give the client the chance to add extra information for use by Mustache.
	        if (isFunction(preprocessor)) {
                preprocessor(_thread, selector, 0, function(thread) {
                    if (thread && _thread !== thread){
                        _thread = thread;
                    }
	                getHtmlForElement(_user, _thread, theme, /*level*/ 0, displayFunction);
	            });
	        }
			else {
	            getHtmlForElement(_user, _thread, theme, /*level*/ 0, displayFunction);
	        }
        }).then(function(){

            if (isFunction(postprocessor)){
                postprocessor(_thread, selector, 0);
            }
            return;
        });
    }

	/**
	 *	Get the HTML for multiple threads, merged together by date.
	 */
	function getHtmlForWall(selector, ids, theme, displayFunction) {

		// Get the theme and the pre and post processing functions.
        if (theme === null) theme = 'default';
        var themeDef = getTheme(theme);
		var preprocessor = themeDef.preprocessor;
		var postprocessor = themeDef.postprocessor;

		/*
   var dfdArr = [];

    while (i <= qty_of_gets) {
        dfdArr.push($.get("queries/html/" + product_id + i + ".php"));
        i++
    }
    $.when.apply(null, dfdArr).done(function () {

        for (response in arguments) {
            $('#myDiv').append(response[0]);
        }

    });
		*/

		var numThreads = ids.length;
//numThreads = 1;
		var deferreds = [ ];
		for (var i = 0; i < numThreads; i++) {

			// Call the server to get the thread.
			var id = ids[i];
            var threadUrl = _API_URL + '/thread/' + id;
			threadUrl = addAuthenticationToken(threadUrl);
			// console.log('URL= ' + threadUrl)


            var deferred = $.get(threadUrl, $.noop, 'json');
			deferreds.push(deferred);
		}
		// console.log('numThreads=' + numThreads)

		var _thread;
        $.when.apply(null, deferreds).done(function(){

			if (numThreads == 1) {

				// If there is only one ajax call, the arguments will be [ reply, status, xhrThing]
				//alert('only one thread');
                _thread = arguments[0].thread;
				_thread.rootViews = _thread.updatedRootViews;
			}
			else {

				// If there are multiple ajax calls, the arguments will be an array of { reply, status, hxrThing }
				// Merge the threads
//				console.log('\n\n\nhave replies: ' + arguments.length);
				var topicElements = [ ];
				var childLists = [ ]; // List of lists
				var positions = [ ];
				for (var i = 0; i < arguments.length; i++) {
					var reply = arguments[i][0];
                    if (reply.thread && reply.thread.archived)
                        continue;

					var thread = reply.thread;
//					console.log('\n\n\nthread ' + i + ' is:\n', typeof(thread));
//					console.log('\n\n\nthread ' + i + ' is:\n', thread);
//					console.log('\n\n\nthread.children ' + i + ' is:\n', thread.children);
					if (thread.children) {
						topicElements.push(thread);
						childLists.push(thread.children);
	//console.log('ADDING LIST WITH ' + thread.children.length + " ELEMENTS")
						positions.push(0);
					}
				}

				var children = [ ];
				var numRequired = 50;
				for (var cnt = 0; cnt < numRequired; cnt++) {

//console.log('\n\n\nGet element #' + cnt);
					// Find the latest post
					var latestTime = 0;
					var latestIndex = -1;
					var latestElement = null;
					var latestTopic = null;
					for (var i = 0; i < childLists.length; i++) {
						var topicElement = topicElements[i];
						var list = childLists[i];
						var pos = positions[i];

						if (pos >= list.length) {
							// None left in this list
							continue;
						}
						var element = list[pos];

//						console.log('' + i + ': pos='+pos);
//						console.log('  ->', element);

						var modified = element.modified;
						//ZZZZZ Should consider the time of descendants as well
						//console.log('modified=' + modified);
						if (modified > latestTime) {
							latestTime = modified;
							latestElement = element;
							latestTopic = topicElements[i];
							latestIndex = i;
						}
					}

					// Add the latest element to the list of children
					if (latestIndex < 0) {
						// There must be no more left to show.
						break;
					}

					//console.log('Element from topic ' + latestTopic.description)
					latestElement.description = '<b>Topic: ' + latestTopic.summary + '</b><br/>' + latestElement.description;
					children.push(latestElement);
					positions[latestIndex]++;
				}

				// console.log('\n\n\n\n\nchildren are', children)

				// Create a pseudo-thread for the wall.
				var wall = {
					type: 'wall',
					avatar: 'abc.png',
					children: children,
					created: 0,
					deleted: false,
					description: 'The following is a list of recent posts from the topics you follow.',
					endTime: 0,
					externalId: null,
					extraProperties: null,
					filename: null,
					filesize: 0,
					filetype: null,
					id: 0,
					modified: 0,
					parentId: 0,
					position: 0,
					rootAnchor: null,
					rootId: 0,
					rootModified: null,
					rootPosts: 0,
					rootViews: 0,
					startTime: 0,
					summary: 'Wall',
					tenant: _config.tenantId,
					url: null,
					user: {
						avatar: null,
						email: null,
						externalId: null,
						firstName: null,
						lastName: null,
						userId: 'nobody'
					},
					userId: 'wallUser'
				};

				// console.log('')

				_thread = wall;

			}
        }).then(function() {
            // Give the client the chance to add extra information for use by Mustache.
            if (isFunction(preprocessor)){
                preprocessor(_thread, selector, 0);
            }
            // Update the screen
            getHtmlForElement(_user, _thread, theme, /*level*/ 0, displayFunction);
        }).then(function(){

			// Let the client make further changes to the screen.
            if (isFunction(postprocessor)){
                postprocessor(_thread, selector, 0);
            }
            return;
        });
    }

	function getHtmlForSearchResult(selector, query, types, theme, level, displayFunction) {
		//console.log('getHtmlForSearchResult()');

		// Get the theme and the pre and post processing functions.
        if (theme === null) theme = 'default';
        var themeDef = getTheme(theme);
		var preprocessor = themeDef.preprocessor;
		var postprocessor = themeDef.postprocessor;

		// Call the server to get the thread.
        var threadUrl = _API_URL + '/search/' + query;
		var sep = '?'
		if (types && types!='') {
			threadUrl += '?type=' + types;
			sep = '&'
		}
        threadUrl = addAuthenticationToken(threadUrl);

        var _reply, currentUser;
        $.when(
            $.get(threadUrl, function(reply) {
				//console.log('Have search reply:', reply)
				_reply = reply;
				console.log('Search returned ' + reply.length + ' elements');
            }, 'json')
        ).then(function() {

            // Give the client the chance to add extra information for use by Mustache.
            if (isFunction(preprocessor)){
				for (var i = 0; i < _reply.length; i++){
					var element = _reply[i];
					element.isSearchResult = true; // Allow the template to disable buttons, etc.
	                preprocessor(element, selector, level);
				}
            }
			// Check for an empty reply
			if (_reply && _reply.length == 0) {

				// No elements were found
				// Display the page, without any search result.
		        getElementTemplate(theme, 'searchPage', 0, function(err, template, templateDescription) {

					// // We have the template.
// 	                var data = {
// 						isEmpty: true,
// 						query: query,
// 	                    childrenHtml: 'WOBBLETHEUDYY'
// 	                };
// 	                var convertedTemplate = "{{=<< >>=}}" + template + "<<={{ }}=>>";
// 	                var html = Mustache.to_html(convertedTemplate, data);
// 					return displayFunction(null, html);
					var empty = true;
					_insertHtmlIntoSearchPage(theme, query, empty, 'no good', function(err, pageHtml){
						return displayFunction(null, pageHtml);
					});
				});//getElementTemplate
				return;
			}

            // Update the screen
			var _html = '';
			(function _nextElement(index){
				if (index < _reply.length) {

					// Add this element's HTML
					var element = _reply[index];
					//console.log('Element ' + index + ' is type ' + element.type);
		            getHtmlForElement(_user, element, theme, level, function(err, html){
		            	_html += html;
						_nextElement(index + 1); // Move on to the next element
		            });
				}
				else {

					// Completed all the elements.
					// Display this content on the screen, before running any postProcessor below.
//					return displayFunction(null, _html);
					var empty = false;
					_insertHtmlIntoSearchPage(theme, query, empty, _html, function(err, pageHtml){
						return displayFunction(null, pageHtml);
					});
					return;
				}
			})(0); // Start with the first element
        }).then(function(){

			// By here, the content should all be displayed on the screen.
			// Run any post-processing function, to work on the result.
            if (isFunction(postprocessor)){
                postprocessor(_thread, selector, 0);
            }
            // return;
        });
    }


	function _insertHtmlIntoSearchPage(theme, query, isEmpty, html, callback/*(err, newHtml)*/) {
		//console.log('_insertHtmlIntoSearchPage: isEmpty=' + isEmpty + ', html=' + html)

		// Get the page template
	    getElementTemplate(theme, 'searchPage', 0, function(err, template, templateDescription) {

			// We have the template.
	        var data = {
				haveElements: !isEmpty,
				query: query,
	            searchHtml: html
	        };
	        var convertedTemplate = "{{=<< >>=}}" + template + "<<={{ }}=>>";
	        var newhtml = Mustache.to_html(convertedTemplate, data);
			return callback(null, newhtml);
		});//getElementTemplate
	}

	/**
	 *	If we are using URLive, use it to display a preview for each description containing links.
	 *	This function sets up URLive for a thread being displayed. See up in initialize() for
	 *	the event handlers that provide preview when an element is being edited or added.
	 */
	function setupURLive($html) {
		// alert('setupURLive()')

		// Set up URLive on each element that was just loaded.
		var $elements = $html.find('.curia-element, .curia-element-NEW');
		for (var i = 0; i < $elements.length; i++) {

			// If we have a description for this element, use URLive to show a preview of any links it contains.
			var element = $elements[i];
			var richtextDiv = $(element).find(".froala-view").first();
			var $description;

			if (richtextDiv && _config.richtext){
				$description = richtextDiv;
			}
			else {
				$description = $(element).find(".curia-urlive, .curia-urlive-NEW").first();
			}

        	if ($description.length < 1)
				 continue;

    		// Have a description - find the spinner icon and the preview area
        	var $previewDiv = $(element).find(".curia-previewarea, .curia-previewarea-NEW").first();
			var $loadicon = $(element).find('.curia-loadicon, .curia-loadicon-NEW').first();
			$previewDiv.show();

			// Update the preview area if required
			(function(cnt, $description, $previewDiv, $loadicon){
				// We'll use a closure, so the variables don't get changed before this async operation finishes
				$description.urlive({
					container: $previewDiv,
					callbacks: {
	    		 		onStart: function () {
	    		 			// Show the spinner
	    		 			//console.log('onStart() ' + cnt)
			                $loadicon.show();
			            },
			            onSuccess: function (data) {
			            	// Hide the spinner
	    		 			//console.log('onSuccess(): ' + cnt, data)
			                $loadicon.hide();
			            }
					}
				});
			})(i, $description, $previewDiv, $loadicon);
		}
	}

    /*
     * Functions to display status messages.
     *
     *	'element' may be a jQuery selector (e.g. #elementId) or DOM element.
     */
    function clearStatus_NEW($thread, elementId){
		var $element = $thread.find('.curia-element[data-curia-elementId="'+elementId+'"]');
		if ($element.length == 0) {
			$element = $thread.find('.curia-element-NEW[data-curia-elementId="'+elementId+'"]');
		}
		var $statusElement = $element.find('.curia-status').first();
		if ($statusElement.length == 0) {
			$statusElement = $element.find('.curia-status-NEW').first();
		}

		$thread.find('.curia-status, .curia-status-NEW').hide();
        $statusElement.removeClass("alert-success");
        $statusElement.removeClass("alert-error");
        $statusElement.find(".message").text('');
    }

    function showSuccessStatus_NEW(selector, elementId, message, duration) {
		console.log('showSuccessStatus_NEW(): ', selector, elementId, message)
		$thread = $(selector);
		var $element = $($thread).find('.curia-element[data-curia-elementId="'+elementId+'"]');
		if ($element.length == 0) {
			$element = $thread.find('.curia-element-NEW[data-curia-elementId="'+elementId+'"]');
		}
		var $statusElement = $element.find('.curia-status, .curia-status-NEW').first();

		$thread.find('.curia-status, .curia-status-NEW').hide();
		$statusElement.addClass("alert-success");
		$statusElement.find(".message").text(message);
		$statusElement.show();

        duration = duration || 3000; // default duration is 3 seconds
        $statusElement.fadeOut(duration, function () {
            // $statusElement.alert('close');
        })
    }

    function showErrorStatus_NEW($thread, elementId, error, duration){
		if ( !$thread) return;
		var $element = $thread.find('.curia-element[data-curia-elementId="'+elementId+'"]');
		if ($element.length == 0) {
			$element = $thread.find('.curia-element-NEW[data-curia-elementId="'+elementId+'"]');
		}
		var $statusElement = $element.find('.curia-status, .curia-status-NEW').first();

		$thread.find('.curia-status, .curia-status-NEW').hide();
        $statusElement.addClass("alert-danger");
        $statusElement.find(".message").text(error);
        $statusElement.show();
        if ( !duration) duration = 5000; // default duration is 5 seconds
        $statusElement.fadeOut(duration, function () {
            // $statusElement.alert('close');
        })
    }


    function showError(selector, elementId, error, duration) {
		//console.log('\nshowError():', selector, elementId, error)

		// Go up to the loader element, which is usually the top of the element hierarchy.
		var $loaderElement = getLoaderElement(selector);
		//console.log('$loaderElement=' + $loaderElement.length)

		// Clear all status displays under the top level element.
		$loaderElement.find('.curia-status, .curia-status-NEW').hide();

		// Come down to find the element for elementId
		var $element = $loaderElement.find('.curia-element[data-curia-elementId="'+elementId+'"]');
		if ($element.length == 0) {
			$element = $loaderElement.find('.curia-element-NEW[data-curia-elementId="'+elementId+'"]');
		}
		//console.log('$element=' + $element.length)

		// Find the status DOM element under the Curia element's DOM element.
		var $statusElement = $element.find('.curia-status, .curia-status-NEW').first();
		//console.log('$statusElement=' + $statusElement.length)

		// Display the status
        $statusElement.addClass("alert-danger");
		$msg = $statusElement.find(".message");
		if ($msg.length > 0) {
	        $msg.text(error);
		}
		else {
	        $statusElement.text(error);
		}
        $statusElement.show();
		// Fade the message away after a while
        if ( !duration) duration = 5000;
        $statusElement.fadeOut(duration, function () {
            // $statusElement.alert('close');
        })
    }


	function displaySearchResult(selector, query, types, theme, level, callback) {
        //$(selector).html('NONE FOUND YET (Curia.js)')
		//console.log('displaySearchResult(' + selector + ', ' + query + ', ' + types + ', ' + theme + ', ' + level + ', callback)')

		// Remember the theme so we can reload after changes
		// var $target = $(selector);
		// $target.attr('data-curia-theme', theme);

		// Check the selector is valid
        var $target = $(selector);
		if ($target.length == 0) {
			console.log('Error: displaySearchResult(): unknown selector "' + selector + '".');
		}

		// Load the HTML and place it on the page
        getHtmlForSearchResult(selector, query, types, theme, level, function(err, html){
			$target.html(html);
			if (_config.urlive) setupURLive($target);
			if (callback) {
				callback();
			}
        });
	}

	/**
	 *	If an authentication token was defined in the config passed to init(),
	 *	add the token to the end of every URL calling the API.
	 */
	function addAuthenticationToken(url) {
		if (_config.authenticationToken && _config.authenticationToken!='') {
			var sep = (url.indexOf('?') >= 0) ? '&' : '?';
			url += sep + 'authenticationToken=' + _config.authenticationToken;
		}
        // Hack for during development
		if (_config.development_userId && _config.development_userId!='') {
			var sep = (url.indexOf('?') >= 0) ? '&' : '?';
			url += sep + 'development_userId=' + _config.development_userId;
		}
		return url;
	};

	/**
	 *	Insert links around mentions (@someName) in the text string.
	 *	These do not actually link anywhere, but will have the following structure,
	 *	from which the page can attach event a handler.
	 *
	 *	<a href="#" class="curia-mention" data-curia-search="someName">@someName</a>
	 */
	function createLinksForMentions(text) {
		//console.log('\n\ncreateLinksForMentions: ' + text)
		if (text == null)
			return '';
		var out = '';
		for (var start = true; ; start = false) {
			var pos = text.indexOf('@');
			if (pos < 0) {
				out += text;
				break;
			}
			var before = text.substring(0, pos);
			var after = text.substring(pos + 1);
			out += before;

			// Skip over the name
			var i = 0;
			for ( ; i < after.length; i++) {
				var ch = after.charAt(i);
				var code = after.charCodeAt(i);
				if (!(code > 47 && code < 58) && // numeric (0-9)
				 !(code > 64 && code < 91) && // upper alpha (A-Z)
				 !(code > 96 && code < 123))  // lower alpha (a-z)
			       break;
			}
			if (i > 0) {
				var name = after.substring(0, i);
				after = after.substring(i + 1);
				out += '<a href="#" class="curia-mention" data-curia-search="@'+name+'">@' + name + '</a>';
			}
			text = after;
		}
		return out;
	}

	/**
	 *	Insert links around tags (#someTag) in the text string.
	 *	These do not actually link anywhere, but will have the following structure,
	 *	from which the page can attact event a handler.
	 *
	 *	<a href="#" class="curia-tag" data-curia-search="#someTag">#someTag</a>
	 */
	function createLinksForTags(text) {
		var out = '';
		for ( ; ; ) {
			var pos = text.indexOf('#');
			if (pos < 0) {
				out += text;
				break;
			}
			var before = text.substring(0, pos);
			var after = text.substring(pos + 1);
			out += before;

			// Skip over the name
			var i = 0;
			for ( ; i < after.length; i++) {
				var ch = after.charAt(i);
			    var code = after.charCodeAt(i);
			     if (!(code > 47 && code < 58) && // numeric (0-9)
			         !(code > 64 && code < 91) && // upper alpha (A-Z)
			         !(code > 96 && code < 123))  // lower alpha (a-z)
			       break;
			}
			if (i > 0) {
				var name = after.substring(0, i);
				after = after.substring(i);
				out += '<a href="#" class="curia-tag" data-curia-search="'+name+'">#' + name + '</a>';
			}
			text = after;
		}
		return out;
	}

	/**
	 *	Select may be in various formats:
	 *		select('$my-anchor', 'user-list', callback) - select a thread by it's anchor and anchorType.
	 *		select(rootId, callback) - select a thread. Anchor will not be created if it doesn't exist.
	 *		select(params, callback)
	 */
	function select(param1, param2, param3, param4, param5) {
		if (_config.debug) console.log('select()');
		var type1 = typeof(param1);
		var type2 = typeof(param2);
		var type3 = typeof(param3);

		if (type3 == 'function') {

			// Short form:  select(anchor, anchorType, callback)
			// Check the anchor starts with $
			var anchor = param1;
			var anchorType = param2;
			var callback = param3;
			if (typeof(anchor) != 'string') {
				console.log('CrowdHound.select: anchor must be a string: ' + anchor + ', ' + typeof(anchor));
				return callback(new Error('invalid anchor parameter'));
			}
			if (anchor.charAt(0) != '$') {
				console.log('CrowdHound.select: anchor must start with \'$\': ' + anchor);
				return callback(new Error('invalid anchor parameter - must start with \'$\''));
			}
			if (typeof(anchorType) != 'string') {
				console.log('CrowdHound.select: anchorType must be a string: ' + anchorType + ', ' + typeof(anchorType));
				return callback(new Error('invalid anchor parameter'));
			}
			console.log('select anchor')
			var params = {
				elementId: anchor,
				type: anchorType
			};
			var callback = param3;
		}
		else if (type2 == 'function') {

			if (type1 == 'object') {

				// Select with full parameters
				var params = param1
				var callback = param2;
			}
			else {

				// Select a thread
				var params = {
					elementId: ''+param1
				};
				var callback = param2;
			}

		}
		else {
			console.log('Unknown parameters to CrowdHound.select');
			if (type1 == 'function') {
				var callback = param1;
				return callback(new Error('Invalid parameters'));
			}
			if (typeof(type4) == 'function') {
				var callback = param4;
				return callback(new Error('Invalid parameters'));
			}
			if (typeof(type5) == 'function') {
				var callback = param5;
				return callback(new Error('Invalid parameters'));
			}
			return;
		}
	// 	if (param)
	//
	// 	callback/*(err, selection)*/) {
	//
	// function select(params, callback/*(err, selection)*/) {
		// See what we are selecting. We might have a pseudo-anchor.
		/*
		var LATEST_PREFIX = 'latest:';
		var TRENDING_PREFIX = 'trending:';
console.log('id is ', id)
		id = '' + id; // Ensure it is a string
		if (id.substring(0, LATEST_PREFIX.length) === LATEST_PREFIX) {

			// Select the latest posts of the specified type
			var elementType = id.substring(LATEST_PREFIX.length);
            var threadUrl = _API_URL + '/elements?type=' + elementType;
		}
		else if (id.substring(0, TRENDING_PREFIX.latest) === TRENDING_PREFIX) {

			// Select the trending posts of the specified type
			var elementType = id.substring(TRENDING_PREFIX.length);
            var threadUrl = _API_URL + '/trending/' + elementType;
		}
		else {

			// Select by a regular thread ID (either rootId or an anchor)
	        var threadUrl = _API_URL + '/thread/' + id;
			if (anchorType) {
	            threadUrl += '?newAnchorType=' + anchorType;
			}
		}
		*/

		var elementType = 'file';
//		var url = _API_URL + '/elements?type=' + elementType;
		var url = _API_URL + '/elements';
		url = addAuthenticationToken(url);
		if (_config.debug) {
			console.log('URL= ' + url)
		}
		console.log('CrowdHound.select()')
		console.log('  url=' + url)
		console.log('  params=', params)
		var selection = {
			cooked: false,
			params: params
		};

		// var jqxhr = $.get( "example.php", function() {
		//   alert( "success" );
		// })
//		params.type = 'review';

        $.get(url, params, function selectElementsCB(reply) {

console.log('  reply=', reply)

			// If the first item in the array is the current user, pluck it off the array now.
			if ((reply instanceof Array) && reply.length > 0 && reply[0].__currentUser) {
				_currentUserData = reply[0];
				reply.shift(); // remove from the array
			}



			/*
			if (reply instanceof Array) {
				//alert('is an array')
				_thread = {
					type: 'latest',
					id: 0,
					children: reply,
					created: 1,
					modified: 1,

					rootViews: 0

				};
			}
			else {
                _thread = reply.thread;
				_thread.rootViews = reply.updatedRootViews;
			}
			*/
//                _rootId = _thread.id;
			selection.elements = reply;
			return callback(null, selection);
        }, 'json')
		// .done(function() {
		// alert( "second success" );
		// })
		.fail(function(error) {
//			alert("Error in CrowdHound.select()");
//			console.log("Error in CrowdHound.select(): ", error);
			return callback(error);
		})
		// .always(function() {
		// 	alert( "finished" );
		// });
	}

	/**
	 *	"Cook" selection data.
	 *		cook(selection, callback/*(err, updatedSelection)* /)
	 *		cook(params, selection, callback/*(err, updatedSelection)* /)
	 *		cook(list-of-cookers, selection, callback/*(err, updatedSelection)* /)
	 *
	 *	Callback parameters:
	 *		err: error
	 *		updatesSelection: a possibly updated selection object.
	 *
	 *	Parameters:
	 *		cook: an array or comma separated list of names of 'cookers'.
	 *
	 *	Description:
	 *	"Cooking" involves converting raw element data into data specific
	 *	to the current user or the current page. A series of 'cookers' are
	 *	run to patch or add to the existing data. The usual purpose is to
	 *	set values than can be understood by the Mustache templates.
	 *
	 *	Examples include:
	 *		user - add details of the user to each element.
	 *		delete - deleting element the current user should not see.
	 *		abuse - hide an abusive post from the person who ahs reported it.
	 *		times - add human readable time fields to the elements.
	 *
	 *	If no list of cookers is provided, all cookers will be run. Each time
	 *	a cooker is run, a variable selection.cooked[cooker-name] is set to true.
	 *
	 *	If a cooker has been run, it will not be run again. This allows some
	 *	cooking to be done on the server, and not repeated in the client.
	 */
	function cook(param1, param2, param3, param4) {
		console.log('cook():' , params);

		if (param4 != null) {
			console.log('ERROR: incorrect parameters to CrowdHound.cook()');
			return;
		}
		else if (typeof(param3) === 'function') {

			// cook(params, selection, callback)
			var params = param1;
			var selection = param2;
			var callback = param3;
		}
		else if (typeof(param2) === 'function') {

			// cook(selection, callback)
			var params = { };
			var selection = param1;
			var callback = param2;
		}
		else {
			console.log('ERROR: incorrect parameters to CrowdHound.cook()');
			return;
		}

		// Prepare the selection object
		if (typeof(selection.cooked) === 'undefined') {
			alert('undef');
			selection.cooked = { };
		}
		if (!selection.cooked) selection.cooked = { };


		// Decide what we need to cook
		var names = [ ];
		if (typeof(params) === 'string' || Array.isArray(params)) {

			// First parameter was a list of cookers
			var cook = params;
			params = { cook: cook };
		}
		if (params.cook) {
			// Use the specified cookers only
			var list = params.cook;
			if (typeof(list) === 'string') {
				list = list.split(',');
			}
			else if (Array.isArray(list)) {
				// do nothing
			}
			else {
				var error = 'CrowdHound.cook(): invalid value for params.cook';
				console.log(error + ':', params.cook);
				return callback(new Error(error));
			}

			for (var i = 0; i < list.length; i++) {
				var n = list[i];
				if (String.prototype.trim) {
					console.log('trimming')
					n = n.trim(n);
				}
				names.push(n);
			}
		}
		else {

			// Use every cooker
			for (var i = 0; i < _cookers.length; i++) {
				var cooker = _cookers[i];
				names.push(cooker.name);
			}
		}

		// Run each of the cookers in turn
		(function nextCooker(index, updatedSelection) {
			if (index >= names.length) {
				// Run out of callbacks
				return callback(null, updatedSelection);
			}

			// Run the next cooker
			var name = names[index];
			var cooker = _cookersByName[name];
			if (cooker == null) {
				console.log('Warning: ignoring unknown cooker: \'' + name + '\'');
				return nextCooker(index + 1, updatedSelection);
			}
			if (selection.cooked[name]) {
				console.log('Already cooked: ' + name + '  (will skip cooking again)');
				return nextCooker(index + 1, updatedSelection);
			}
			cooker.fn(params, selection, function cookerCB(err, newSelection) {
				if (err) return callback(err);
				if (!newSelection) {
					newSelection = selection; // Use the existing selection
				}
				if (newSelection.cooked[name]) {
					console.log('WARNING: It appears cooker \'' + name + '\' has called it\'s callback multiple times! Please correct this cooker.');
					return;
				}
				newSelection.cooked[name] = true;
				return nextCooker(index + 1, newSelection);
			});
		})(0, selection); // Start iterating
	}

	function render(params, selection, callback) {
		console.log('render():' , params);


		var selector = params.target;
		var theme = params.theme;
		var useAppend = params.append;

        closeNewMessageForm();
		var $target = $(selector);
		$target.attr('data-curia-theme', theme);



		/*
		// Create a fake "wrapper" element.
		var wrapper = {
			id: -1,
			type: 'wrapper',
			children: selection.elements
		};

        getHtmlForElement(_user, wrapper, theme, /*level* / 0, function(err, html) {
			if (err) return callback(err);
			var $html = $(html); // Convert from string to DOM

			//ZZZ Should this be here?
			if (_config.urlive) setupURLive($html);
//	            $(selector).append($html);
            $target.append($html);
//				if (callback) callback();
			//ZZZ Prevent overflowing the stack
        	nextElement(index + 1);
        });
		*/


		// Get the theme's options, which will be passed to Mustache (not really a template).
	    getElementTemplate(theme, 'options', 0, function(err, themeOptions, optionsDescription) {
			if (!themeOptions) {
				themeOptions = { };
			}

			/*
			*/
			var elementHtml = '';
			var len = selection.elements.length;
			(function nextElement(index) {
				if (index >= len) {
					// We've displayed every element

					// Get the wrapper template
				    getElementTemplate(theme, 'wrapper', 0, function __getElementTemplate(err, wrapperTemplate, templateDescription) {

	//					console.log('temaple is ', template);
	//template = null;
						if (wrapperTemplate) {
							// Insert the HTML for the elements into the wrapper
					        var convertedTemplate = "{{=<< >>=}}" + wrapperTemplate + "<<={{ }}=>>";
							var data = { elementHtml: elementHtml, childrenHtml: elementHtml, currentUser: _currentUserData, theme: themeOptions };
					        var fullHtml = Mustache.to_html(convertedTemplate, data);
						}
						else {
							fullHtml = elementHtml;
						}

						// Put the total HTML onto the page
						var $dom = $.parseHTML(fullHtml);
//						if (_config.urlive) setupURLive($dom); //ZZZ Should this be here?
						if (useAppend) {
				            $target.append($dom);
						}
						else {

							// Remember the scroll position, replace the contents of the div, restore the scroll position.
							var scrollPosition = $(document).scrollTop();
				            $target.html($dom);
							$(document).scrollTop(scrollPosition);
						}
						return callback(null, selection);
					});//getElementTemplate
					return;
				}

				// Display the next element
				var element = selection.elements[index];
		        getHtmlForElement(_user, element, theme, /*level*/ 0, themeOptions, function __getHtmlForElement(err, html) {
					if (err) return callback(err);
					elementHtml += html;
		        	nextElement(index + 1);
		        });
			})(0); // Start iterating


		});// getElementTemplate(... 'options' ...)




//		return callback(null, selection);
	}

	// Recursively traverse a hierarchy of elements, calling a callback function on each.
	// Returns with the same selection it wass passed (which may be modified internally by the elementCB).
	function traverse(selection, elementCB/*(level,element,parent,next)*/, completionCB/*(err, selection)*/) {
		//console.log('traverse()');
		var level = 0;
		var parent = null;

		var len = selection.elements.length;
		(function nextSelectionElement(index) {
			if (index >= len) {
				// Run out of elements
				return completionCB(null, selection);
			}

			// traverse the next element in the selection
			var element = selection.elements[index];
			traverse_recurse(level, element, parent, elementCB, function(err) {
				if (err) return completionCB(err);
				return nextSelectionElement(index + 1);
			});
		})(0); // Start iterating
	}

	function traverse_recurse(level, element, parent, elementCB/*(level,element,parent,next)*/, finished/*()*/) {
		//console.log('traverse_recurse(level=' + level + ', element=' + element.id + ')');

		// Check the element has a 'extra' object.
		if ( !element.extra) element.extra = { };

		// Run the elementCB on this element
		elementCB(level, element, parent, function nextSingleElement(err) {
			if (err) return finished(err);

			// Now traverse over the children
			var len = element.children ? element.children.length : 0;
			(function nextChild(index) {
				if (index >= len) {
					// Run out of children
					return finished(null);
				}

				// Check the next child.
				var child = element.children[index];
				var parent = element;
				traverse_recurse(level + 1, child, parent, elementCB, function(err) {
					if (err) return finished(err);
					return nextChild(index + 1);
				})
			})(0); // Start iterating
		})
	}

	function traverseDebug(level, element, msg) {
		if (!msg) msg = '';
		var indent = '';
		for (var i = 0; i < level; i++) {
			indent += '  ';
		}
		console.log(indent + element.id + ' -> ' + msg);
	}

	function cook_user(params, selection, callback/*(err, updateSelection)*/) {
		//console.log('cook_user()');

		// If we already have user details, skip this cooking.
		if (selection.cooked && selection.cooked.user) {
			return callback(null, selection);
		}

		// Step 1. Traverse to get a list of userId that are required.
		// Step 2. Select the userIds and plug them into the elements.
		var users = [ ]; // userId -> user
		var allElements = [ ];
		CrowdHound.traverse(selection, function cookUser(level, element, parent, next) {

			//CrowdHound.traverseDebug(level, element, 'userId=' + element.userId);
			var userId = element.userId;
			allElements.push(element);
			users[userId] = '-';

			// if (!element.user) {
			// 	element.user = { };
			// }
			// element.user.firstName = 'Fred'
			// element.user.lastName = 'Smith'
			return next(null);
		},
		function traverseEndCB() {

			/*
			 *	Finished traversing the elements.
			 */
			// Select the user records for the userIds.
//			console.log('Need to select these users: ', users);
//            element.user.avatarUrl = element.avatar;
			var url = _API_URL + '/users';
			var sep = '?userId=';
			for (var userId in users) {
				// console.log(' ++> ' + userId);
				url += sep + userId;
				sep = ',';
			}
			url = addAuthenticationToken(url);
			if (_config.debug) {
				console.log('URL= ' + url)
			}
//console.log('url is ' + url)

			// Select the users
      $.get(url, params, function selectElementsCB(reply) {

				//console.log('select users reply is ', reply);
				// Create an index of users
				var index = [ ];
				for (var i = 0; i < reply.length; i++) {
					var user = reply[i];
					index[user.userId] = user;
				}

				// Set the user for each element
				for (var i = 0; i < allElements.length; i++) {
					var element = allElements[i];
					element.user = index[element.userId];
				}
				/*
				if (reply instanceof Array) {
					//alert('is an array')
					_thread = {
						type: 'latest',
						id: 0,
						children: reply,
						created: 1,
						modified: 1,

						rootViews: 0

					};
				}
				else {
	                _thread = reply.thread;
					_thread.rootViews = reply.updatedRootViews;
				}
				*/
	//                _rootId = _thread.id;
//				selection.elements = reply;
				return callback(null, selection);
      }, 'json')
			.fail(function(error) {
				alert("error", error);
				return callback(new Error('Could not select user details'));//ZZZZ Return a useful error message
			})
		});
	}

	/**
	 *	Mark a record as deleted, unless the user has special permissions.
	 */
	function cook_deleted(params, selection, callback/*(err, updatedSelection)*/) {
		//console.log('cook_deleted()')

		CrowdHound.traverse(selection, function cookDeleted(level, element, parent, next) {

	        if (element.deleted) {
	            // if (Permissions.canViewDeletedPost()) {
	            //     element.filtered = false;
	            // }
				// else {
	            if (element.userId !== _currentUserData.userId) {
	                element.filtered = true;
				}
	            // }
	        }
			return next(null);
		}, callback);
	}

	function cook_pending(params, selection, callback/*(err, updateSelection)*/) {
		//console.log('cook_pending()')
		return callback(null, selection);
	}

	function cook_abuse(params, selection, callback/*(err, updateSelection)*/) {
		//console.log('cook_abuse()')

		CrowdHound.traverse(selection, function cookAbuse(level, element, parent, next) {

	        // If this is a abuse report by the current user, hide this element
	        if (element.type === 'report-email') {
				//console.log('element is', element);
				//console.log('_currentUserData is', _currentUserData);

	            if (element.userId === _currentUserData.userId) {
	                parent.filtered = true;
	                element.filtered = true;
	            }
	        }
			return next(null);
		}, callback);
	}

	function cook_permissions(params, selection, callback/*(err, updateSelection)*/) {
		//console.log('cook_permissions()')

		CrowdHound.traverse(selection, function cookPermissions(level, element, parent, next) {

			//console.log('element is', element);
			//console.log('_currentUserData is', _currentUserData);
            //console.log('element ' + element._elementId + ': userId=' + element.userId + ', current user is ' + _currentUserData.userId);

            if (_currentUserData && element.userId === _currentUserData.userId) {
				if (!element.permission) {
					element.permission = { };
				}
                element.postPermission = true;
                element.permission.post = true;
                element.permission.edit = true;
                element.permission.restore = element.deleted;
                element.permission.delete = !element.deleted;
                element.permission.repoprtAbuse = true;
            }
			return next(null);
		}, callback);
	}

	/*
	 *	Add fields for creation and modification time, relative to now.
	 *
	 *	Values added:
	 *		element.createdDateFromNow
	 *		element.modifiedDateFromNow
	 */
	function cook_dateFromNow(params, selection, callback/*(err, updateSelection)*/) {
		//console.log('cook_dateFromNow()')

		// Requires moment.js to be on the page
		if (typeof(moment) === 'undefined') {
			console.log('Warning: cook_dateFromNow requires moment.js included on the page.')
			return callback(null, selection);
		}

		CrowdHound.traverse(selection, function cookAbuse(level, element, parent, next) {
			element.createdDateFromNow = (element.created === 0) ? ("(Unknown creation time)") : dateFromNow(element.created);
			element.modifiedDateFromNow = (element.modified === 0) ? ("(Unknown modification time)") : dateFromNow(element.modified);
			return next(null);
		}, callback);
	}

	/*
	 *	Add 'currentUser' to every element.
	 *
	 *	Values added:
	 *		element.currentUser
	 */
	function cook_currentUser(params, selection, callback/*(err, updateSelection)*/) {
		//console.log('cook_currentUser()')

		CrowdHound.traverse(selection, function cookAbuse(level, element, parent, next) {
			element.currentUser = selection.currentUser;
			return next(null);
		}, callback);
	}


	/*
	 *	Field for the number of children.
	 *
	 *	Values added:
	 *		element.childCount
	 */
	function cook_childCount(params, selection, callback/*(err, updateSelection)*/) {
		//console.log('cook_childCount()')

		CrowdHound.traverse(selection, function cookAbuse(level, element, parent, next) {
		    element.childCount = (element.children ? element.children.length : 0);
			return next(null);
		}, callback);
	}


	function getViewCount(elementIds, callback/*(err, counts)*/) {
		console.log('getViewCount(' + elementIds + ')');

		// Check the type of elementIds
		var list = '';
		if (Array.isArray(elementIds)) {
			var sep = '';
			for (var i = 0; i < elementIds.length; i++) {
				list += sep + elementIds[i];
				sep = ',';
			}
		} else {
			list = '' + elementIds; // force it to be a string
		}

		// Prepare the API call
		var url = _API_URL + '/views/' + list;
		url = addAuthenticationToken(url);
		var params = { };
		if (_config.debug) {
			console.log('   URL= ' + url)
			console.log('PARAMS=', params)
		}

		// Call the server
        $.get(url, params, function _haveViews(reply) {

			// All appears to be okay.
			return callback(null, reply);
        }, 'json')
		.fail(function(error) {

			// Error with the API call
			// alert("Error in CrowdHound.getViewCount()");
			// console.log("Error in CrowdHound.getViewCount(): ", error);
			return callback(error);
		})
    }

	function incrementViewCount(elementIds, override, callback/*(err)*/) {
		console.log('CrowdHound.incrementViewCount(' + elementIds + ', ' + override + ')');

		// Check the type of elementIds
		var list = '';
		if (Array.isArray(elementIds)) {
			var sep = '';
			for (var i = 0; i < elementIds.length; i++) {
				list += sep + elementIds[i];
				sep = ',';
			}
		} else {
			list = '' + elementIds; // force it to be a string
		}

		// Prepare the API call
		var url = _API_URL + '/views';
		url = addAuthenticationToken(url);
		var params = {
			elementIds: list,
			override: override
		};
		if (_config.debug) {
			console.log('   URL= ' + url)
			console.log('PARAMS=', params)
		}

		// Call the server
        $.post(url, params, function(reply) {

			// Successful return
			// console.log('Back from POST with ', reply);
			return callback(null, reply);
        }, 'json')
		.fail(function(error) {
			// console.log('Back from POST with an error', error);
			return callback(error);
		})

	}


	/**
	 *	Combined select, cook, render.
	 *
	 *	Variations:
	 *		1. load(params, callback)
	 *		2. load({selectParams|threadId}, renderParams [, callback])
	 *		3. load({selectParams|threadId}, selector, theme [, callback])
	 *		4. load({selectParams|threadId}, cookParams, renderParams [, callback])
	 *		5. load({selectParams|threadId}, cookParams, selector, theme [, callback])
	 */
	function load(param1, param2, param3, param4, param5, param6) {

		// Interpret the parameters
		var type1 = typeof(param1);
		var type2 = typeof(param2);
		var type3 = typeof(param3);
		var type4 = typeof(param4);
		var type5 = typeof(param5);

		var ok = false;
		if (param6) {
			// Too many parameters
		}
		else if (type1 === 'object' && (type2 == 'undefined' || (type2 === 'function' || type3 == 'undefined'))) {

			// Variation 1 - load(params, callback)
			var selectParams = param1.select;
			var cookParams = param1.cook;
			var renderParams = param1.render;

			if ( !selectParams) {
				console.log('Error: CrowdHound.load(): missing params.select');
				return;
			}
			if (!cookParams) {
				cookParams = { };
			}
			if ( !renderParams) {
				console.log('Error: CrowdHound.load(): missing params.render');
				return;
			}
			callback = param2;
			ok = true;

		}
		else if (type2 === 'object' && (type3 === 'undefined' || (type3 === 'function' && type4 === 'undefined'))) {

			// Variation 2 - load({selectParams|threadId}, renderParams, callback)
			var selectParams = param1;
			var cookParams = { };
			var renderParams = param2;
			var callback = param3;
			ok = true;

		}
		else if (type2 === 'string' && type3 === 'string' && (type4==='undefined' || (type4==='function' && type5 === 'undefined'))) {

			// Variation 3 - load({selectParams|threadId}, selector, theme [, callback])
			var selectParams = param1;
			var cookParams = { };
			var renderParams = { target: param2, theme: param3 };
			var callback = param4;
			ok = true;

		}
		else if (type2 === 'object' && type3 === 'object' && (type4 === 'undefined' || (type4 === 'function' && type5 === 'undefined'))) {

			// Variation 4 - load({selectParams|threadId}, cookParams, renderParams [, callback])
			var selectParams = param1;
			var cookParams = param2;
			var renderParams = param3;
			var callback = param4;
			ok = true;

		}
		else if (type2 === 'object' && type3 === 'string' && (type4 === 'undefined' || (type4 === 'function' && type5 === 'undefined'))) {

			// Variation 5 - load({selectParams|threadId}, cookParams, selector, theme [, callback])
			var selectParams = param1;
			var cookParams = param2;
			var renderParams = { target: param3, theme: param4 };
			var callback = param5;
			ok = true;

		}

		// Check if the selectParams type is an actual threadId rather than an object.
		if (typeof(selectParams) === 'string' || typeof(selectParams) === 'number') {
			var threadId = selectParams;
			selectParams = { elementId : threadId, withChildren: true };
		}
		if ( !ok) {
			console.log('Error: CrowdHound.load(): Invalid parameters');
			return;
		}

		// Do the selection, cooking and rendering.
		CrowdHound.select(selectParams, function(err, selection) {
			if (err) {
				console.log('Error during select: ', err);
				if (callback) return callback(err);
				return;
			}
			console.log('\nAfter select(): ', selection);

			// Now cook the data
			CrowdHound.cook(cookParams, selection, function(err, selection) {
				if (err) {
					console.log('Error during cooking: ', err);
					if (callback) return callback(err);
					return;
				}
				console.log('\nAfter cook(): ', selection);

				// Now display the data
				CrowdHound.render(renderParams, selection, function(err, selection) {
					if (err) {
						console.log('Error during display: ', err);
						if (callback) return callback(err);
						return;
					}
					console.log('\nAfter display(): ', selection);
					if (callback) return callback(null);
					return;
				})

			})
		});
	}


	/*
	 *  Update an existing element.
	 *	If an anchor and a type is provided, the element will be created
	 *	if it does not already exist.
	 */
	function update(element, callback/*(err)*/) {

		var API_URL = '//' + CROWDHOUND_HOST + ':' + CROWDHOUND_PORT + '/api/' + CROWDHOUND_VERSION + '/' + CROWDHOUND_TENANT;
		var url = API_URL + '/element';
		var url = Curia.addAuthenticationToken(url);

		console.log('url   =' + url);
		console.log('element=', element);

		$.ajax({
			type : 'PUT',
			url : url,
			data : element,
			success : function(response) {

				return callback(null);
			},
			error : function(jqxhr, textStatus, errorThrown) {
				// Failed AJAX call
				console.log('An error occurred while updating an element.\n  status: ' + jqxhr.status + "\n  responseText: ", qXHR.responseText);
				return callback(niceError(jqxhr, textStatus, errorThrown));
			}
		});
	}// update()


	/**
	 *	Return a string containing a description of a time, relative to now.
	 *	For example:
	 *		"Just now"
	 *		"10 minutes ago"
	 *		"4 hours ago"
	 *		"Yesterday at 11:00 PM"
	 *		"Thursday at 11:00 AM"
	 *		"01 Jan at 11:00 PM"
	 *		"20 Nov 2015 at 11:00 PM"
	 *
	 *	Note: using this requires that moment.js is included on the page:
	 *	<script src="/ttsvr/libs/moment-2.10.3/moment.min.js"></script>
	 */
	function dateFromNow(date){
		var fromNow = '';
		var comparison = moment.unix(date);
		if (comparison.isValid()) {
			var now = moment(new Date());

			// Minute comparison
			var dateDiff = now.diff(comparison, 'minutes');
			if (dateDiff === 0) {
				fromNow = 'Just now';
			}
			else if (dateDiff >= 1 && dateDiff <= 120) {
				fromNow = dateDiff + ' min ago';
			}

			// Hour comparison
			dateDiff = now.diff(comparison, 'hours');
			if (dateDiff >= 1 && dateDiff <= 23) {
				fromNow = dateDiff + ' hr ago';
			}

			// Day comparison
			dateDiff = now.diff(comparison, 'days');
			if (dateDiff === 1) {
				fromNow = 'Yesterday at ' + comparison.format('hh:mm A');
			}
			else if (dateDiff >= 2 && dateDiff <= 6) {
				fromNow = comparison.format('dddd') + ' at ' + comparison.format('hh:mm A');
			}
			else if (dateDiff >= 7) {
				if (now.year() === comparison.year()) {
					fromNow = comparison.format('DD MMMM') + ' at ' + comparison.format('hh:mm A');
				}
				else {
					fromNow = comparison.format('DD MMMM YYYY') + ' at ' + comparison.format('hh:mm A');
				}
			}
		}
		return fromNow;
	}

	/**
	 *	Shortcut function to show comments.
	 */
	function simpleCommentSection(config, callback) {

		var newConfig = {
			apiVersion: '2.0',
			serverUrl: 'https://auf.crowdhound.io',
			//			tenantId not defined
			debug: false,
			themes: {
				"my-theme": {
					// templates
					"wrapper": 			'/templates/comments/wrapper',
					"commentList_0": 	'/templates/comments/commentList',
					"comment_1": 		'/templates/comments/comment',
					"*_0": 				'/templates/basic/hidden',
					// extra variables passed to the templates
					"options": 	{ flat: true, textonly: true, readonly: true }
				},
			}
		};

		// Check tenantId (mandatory)
		if (config.tenantId) {
			newConfig.tenantId = config.tenantId;
		} else {
			var errmsg = 'Crowdhound.simpleComments(): TenantId not specified';
			console.log('Error: ' + errmsg);
			if (callback) {
				return callback(errmsg);
			}
			return;
		}
		// Check elementId (mandatory)
		var elementId;
		if (config.elementId) {
			elementId = config.elementId;
		} else {
			var errmsg = 'Crowdhound.simpleComments(): elementId not specified';
			console.log('Error: ' + errmsg);
			if (callback) {
				return callback(errmsg);
			}
			return;
		}

		if (config.apiVersion) {
			newConfig.apiVersion = config.apiVersion;
		}
		if (config.serverUrl) {
			newConfig.serverUrl = config.serverUrl;
		}

		// Check domSelector (optional)
		var domSelector = '#crowdhound';
		if (config.domSelector) {
			domSelector = config.domSelector;
		}

		// Check debug flag (defaults to false)
		if (config.debug) {
			newConfig.debug = config.debug;
		}

		// Check for a theme (optional)
		if (config.theme) {
			newConfig.themes['my-theme'] = config.theme;
		}

		// Initialize Crowdhound
		CrowdHound.init(newConfig);

		// Display the comments for this tutorial
		var theme = 'my-theme';
		CrowdHound.load(elementId, domSelector, theme);

		if (callback) {
			return callback(null);
		}
	}



})();

var CrowdHound = Curia;
var crowdhound = Curia;
