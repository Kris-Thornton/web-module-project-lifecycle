import React from 'react'

export default class Form extends React.Component {

constructor() {
  super();
  this.state = {
    input:''
  };
}

handleChange = (e) => {
  this.setState({
    ...this.state,
    input: e.target.value
  })
}

handleSubmit = (e) => {
  e.preventDefault();
  this.props.handleAdd(this.state.input)
  console.log('submitted')
}


  render() {
   return(
    <>
    <input onChange={this.handleChange}/>
    <button onClick={this.handleSubmit} >Add to List</button>
    </>
   )
  }
 }
