define(['underscore', 'models/base'], function(_, Base) {

    var Provider = Base.extend({
        defaults: { 'model_name': 'provider' },
        parse: function(response) {
            var attributes = response;
            
            attributes.description = "One day, providers will have descriptions. That will be a good day. For now, this is filler text. #sorryNotSorry";
            return attributes;
        },
        url: function(){
            var url = this.urlRoot
                + '/' + this.defaults.model_name + '/';
            
            if (typeof this.get('id') != 'undefined') {
                url += this.get('id') + '/';
            }
            
            return url;
        }
    });

    _.extend(Provider.defaults, Base.defaults);

    return Provider;
});
