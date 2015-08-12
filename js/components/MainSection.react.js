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
var TodoItem = require('./TodoItem.react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Immutable = require('immutable');

var MainSection = React.createClass({

  propTypes: {
    allTodos: ReactPropTypes.instanceOf(Immutable.Map).isRequired,
    areAllComplete: ReactPropTypes.bool.isRequired
  },

  mixins: [PureRenderMixin],

  /**
   * @return {object}
   */
  render: function() {
    console.log('- MainSection renders');
    // This section should be hidden by default
    // and shown when there are todos.
    if (this.props.allTodos.isEmpty()) {
      return null;
    }

    var allTodos = this.props.allTodos;
    var todos = allTodos.toArray().map((todo, key) => {
      return <TodoItem key={key} todo={todo} />;
    });

    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          onChange={this._onToggleCompleteAll}
          checked={this.props.areAllComplete ? 'checked' : ''}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">{todos}</ul>
      </section>
    );
  },

  /**
   * Event handler to mark all TODOs as complete
   */
  _onToggleCompleteAll: function() {
    TodoActions.toggleCompleteAll();
  }

});

module.exports = MainSection;