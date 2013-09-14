// This is the main entry point for the App
define(['routers/home', 'appacitive'], function(router, Appacitive){
    var init = function () {

        // Set up appacitive
        Appacitive.session.environment = 'sandbox';
        Appacitive.session.create({
            apikey: '+5IBavQ8V3SeD6SPoNJnSM8dOx6QYTyvHRw8EKZJDKE='
        });

        Appacitive.eventManager.subscribe('session.success', function () {
            $('#divSession').hide();
            $('#divStatus').html('Session created successfully');
        })

        Appacitive.eventManager.subscribe('session.error', function () {
            $('#divSession').hide();
            $('#divStatus').html('Session creation failed');
        })

		this.router = new router();
	};
	
	return { init: init};
});
