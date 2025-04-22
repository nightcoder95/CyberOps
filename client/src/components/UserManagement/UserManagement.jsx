import { useState, useEffect } from "react";
import { PencilIcon, CheckIcon, XIcon } from "lucide-react";
import axios from "axios";
import Navbar from "../HomePage/Navbar";
import Sidebar from "../HomePage/Sidebar";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // Tracks user being edited
  const [formData, setFormData] = useState({}); // Tracks form input
  const [isNavClosed, setIsNavClosed] = useState(false); //Side navbar

  const API_URL = import.meta.env.VITE_BACKEND_XCELL;

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/users`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Add token if required
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Start editing a user
  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({
      pen: user.pen,
      role: user.role,
      name: user.name || "",
      password: "",
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingUser(null);
    setFormData({});
  };

  // Save changes to backend
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/auth/users/${editingUser}`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUsers(
        users.map((user) =>
          user._id === editingUser ? response.data.user : user
        )
      );
      setEditingUser(null);
      setFormData({});
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Handle input changes
  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  // Toggle sidebar
  const handleMenuClick = () => {
    setIsNavClosed(!isNavClosed);
  };

  return (
    <>
      <Navbar handleMenuClick={handleMenuClick} />
      <div className="main-container">
        <Sidebar isNavClosed={isNavClosed} />
        <div className="main">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                User Management
              </h1>
                <div className="text-base font-bold text-red-600">
                Total Users: {users.length}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                      PEN
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                      Password
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        {editingUser === user._id ? (
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleChange(e, "name")}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <div className="text-gray-900">
                            {user.name || "N/A"}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {editingUser === user._id ? (
                          <input
                            type="number"
                            value={formData.pen}
                            onChange={(e) => handleChange(e, "pen")}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <div className="text-gray-900">{user.pen}</div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {editingUser === user._id ? (
                          <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleChange(e, "password")}
                            placeholder="Enter new password"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <div className="text-gray-900">******</div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {editingUser === user._id ? (
                          <select
                            value={formData.role}
                            onChange={(e) => handleChange(e, "role")}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                          </select>
                        ) : (
                          <div className="text-gray-900">
                            <span
                              className={`px-2 py-2 rounded-3xl text-sm font-medium ${
                                user.role === "admin"
                                  ? "bg-green-300 text-black-800"
                                  : "bg-blue-100 text-gray-800"
                              }`}>
                              {user.role}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {editingUser === user._id ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={handleSave}
                              className="p-1 bg-green-100 text-green-600 rounded-md hover:bg-green-200 transition-colors"
                              title="Save">
                              <CheckIcon className="h-6 w-6" />
                            </button>
                            <button
                              onClick={handleCancel}
                              className="p-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
                              title="Cancel">
                              <XIcon className="h-6 w-6" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEdit(user)}
                            className="p-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
                            title="Edit">
                            <PencilIcon className="h-6 w-6" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
