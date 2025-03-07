"use client"

import { useState } from "react";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: { name: "", email: "", phone: "" },
    education: { degree: "", university: "", year: "" },
    internshipDetails: { position: "", duration: "", skills: "" },
  });

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: { ...formData[section], [field]: value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Personal Information</h2>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.personalInfo.name}
                  onChange={(e) =>
                    handleChange("personalInfo", "name", e.target.value)
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.personalInfo.email}
                  onChange={(e) =>
                    handleChange("personalInfo", "email", e.target.value)
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.personalInfo.phone}
                  onChange={(e) =>
                    handleChange("personalInfo", "phone", e.target.value)
                  }
                  required
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Educational Details</h2>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Degree</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.education.degree}
                  onChange={(e) =>
                    handleChange("education", "degree", e.target.value)
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">University</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.education.university}
                  onChange={(e) =>
                    handleChange("education", "university", e.target.value)
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Graduation Year</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.education.year}
                  onChange={(e) =>
                    handleChange("education", "year", e.target.value)
                  }
                  required
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Internship Details</h2>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Position</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.internshipDetails.position}
                  onChange={(e) =>
                    handleChange("internshipDetails", "position", e.target.value)
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Duration</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.internshipDetails.duration}
                  onChange={(e) =>
                    handleChange("internshipDetails", "duration", e.target.value)
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Skills</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.internshipDetails.skills}
                  onChange={(e) =>
                    handleChange("internshipDetails", "skills", e.target.value)
                  }
                  required
                />
              </div>
            </div>
          )}

          <div className="flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Back
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            )}
            {step === 3 && (
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
