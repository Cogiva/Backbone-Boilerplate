({
    appDir: "../hn_dev",
    baseUrl: "js/app/",
    dir: "../../../Apps/KISSr/hapnote.kissr.com",

    //Comment out the optimize line if you want
    //the code minified by UglifyJS
    optimize: "uglify",
    skipDirOptimize: false,
    optimizeCss: "standard",

    paths: {
        "jquery": "../lib/jquery-1.7.2.min",
        "jqueryui": "../lib/jquery-ui-1.10.2.custom.min",
        "underscore": "../lib/underscore",
        "backbone": "../lib/backbone",
        "backboneAssociations": "../lib/backbone-associations",
        "text": "../lib/text",
        "templates": "../../templates",
        "typeahead": "../lib/backbone.typeahead",
        "utils": "../lib/utils",
        "kinvey": "../lib/kinvey"

    },

    modules: [
        //Optimize the require-jquery.js file by applying any minification
        //that is desired via the optimize: setting above.
        {
            name: "../lib/require"
        },

        {
            name: "main"
        }
    ]
})