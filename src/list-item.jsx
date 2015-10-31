var React = require('react');
var Firebase = require('firebase');
var rootUrl = 'https://***.firebaseio.com/';

module.exports = React.createClass({
  componentWillMount: function() {
    this.fb = new Firebase(rootUrl + "items/" + this.props.item.key);
  },
  getInitialState: function() {
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
    };
  },
  render: function() {
    return <div className="input-group">
      <span className="input-group-addon">
        <input
            type="checkbox"
            onChange={this.handleDoneChange}
            checked={this.state.done}
            />
      </span>
      <input type="text"
             className="form-control"
             disabled={this.state.done}
             value={this.state.text}
             onChange={this.handleTextChange}
          />
      <span className="input-group-btn">
        {this.changesButtons()}
        <button
            className="btn btn-default"
            onClick={this.handleDelete}
            >Delete</button>
      </span>
    </div>
  },
  changesButtons: function() {
    if(!this.state.textChanged) {
      return null;
    } else {
      return [
        <button
            className="btn btn-default"
            onClick={this.handleSave}>Save</button>,
        <button
            className="btn btn-default"
            onClick={this.handleUndo}>Undo</button>
      ]
    }
  },
  handleDoneChange: function(event) {
    var update = {done: event.target.checked};
    this.setState(update);
    this.fb.update(update);
  },
  handleDelete: function() {
    this.fb.remove();
  },
  handleTextChange: function(event) {
    this.setState({text: event.target.value, textChanged: true});
  },
  handleSave: function() {
    this.fb.update({text: this.state.text});
    this.setState({textChanged: false});
  },
  handleUndo: function() {
    this.setState({text: this.props.item.text, textChanged: false});
  }
});