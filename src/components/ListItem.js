import React, { Component } from "react";

//axios will be used to connect the front end of this component to the back end
import axios from "axios";

class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      editInput: props.element
    };
  }

  edit = () => {
    const { editing } = this.state;
    this.setState({
      editing: !editing
    });
  };

  //this is used to handle when someone is typing in an input box
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //this save function runs our PUT endpoint
  save = () => {
    const index = this.props.index;
    const newItem = this.state.editInput;

    console.log(index, newItem);

    axios
      .put(`/api/list`, { index, newItem })
      .then(res => this.props.updateState(res.data));

    //we set editing to false to change the display of our app back to normal
    this.setState({
      editing: false
    });
  };

  render() {
    return (
      <div>
        {/* we are using editing as a TERNARY to switch what is displayed when edit is pressed */}
        {this.state.editing ? (
          <article>
            <input
              value={this.state.editInput}
              name="editInput"
              onChange={e => this.handleInput(e)}
            />
            <button onClick={() => this.save()}>Save</button>
          </article>
        ) : (
          //this is what is displayed when we have not pressed edit yet
          //including the DELETE and EDIT onClick events
          <article>
            <section>{this.props.element}</section>
            <button onClick={() => this.edit()}>Edit</button>
            <button onClick={() => this.props.delete(this.props.index)}>
              Delete
            </button>
          </article>
        )}
      </div>
    );
  }
}
export default ListItem;
