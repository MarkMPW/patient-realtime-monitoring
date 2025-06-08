export interface PatientFormDataType {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string; // ISO date string
  gender: string;
  phoneNumber: string;
  email: string;
  address: string;
  preferredLanguage: string;
  nationality: string;
  religion?: string;
  emergencyContact?: {
    name?: string;
    relationship?: string;
  };
}