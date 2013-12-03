define([
  'jqueryui',
  'underscore',
  'backbone',
  'utils',
  'stackmob',

  'text!templates/main.html'
], function ($, _, Backbone, Utils, Stackmob, MainTemplate) {

    var MainView = Backbone.View.extend({
        template: _.template(MainTemplate),
        el: "#contentitems",
        
        initialize: function (models) {
          this.utils = new Utils();
          this.username = models.username;
          this.render();
        },

        events: {
          "click #logoutsubmit" : "logout"
        },

        render: function () {
            $(this.el).html(this.template({theuser: this.username}));
        },

        logout: function(eventname) {
          var self = this;
          var user = Kinvey.Backbone.getActiveUser();
          if(null !== user) {
              var promise = user.logout({
                  force: true,                
                  success: function(model, response, options) {

                      self.utils.sendAlert("Logout", "Fine, leave! See if I care.", "success", function(){   
                        window.location = "/#/";
                      });
                  },
                  error: function(model, response, options){
                      self.utils.sendAlert("Uh-Oh! Houston we have a problem. ", response.description, "error", function(){});
                  }                  
              });
          }
          return false;
        }

    });

    return MainView;
});