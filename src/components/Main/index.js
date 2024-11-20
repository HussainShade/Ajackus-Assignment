import React, { Component } from 'react';
import UserList from '../UserList';
import UserForm from '../UserForm';
import ErrorBoundary from '../ErrorBoundary';
import Notification from '../Notification';
import './index.css';

class Main extends Component {
  state = {
    users: [], // Holds the array of users
    selectedUser: null, // Stores the user selected for editing
    isAdding: false, // Tracks if we are adding a new user or editing an existing one
    error: null, // Stores any error message
    showNotification: false, // Controls if a notification should be shown
    notificationMessage: '', // Message for the notification
  };

  componentDidMount() {
    // Initially loads users either from localStorage or fetches from an API
    this.loadUsers();
  }

  loadUsers = async () => {
    // First attempt to load users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users'));

    if (storedUsers && storedUsers.length > 0) {
      // If users exist in localStorage, use them
      this.setState({ users: storedUsers });
    } else {
      // If no users in localStorage, fetch from an external API
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const apiUsers = await response.json();
        localStorage.setItem('users', JSON.stringify(apiUsers)); // Store fetched users in localStorage for later use
        this.setState({ users: apiUsers });
      } catch (error) {
        // Set error state if API fetch fails
        this.setState({ error: 'Failed to load users from API' });
      }
    }
  };

  handleAddUser = (userData) => {
    // Handle adding a new user
    try {
      if (this.isEmailDuplicate(userData.email)) {
        // Check if the email already exists before adding
        this.setState({ error: 'Email already exists. Please use a different email.' });
        return;
      }
      const newUser = this.createNewUser(userData);
      const updatedUsers = [...this.state.users, newUser]; // Add new user to the list
      localStorage.setItem('users', JSON.stringify(updatedUsers)); // Update localStorage
      this.setState({ users: updatedUsers, isAdding: false, error: null }, this.showNotification('User added successfully'));
    } catch (error) {
      this.setState({ error: 'Failed to add user' }); // Set error state if adding fails
    }
  };

  handleEditUser = (userData) => {
    // Handle editing an existing user
    try {
      const updatedUsers = this.state.users.map((user) =>
        user.id === userData.id ? { ...user, ...userData } : user // Update the user that matches the id
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers)); // Persist the updated user list to localStorage
      this.setState({ users: updatedUsers, selectedUser: null, isAdding: false }, this.showNotification('User updated successfully'));
    } catch (error) {
      this.setState({ error: 'Failed to update user' }); // Set error state if update fails
    }
  };

  handleDeleteUser = (userId) => {
    // Handle deleting a user
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const updatedUsers = this.state.users.filter((user) => user.id !== userId); // Remove user by id
        localStorage.setItem('users', JSON.stringify(updatedUsers)); // Persist the updated list
        this.setState({ users: updatedUsers }, this.showNotification('User deleted successfully'));
      } catch (error) {
        this.setState({ error: 'Failed to delete user' }); // Set error state if deletion fails
      }
    }
  };

  isEmailDuplicate = (email) => {
    // Check if email already exists in the current user list
    return this.state.users.some((user) => user.email === email);
  };

  createNewUser = (userData) => {
    // Create a new user object with a unique id
    const maxId = this.state.users.length > 0 ? Math.max(...this.state.users.map((user) => user.id)) : 0;
    return { ...userData, id: maxId + 1 }; // Assign new unique id
  };

  selectUserForEdit = (user) => {
    // Set the selected user to be edited
    this.setState({ selectedUser: user }, this.scrollToTop);
  };

  scrollToTop = () => {
    // Scroll to the top of the page for a better user experience
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  showNotification = (message) => {
    // Show a notification message for a short time
    this.setState({ showNotification: true, notificationMessage: message });
    setTimeout(() => this.setState({ showNotification: false }), 3000); // Hide the notification after 3 seconds
  };

  render() {
    const { users, selectedUser, isAdding, error, showNotification, notificationMessage } = this.state;
    return (
      <div className="container">
        <div className="main-container">
          <ErrorBoundary>
            {error && <p className="error-message">{error}</p>} {/* Display error message if there's an error */}
            {showNotification && <Notification message={notificationMessage} onClose={() => this.setState({ showNotification: false })} />} {/* Show notification */}
            
            {isAdding || selectedUser ? (
              <UserForm
                user={selectedUser}
                onSave={selectedUser ? this.handleEditUser : this.handleAddUser} // Pass save handler based on context (add or edit)
              />
            ) : (
              <button onClick={() => this.setState({ isAdding: true })} className="add-user-btn">
                Add User
              </button>
            )}

            <UserList
              users={users}
              onEdit={this.selectUserForEdit} // Edit user on clicking the "Edit" button
              onDelete={this.handleDeleteUser} // Delete user on clicking the "Delete" button
            />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default Main;
