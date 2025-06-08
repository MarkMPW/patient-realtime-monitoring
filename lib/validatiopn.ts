import { z } from 'zod';

const formSchema = z.object({
  firstName: z.string().min(5, "First name must be at least 5 characters long"),
  lastName: z.string().min(5, "Last name must be at least 5 characters long"),
  middleName: z.string().optional(),
  dateOfBirth: z.string().refine((date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime()) && parsedDate <= new Date();
  }, {
    message: "Date of birth must be a valid date and cannot be in the future",
  }),
  gender: z.enum(["male", "female", "other"]),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 characters long"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(10, "Address must be at least 10 characters long"),
  preferredLanguage: z.enum(["thailand", "english", "spanish", "french", "german", "other"]),
  nationality: z.string().min(2, "Nationality must be at least 2 characters long"),
  religion: z.string().optional(),
  emergencyContact: z.object({
    name: z.string().optional(),
    relationship: z.string().optional(),
  }).optional(),
});

export default formSchema;
