import { Component } from "react";
import "./index.css";
class TaskDashBoard extends Component {
  state = {
    userInput: "",
    userDescription: "",
    tasks: [],
  };

  // Handles the title input changes
  onChangeUserInput = (event) => {
    this.setState({ userInput: event.target.value });
  };

  // Handles the description input changes
  onChangeUserDescription = (event) => {
    this.setState({ userDescription: event.target.value });
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    const { userInput, userDescription, tasks } = this.state;
    if (userInput !== "" && userDescription !== "") {
      const newTask = {
        id: tasks.length + 1,
        title: userInput,
        description: userDescription,
      };
      this.setState({
        tasks: [...tasks, newTask],
        userInput: "",
        userDescription: "",
      });
    }
    // console.log("Task Title", userInput);
    // console.log("Task Description", userDescription);
  };

  // Handles deleting a task
  onClickDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      const { tasks } = this.state;
      const updatedTasks = tasks.filter((task) => task.id !== id);
      this.setState({ tasks: updatedTasks });
    }
  };

  onClickView = (id) => {
    const view = this.state.tasks.find((task) => task.id === id);
    if (view) {
      alert(`Title: ${view.title}\nDescription: ${view.description}`);
    } else {
      alert("Task not found!");
    }
  };

  render() {
    const { userInput, userDescription, tasks } = this.state;
    return (
      <>
        <div className="task-dashboard-container">
          <h1 className="Main-heading"> Task Management System</h1>
          <form onSubmit={this.onSubmitForm} className="form-container">
            <h1 class="create-task-heading">
              Create <span class="create-task-heading-subpart">Task</span>
            </h1>
            <label className="label"> Title </label>
            <input
              type="text"
              placeholder="Enter task title..."
              className="input-el"
              value={userInput}
              onChange={this.onChangeUserInput}
            />
            <label className="label"> Description </label>
            <textarea
              rows={6}
              column={100}
              className="text-area"
              placeholder="Enter task description here..."
              value={userDescription}
              onChange={this.onChangeUserDescription}
            ></textarea>
            <button type="submit" className="add-button">
              Add Task
            </button>
          </form>
        </div>

        <div className="task-list-container">
          <h1 className="task-list-heading">Task Lists </h1>
          <table style={{ width: "70%", textAlign: "center" }}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((eachTask) => (
                <tr key={eachTask.id}>
                  <td>{eachTask.title}</td>
                  <td>{eachTask.description} </td>
                  <td>
                    <button
                      className="action-buttons"
                      onClick={() => this.onClickView(eachTask.id)}
                    >
                      View
                    </button>
                    <button className="action-buttons">Edit</button>
                    <button
                      onClick={() => this.onClickDelete(eachTask.id)}
                      className="action-buttons"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
export default TaskDashBoard;
