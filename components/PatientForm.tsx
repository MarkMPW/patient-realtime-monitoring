"use client";

import { useState } from "react";
import Input from "./Input";
import { PatientFormDataType } from "@/interfaces/patientFormData";
import formSchema from "@/lib/validatiopn";
import z from "zod";

const PatientForm = () => {
  const [patientData, setPatientData] = useState<PatientFormDataType>({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: "",
    preferredLanguage: "",
    nationality: "",
    religion: "",
    emergencyContact: {
      name: "",
      relationship: "",
    },
  });
  const [error, setError] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setPatientData((prevData) => {
      if (name.startsWith("emergencyContact.")) {
        const contactField = name.split(".")[1];

        return {
          ...prevData,
          emergencyContact: {
            ...(prevData.emergencyContact ?? { name: "", relationship: "" }),
            [contactField]: value,
          },
        };
      }

      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const error = await formSchema.parseAsync(patientData);
      console.log("Validation Passed:", error);
    } catch (error) {
      if(error instanceof z.ZodError) {
        const zodError = error.flatten().fieldErrors;
        setError(zodError as any);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Patient Form (LiveObject)
          </h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name *
                </label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="input-form"
                  value={patientData.firstName}
                  onChange={handleInputChange}
                />
                {error.firstName && (
                  <p className="text-red-500 text-sm mt-1">{error.firstName}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="middleName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Middle Name
                </label>
                <Input
                  type="text"
                  id="middleName"
                  name="middleName"
                  className="input-form"
                  value={patientData.middleName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name *
                </label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="input-form"
                  value={patientData.lastName}
                  onChange={handleInputChange}
                />
                {error.lastName && (
                  <p className="text-red-500 text-sm mt-1">{error.lastName}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Birth *
                </label>
                <Input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  required
                  className="input-form"
                  value={patientData.dateOfBirth}
                  onChange={handleInputChange}
                />
                {error.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">{error.dateOfBirth}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender *
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  className="input-form"
                  style={{ padding: "10px 8px" }}
                  value={patientData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {error.gender && (
                  <p className="text-red-500 text-sm mt-1">{error.gender}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"

                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number *
                </label>
                <Input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  className="input-form"
                  value={patientData.phoneNumber}
                  onChange={handleInputChange}
                />
                {error.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{error.phoneNumber}</p>
                )}
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address *
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="input-form"
                  value={patientData.email}
                  onChange={handleInputChange}
                />
                {error.email && (
                  <p className="text-red-500 text-sm mt-1">{error.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  required
                  rows={3}
                  className="input-form"
                  value={patientData.address}
                  onChange={handleInputChange}
                />
                {error.address && (
                  <p className="text-red-500 text-sm mt-1">{error.address}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="preferredLanguage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Preferred Language *
                </label>
                <select
                  id="preferredLanguage"
                  name="preferredLanguage"
                  required
                  className="input-form"
                  style={{ padding: "10px 8px" }}
                  value={patientData.preferredLanguage}
                  onChange={handleInputChange}
                >
                  <option value="">Select Language</option>
                  <option value="thailand">Thailand</option>
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="other">Other</option>
                </select>
                {error.preferredLanguage && (
                  <p className="text-red-500 text-sm mt-1">
                    {error.preferredLanguage}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="nationality"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nationality *
                </label>
                <Input
                  type="text"
                  id="nationality"
                  name="nationality"
                  required
                  className="input-form"
                  value={patientData.nationality}
                  onChange={handleInputChange}
                />
                {error.nationality && (
                  <p className="text-red-500 text-sm mt-1">{error.nationality}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="religion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Religion
                </label>
                <Input
                  type="text"
                  id="religion"
                  name="religion"
                  className="input-form"
                  value={patientData.religion}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Emergency Contact (Optional)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="emergencyContact.name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Emergency Contact Name
                  </label>
                  <Input
                    type="text"
                    id="emergencyContact.name"
                    name="emergencyContact.name"
                    className="input-form"
                    value={patientData.emergencyContact?.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="emergencyContact.relationship"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Relationship
                  </label>
                  <Input
                    type="text"
                    id="emergencyContact.relationship"
                    name="emergencyContact.relationship"
                    className="input-form"
                    value={patientData.emergencyContact?.relationship}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;
