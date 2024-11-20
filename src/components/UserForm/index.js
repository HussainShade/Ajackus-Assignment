import React, { useState, useEffect } from 'react';
import './index.css';

const UserForm = ({ user, onSave }) => {
  // Initialize form data state with empty fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    phone: '',
  });

  // Populate form fields if a user object is passed in (for editing an existing user)
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        username: user.username,
        phone: user.phone,
      });
    }
  }, [user]);

  // Handle input changes and update the formData state accordingly
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Submit form data if all fields are valid
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidForm()) {
      onSave(formData); // Trigger the save action in the parent component
    }
  };

  // Check if all required form fields are filled
  const isValidForm = () => {
    const { name, email, username, phone } = formData;
    return name && email && username && phone;
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2 className="heading">{user ? 'Edit User' : 'Add User'}</h2>
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
        {user ? 'Save Changes' : 'Add User'}
      </button>
    </form>
  );
};

export default UserForm;
