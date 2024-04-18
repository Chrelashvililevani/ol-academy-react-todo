import React, { Component } from 'react';

class InputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      tasks: [],
      editIndex: null,
      errorMessage: '' // Add error message state
    };
  }

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleAddTask = () => {
    const { inputValue, tasks, editIndex } = this.state;
  
    // Check if the input value is empty
    if (inputValue.trim() === '') {
      this.setState({ errorMessage: 'Cannot add Task it is empty!' });
      this.clearErrorMessageAfterDelay();
      return; // Do nothing if the input is empty
    }
  
    // Check if the task already exists
    const taskExists = tasks.some(task => task.text === inputValue);
    if (taskExists) {
      // Task already exists, set error message
      this.setState({ errorMessage: 'This task already exists!' });
      this.clearErrorMessageAfterDelay();
      return; // Exit function
    }
  
    // Clear any existing error message
    this.setState({ errorMessage: '' });
  
    if (editIndex !== null) {
      // If there is an active edit index, update the existing task
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = { text: inputValue, isDone: false };
      this.setState({ tasks: updatedTasks, editIndex: null });
    } else {
      // Otherwise, add a new task
      this.setState({ tasks: [...tasks, { text: inputValue, isDone: false, isChecked: false }] });
    }
    this.setState({ inputValue: '' }); // Clear input after adding task or editing task
  };

  clearErrorMessageAfterDelay = () => {
    setTimeout(() => {
      this.setState({ errorMessage: '' });
    }, 5000); // Clear error message after 5 seconds
  };
    
  deleteTask = (index) => {
    const { tasks } = this.state;
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    this.setState({ tasks: updatedTasks });
  };

  moveTaskUp = (index) => {
    if (index > 0) {
      const { tasks } = this.state;
      const updatedTasks = [...tasks];
      const temp = updatedTasks[index];
      updatedTasks[index] = updatedTasks[index - 1];
      updatedTasks[index - 1] = temp;
      this.setState({ tasks: updatedTasks });
    }
  };

  moveTaskDown = (index) => {
    const { tasks } = this.state;
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      const temp = updatedTasks[index];
      updatedTasks[index] = updatedTasks[index + 1];
      updatedTasks[index + 1] = temp;
      this.setState({ tasks: updatedTasks });
    }
  };

  editTask = (index) => {
    const { tasks } = this.state;
    this.setState({ inputValue: tasks[index].text, editIndex: index });
  };

  toggleTaskDone = (index) => {
    const { tasks } = this.state;
    const updatedTasks = [...tasks];
    updatedTasks[index].isDone = !updatedTasks[index].isDone;
    this.setState({ tasks: updatedTasks });
  };

  handleDeleteAllTasks = () => {
    this.setState({ tasks: [] });
  };

  handleDeleteAllDoneTasks = () => {
    const { tasks } = this.state;
    const filteredTasks = tasks.filter(task => !task.isDone);
    this.setState({ tasks: filteredTasks });
  };

  toggleTaskChecked = (index) => {
    const { tasks } = this.state;
    const updatedTasks = [...tasks];
    updatedTasks[index].isChecked = !updatedTasks[index].isChecked;
    this.setState({ tasks: updatedTasks });
  };
      
  handleDeleteAllCheckedTasks = () => {
    const { tasks } = this.state;
    const filteredTasks = tasks.filter(task => !task.isChecked);
    this.setState({ tasks: filteredTasks });
  };
    
  render() {
    const { inputValue, tasks, errorMessage } = this.state;
    return (
      <div className='input-text'>
        <div className="task-input-wrapper">
          <input
            type="text"
            value={inputValue}
            onChange={this.handleChange}
            placeholder="Type something..."
            className="task-input"
          />
          <button onClick={this.handleAddTask} className="add-task-button">Add Task</button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <input type="checkbox" checked={task.isChecked} onChange={() => this.toggleTaskChecked(index)} />
              <span style={{ textDecoration: task.isDone ? 'line-through' : 'none' }}>
                {task.text}
              </span>
              <div className="task-buttons">
                <button className='button-up' onClick={() => this.moveTaskUp(index)} disabled={index === 0}>
                  Up
                </button>
                <button className='button-down' onClick={() => this.moveTaskDown(index)} disabled={index === tasks.length - 1}>
                  Down
                </button>
                <button className='button-delete-on' onClick={() => this.deleteTask(index)}>Delete</button>
                <button className='button-edit-on'  onClick={() => this.editTask(index)}>Edit</button>
                <button className='button-undo-done-on' onClick={() => this.toggleTaskDone(index)}>
                  {task.isDone ? 'Undo' : 'Done'}
                </button>
              </div>
            </li>
          ))}
        </ul>
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
        <div className='buttons-delete'>
        <button className='button-delete-all' onClick={this.handleDeleteAllTasks}>Delete All Tasks</button>
        <button className='button-delete-all-done' onClick={this.handleDeleteAllDoneTasks}>Delete All Done Tasks</button>
        <button className='button-delete-all-checked' onClick={this.handleDeleteAllCheckedTasks}>Delete All Checked Tasks</button>
        </div>
      </div>
    );
  }
}

export default InputComponent;
