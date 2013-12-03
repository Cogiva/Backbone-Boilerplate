define([
  'jqueryui',
  'underscore',
  'backbone',
  'utils',

  'text!templates/forgottenpassword.html'
], function ($, _, Backbone, Utils, ForgottenpasswordTemplate) {

    var ResetView = Backbone.View.extend({
        template: _.template(ForgottenpasswordTemplate),
        el: "#singlecolumn",
        
        initialize: function (models) {
          this.utils = new Utils();
          this.render();
        },

        events: {
          "click #resetsubmit" : "reset",
          "click a": "redirectLinks"
        },

        redirectLinks: function (e) {
            e.preventDefault();

            // Get clicked items href!!
            var href = $(e.currentTarget).data("href");
            this.utils.navigate(href);
            return false;
        },
        
      render: function () {
            $(this.el).html(this.template());
       },

       reset: function(eventname) {
          var self = this;
          self.utils.disableButton($("#resetsubmit"), "Sending Email...", true);

          if ($("#username").val() === "")
          {
              self.utils.sendAlert("No, no, no!", "You have to fill out all the username.  Let's try that again shall we?", "error", function(){});
              self.utils.disableButton($("#resetsubmit"), "Send Reset Email...", false);
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
                    self.utils.disableButton($("#resetsubmit"), "Send Reset Email...", false);
                    return false;
                }
            });            
          }
          return false;
       }

    });

    return ResetView;
});