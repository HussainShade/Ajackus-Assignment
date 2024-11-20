import React, { useState, useEffect } from 'react';
import './index.css';

const UserForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    phone: '',
  });

  useEffect(() => {
    // If user is passed (editing), populate form fields with the existing user data
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        username: user.username,
        phone: user.phone,
      });
    }
  }, [user]); // Only run this effect if the user prop changes (e.g. when editing a user)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value })); // Update form data on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidForm()) {
      // Only proceed if the form is valid (all fields filled)
      onSave({ ...formData, id: user ? user.id : undefined }); // Pass user id for editing, or undefined for new user
    }
  };

  const isValidForm = () => {
    // Check if all fields are filled out
    const { name, email, username, phone } = formData;
    return name && email && username && phone;
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2 className="heading">{user ? 'Edit User' : 'Add User'}</h2> {/* Dynamic form title */}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        placeholder="Username"
        required
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        placeholder="Phone"
        required
      />
      <button type="submit" className="submit-btn">
        {user ? 'Save Changes' : 'Add User'} {/* Change button text based on context */}
      </button>
    </form>
  );
};

export default UserForm;
