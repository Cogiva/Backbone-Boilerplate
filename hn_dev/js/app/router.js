
define([
  'jquery',
  'underscore',
  'backbone',
  'utils',
  'bootstrap',

  /* MODELS / COLLECTIONS */
  'model/UserModel',

  /* VIEWS */
  'view/HomeView',
  'view/RegisterView',
  'view/ResetView',
  'view/ErrorView'

], function ($, _, Backbone, Utils, Bootstrap, UserModel, HomeView, RegisterView, ResetView, ErrorView){
    
    // Router
    var  AppRouter = Backbone.Router.extend({
        
        routes: {
            "": "home",
            "login": "home",
            "user/:username": "mainredirect",
            "register":"register",
            "forgotten-password": "reset",
            "error": "error",
            "logout": "logout",
        },

        initialize: function () {
            this.utils = new Utils();
        },

        showLoading: function() {
            console.log("Showing loader....");             
            $("#loadingicon").removeClass("item-hidden");
        },

        hideLoading: function() {
            console.log("Hiding loader....");             
            $("#loadingicon").addClass("item-hidden");
        },

        clearColumns: function (columns)
        {
            switch (columns)
            {
                case 2:
                  $('#singlecolumn').empty();
                  $('#singlecolumn').addClass('item-hidden');
                  $('#contentlists').empty();
                  $('#contentlists').removeClass('item-hidden');
                  $('#contentitems').empty();
                  $('#contentitems').removeClass('item-hidden');
                  break;                  
                default:
                  $('#singlecolumn').empty();
                  $('#singlecolumn').removeClass('item-hidden');
                  $('#contentlists').empty();
                  $('#contentlists').addClass('item-hidden');
                  $('#contentitems').empty();
                  $('#contentitems').addClass('item-hidden');
                  break;
            }

        },

        ensureLogin: function(originalRoute) {
          var user = this.utils.getCurrentUser();

          if(null !== user) {
            originalRoute();
          }
          else
          {
              window.location = "/#/login";
          }      
        },

        confirmNotLoggedIn: function(originalRoute) {
          var user = this.utils.getCurrentUser();

          if(null !== user) {
              window.location = "/#/user/" + user.username;
          }
          else
          {
              originalRoute();
          }      
        },

        logout: function(){
            var self = this;

            // Clear Collections

            // Clear Session and LocalStorage            
            var currentUser = new UserModel().remove(function(){
              sessionStorage.removeItem("happuser");
              localStorage.removeItem("happuser");
              self.utils.navigate("/#/login");
              self.utils.sendAlert("Logout","Leaving so soon.  Was it something we said?", "success",function(){});
              self.utils.setMenus(false);
            });
        },

        home: function (eventname){
            this.clearColumns(1);
            var self = this;
            this.showLoading();
            this.confirmNotLoggedIn(function(){    
                console.log("In the login view create....");             
                self.utils.setMenus(false);
                var homeView = new HomeView();
                console.log("After render....");             
                homeView.on('render', self.hideLoading());
            });
        }, 

        register: function(eventname) {
            this.clearColumns(1);
            var self = this;
            this.showLoading();
            this.confirmNotLoggedIn(function(){
                self.utils.setMenus(false);
                var registerView = new RegisterView();
                registerView.on('render', self.hideLoading());
            });
        },

        mainredirect: function(user){

        },

        main: function(listid){       
            this.clearColumns(2);
            var self = this;     
            // clear page and set to loading...
            $('#contentitems').empty();
            self.showLoading();

            this.ensureLogin(function(){
                             
            });
        },

        reset: function(){
            this.clearColumns(1);
            this.showLoading();
            var resetView = new ResetView();
            resetView.on('render', this.hideLoading());
        },

        error: function (theerror) {
            this.clearColumns(1);
            var self = this;
            this.showLoading();
            this.confirmNotLoggedIn(function(){
                self.utils.setMenus(false);
                var errorView = new ErrorView();
                errorView.on('render', self.hideLoading());
            });
        },

        fetchCollections: function (callback){
            var self = this;
            this.ensureLogin(function(){
                             
            });          
        }

    });

    return AppRouter;

});