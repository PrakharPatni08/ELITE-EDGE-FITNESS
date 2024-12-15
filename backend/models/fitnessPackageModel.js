import mongoose from 'mongoose';

const fitnessPackageSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  trainingPackage: { type: String, required: true },
  fitnessGoals: { type: String, required: true },
  trainingMode: { type: String, required: true },
  timeSlot: { type: String, required: true },
  fitnessLevel: { type: String, required: true },
  medicalConditions: String,
  currentMedications: String,
  emergencyContact: { type: String, required: true },
  activityLevel: { type: String, required: true },
  exerciseRoutine: String,
  dietaryPreferences: String,
  startDate: { type: Date, required: true },
  paymentMethod: { type: String, required: true },
  termsAndConditions: { type: Boolean, required: true },
  dataConsent: { type: Boolean, required: true },
}, { timestamps: true });

export { fitnessPackageSchema };
