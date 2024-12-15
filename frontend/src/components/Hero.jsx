import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleScrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToJoinUs = () => {
    navigate("/joinus");
  };

  return (
    <section className="hero">
      <div className="content">
        <div className="title">
          <h1>LET&apos;S</h1>
          <h1>GET</h1>
          <h1>MOVING</h1>
        </div>
        <div className="sub-title">
          <p>Your Journey to Fitness Starts Here</p>
          <p>Unleash Your Potential</p>
        </div>
        <div className="buttons">
          <button onClick={navigateToJoinUs}>Start Your Journey</button>
          <button onClick={() => handleScrollToSection("pricing-section")}>
            Discover Your Plan
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
