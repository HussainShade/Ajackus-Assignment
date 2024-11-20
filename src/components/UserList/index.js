import React from 'react';
import './index.css';

const UserList = ({ users, onEdit, onDelete }) => (
  <div className="user-list-container">
    <h2>User List</h2>

    {/* Table Container */}
    <div className="table-container">
      <table className="user-table">
        {/* Table Header */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {/* Display user data */}
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {/* Edit Button: Triggers the onEdit function passed as prop */}
                <button className="edit-btn" onClick={() => onEdit(user)}>
                  Edit
                </button>
                
                {/* Delete Button: Triggers the onDelete function passed as prop */}
                <button className="delete-btn" onClick={() => onDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default UserList;
