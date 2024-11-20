import React, { Component } from 'react';
import UserList from '../UserList';
import UserForm from '../UserForm';
import ErrorBoundary from '../ErrorBoundary';
import Notification from '../Notification';
import './index.css';

class Main extends Component {
  // Initialize state with user data, selected user for editing, notification control, and error handling
  state = {
    users: [],
    selectedUser: null,
    isAdding: false,
    error: null,
    showNotification: false,
    notificationMessage: '',
  };

  componentDidMount() {
    this.loadUsers(); // Load users initially from API or local storage
  }

  // Load users from API if they do not exist in local storage
  loadUsers = async () => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));

    if (storedUsers && storedUsers.length > 0) {
      // Use users from local storage if available
      this.setState({ users: storedUsers });
    } else {
      // Fetch users from API and save them to local storage
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const apiUsers = await response.json();

        // Save fetched users to local storage for future use
        localStorage.setItem('users', JSON.stringify(apiUsers));
        this.setState({ users: apiUsers });
      } catch (error) {
        this.setState({ error: 'Failed to load users from API' });
      }
    }
  };

  // Adds a new user and checks for email duplicates before saving to local storage
  handleAddUser = (userData) => {
    try {
      if (this.isEmailDuplicate(userData.email)) {
        this.setState({ error: 'Email already exists. Please use a different email.' });
        return;
      }
      const newUser = this.createNewUser(userData);
      const updatedUsers = [...this.state.users, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers)); // Save updated list to local storage
      this.setState(
        { users: updatedUsers, isAdding: false, error: null },
        this.showNotification('User added successfully')
      );
    } catch (error) {
      this.setState({ error: 'Failed to add user' });
    }
  };

  // Handles updating user details and saving changes to local storage
  handleEditUser = (userData) => {
    try {
      const updatedUsers = this.state.users.map((user) =>
        user.id === userData.id ? userData : user
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers)); // Persist updates
      this.setState(
        { users: updatedUsers, selectedUser: null, isAdding: false },
        this.showNotification('User updated successfully')
      );
    } catch (error) {
      this.setState({ error: 'Failed to update user' });
    }
  };

  // Confirms deletion, removes user from state, and updates local storage
  handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const updatedUsers = this.state.users.filter((user) => user.id !== userId);
        localStorage.setItem('users', JSON.stringify(updatedUsers)); // Save deletion to local storage
        this.setState({ users: updatedUsers }, this.showNotification('User deleted successfully'));
      } catch (error) {
        this.setState({ error: 'Failed to delete user' });
      }
    }
  };

  // Helper function to check if an email is already associated with an existing user
  isEmailDuplicate = (email) => {
    return this.state.users.some((user) => user.email === email);
  };

  // Helper function to create a new user with an incremented ID
  createNewUser = (userData) => {
    const maxId = this.state.users.length > 0 ? Math.max(...this.state.users.map((user) => user.id)) : 0;
    return { ...userData, id: maxId + 1 };
  };

  // Sets selected user for editing and scrolls to the top of the page for user visibility
  selectUserForEdit = (user) => {
    this.setState({ selectedUser: user }, this.scrollToTop);
  };

  // Smoothly scrolls to the top of the page for ease of editing
  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Displays notification with a given message and auto-hides after 3 seconds
  showNotification = (message) => {
    this.setState({ showNotification: true, notificationMessage: message });
    setTimeout(() => this.setState({ showNotification: false }), 3000); // Hide after 3 seconds
  };

  render() {
    const { users, selectedUser, isAdding, error, showNotification, notificationMessage } = this.state;
    return (
      <div className="container">
        <div className="main-container">
          <ErrorBoundary>
            {/* Display error message if there’s an error */}
            {error && <p className="error-message">{error}</p>}
            
            {/* Display notification message if there’s a recent action */}
            {showNotification && <Notification message={notificationMessage} onClose={() => this.setState({ showNotification: false })} />}
            
            {/* Toggle between UserForm for adding/editing and button to add new user */}
            {isAdding || selectedUser ? (
              <UserForm
                user={selectedUser}
                onSave={selectedUser ? this.handleEditUser : this.handleAddUser}
              />
            ) : (
              <button onClick={() => this.setState({ isAdding: true })} className="add-user-btn">
                Add User
              </button>
            )}

            {/* Display list of users */}
            <UserList
              users={users}
              onEdit={this.selectUserForEdit}
              onDelete={this.handleDeleteUser}
            />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default Main;
