import { useState } from 'react';
import axios from 'axios';
import './joinus.css';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const FitnessPackageForm = () => {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // Track message type (success or error)
  const navigate = useNavigate(); // Initialize the navigate function

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBack = () => {
    navigate('/'); // Navigate to the home page ("/")
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);  // Check the form data
    try {
      const response = await axios.post('http://localhost:4000/api/fitness-package', formData);
      if (response.status === 200) {
        setMessage('Welcome to our Fitness Edge Family!');
        setMessageType('success'); // Set the message type to 'success'
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('There was an error submitting the form. Please try again.');
      setMessageType('error'); // Set the message type to 'error'
    }
  };

  return (
    <div className="fitness-form-container">
      {/* Display success or error message */}
      {message && (
        <div className={`message ${messageType === 'success' ? 'success-message' : 'error-message'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="fitness-form">
        {/* Personal Information Section */}
        <h2 className="section-title">Personal Information</h2>
        <label className="form-label">
          Full Name:
          <input
            type="text"
            name="fullName"
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Age:
          <input
            type="number"
            name="age"
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Gender:
          <select
            name="gender"
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label className="form-label">
          Date of Birth:
          <input
            type="date"
            name="dob"
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Contact Number:
          <input
            type="tel"
            name="contactNumber"
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Email Address:
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Address:
          <textarea
            name="address"
            onChange={handleChange}
            required
            className="form-textarea"
          />
        </label>

        {/* Fitness Goals Section */}
        <h2 className="section-title">Fitness Goals and Preferences</h2>
        <label className="form-label">
          Preferred Training Package:
          <select
            name="trainingPackage"
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Select</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Half-Yearly">Half-Yearly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </label>
        <label className="form-label">
          Primary Fitness Goals:
          <input
            type="text"
            name="fitnessGoals"
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Preferred Training Mode:
          <select
            name="trainingMode"
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Select</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </label>
        <label className="form-label">
          Preferred Time Slot:
          <select
            name="timeSlot"
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Select</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </label>

        {/* Health Information Section */}
        <h2 className="section-title">Health and Medical Information</h2>
        <label className="form-label">
          Current Fitness Level:
          <select
            name="fitnessLevel"
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Select</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </label>
        <label className="form-label">
          Any Pre-existing Medical Conditions:
          <textarea
            name="medicalConditions"
            onChange={handleChange}
            className="form-textarea"
          />
        </label>
        <label className="form-label">
          Current Medications:
          <textarea
            name="currentMedications"
            onChange={handleChange}
            className="form-textarea"
          />
        </label>
        <label className="form-label">
          Emergency Contact Details:
          <input
            type="text"
            name="emergencyContact"
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>

        {/* Payment Section */}
        <h2 className="section-title">Payment and Administrative Details</h2>
        <label className="form-label">
          Package Start Date:
          <input
            type="date"
            name="startDate"
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Preferred Payment Method:
          <select
            name="paymentMethod"
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Select</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="UPI">UPI</option>
          </select>
        </label>
        <label className="form-label">
          <input
            type="checkbox"
            name="termsAndConditions"
            onChange={(e) =>
              setFormData({ ...formData, termsAndConditions: e.target.checked })
            }
            required
            className="form-checkbox"
          />
          I acknowledge the Terms and Conditions
        </label>
        <label className="form-label">
          <input
            type="checkbox"
            name="dataConsent"
            onChange={(e) =>
              setFormData({ ...formData, dataConsent: e.target.checked })
            }
            required
            className="form-checkbox"
          />
          I consent to the use of my personal data for training purposes
        </label>

        {/* Submit Button */}
        <button type="submit" className="form-submit">
          Submit
        </button>
      </form>
      {/* Back Button */}
      <button onClick={handleBack} className="form-back">
        Back to Home
      </button>
    </div>
  );
};

export default FitnessPackageForm;
