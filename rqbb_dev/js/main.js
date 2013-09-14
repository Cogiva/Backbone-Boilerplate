// This set's up the module paths for underscore and backbone
require.config({ 
    'paths': { 
		"underscore": "libs/underscore-min", 
		"backbone": "libs/backbone-min",
        "appacitive" : "libs/appacitive"
	},
	'shim': 
	{
		backbone: {
			'deps': ['jquery', 'underscore'],
			'exports': 'Backbone'
		},

		underscore: {
			'exports': '_'
		},

		appacitive: {
		    'deps': ['jquery'],
            'exports': 'Appacitive'
		}
	}	
}); 

require([
	'underscore',
	'backbone',
	'appacitive',
    'app'
    
	], 
	function(_, Backbone, Appacitive, app){
		app.init();
});
