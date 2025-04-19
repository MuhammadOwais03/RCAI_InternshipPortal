"use client";
import { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaTrash } from "react-icons/fa";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

export default function InternshipRequest() {
  const [interns, setInterns] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(""); // State for the Blob URL of the resume
  const [resumeLoading, setResumeLoading] = useState(false); // Loading state for the resume
  const [resumeError, setResumeError] = useState(null); // Error state for the resume

  // Fetch interns on mount
  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const response = await fetch("/api/request-data");
        const data = await response.json();
        if (response.ok) {
          setInterns(data);
        } else {
          throw new Error(data.error || "Failed to fetch interns");
        }
      } catch (err) {
        console.error("Error fetching interns:", err);
        setError("Failed to load interns. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchInterns();
  }, []);

  // Convert base64 resume data to Blob URL when selectedIntern changes
  useEffect(() => {
    if (!selectedIntern?.resume) {
      setResumeUrl("");
      return;
    }

    const convertBase64ToBlobUrl = async (base64Data) => {
      try {
        setResumeLoading(true);
        setResumeError(null);

        // Decode the base64 string to a binary string
        const byteCharacters = atob(base64Data);

        // Convert the binary string to a byte array
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        // Create a Blob from the byte array
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);
        setResumeUrl(url);
      } catch (err) {
        console.error("Error converting base64 to Blob URL:", err);
        setResumeError("Failed to load resume. The file may be corrupted.");
      } finally {
        setResumeLoading(false);
      }
    };

    // Convert the base64 resume data to a Blob URL
    if (selectedIntern.resume) {
      convertBase64ToBlobUrl(selectedIntern.resume);
    }

    // Cleanup the Blob URL when the drawer closes or selectedIntern changes
    return () => {
      if (resumeUrl) {
        URL.revokeObjectURL(resumeUrl);
        setResumeUrl("");
      }
    };
  }, [selectedIntern]);

  const handleAccept = async (id) => {
    try {
      const response = await fetch("/api/request-data", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, Type: "accept" }),
      });

      const data = await response.json();

      if (response.ok) {
        setInterns((prevInterns) =>
          prevInterns.filter((intern) => intern.id !== id)
        );
        console.log("Intern accepted successfully:", data);
      } else {
        console.error("Failed to accept intern:", data.error || "Unknown error");
        alert(`Error: ${data.error || "Failed to accept intern"}`);
      }
    } catch (error) {
      console.error("Error accepting intern:", error);
      alert("Error: Could not connect to the server");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch("/api/request-data", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, Type: "delete" }),
      });

      const data = await response.json();

      if (response.ok) {
        setInterns((prevInterns) =>
          prevInterns.filter((intern) => intern.id !== id)
        );
        console.log("Intern deleted successfully:", data);
      } else {
        console.error("Failed to delete intern:", data.error || "Unknown error");
        alert(`Error: ${data.error || "Failed to delete intern"}`);
      }
    } catch (error) {
      console.error("Error deleting intern:", error);
      alert("Error: Could not connect to the server");
    }
  };

  const handleRowClick = (intern) => {
    setSelectedIntern(intern);
    setIsDrawerOpen(true);
    console.log("Selected Intern:", intern);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedIntern(null);
    setResumeError(null);
    setResumeLoading(false);
    if (resumeUrl) {
      URL.revokeObjectURL(resumeUrl);
      setResumeUrl("");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 w-full mx-auto py-4 px-2 sm:px-4 lg:px-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
            {/* Header Section */}
            <div className="w-full p-3 sm:p-4 border-b border-gray-300 flex justify-between items-center bg-gray-700 text-white">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                Internship Request
              </h2>
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
                      <th className="px-3 py-2 sm:px-4 sm:py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white text-gray-700 text-xs sm:text-sm">
                    {interns.map((intern, index) => (
                      <tr
                        key={intern.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleRowClick(intern)}
                      >
                        <td className="px-3 py-2 sm:px-4 sm:py-3 text-center">
                          {index + 1}
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3">
                          {intern.firstName} {intern.lastName}
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3">{intern.email}</td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3">{intern.university}</td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3">{intern.department}</td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3">{intern.phone}</td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3">{intern.domain}</td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3 flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(intern.id);
                            }}
                            className="text-red-600 hover:text-red-800 text-base sm:text-lg"
                          >
                            <FaTrash />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAccept(intern.id);
                            }}
                            className="bg-gray-700 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md hover:bg-gray-800 transition text-xs sm:text-sm"
                            disabled={intern.progress === 1}
                          >
                            Accept
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
                    className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRowClick(intern)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-semibold">
                        #{index + 1} {intern.firstName} {intern.lastName}
                      </h3>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>
                        <span className="font-medium">Email:</span> {intern.email}
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
                        <span className="font-medium">Phone:</span> {intern.phone}
                      </p>
                      <p>
                        <span className="font-medium">Domain:</span> {intern.domain}
                      </p>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(intern.id);
                        }}
                        className="text-red-600 hover:text-red-800 text-base"
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAccept(intern.id);
                        }}
                        className="bg-gray-700 text-white px-2 py-1 rounded-md hover:bg-gray-800 transition text-xs"
                        disabled={intern.progress === 1}
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Drawer for Resume */}
      <Transition.Root show={isDrawerOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeDrawer}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-300"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-[90%] sm:max-w-3xl">
                    <div className="flex h-full flex-col bg-white shadow-xl">
                      {/* Drawer Header */}
                      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
                        <Dialog.Title className="text-base sm:text-lg font-semibold text-gray-900">
                          {selectedIntern
                            ? `${selectedIntern.firstName} ${selectedIntern.lastName}'s Resume`
                            : "Resume"}
                        </Dialog.Title>
                        <button
                          type="button"
                          className="text-gray-500 hover:text-gray-700 p-2"
                          onClick={closeDrawer}
                        >
                          <span className="sr-only">Close</span>
                          <svg
                            className="h-5 w-5 sm:h-6 sm:w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Drawer Content */}
                      <div className="flex-1 overflow-y-auto p-1 sm:p-4">
                        {selectedIntern && selectedIntern.resume ? (
                          resumeLoading ? (
                            <p className="text-gray-500 text-xs sm:text-sm">
                              Loading resume...
                            </p>
                          ) : resumeError ? (
                            <p className="text-red-600 text-xs sm:text-sm">
                              {resumeError}
                            </p>
                          ) : resumeUrl ? (
                            <>
                              <iframe
                                src={resumeUrl}
                                className="w-full h-[80vh] sm:h-[90vh] border-none"
                                title="Resume PDF"
                              />
                              <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 sm:mt-4 inline-block text-blue-600 hover:text-blue-800 text-xs sm:text-sm"
                              >
                                Open PDF in new tab
                              </a>
                            </>
                          ) : (
                            <p className="text-gray-500 text-xs sm:text-sm">
                              Failed to load resume.
                            </p>
                          )
                        ) : (
                          <p className="text-gray-500 text-xs sm:text-sm">
                            No resume available.
                          </p>
                        )}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}