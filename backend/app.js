// app.js
import express from "express";
import { config } from "dotenv";
import cors from "cors"; // Use ES Module import for cors
import mongoose from "mongoose";
import { sendEmail } from "./utils/sendEmail.js"; // Import the sendEmail module

// Load environment variables
config({ path: "./config.env" });
console.log("Environment variables loaded:", process.env.MONGODB_URI);

// Initialize express app
const app = express();

// Middleware setup
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // No need to require cors again
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
    console.error("Full Error:", err);
  });

// Define Mongoose schema for Contact form
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const Contact = mongoose.model("Contact", contactSchema);

// Define Mongoose schema for Fitness Package form
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
  medicalConditions: { type: String },
  currentMedications: { type: String },
  emergencyContact: { type: String, required: true },
  startDate: { type: Date, required: true },
  paymentMethod: { type: String, required: true },
  termsAndConditions: { type: Boolean, required: true },
  dataConsent: { type: Boolean, required: true },
});

const FitnessPackage = mongoose.model("FitnessPackage", fitnessPackageSchema);

// API Route for Contact form submission
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    // Save data to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Send email to prakharpatni321@gmail.com
    try {
      await sendEmail({
        email: "prakharpatni321@gmail.com",
        subject: `New Contact Form Submission from ${name}`,
        message: `You have received a new message from your contact form.

Name: ${name}
Email: ${email}
Message: ${message}`,
      });
      console.log("Email sent successfully.");
    } catch (emailError) {
      console.error("Error sending email:", emailError.message);
    }

    res.status(200).json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Error saving contact form data:", error);
    res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
  }
});

// API Route for Fitness Package form submission
app.post("/api/fitness-package", async (req, res) => {
  const formData = req.body;

  try {
    // Save data to MongoDB
    const newFitnessPackage = new FitnessPackage(formData);
    await newFitnessPackage.save();

    res.status(200).json({ success: true, message: "Form submitted successfully." });
  } catch (error) {
    console.error("Error saving fitness package data:", error);
    res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

