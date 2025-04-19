"use client";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

export default function StudentList() {
  const [interns, setInterns] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState(null);

  useEffect(() => {
    fetchInterns();
  }, []);

  const fetchInterns = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/interns-data");
      const data = await response.json();
      setInterns(data);
    } catch (error) {
      console.error("Error fetching interns:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/interns-data/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setInterns(interns.filter((intern) => intern.id !== id));
      }
    } catch (error) {
      console.error("Error deleting intern:", error);
    }
  };

  const handleEdit = (intern) => {
    setSelectedIntern(intern);
    setShowEditModal(true);
  };

  const updateIntern = async (updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/interns-data/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );
      if (response.ok) {
        fetchInterns();
        setShowEditModal(false);
      }
    } catch (error) {
      console.error("Error updating intern:", error);
    }
  };
  const handleAssignProject = async (intern) => {
    const assignedProject = prompt("Enter project name:");
    if (!assignedProject) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/save-intern/${interns.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: intern.id, assignedProject, progress: 0 }),
        }
      );

      if (response.ok) {
        fetchInterns(); // ✅ Refresh the table
      } else {
        console.error("Failed to update project.");
      }
    } catch (error) {
      console.error("Error assigning project:", error);
    }
  };
  const updateProgress = async (id, progress) => {
    try {
      const response = await fetch(`/api/interns-data`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, progress }),
      });

      if (response.ok) {
        setInterns((prevInterns) =>
          prevInterns.map((intern) =>
            intern.id === id ? { ...intern, progress } : intern
          )
        );
      } else {
        console.error("Failed to update progress.");
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="w-full mx-auto py-4 px-2 sm:px-4 lg:px-6">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full">
            {/* Header Section */}
            <div className="w-full p-3 sm:p-4 border-b border-gray-300 flex justify-between items-center bg-gray-700 text-white">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                Internship Candidates
              </h2>
              <button className="bg-white text-gray-700 px-3 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-gray-200 transition flex items-center gap-2 text-xs sm:text-sm">
                Add New Intern
              </button>
            </div>

            {/* Table Section */}
            <div className="w-full">
              {/* Desktop: Table Layout */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-200 text-gray-700 uppercase text-xs sm:text-sm">
                    <tr className="border-b border-gray-300">
                      <th className="px-3 py-2 sm:px-4 sm:py-3">#</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-3">Name</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-3">Email</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-3">University</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-3">Department</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-3">Phone</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-3">Domain</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-3">Progress</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-3">
                        Update Progress
                      </th>
                      <th className="px-3 py-2 sm:px-4 sm:py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white text-gray-700 text-xs sm:text-sm">
                    {interns.map((intern, index) => (
                      <tr key={intern.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2 sm:px-4 sm:py-3 text-center">
                          {index + 1}
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3">
                          {intern.firstName} {intern.lastName}
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3">
                          {intern.email}
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3">
                          {intern.university}
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3">
                          {intern.department}
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3">
                          {intern.phone}
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3">
                          {intern.domain}
                        </td>

                        {/* Progress Bar */}
                        <td className="px-3 py-2 sm:px-4 sm:py-3">
                          <div className="relative w-24 sm:w-32 h-3 sm:h-4 bg-gray-300 rounded">
                            <div
                              className="absolute top-0 left-0 h-3 sm:h-4 bg-green-500 rounded transition-all"
                              style={{ width: `${intern.progress || 0}%` }}
                            />
                          </div>
                          <span className="text-xs sm:text-sm">
                            {intern.progress || 0}%
                          </span>
                        </td>

                        {/* Progress Dropdown */}
                        <td className="px-3 py-2 sm:px-4 sm:py-3">
                          <select
                            value={intern.progress || 0}
                            onChange={(e) =>
                              updateProgress(
                                intern.id,
                                parseInt(e.target.value)
                              )
                            }
                            className="border rounded p-1 bg-white shadow text-xs sm:text-sm"
                          >
                            <option value="0">Not Started</option>
                            <option value="25">25%</option>
                            <option value="50">50%</option>
                            <option value="75">75%</option>
                            <option value="100">Completed</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="px-3 py-2 sm:px-4 sm:py-3 flex space-x-2">
                          <button
                            onClick={() => handleEdit(intern)}
                            className="text-green-600 hover:text-green-800 text-base sm:text-lg"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(intern.id)}
                            className="text-red-600 hover:text-red-800 text-base sm:text-lg"
                          >
                            <FaTrash />
                          </button>
                          <button
                            onClick={() => handleAssignProject(intern)}
                            className="bg-gray-700 text-white px-2 sm:px-3 py-1 rounded-md hover:bg-gray-800 transition text-xs sm:text-sm"
                          >
                            Assign Project
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile: Card Layout */}
              <div className="block md:hidden space-y-4 p-4">
                {interns.map((intern, index) => (
                  <div
                    key={intern.id}
                    className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-semibold">
                        #{index + 1} {intern.firstName} {intern.lastName}
                      </h3>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        {intern.email}
                      </p>
                      <p>
                        <span className="font-medium">University:</span>{" "}
                        {intern.university}
                      </p>
                      <p>
                        <span className="font-medium">Department:</span>{" "}
                        {intern.department}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span>{" "}
                        {intern.phone}
                      </p>
                      <p>
                        <span className="font-medium">Domain:</span>{" "}
                        {intern.domain}
                      </p>
                      <td className="">
                        <div className="relative w-32 h-4 bg-gray-300 rounded">
                           <div className="md:hidden">Progress</div>
                          <div
                            className="absolute top-0 left-0 h-4 bg-green-500 rounded transition-all"
                            style={{ width: `${intern.progress || 0}%` }}
                          />
                        </div>
                        <span className="text-sm">{intern.progress || 0}%</span>
                      </td>
                      
                      <p>
                        <span className="font-medium">Update Progress:</span>
                        <select
                          value={intern.progress || 0}
                          onChange={(e) =>
                            updateProgress(intern.id, parseInt(e.target.value))
                          }
                          className="border rounded p-1 bg-white shadow text-xs mt-1"
                        >
                          <option value="0">Not Started</option>
                          <option value="25">25%</option>
                          <option value="50">50%</option>
                          <option value="75">75%</option>
                          <option value="100">Completed</option>
                        </select>
                      </p>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => handleEdit(intern)}
                        className="text-green-600 hover:text-green-800 text-base"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(intern.id)}
                        className="text-red-600 hover:text-red-800 text-base"
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={() => handleAssignProject(intern)}
                        className="bg-gray-700 text-white px-2 py-1 rounded-md hover:bg-gray-800 transition text-xs"
                      >
                        Assign
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md sm:max-w-lg">
              <h3 className="text-lg sm:text-xl font-bold mb-4">
                Edit Intern Details
              </h3>
              <input
                type="text"
                placeholder="First Name"
                value={selectedIntern.firstName}
                onChange={(e) =>
                  setSelectedIntern({
                    ...selectedIntern,
                    firstName: e.target.value,
                  })
                }
                className="w-full mb-3 sm:mb-4 p-2 border rounded text-sm sm:text-base"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={selectedIntern.lastName}
                onChange={(e) =>
                  setSelectedIntern({
                    ...selectedIntern,
                    lastName: e.target.value,
                  })
                }
                className="w-full mb-3 sm:mb-4 p-2 border rounded text-sm sm:text-base"
              />
              <input
                type="email"
                placeholder="Email"
                value={selectedIntern.email}
                onChange={(e) =>
                  setSelectedIntern({
                    ...selectedIntern,
                    email: e.target.value,
                  })
                }
                className="w-full mb-3 sm:mb-4 p-2 border rounded text-sm sm:text-base"
              />
              <div className="flex justify-end space-x-2 sm:space-x-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-3 sm:px-4 py-1 sm:py-2 text-gray-600 hover:text-gray-800 text-xs sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateIntern(selectedIntern)}
                  className="px-3 sm:px-4 py-1 sm:py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-xs sm:text-sm"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
