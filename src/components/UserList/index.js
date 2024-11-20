import React from 'react';
import './index.css';

const UserList = ({ users, onEdit, onDelete }) => (
  <div className="user-list-container">
    <h2>User List</h2>

    {/* Table to display user information and actions */}
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {/* Render each user as a row in the table */}
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {/* Edit button triggers onEdit callback with the user object */}
                <button className="edit-btn" onClick={() => onEdit(user)}>
                  Edit
                </button>
                
                {/* Delete button triggers onDelete callback with the user ID */}
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
