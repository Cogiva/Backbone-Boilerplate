define([
  'jquery',
  'backbone'
], function ($, Backbone) {

    var Utils = Backbone.View.extend({

        domain: "hapnote",
        apiURL: "http://localhost:999",

        getDomain: function () {
            return this.domain;
        },

        getApiURL: function () {
            return this.apiURL;
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
            var closeTimer = 3000;
            if (type == "error") {
                $('.alert').addClass("alert-danger");
                closeTimer = 6000;
            }
            else {
                $('.alert').addClass("alert-" + type);
            }
            $('.alert').html("<h3>" + title + "</h3>" + message);
            $('.alert').slideDown();
            clearTimeout(alertClose);
            var alertClose = setTimeout(function () {
                $('.alert').slideUp(function () {
                    $('.alert').removeClass("alert-danger");
                    $('.alert').removeClass("alert-" + type);
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
            Backbone.history.navigate(url.replace("#",""), true);
            return false;
        },

        disableButton: function(button, text, state) {
            button.prop('disabled', state);
            if (state)
            {
                button.text("");
                button.html('<img src="/img/loader.gif" />');
            }
            else
            {
                button.html("");
                button.text(text);
            }
        },

        getFriendlyDate: function(compDate) {
            var month = new Array();
            month[0]="Jan";
            month[1]="Feb";
            month[2]="Mar";
            month[3]="Apr";
            month[4]="May";
            month[5]="Jun";
            month[6]="Jul";
            month[7]="Aug";
            month[8]="Sep";
            month[9]="Oct";
            month[10]="Nov";
            month[11]="Dec";

            var dayOfWeek = new Array();
            dayOfWeek[0]="Sunday";
            dayOfWeek[1]="Monday";
            dayOfWeek[2]="Tuesday";
            dayOfWeek[3]="Wednesday";
            dayOfWeek[4]="Thursday";
            dayOfWeek[5]="Friday";
            dayOfWeek[6]="Saturday";

            var today = new Date();
            var thedate = new Date(compDate);
            var _MS_PER_DAY = 1000 * 60 * 60 * 24;

            var utc1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
            var utc2 = Date.UTC(thedate.getFullYear(), thedate.getMonth(), thedate.getDate());
            var theDifference = Math.floor((utc2 - utc1) / _MS_PER_DAY);

            switch(theDifference)
            {
                case -2:
                    // return day of the week.
                    return "2 days ago";
                    break;
                case -1:
                    // return day of the week.
                    return "Yesterday";
                    break;
                case 0:
                    // return day of the week.
                    return "Today";
                    break;
                case 1:
                    // return day of the week.
                    return "Tomorrow";
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    // return day of the week.
                    return dayOfWeek[thedate.getDay()];
                    break;                
                default:
                    // check for not this year
                    var theDateText = "";
                    theDateText = thedate.getDate().toString() + " " + month[thedate.getMonth()];
                    if (thedate.getYear() !== today.getYear())
                    {
                        // show year with date
                        theDateText = theDateText + " " + thedate.getFullYear().toString().substring(2);
                    }
                    return theDateText;
                    break;
                    // return formatted date
            }
        },

        isOverdue: function(duedate, complete){
            if (complete)
            {
                return false;
            }
            var theduedate = new Date(duedate);
            theduedate.setHours(0,0,0,0);
            var today = new Date();
            today.setHours(0,0,0,0);

            if (theduedate < today)
            {
                return true;
            }
            return false;
        },

        animateRemoveListItem: function(domObject){
            domObject.slideUp(function(){
                domObject.remove();
            });
        },

        getDueDate: function(dateString){
            
            var dayOfWeek = new Array();
            dayOfWeek[0]="Sunday";
            dayOfWeek[1]="Monday";
            dayOfWeek[2]="Tuesday";
            dayOfWeek[3]="Wednesday";
            dayOfWeek[4]="Thursday";
            dayOfWeek[5]="Friday";
            dayOfWeek[6]="Saturday";

            // Parse Date
            var checkedDate = Date.parse(dateString)
            if (isNaN(checkedDate) == false)
            {
                return new Date(checkedDate);
            }

            // No date set
            if ($.trim(dateString).toLowerCase() === "")
            {
                return "";
            }

            // Check for known words
            if ($.trim(dateString).toLowerCase() === "today")
            {
                return new Date();
            }

            if ($.trim(dateString).toLowerCase() === "tomorrow")
            {
                var d = new Date(); 
                d.setDate( d.getDate() + 1 );
                return d;
            }

            if ($.trim(dateString).toLowerCase() === "yesterday")
            {
                var d = new Date(); 
                d.setDate( d.getDate() - 1 );
                return d;
            }

            // Get days of the week
            console.log("Not found it yet....")

            for (var i = 0 ; i < dayOfWeek.length; i++)
            {
                console.log("working on days of the week...")
                if ($.trim(dateString).toLowerCase() === dayOfWeek[i].toLowerCase())
                {
                    // Find Date
                    var d = new Date(); 
                    var todaysDayNumber = new Date().getDay();
                    if (todaysDayNumber === i)
                    {
                        console.log("in equals")
                        d.setDate( d.getDate() + 7 );
                        console.log(d);
                        return d;
                    }

                    if (todaysDayNumber < i)
                    {
                        console.log("in gt")
                        d.setDate( d.getDate() + (i - todaysDayNumber));
                        console.log(d);
                        return d;
                    }

                    if (todaysDayNumber > i)
                    {
                        console.log("in lt")
                        d.setDate( d.getDate() + (7 - todaysDayNumber + i));
                        console.log(d);
                        return d;
                    }
                    break;
                }
            }
        },

        getRecurrence: function(dateString){
            return '{"RecDays":"0000000", "RecInterval":"0", "RecMonthDate":"0", "RecMonthOfYear":"0", "RecType":"n", "RecWeekOfMonth":"0" }';
        },

        getCurrentUser: function(){
            var user = sessionStorage.getItem("happuser");
          
            if (user === null)
            {
                user = localStorage.getItem("happuser");
            }

            if (user !== null)
            {
                return JSON.parse(user);
            }
            return user;
        },

        setMenus: function(loggedin){
            if (loggedin)
            {
                $('.navbar-nav.loggedin').removeClass('item-hidden');
                $('.navbar-nav.notloggedin').addClass('item-hidden');
            }
            else
            {
                $('.navbar-nav.loggedin').addClass('item-hidden');
                $('.navbar-nav.notloggedin').removeClass('item-hidden');                
            }
        }

    });

    return Utils;

});