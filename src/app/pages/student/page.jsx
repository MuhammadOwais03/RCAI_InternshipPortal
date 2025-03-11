"use client"
import { useState } from "react";
import { FaStar, FaEdit, FaTrash, FaCertificate, FaTasks } from "react-icons/fa";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

export default function StudentList() {
  const [students, setStudents] = useState([
    { id: 1, name: "Ali Khan", progress: 75, projects: 3, rating: 4 },
    { id: 2, name: "Sara Ahmed", progress: 45, projects: 2, rating: 3 },
    { id: 3, name: "Usman Malik", progress: 90, projects: 5, rating: 5 },
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const updateStudent = (updatedData) => {
    setStudents(students.map(student => 
      student.id === updatedData.id ? { ...student, ...updatedData } : student
    ));
    setShowEditModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Manage Interns</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Internship Candidates</h2>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                Add New Intern
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Projects</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {students.map(student => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{student.progress}%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                          {student.projects}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i}
                              className={i < student.rating ? "text-yellow-400" : "text-gray-300"}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        <button 
                          onClick={() => handleEdit(student)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <FaEdit className="inline-block" />
                        </button>
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash className="inline-block" />
                        </button>
                        
                        <button className="text-purple-600 hover:text-purple-900">
                          <FaTasks className="inline-block" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96">
              <h3 className="text-xl font-bold mb-4">Edit Intern Details</h3>
              <input
                type="text"
                value={selectedStudent.name}
                onChange={(e) => setSelectedStudent({...selectedStudent, name: e.target.value})}
                className="w-full mb-4 p-2 border rounded"
              />
              <div className="mb-4">
                <label className="block mb-2">Progress (%)</label>
                <input
                  type="number"
                  value={selectedStudent.progress}
                  onChange={(e) => setSelectedStudent({...selectedStudent, progress: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => updateStudent(selectedStudent)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
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