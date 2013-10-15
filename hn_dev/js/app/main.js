
require.config({
  paths: {
    jquery: '../lib/jquery-1.7.2.min',
    jqueryui: '../lib/jquery-ui-1.10.2.custom.min',
    underscore: '../lib/underscore',
    backbone: '../lib/backbone',
    backboneAssociations: '../lib/backbone-associations',
    text: '../lib/text',
    templates: '../../templates',
    typeahead: '../lib/backbone.typeahead',
    utils: '../lib/utils',
    kinvey: '../lib/kinvey'
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
        'backboneAssociations': {
            deps: ['jquery', 'backbone'],
            exports: 'backboneAssociations'
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
        'kinvey': {
            deps: ['jquery', 'underscore', 'backbone']
        }
    }
});

require([
  'jquery',
  'underscore',
  'backbone',
  'backboneAssociations',
  'kinvey',
  'router'
], function ($, _, Backbone, BackboneAssociations, Kinvey, Router) {

    window.KINVEY_DEBUG = true;

    var promise = Kinvey.init({
        appKey    : 'kid_eVObLFpuOO',
        appSecret : 'd4440bd4344f482fbb633894f87c8e4b'
    });

    promise.then(function(activeUser) {

        // Start the Router
        var app = new Router();
        Backbone.history.start();

    }, function(error) {
        
        // Start the Router
        var app = new Router();
        Backbone.history.start();

        //redirect to error page
        windows.location("/#/error/" + error.description);
    });

});
