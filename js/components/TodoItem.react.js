/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Immutable = require('immutable');

var classNames = require('classnames');

var TodoItem = React.createClass({

  propTypes: {
    todo: React.PropTypes.instanceOf(Immutable.Map).isRequired
  },

  getInitialState: function() {
    return {
      isEditing: false
    };
  },

  mixins: [PureRenderMixin],

  /**
   * @return {object}
   */
  render: function() {
    console.log('  - TodoItem renders', this.props.todo.get('text'));
    var todo = this.props.todo;

    var input;
    if (this.state.isEditing) {
      input =
        <TodoTextInput
          className="edit"
          onSave={this._onSave}
          value={todo.get('text')}
        />;
    }

    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    // Note that 'completed' is a classification while 'complete' is a state.
    // This differentiation between classification and state becomes important
    // in the naming of view actions toggleComplete() vs. destroyCompleted().
    return (
      <li
        className={classNames({
          'completed': todo.get('complete'),
          'editing': this.state.isEditing
        })}
        key={todo.get('id')}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.get('complete')}
            onChange={this._onToggleComplete}
          />
          <label onDoubleClick={this._onDoubleClick}>
            {todo.get('text')}
          </label>
          <button className="destroy" onClick={this._onDestroyClick} />
        </div>
        {input}
      </li>
    );
  },

  _onToggleComplete: function() {
    TodoActions.toggleComplete(this.props.todo);
  },

  _onDoubleClick: function() {
    this.setState({isEditing: true});
  },

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave: function(text) {
    TodoActions.updateText(this.props.todo.get('id'), text);
    this.setState({isEditing: false});
  },

  _onDestroyClick: function() {
    TodoActions.destroy(this.props.todo.get('id'));
  }

});

module.exports = TodoItem;