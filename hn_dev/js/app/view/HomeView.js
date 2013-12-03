define([
  'jqueryui',
  'underscore',
  'backbone',
  'utils',

  'model/UserModel',

  'text!templates/home.html'
], function ($, _, Backbone, Utils, UserModel, HomeTemplate) {

    var HomeView = Backbone.View.extend({
        template: _.template(HomeTemplate),
        el: "#singlecolumn",
        
        initialize: function (models) {
          this.utils = new Utils();
          this.render();
        },

        events: {
          "click #loginsubmit" : "login",
          "click #persist":"setpersist",
          "click a": "redirectLinks"
        },

        redirectLinks: function (e) {
            e.preventDefault();

            // Get clicked items href!!
            var href = $(e.currentTarget).data("href");
            this.utils.navigate(href);
            return false;
        },

        setpersist: function()
        {
            if ($('#persist.css-checkbox').prop('checked'))
            {
              $('#persist.css-checkbox').prop('checked', false);            
            }
            else
            {
              $('#persist.css-checkbox').prop('checked', true);            
            }
        },

        render: function () {
            console.log("Rendering....");             
            $(this.el).html(this.template());
        },

         login: function(eventname) {
            eventname.preventDefault();
            var self = this;

            // Disable Button
            self.utils.disableButton($("#loginsubmit"), "Logging in...", true)

            // Check fields
            if ($("#username").val() !== "" && $("#password").val() !== "")
            {
                // Send token request
                var storageType = "session";
                if ($('#persist.css-checkbox').prop('checked'))
                {
                    storageType = "local";
                }
                var pseudoUser = new UserModel({
                  UserName: $("#username").val(),
                  Password: $("#password").val()
                }).auth(storageType, function(){
                    console.log("Success after auth...");
                    self.utils.navigate("/#/lists");
                }, function(error){
                    console.log("Error after auth...");
                    console.log("Error:", error);
                    self.utils.disableButton($("#loginsubmit"), "Login", false)
                });

              
            }
            else
            {
                self.utils.sendAlert("Uh-Oh! Houston we have a problem.",  "Please enter both a username and a password!", "error", function(){}); 
                self.utils.disableButton($("#loginsubmit"), "Login", false)
            }
            return false;
         }

    });

    return HomeView;
});