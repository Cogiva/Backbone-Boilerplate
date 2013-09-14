// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file
  deps: ["main"],

  paths: {

    // JavaScript folders
    libs: "../js/libs",
    plugins: "../js/plugins",

    // Libraries
    jquery: "../js/libs/jquery",
    underscore: "../js/libs/underscore",
    backbone: "../js/libs/backbone"
  },
});
