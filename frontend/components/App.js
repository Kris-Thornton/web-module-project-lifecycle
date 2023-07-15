import React from 'react'
import Form from './Form'
import axios from 'axios'




const URL = 'http://localhost:9000/api/todos'






export default class App extends React.Component {

constructor() {
  super();
  this.state = {
    todos: [],
    error: '',
    todoNameInput: '',
  };
}



handleChange = evt => {
  const {value} = evt.target
  this.setState({...this.state, todoNameInput: value})
  
}


resetForm = () => this.setState({ ...this.state, todoNameInput: ''})
setAxiosResponseError = (err) => this.setState({...this.state, error: err.response.data.message})




postNewTodo = () => {
  axios.post(URL, {name: this.state.todoNameInput})
  .then(res => {
    this.fetchAllTodos
    this.resetForm()
  })
  .catch(this.setAxiosResponseError)
}


onTodoFormSubmit = evt => {
  // bug here...... without prevent Default, item added to list just fine on DOM.  With preventDefault item only added to state and then to list on DOM when page is refreshed.
  evt.preventDefault()
  this.postNewTodo()
}


fetchAllTodos = () => {
  axios.get(URL)
  .then(res => {
    this.setState({ ...this.state, todos: res.data.data})
  })
  .catch(err => {
    this.setState(this.setAxiosResponseError)
  })
}



componentDidMount() {
  this.fetchAllTodos();
}

  

render() {
    return (
      <div>
        <div id="error">Error: {this.state.error}</div>
        <div id="todos">
          <h2>Todos:</h2>
          {
            this.state.todos.map(td => {
              return <div key={td.id}>{td.name}</div>
            })
          }
        </div>
        <form onSubmit={this.onTodoFormSubmit} id="todoForm">
          <input value={this.state.todoNameInput} onChange={this.handleChange} type="text" placeholder="Type todo"></input>
          <input type="submit"></input>
          <button>Clear Completed</button>
        </form>
      </div>
    )
  }
}
