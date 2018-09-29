// This file contains definitions of the components
// that may be dragged onto a page layout.

// Icons:
// https://fontawesome.com/v4.7.0/icons/
// https://fontawesome.com/v4.7.0/cheatsheet/

export default [

  // Section
  {
    dragtype:'component',
    name: 'section',
    iconClass: 'fa-arrows-v fa',
    iconClass5: 'fas fa-arrows-alt-v',

    element: {
      type: 'section',
    },

    // Identical structure to a CUT or COPY from edit mode.
    data: {
      type: "contentservice.io",
      version: "1.0",
      source: "toolbox",
      layout: {
        type: 'section',
      }
    },
  },

  // Container
  {
    dragtype:'component',
    name: 'container',
    iconClass: 'fa-arrows-h',
    iconClass5: 'fas fa-arrows-alt-h',
    element: {
      type: 'container',
    },

    // Identical structure to a CUT or COPY from edit mode.
    data: {
      type: "contentservice.io",
      version: "1.0",
      source: "toolbox",
      layout: {
        type: 'container',
      }
    }

  },

  // FixedPositionContainer
  {
    dragtype:'component',
    name: 'fixed-position-container',
    iconClass: 'fa-arrows-h',
    iconClass5: 'fas fa-arrows-alt-h',
    element: {
      type: 'fixed-position-container',
    },

    // Identical structure to a CUT or COPY from edit mode.
    data: {
      type: "contentservice.io",
      version: "1.0",
      source: "toolbox",
      layout: {
        type: 'fixed-position-container',
      }
    }
  },

  // Card
  /*
  {
    dragtype:'component',
    name: 'card',
    iconClass: 'fa-arrows-h',
    iconClass5: 'fas fa-arrows-alt-h',
    element: {
      type: 'card',
    },

    // Identical structure to a CUT or COPY from edit mode.
    data: {
      type: "contentservice.io",
      version: "1.0",
      source: "toolbox",
      layout: {
        type: 'card',
      }
    }

  },
  */

  // Columns
  {
    dragtype: 'component',
    name: 'columns',
    //iconClass: [ 'fa-bars', 'fa-rotate-90' ],
    iconClass: 'fa-columns',
    iconClass5: 'fa-columns',
    element: {
      type: 'columns',
      children: [
        {
          // Column 1
          children: [ ]
        },
        {
          // Column 2
          children: [ ]
        }
      ]
    },

    // Identical structure to a CUT or COPY from edit mode.
    data: {
      type: "contentservice.io",
      version: "1.0",
      source: "toolbox",
      layout: {
        type: 'columns',
        children: [
          {
            // Column 1
            children: [ ]
          },
          {
            // Column 2
            children: [ ]
          }
        ]
      }
    }
  },

  // Text element
  {
    dragtype:'component',
    name: 'text',
    iconClass: 'fa-font',
    iconClass5: 'fa-font',
    element: {
      // type: 'text',
      type: 'froala',
      text: 'Lorem ipsum dolor sit amet, purus metus congue morbi hac elit id.',
    },

    // Identical structure to a CUT or COPY from edit mode.
    data: {
      type: "contentservice.io",
      version: "1.0",
      source: "toolbox",
      layout: {
        type: 'froala',
        text: 'Lorem ipsum dolor sit amet, purus metus congue morbi hac elit id.',
      }
    }
  },

  // Form
  //  fa-list-ul
  //  fa-server
  //  fa-list-alt
  //  fa-list-ol
  // {
  //   dragtype: 'component',
  //   name: 'form',
  //   iconClass: 'fa-list-ul',
  //   iconClass5: 'fa-list-ul',
  //   element: {
  //     type: 'form',
  //     children: [ ],
  //   },
  // },

  // Field
  // fa-ellipsis-h
  // fa-edit
  // fa-keyboard-o
  // fa-minus
  // fa-pencil-square-o
  // fa-tasks
  // fa-window-minimize
  // fa-terminal
  // fa-square-o
  // fa-picture-o
  // {
  //   dragtype:'component',
  //   name: 'form field',
  //   iconClass: 'fa-ellipsis-h',
  //   iconClass5: 'fa-ellipsis-h',
  //   element: {
  //     type: 'field',
  //     label: 'Label',
  //     placeholder: '',
  //     help: '',
  //   }
  // },

  // Intellidox
  // fa-ellipsis-h
  // fa-edit
  // fa-keyboard-o
  // fa-minus
  // fa-pencil-square-o
  // fa-tasks
  // fa-window-minimize
  // fa-terminal
  // fa-square-o
  // fa-picture-o


  // {
  //   dragtype:'component',
  //   name: 'intellidox',
  //   iconClass: 'fa-wpforms',
  //   iconClass5: 'fab fa-wpforms',
  //   element: {
  //     type: 'ix',
  //     label: 'First Name',
  //     placeholder: 'First name',
  //     help: 'Enter your first name',
  //   }
  // },

  // {
  //   dragtype:'component',
  //   name: 'documents',
  //   // iconClass: 'fa-wpforms',
  //   iconClass: 'fa-copy',
  //   iconClass5: 'fa-copy',
  //   element: {
  //     type: 'documents',
  //     documents: [
  //       {
  //         type: 'document',
  //         doctype: 'gsheet',
  //         name: 'Margins and overhead calculations'
  //       },
  //       {
  //         type: 'document',
  //         doctype: 'gdoc',
  //         name: 'Non-disclosure Agreement'
  //       },
  //       {
  //         type: 'document',
  //         doctype: 'gsheet',
  //         name: 'March estimates'
  //       },
  //       {
  //         type: 'document',
  //         doctype: 'gsheet',
  //         name: 'April estimates'
  //       },
  //     ]
  //   }
  // },

  // Google slides
  {
    dragtype:'component',
    name: 'Slides',
    iconClass: 'fa fa-file-powerpoint-o',
    iconClass5: 'far fa-file-powerpoint',
    element: {
      type: 'google-slides',
      //docId: '2PACX-1vT14-yIpiY4EbQN0XscNBhMuJDZ-k4n03-cWPEgK_kyCTP35ehchuWiPDrTq2TIGYl6nFToRGQRJXZl'
    },

    // Identical structure to a CUT or COPY from edit mode.
    data: {
      type: "contentservice.io",
      version: "1.0",
      source: "toolbox",
      layout: {
        type: 'google-slides',
        //docId: '2PACX-1vT14-yIpiY4EbQN0XscNBhMuJDZ-k4n03-cWPEgK_kyCTP35ehchuWiPDrTq2TIGYl6nFToRGQRJXZl'
      }
    }
  },

  // Google sheets
  {
    dragtype:'component',
    name: 'Sheets',
    iconClass: 'fa fa-file-excel-o',
    iconClass5: 'far fa-file-excel',
    // element: {
    //   type: 'google-sheets',
    //   //docId: '2PACX-1vT14-yIpiY4EbQN0XscNBhMuJDZ-k4n03-cWPEgK_kyCTP35ehchuWiPDrTq2TIGYl6nFToRGQRJXZl'
    // },

    // Identical structure to a CUT or COPY from edit mode.
    data: {
      type: "contentservice.io",
      version: "1.0",
      source: "toolbox",
      layout: {
        type: 'google-sheets',
        //docId: '2PACX-1vT14-yIpiY4EbQN0XscNBhMuJDZ-k4n03-cWPEgK_kyCTP35ehchuWiPDrTq2TIGYl6nFToRGQRJXZl'
      }
    }
  },

  // Google docs
  {
    dragtype:'component',
    name: 'Doc',
    iconClass: 'fa fa-file-word-o',
    iconClass5: 'far fa-file-word',
    // element: {
    //   type: 'google-sheets',
    //   //docId: '2PACX-1vT14-yIpiY4EbQN0XscNBhMuJDZ-k4n03-cWPEgK_kyCTP35ehchuWiPDrTq2TIGYl6nFToRGQRJXZl'
    // },

    // Identical structure to a CUT or COPY from edit mode.
    data: {
      type: "contentservice.io",
      version: "1.0",
      source: "toolbox",
      layout: {
        type: 'google-docs',
        //docId: '2PACX-1vT14-yIpiY4EbQN0XscNBhMuJDZ-k4n03-cWPEgK_kyCTP35ehchuWiPDrTq2TIGYl6nFToRGQRJXZl'
      }
    }
  },

  // Youtube
  {
    dragtype:'component',
    name: 'Youtube',
    iconClass: 'fa fa-youtube',
    iconClass5: 'fab fa-youtube',
    // element: {
    //   type: 'google-sheets',
    //   //docId: '2PACX-1vT14-yIpiY4EbQN0XscNBhMuJDZ-k4n03-cWPEgK_kyCTP35ehchuWiPDrTq2TIGYl6nFToRGQRJXZl'
    // },

    // Identical structure to a CUT or COPY from edit mode.
    data: {
      type: "contentservice.io",
      version: "1.0",
      source: "toolbox",
      layout: {
        type: 'youtube',
        //docId: '2PACX-1vT14-yIpiY4EbQN0XscNBhMuJDZ-k4n03-cWPEgK_kyCTP35ehchuWiPDrTq2TIGYl6nFToRGQRJXZl'
      }
    }
  },

  // Vimeo
  {
    dragtype:'component',
    name: 'Vimeo',
    iconClass: 'fa fa-vimeo',
    iconClass5: 'fab fa-vimeo',
    // element: {
    //   type: 'google-sheets',
    //   //docId: '2PACX-1vT14-yIpiY4EbQN0XscNBhMuJDZ-k4n03-cWPEgK_kyCTP35ehchuWiPDrTq2TIGYl6nFToRGQRJXZl'
    // },

    // Identical structure to a CUT or COPY from edit mode.
    data: {
      type: "contentservice.io",
      version: "1.0",
      source: "toolbox",
      layout: {
        type: 'vimeo',
        //docId: '2PACX-1vT14-yIpiY4EbQN0XscNBhMuJDZ-k4n03-cWPEgK_kyCTP35ehchuWiPDrTq2TIGYl6nFToRGQRJXZl'
      }
    }
  },

]
