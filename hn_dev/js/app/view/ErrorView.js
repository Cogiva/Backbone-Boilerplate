define([
  'jqueryui',
  'underscore',
  'backbone',
  'utils',

  'text!templates/error.html'
], function ($, _, Backbone, Utils, ErrorTemplate) {

    var ErrorView = Backbone.View.extend({
        template: _.template(ErrorTemplate),
        el: "#singlecolumn",
        
        initialize: function (models) {
          this.utils = new Utils();
          this.render();
        },


        render: function () {
            $(this.el).html(this.template());
       }

    });

    return ErrorView;
});