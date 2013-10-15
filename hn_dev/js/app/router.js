
define([
  'jquery',
  'underscore',
  'backbone',
  'utils',
  'kinvey',

  /* MODELS / COLLECTIONS */

  /* VIEWS */
  'view/HomeView',
  'view/RegisterView',
  'view/MainView',
  'view/ResetView'

], function($, _, Backbone, Utils, Kinvey, HomeView, RegisterView, MainView, ResetView){
    
    // Ensures that the user is logged in before proceeding with the
    // `originalRoute`.


    // Router
    var  AppRouter = Backbone.Router.extend({
        
        routes: {
            "": "home",
            "register":"register",
            "user/:username": "main",
            "forgotten-password": "reset",
            "error/:errortext": "error"            
        },

        initialize: function () {
            this.utils = new Utils();
        },

        showLoading: function() {
            $("#loadingicon").removeClass("item-hidden");
        },

        hideLoading: function() {
            $("#loadingicon").addClass("item-hidden");
        },

        ensureLogin: function(originalRoute) {
          var user = Kinvey.Backbone.getActiveUser();

          if(null !== user) {
            originalRoute();
          }
          else
          {
            var homeView = new HomeView();
            homeView.on('render', this.hideLoading());
          }      
        },

        confirmNotLoggedIn: function(originalRoute) {
          var user = Kinvey.Backbone.getActiveUser();

          if(null !== user) {
              window.location = "/#/user/" + user.attributes.username;
          }
          else
          {
              originalRoute();
          }      
        },

        home: function (eventname)
        {
            var self = this;
            this.showLoading();
            this.confirmNotLoggedIn(function(){
                var homeView = new HomeView();
                homeView.on('render', self.hideLoading());
            });
        }, 

        register: function(eventname) {
            var self = this;
            this.showLoading();
            this.confirmNotLoggedIn(function(){
                var registerView = new RegisterView();
                registerView.on('render', self.hideLoading());
            });
        },

        main: function(user){
            var self = this;
            this.showLoading();
            this.ensureLogin(function(){
                var mainView = new MainView({username: user});
                mainView.on('render', self.hideLoading());
            });
        },

        reset: function(){
            this.showLoading();
            var resetView = new ResetView();
            resetView.on('render', this.hideLoading());
        },

        error: function (theerror) {
            this.utils.sendAlert("Uh-Oh! It seems there's strange things afoot at Circle K!\n<em>Error: " + theerror + "<em>", "error");
        }    

    });

    return AppRouter;

});