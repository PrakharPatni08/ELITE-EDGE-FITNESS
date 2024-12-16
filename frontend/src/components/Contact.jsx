import axios from "axios";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Sending data:", { name, email, message });
  
      const { data } = await axios.post(
        "http://localhost:4000/api/contact",  // Ensure this matches your backend
        { name, email, message },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      
  
      setName("");
      setEmail("");
      setMessage("");
      toast.success(data.message);
    } catch (error) {
      setLoading(false);
      console.error('Error details:', error.response?.data || error.message || error);

      const errorMessage = error.response?.data?.message || error.message || 'Something went wrong.';
      toast.error(errorMessage);
    }
  };
  

  return (
    <section className="contact">
      <form onSubmit={sendMail}>
        <h1>CONTACT US</h1>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Message</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
          }}
        >
          {loading && <ClipLoader size={20} color="white" />}
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
