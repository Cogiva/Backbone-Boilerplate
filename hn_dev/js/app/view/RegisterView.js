define([
  'jqueryui',
  'underscore',
  'backbone',
  'utils',

  'model/UserModel',

  'text!templates/register.html'
], function ($, _, Backbone, Utils, UserModel, RegisterTemplate) {

    var RegisterView = Backbone.View.extend({
        template: _.template(RegisterTemplate),
        el: "#singlecolumn",
        
        initialize: function (models) {
          this.utils = new Utils();
          this.render();
        },

        events: {
          "click #registersubmit" : "register",
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

       register: function(eventname) {
          var self = this;

          // Disable Button
          self.utils.disableButton($("#registersubmit"), "Registering...", true);

          if ($("#password").val() !== $("#passwordagain").val())
          {
              self.utils.sendAlert("No, no, no!", "Your passwords don't match.  Let's try that again shall we?", "error", function(){});
              self.utils.disableButton($("#registersubmit"), "Register", false);
              return false;
          }
          else if ($("#password").val() === "" || $("#username").val() === "")
          {
              self.utils.sendAlert("No, no, no!", "You have to fill out all the fields.  Let's try that again shall we?", "error", function(){});
              self.utils.disableButton($("#registersubmit"), "Register", false);
              return false;
          }
          else
          {
              var newUser = new UserModel({
                  UserName: $("#username").val(),
                  Password: $("#password").val(),
                  ConfirmPassword: $("#passwordagain").val(),
                  Email: $("#email").val()
              }).create({}, function(){
                  console.log("Success after register/auth...");
              }, function (error){
                  console.log("Error after register/auth...");
                  console.log("Error:", error);
                  self.utils.disableButton($("#registersubmit"), "Register", false)
              });
          }
          return false;
       }

    });

    return RegisterView;
});