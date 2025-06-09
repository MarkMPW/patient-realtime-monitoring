"use client";

import { useState, useEffect } from "react";
import { useAbly } from "@/hooks/useAbly";
import { PatientFormDataType } from "@/interfaces/patientFormData";

interface ActivityStatusMessage {
  status: 'active' | 'inactive' | 'submitted';
}

interface PatientUpdateMessage extends PatientFormDataType {
  data: string
}

interface PatientSubmitMessage extends PatientFormDataType {
  submittedAt: string;
  message: string;
}

const StaffView = () => {
  const [patientData, setPatientData] = useState<PatientFormDataType | null>(null);
  const [activityStatus, setActivityStatus] = useState<ActivityStatusMessage['status']>('inactive');
  const [notification, setNotification] = useState<PatientSubmitMessage | null>(null);
  const { channel, isConnected } = useAbly("patient-form");

  useEffect(() => {
    if (!channel) return;

    // Subscribe to patient updates
    channel.subscribe("patient-update", (message: { data: PatientUpdateMessage }) => {
      setPatientData(message.data);
    });

    // Subscribe to form submissions
    channel.subscribe("patient-submit", (message: { data: PatientSubmitMessage }) => {
      setPatientData(message.data);
      setNotification(message.data);
      // Clear notification after 5 seconds
      setTimeout(() => setNotification(null), 5000);
    });

    // Subscribe to activity status updates
    channel.subscribe("activity-status", (message: { data: ActivityStatusMessage }) => {
      setActivityStatus(message.data.status);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [channel]);

  const getStatusColor = (status: ActivityStatusMessage['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'inactive':
        return 'bg-gray-500';
      case 'submitted':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: ActivityStatusMessage['status']) => {
    switch (status) {
      case 'active':
        return 'Patient is filling the form';
      case 'inactive':
        return 'Patient is inactive';
      case 'submitted':
        return 'Form submitted';
      default:
        return 'Unknown status';
    }
  };

  const renderField = (label: string, value: string | undefined) => (
    <div>
      <p className="staff-title-field">{label}</p>
      <p className="staff-paatient-info">{value ?? "—"}</p>
    </div>
  );

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="container">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span className="text-gray-500">Connecting to real-time updates...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Staff View (LiveObject)
            </h2>
            <div className="flex items-center space-x-4">
              <div className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-gray-500">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-2">
              <div className={`h-3 w-3 rounded-full ${getStatusColor(activityStatus)}`} />
              <span className="text-sm font-medium text-gray-700">
                {getStatusText(activityStatus)}
              </span>
            </div>
          </div>

          {notification && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
              <div className="font-semibold">{notification.message}</div>
              <div className="text-sm mt-1">Patient: {notification.firstName} {notification.lastName}</div>
            </div>
          )}

          <div className="space-y-6">
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderField("First Name", patientData?.firstName)}
                {renderField("Middle Name", patientData?.middleName)}
                {renderField("Last Name", patientData?.lastName)}
                {renderField("Date of Birth", patientData?.dateOfBirth)}
                {renderField("Gender", patientData?.gender)}
              </div>
            </div>
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                {renderField("Phone Number", patientData?.phoneNumber)}
                {renderField("Email Address", patientData?.email)}
                {renderField("Address", patientData?.address)}
              </div>
            </div>
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Additional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderField("Preferred Language", patientData?.preferredLanguage)}
                {renderField("Nationality", patientData?.nationality)}
                {renderField("Religion", patientData?.religion)}
              </div>
            </div>
            {(patientData?.emergencyContact?.name || patientData?.emergencyContact?.relationship) && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Emergency Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderField("Name", patientData?.emergencyContact?.name)}
                  {renderField("Relationship", patientData?.emergencyContact?.relationship)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffView;
