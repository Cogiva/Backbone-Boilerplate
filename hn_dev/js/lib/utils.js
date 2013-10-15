define([
  'jquery',
  'backbone'
], function ($, Backbone) {

    var Utils = Backbone.View.extend({

        domain: "cratetrack",

        getDomain: function () {
            return this.domain;
        },

        offSetDate: function (noOfDays) {
            var newDate = new Date();
            newDate.setDate(newDate.getDate() + (noOfDays));
            return newDate;
        },

        createCookie: function (name, value, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            }
            else var expires = "";
            document.cookie = name + "=" + value + expires + "; path=/";
        },

        readCookie: function (c_name) {
            if (document.cookie.length > 0) {
                c_start = document.cookie.indexOf(c_name + "=");
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1;
                    c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1) {
                        c_end = document.cookie.length;
                    }
                    return unescape(document.cookie.substring(c_start, c_end));
                }
            }
            return "";
        },

        deleteCookie: function(c_name){
            if (this.readCookie(c_name)) {
                document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            }
        },

        sendAlert: function (title, message, type, callback) {
            var closeTimer = 2000;
            if (type == "error") {
                $('.alert').addClass("alert-error");
                closeTimer = 5000;
            }
            else {
                $('.alert').addClass("alert-success");
            }
            $('.alert').html("<h3>" + title + "</h3>" + message);
            $('.alert').slideDown();
            clearTimeout(alertClose);
            var alertClose = setTimeout(function () {
                $('.alert').slideUp(function () {
                    $('.alert').removeClass("alert-error");
                    $('.alert').removeClass("alert-success");
                    callback();
                });
            }, closeTimer);
        },

        sendConfirm: function (message) {
            if (confirm(message)) {
                return true;
            }
            else {
                return true;
            }
        },

        navigate: function (url) {
            window.location = url;
        }

    });

    return Utils;

});