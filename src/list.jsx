var React = require('react');
var _ = require('underscore');
var ListItem = require('./list-item');

module.exports = React.createClass({
  render: function() {
    return <div>{this.renderList()}</div>
  },
  renderList: function() {
    if(!this.props.items) {
      return <h4>
        Add a todo to get started.
      </h4>
    } else {
      return _.map(this.props.items, function(item, key) {
        item.key = key;
        return <ListItem item={item} key={key} />
      });
    }
  }
});