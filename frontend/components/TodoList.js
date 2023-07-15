import React from 'react'

export default class TodoList extends React.Component {
  render() {
    return (
      <div id="todos">
          <h2>Todos:</h2>
          {
            this.props.todos.reduce((acc, td) => {
              
              if(this.props.completed || !td.completed) return acc.concat(
                 
              )
              return acc
            }, [])
            
        }
        </div>
    )
  }
}
