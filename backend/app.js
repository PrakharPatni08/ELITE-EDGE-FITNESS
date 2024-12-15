import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { contactSchema } from './models/contactModel.js';  // Correct relative path
import { fitnessPackageSchema } from './models/fitnessPackageModel.js';  // Correct import path
import { sendEmail } from './utils/sendEmail.js'; // Correct import path for sendEmail

// Load environment variables from config.env file
dotenv.config({ path: './config.env' });

const app = express();
app.use(cors());
app.use(bodyParser.json()); // To parse JSON bodies
const PORT = process.env.PORT || 4000;

// MongoDB connection
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'fitnessApp',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit on MongoDB connection failure
  }
};

connectToMongoDB();

// Routes for handling contact form and sending email
app.post('/send/mail', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Save contact message in the database
    const newMessage = new contactSchema({ name, email, message });
    await newMessage.save();

    // Send email using the sendEmail function
    await sendEmail({
      email: process.env.RECIPIENT_EMAIL,  // Recipient's email (can be passed from frontend or stored in .env)
      subject: `Message from ${name}`,     // Subject of the email
      message: message,                    // Message content
      userEmail: email,                    // Sender's email
    });

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
});

// Routes for handling fitness package form
app.post('/api/fitness-package', async (req, res) => {
  try {
    const fitnessPackage = new fitnessPackageSchema(req.body);
    await fitnessPackage.save();
    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Failed to submit the form.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
