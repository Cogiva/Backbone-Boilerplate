define([
  'jqueryui',
  'underscore',
  'backbone',
  'utils',
  'kinvey',

  'text!templates/home.html'
], function ($, _, Backbone, Utils, Kinvey, HomeTemplate) {

    var HomeView = Backbone.View.extend({
        template: _.template(HomeTemplate),
        el: "#contentitems",
        
        initialize: function (models) {
          this.utils = new Utils();
          this.render();
        },

        events: {
          "click #loginsubmit" : "login"
        },

        render: function () {
            $(this.el).html(this.template());
       },

       login: function(eventname) {
          var self = this;
          var user = new Kinvey.Backbone.User();
          var promise = user.login({
              username : $('#username').val(),
              password : $('#password').val()
          }, {
              success: function(model, response, options) {
                  self.utils.sendAlert("User Login", "Yay! We've got you. Loading lists...", "success", function(){
                    window.location = "/#/user/" + user.attributes.username;
                  });
              },
              error: function(model, response, options){
                  self.utils.sendAlert("Uh-Oh! Houston we have a problem.",  response.description, "error", function(){});
                  return false;
              }
          });
          return false;
       }

    });

    return HomeView;
});