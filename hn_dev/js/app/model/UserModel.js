define([
  'jquery',
  'underscore',
  'backbone',
  'utils'
], function($, _, Backbone, Utils){

    var UserModel = Backbone.Model.extend({

	    create: function(options, successcallback, errorcallback) {
	      	var model = this;
	      	console.log("Creating user...");
	      	$.ajax({
		        url: sessionStorage.apiURL + '/api/Account/Register',
		        type: 'POST',
		        dataType: 'json',
		        data: model.toJSON(),
		        success: function(object, status) {
		        	model.auth("session", successcallback, errorcallback);
              		console.log("Successful Create...Now to auth...");
		        },
		        error: function(xhr, status, error) {
              		console.log("Error on Create...");
              		console.log("xhr", xhr);
              		console.log("status", status);
              		console.log("error", error);
              		errorcallback;
		        }
	    	});
        },

	    update: function(options)
	    {

	    },

	    remove: function(callback){
			var model = this;
            // Get Auth Token
            var theUser = JSON.parse(localStorage.getItem("happuser"));

	        if (theUser === null)
	        {
	            theUser = JSON.parse(sessionStorage.getItem("happuser"));        
	        }

	      	console.log("model to logout:", model);
	      	$.ajax({
		        url: sessionStorage.apiURL + '/api/Account/Logout',
		        type: 'POST',
				beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + theUser.authtoken); },
		        success: function(object, status) {
		        	// Add user to session
	      			callback();
		        },
		        error: function(xhr, status, error) {
		        	var utils = new Utils();
                	utils.sendAlert("Uh-Oh! Houston we have a problem.",  "Seems that the machine's don't like!  We've sorted it and logged you out.", "error", function(){}); 
	      			callback();
		        }
	    	});

            callback();
	    },

	    auth: function(options, successcallback, errorcallback){	    	
	      	var model = this;
	      	var theData = 'grant_type=password&username=' + model.get("UserName") + '&password=' + model.get("Password");
	      	$.ajax({
		        url: sessionStorage.apiURL + '/Token',
		        type: 'POST',
		        data: theData,
		        success: function(object, status) {
		        	// Add user to session
		        	if (options === "session")
		        	{
                  		sessionStorage.happuser = '{"username":"' + object.userName + '", "authtoken" : "' + object.access_token + '"}';
		        	}
		        	else
		        	{
                  		localStorage.happuser = '{"username":"' + object.userName + '", "authtoken" : "' + object.access_token + '"}';
		        	}
              		console.log("Success on auth...");
	      			successcallback();
		        },
		        error: function(xhr, status, error) {
		        	var utils = new Utils();
              		console.log("Error on auth...");
              		console.log("xhr", xhr);
              		console.log("status", status);
              		console.log("error", error);
                	utils.sendAlert("Uh-Oh! Houston we have a problem.",  "Seems that the machine's don't like!  Either that or you've entered the wrong username and password in!  Give it another go....", "error", function(){}); 
	      			errorcallback(error);
		        }
	    	});
	    }
    });

    return UserModel;

});
