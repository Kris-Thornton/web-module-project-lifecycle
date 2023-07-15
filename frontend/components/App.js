import React from 'react'
import Form from './Form'
import TodoList from './TodoList'
import axios from 'axios'




const URL = 'http://localhost:9000/api/todos'






export default class App extends React.Component {

constructor() {
  super();
  this.state = {
    todos: [],
    error: '',
    todoNameInput: '',
    completed: true,
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
    // this fixes the issue below
    this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data)})
    // this was the old line
    // this.fetchAllTodos
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

toggleCompleted = id => evt => {
  axios.patch(`${URL}/${id}`)
  .then(res => {
    this.fetchAllTodos();  
  })
  .catch(this.setAxiosResponseError)
}

toggleDisplayCompleted = () => {
  
  this.setState({ ...this.state, completed: !this.state.completed})
}


componentDidMount() {
  this.fetchAllTodos();
}

  

render() {
    return (
      <div>
        <div id="error">Error: {this.state.error}</div>


        
        <TodoList
        completed={this.state.completed}
        toggleCompleted={this.toggleCompleted}
        todos={this.state.todos}
        />



        <Form 
        onTodoFormSubmit={this.onTodoFormSubmit}
        todoNameInput={this.todoNameInput}
        handleChange={this.handleChange}
        completed={this.completed}
        toggleDisplayCompleted={this.toggleDisplayCompleted}
        />
      </div>
    )
  }
}
