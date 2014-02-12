define(['react', 'components/identity_select', 'components/page_header',
    'profile', 'components/common/gravatar'], 
    function(React, IdentitySelect, PageHeader, profile, Gravatar) {

    var InstanceList = React.createClass({
        render: function() {
            var instances = this.props.instances.map(function(model) {
                return React.DOM.li({}, 
                    Gravatar({hash: model.get('machine_alias_hash')}),
                    model.get('name'),
                    model.get('ip_address'));
            });

            return React.DOM.ul({}, instances);
        }
    });

    var Instances = React.createClass({
        getInitialState: function() {
            return {
                identity: profile.get('identities').at(0)
            };
        },
        updateIdentity: function(model, coll) {
            this.setState({identity: this.state.identity});
        },
        startListening: function(identity) {
            var instances = identity.get('instances');

            instances.on('sync', this.updateIdentity);
            instances.fetch();
        },
        onSelect: function(identity) {
            this.startListening(identity);
            this.setState({identity: identity});
        },
        componentDidMount: function() {
            this.startListening(this.state.identity);
        },
        componentWillUnmount: function() {
            var instances = this.state.identity.get('instances');
            instances.off('sync', this.updateIdentity);
        },
        render: function() {
            var instances = this.state.identity.get('instances');

            return React.DOM.div({},
                PageHeader({title: "Instances"}),
                IdentitySelect({
                    identities: profile.get('identities'),
                    onSelect: this.onSelect,
                    selected: this.state.identity
                }),
                React.DOM.h2({}, "Provider " + this.state.identity.get('provider_id') + ", Identity " + this.state.identity.get('id')),
                InstanceList({instances: instances})
            );
        }
    });

    return Instances;
});
