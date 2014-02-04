define(['react', 'components/page_header', 'components/common/gravatar', 'profile'], 
    function(React, PageHeader, Gravatar, profile) {

    var IconOption = React.createClass({
        render: function() {
            return React.DOM.li({className: this.props.selected ? 'selected' : ''},
                React.DOM.a({
                        href: "#",
                        onClick: _.partial(this.props.onClick, this.props.type),
                    },
                    Gravatar({hash: '4dada4e6ac8298336c7063ae603ea86d', type: this.props.type}),
                    React.DOM.br(),
                    this.props.text));
        }
    });

    var IconSelect = React.createClass({
        getInitialState: function() {
            return {
                selected: this.props.selected
            };
        },
        handleClick: function(icon_type, e) {
            e.preventDefault();
            this.setState({selected: icon_type});
        },
        render: function() {
            return React.DOM.ul({id: 'icon-set-select'}, _.map(this.props.icons, function(text, type) {
                return IconOption({
                    type: type, 
                    text: text, 
                    selected: type == this.state.selected, 
                    onClick: this.handleClick});
            }.bind(this)));
        }
    });

    var icons = {
        'default': 'Identicons',
        retro: 'Retro',
        robot: 'Robots',
        unicorn: 'Unicorns',
        monster: 'Monsters',
        wavatar: 'Wavatars'
    };

    return React.createClass({
        render: function() {
            return React.DOM.div({style: {display: this.props.visible ? 'block' : 'none'}},
                PageHeader({title: "Settings"}),
                React.DOM.h2({}, "Notifications"),
                React.DOM.h2({}, "Appearance"),
                React.DOM.p({}, "Image and instance icon set:"),
                IconSelect({icons: icons, selected: profile.get('settings')['icon_set']}));
        }
    });

});
