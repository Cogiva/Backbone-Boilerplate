
require.config({
  paths: {
    jquery: '../lib/jquery-1.7.2.min',
    jqueryui: '../lib/jquery-ui-1.10.2.custom.min',
    underscore: '../lib/underscore',
    backbone: '../lib/backbone',
    text: '../lib/text',
    templates: '../../templates',
    typeahead: '../lib/backbone.typeahead',
    utils: '../lib/utils',
    bootstrap: '../lib/bootstrap'
  },

  shim: {
        'jqueryui': {
            exports: '$',
            deps: ['jquery']
        },    
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'text': {
            deps: ['underscore'],
            exports: 'text'
        },
        'typeahead': {
            deps: ['backbone']
        },
        'utils': {
            deps: ['jquery','backbone']
        },
        'bootstrap': {
            deps: ['jquery']
        }
    }
});

require([
  'router',
  'backbone'
], function (Router, Backbone) {

    $.ajaxSetup({
        statusCode: {
            401: function(){
                // Redirec the to the login page.
                sessionStorage.removeItem("happuser");
                localStorage.removeItem("happuser");
                window.location.replace('/#/login');
             
            },
            403: function() {
                // 403 -- Access denied
                sessionStorage.errorMsg = "currentError";
                sessionStorage.removeItem("happuser");
                localStorage.removeItem("happuser");
                window.location.replace('/#/error');
            }
        }
    })
    
    /*
     * Store a version of Backbone.sync to call from the
     * modified version we create
     */
    var backboneSync = Backbone.sync;

    Backbone.sync = function (method, model, options) {
        /*
         * The jQuery `ajax` method includes a 'headers' option
         * which lets you set any headers you like
         */
            
        var theUser = JSON.parse(localStorage.getItem("happuser"));

        if (theUser === null)
        {
            theUser = JSON.parse(sessionStorage.getItem("happuser"));        
        }
        if (theUser !== null)
        {
            /*var new_options =  _.extend({
                beforeSend: function(xhr) {
                    var token = 'Bearer ' + theUser.authtoken;
                    console.log('token', token);
                    xhr.setRequestHeader('Authorization', token);
                }
            }, options) */
            options.headers = {
                /* 
                 * Set the 'Authorization' header and get the access
                 * token from the `auth` module
                 */
                'Authorization': 'Bearer ' + theUser.authtoken
            }

        }

        /*
         * Call the stored original Backbone.sync method with
         * extra headers argument added
         */
        backboneSync(method, model, options);
    };

    // Start the Router
    var happ = new Router();
    Backbone.history.start();

});
