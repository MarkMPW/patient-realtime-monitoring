import React from "react";

const StaffForm = () => {

  // mock emergncy contact data
  let patientData = {
    emergencyContact: {
      name: "John Doe",
      relationship: "Brother",
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Staff View (LiveObject)
            </h2>
          </div>
          <div className="space-y-6">
            <div className="border-b pb-6">
              <h3 className="staff-h3">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="staff-title-field">
                    First Name
                  </p>
                  <p className="staff-paatient-info">Patient Firstname</p>
                </div>
                <div>
                  <p className="staff-title-field">
                    Middle Name
                  </p>
                  <p className="staff-paatient-info">Middle name</p>
                </div>
                <div>
                  <p className="staff-title-field">Last Name</p>
                  <p className="staff-paatient-info">Patient Lastname</p>
                </div>
                <div>
                  <p className="staff-title-field">
                    Date of Birth
                  </p>
                  <p className="staff-paatient-info">Patient Date of Birth</p>
                </div>
                <div>
                  <p className="staff-title-field">Gender</p>
                  <p className="staff-paatient-info">Patient Gender</p>
                </div>
              </div>
            </div>
            <div className="border-b pb-6">
              <h3 className="staff-h3">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="staff-title-field">
                    Phone Number
                  </p>
                  <p className="staff-paatient-info">Patient Phone Number</p>
                </div>
                <div>
                  <p className="staff-title-field">
                    Email Address
                  </p>
                  <p className="staff-paatient-info">Patient Email Address</p>
                </div>
                <div>
                  <p className="staff-title-field">Address</p>
                  <p className="staff-paatient-info">Patient Address</p>
                </div>
              </div>
            </div>
            <div className="border-b pb-6">
              <h3 className="staff-h3">
                Additional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="staff-title-field">
                    Preferred Language
                  </p>
                  <p className="staff-paatient-info">
                    Patient Preferred Language
                  </p>
                </div>
                <div>
                  <p className="staff-title-field">
                    Nationality
                  </p>
                  <p className="staff-paatient-info">Patient Nationality</p>
                </div>
                <div>
                  <p className="staff-title-field">Religion</p>
                  <p className="staff-paatient-info">Patient Religion</p>
                </div>
              </div>
            </div>
            {patientData.emergencyContact && (
              <div>
                <h3 className="staff-h3">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="staff-title-field">Name</p>
                    <p className="staff-paatient-info">{patientData.emergencyContact.name}</p>
                  </div>
                  <div>
                    <p className="staff-title-field">Relationship</p>
                    <p className="staff-paatient-info">{patientData.emergencyContact.relationship}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffForm;
