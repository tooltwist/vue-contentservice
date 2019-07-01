

Our objective is to allow SASS to be used to define and customize styles
here in the package, by any application that uses the package, and also
by any package that uses this package (e.g. vue-formservice).

1. We do not use SASS in our Vue components because it gets resolved into
   CSS at the time this library gets bundled. This would cause the styles
   to be hard-baked into each of our widgets.

2. Our default styles DO get baked into dist/vue-contentservice.css when the
   bundle gets built. Applications using this bundle can use this CSS file
   to get the default styling. These styles also get used as we test here.

3. Applications wishing to customise our styling may do so by creating their
   own SASS file (e.g. contentservice+overrides.scss) to:
   (a) Set their own versions of the SASS variables we use.
   (b) @import '~/vue-contentservice/src/assets/css/vue-contentservice.scss'
   (c) Override any of the CSS class definitions used by our widgets.
