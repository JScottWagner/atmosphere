define(['backbone'], function(Backbone) {
    var Router = Backbone.Router.extend({
        routes: {
            "": "handleDefaultRoute"
        },
        initialize: function(options) {
            this.app = options.app;
            this.defaultRoute = options.defaultRoute;
            var base_routes = [
                'dashboard',
                'applications',
                'instances',
                'volumes',
                'images',
                'providers',
                'quotas',
                'settings',
                'help'
            ];
            var base_route = new RegExp("(" + base_routes.join("|") + ")");
            this.route(base_route, "toggleAppView");
        },
        toggleAppView: function(query) {
            this.app.handleSelect(query);
        },
        handleDefaultRoute: function() {
            this.toggleAppView(this.defaultRoute);
        }
    });

    return Router;
});
