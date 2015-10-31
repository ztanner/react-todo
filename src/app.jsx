var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var _ = require('underscore');
var List = require('./list');
var Header = require('./header');
var rootUrl = 'https://***.firebaseio.com/';

var App = React.createClass({
  mixins: [ ReactFire ],
  getInitialState: function() {
    return {
      items: {},
      loaded: false
    };
  },
  componentWillMount: function() {
    this.fb = new Firebase(rootUrl + "items/");
    this.bindAsObject(this.fb, 'items'); // Create FB instance @ items endpoint
    this.fb.on('value', this.handleDataLoaded);
  },
  render: function() {
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          To-Do List
        </h2>
        <Header itemsStore={this.firebaseRefs.items} />
        <hr />
        <div className={"content " + (this.state.loaded ? 'loaded' : '')} >
          <List items={this.state.items}/>

          {this.deleteButton()}
        </div>
      </div>
    </div>
  },
  handleDataLoaded: function() {
    this.setState({loaded: true});
  },
  deleteButton: function() {
    return <div className="text-center clear-complete">
      <hr />
      <button
        className="btn btn-default"
        disabled={this.disableClearComplete()}
        onClick={this.onDeleteDoneClick}
        >Clear Complete</button>
    </div>;
  },
  onDeleteDoneClick: function() {
    _.where(this.state.items, { done: true }).map(function(item) {
      this.fb.child(item.key).remove();
    }.bind(this));
  },
  disableClearComplete: function() {
    return _.filter(this.state.items, function(item) { return item.done; }).length === 0;
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
