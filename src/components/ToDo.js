import React, { Component } from "react";
import ListItem from "./ListItem";

//axios is used to hook up the front end to the back end
import axios from "axios";

class ToDo extends Component {
  constructor() {
    super();

    this.state = {
      list: [],
      input: ""
    };
  }

  //we use component did mount to get all of the items and put them on state
  //component did mount is always the first function that runs.
  //this is connected to the .GET
  componentDidMount = () => {
    axios.get("/api/list").then(res =>
      this.setState({
        list: res.data
      })
    );
  };

  //this is used to handle when someone is typing in an input box
  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  //this is connected to the .POST
  addToList = () => {
    const addOn = this.state.input;
    axios.post("/api/list", { addOn }).then(res =>
      this.setState({
        list: res.data,
        input: ""
      })
    );
  };

  //this is connected to the .DELETE
  delete = index => {
    axios.delete(`api/list/${index}`).then(res =>
      this.setState({
        list: res.data
      })
    );
  };

  //We passed this function on to be able to change state using it's child component
  updateState = updatedList => {
    this.setState({
      list: updatedList
    });
  };

  render() {
    return (
      <section>
        <div>
          {/* this is mapping over the state of list and displaying them in a child component */}
          {this.state.list.map((element, index) => {
            return (
              <ListItem
                element={element}
                index={index}
                key={`Todo item ${index}`}
                delete={this.delete}
                updateState={this.updateState}
              />
            );
          })}
        </div>
        <input
          placeholder="type here"
          name="input"
          value={this.state.input}
          onChange={e => this.handleInput(e)}
          // this on key down allows users to press enter instead of a button
          onKeyDown={e => {
            if (e.key === "Enter") {
              this.addToList();
            }
          }}
        />
      </section>
    );
  }
}

export default ToDo;
