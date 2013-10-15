define([
  'jqueryui',
  'underscore',
  'backbone',
  'utils',
  'kinvey',

  'text!templates/register.html'
], function ($, _, Backbone, Utils, Kinvey, RegisterTemplate) {

    var RegisterView = Backbone.View.extend({
        template: _.template(RegisterTemplate),
        el: "#contentitems",
        
        initialize: function (models) {
          this.utils = new Utils();
          this.render();
        },

        events: {
          "click #registersubmit" : "register"
        },

        render: function () {
            $(this.el).html(this.template());
       },

       register: function(eventname) {
          var self = this;
          if ($("#password").val() !== $("#passwordagain").val())
          {
              self.utils.sendAlert("No, no, no!", "Your passwords don't match.  Let's try that again shall we?", "error", function(){});
              return false;
          }
          else if ($("#password").val() === "" || $("#username").val() === "")
          {
              self.utils.sendAlert("No, no, no!", "You have to fill out all the fields.  Let's try that again shall we?", "error", function(){});
              return false;
          }
          else
          {
            var user = new Kinvey.Backbone.User();
            var promise = user.save({
                username : $('#username').val(),
                password : $('#password').val(),
                email : $('#email').val()
            }, {
                success: function(model, response, options) {
                    self.utils.sendAlert("User Registration", "Yay!  You're all sorted. Loading...","success", function(){
                      window.location = "/#/user/" + user.attributes.username;
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

    return RegisterView;
});