define([
  'jqueryui',
  'underscore',
  'backbone',
  'utils',
  'kinvey',

  'text!templates/forgottenpassword.html'
], function ($, _, Backbone, Utils, Kinvey, ForgottenpasswordTemplate) {

    var ResetView = Backbone.View.extend({
        template: _.template(ForgottenpasswordTemplate),
        el: "#contentitems",
        
        initialize: function (models) {
          this.utils = new Utils();
          this.render();
        },

        events: {
          "click #resetsubmit" : "reset"
        },

        render: function () {
            $(this.el).html(this.template());
       },

       reset: function(eventname) {
          var self = this;
          if ($("#username").val() === "")
          {
              self.utils.sendAlert("No, no, no!", "You have to fill out all the username.  Let's try that again shall we?", "error", function(){});
              return false;
          }
          else
          {
            var promise = Kinvey.Backbone.User.resetPassword('username', {
                success: function() {
                    self.utils.sendAlert("Password Reset", "We've sent you the email.  The reset code only lasts 20 minutes, so hop to it!","success", function(){
                      window.location = "/#/";
                    });                
                },
                error: function(model, response, options){
                    self.utils.sendAlert("Uh-Oh! Houston we have a problem. ", response.description, "error", function(){});
                    return false;
                }
            });            
          }
          return false;
       }

    });

    return ResetView;
});