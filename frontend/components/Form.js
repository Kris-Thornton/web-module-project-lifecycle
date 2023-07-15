import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form onSubmit={this.props.onTodoFormSubmit} id="todoForm">
          <input value={this.props.todoNameInput} onChange={this.props.handleChange} type="text" placeholder="Type todo"></input>
          <input type="submit"></input>
        </form>
        <button onClick={this.props.toggleDisplayCompleted}>{this.props.completed ? 'Hide' : 'Show'} Completed</button>
      </>
    )
  }
}

