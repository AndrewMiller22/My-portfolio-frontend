import { useState } from "react";
import "./App.css";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

/*
  This React portfolio website uses components to organize the page.
  A component is a reusable section of the website, similar to a small HTML page.
*/

function App() {

  
  // currentPage stores which page the user is currently viewing.
  const [currentPage, setCurrentPage] = useState("home");

  // This function decides which page component should be displayed.
  function renderPage() {
    if (currentPage === "home") {
      return <Home />;
    } else if (currentPage === "about") {
      return <About />;
    } else if (currentPage === "projects") {
      return <Projects />;
    } else if (currentPage === "services") {
      return <Services />;
    } else if (currentPage === "references") {
      return <References />;
    } else if (currentPage === "contact") {
      return <Contact />;
    } else if (currentPage === "admin") {
      return <AdminDashboard />;
    } else {
      return <Home />;
    }
  }

  return (
    <div className="app">
      <Navbar setCurrentPage={setCurrentPage} />

      <main className="main-content">{renderPage()}</main>

      <Footer />
    </div>
  );
}

/* Navbar component */
function Navbar({ setCurrentPage }) {
  return (
    <nav className="navbar">
      <div className="logo-section">
        <img src="/logo.png" alt="Andrew Miller logo" className="logo" />
        <h2>Andrew Miller</h2>
      </div>

      <div className="nav-links">
        <button onClick={() => setCurrentPage("home")}>Home</button>
        <button onClick={() => setCurrentPage("about")}>About Me</button>
        <button onClick={() => setCurrentPage("projects")}>Projects</button>
        <button onClick={() => setCurrentPage("services")}>Services</button>
        <button onClick={() => setCurrentPage("references")}>References</button>
        <button onClick={() => setCurrentPage("contact")}>Contact Me</button>
        <button onClick={() => setCurrentPage("admin")}>Admin</button>
      </div>
    </nav>
  );
}

/* Home page component */
function Home() {
  return (
    <section className="page hero">
      <h1>Welcome to My Personal Portfolio</h1>

      <p>
        My name is Andrew Miller, and this portfolio highlights some of my software
        development skills, projects, services, and professional goals.
      </p>

      <p>
        I am currently building my skills in React, JavaScript, Python,
        databases, and software design.
      </p>

      <h3>Mission Statement</h3>
      <p>
        My goal and passion is to create full stack projects towards financies, crypto technology, and business solutions.
      </p>
    </section>
  );
}

/* About Me page component */
function About() {
  return (
    <section className="page">
      <h1>About Me</h1>

      <div className="about-card">
        <div>
          <h2>Andrew Miller</h2>

          <p>
            I am a Software Engineering Technology student with an interest in backend development,
            finance projects, application development, and business solutions.
          </p>

          <p>
            I enjoy learning how websites and applications are built because it
            allows me to turn ideas into real working systems. I am currently
            improving my skills in Python, React, JavaScript, HTML, CSS, Java, SQL, and
            software design.
          </p>

          <p>
            In the future, I want to use my technical skills to build practical
            applications for businesses, customers, crypto, and personal projects.
          </p>

          <a href="/Resume-2.pdf" target="_blank" rel="noopener noreferrer">
            View My Resume
          </a>
        </div>
      </div>
    </section>
  );
}

/* Projects page component */
function Projects() {
  const [visibleProjectImages, setVisibleProjectImages] = useState(null);

  const projects = [
    {
      title: "Financial Tracker App",
      description:
        "A financial application concept that helps users track spending, set goals, and review reports over 3-month, 6-month, and 12-month periods.",
      role: "I planned the requirements, use cases, and user stories for the system.",
      outcome:
        "This project helped me understand how software can support better financial habits.",
      images: [],
    },
    {
      title: "PC Parts Price Comparison Tool",
      description:
        "A browser extension idea that compares PC part prices and helps users build compatible computers based on their budget.",
      role: "I worked on the idea, frontend structure, search logic, and backend API planning.",
      outcome:
        "This project helped me practice JavaScript, APIs, and problem-solving for real users.",
      images: ["/browser-extension-1.png", "/browser-extension-2.png"],
    },
    {
      title: "Pressure Washing Quote Calculator",
      description:
        "A web-based quote calculator that allows customers to choose a service and enter square footage to receive a price estimate.",
      role: "I planned the service options, pricing logic, and customer information flow.",
      outcome:
        "This project connected my software skills with a real local service business idea.",
      images: [],
    },
  ];

  function toggleImages(index) {
    if (visibleProjectImages === index) {
      setVisibleProjectImages(null);
    } else {
      setVisibleProjectImages(index);
    }
  }

  return (
    <section className="page">
      <h1>Projects</h1>

      <div className="card-grid">
        {projects.map((project, index) => (
          <article className="card" key={index}>
            <h2>{project.title}</h2>

            <h3>Description</h3>
            <p>{project.description}</p>

            <h3>My Role</h3>
            <p>{project.role}</p>

            <h3>Outcome</h3>
            <p>{project.outcome}</p>

            {project.images.length > 0 && (
              <button
                className="image-toggle-button"
                onClick={() => toggleImages(index)}
              >
                {visibleProjectImages === index ? "Hide Images" : "View Images"}
              </button>
            )}

            {visibleProjectImages === index && (
              <div className="project-images">
                {project.images.map((image, imageIndex) => (
                  <img
                    key={imageIndex}
                    src={image}
                    alt={`${project.title} screenshot ${imageIndex + 1}`}
                  />
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}


/* Services page component */
function Services() {
  const services = [
    "Basic web page development",
    "React website development",
    "Mobile-responsive website design",
    "JavaScript form validation",
    "Basic database design support",
    "Programming support in Java, JavaScript, and SQL",
  ];

  return (
    <section className="page">
      <h1>Services</h1>

      <p>
        These are services I can offer as I continue developing my skills as a
        software student and full-stack developer.
      </p>

      <ul className="service-list">
        {services.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
    </section>
  );
}

/* References page component */
function References() {
  const references = [
    {
      name: "Course Instructor",
      position: "Professor",
      testimonial:
        "Andrew shows effort in learning programming concepts and improving his technical skills.",
    },
    {
      name: "Project Team Member",
      position: "Classmate",
      testimonial:
        "Andrew contributes ideas, communicates with the group, and works toward completing project goals.",
    },
    {
      name: "Local Service Customer",
      position: "Customer",
      testimonial:
        "Andrew demonstrated professionalism, effort, and attention to detail while completing the job.",
    },
  ];

  return (
    <section className="page">
      <h1>References</h1>

      <div className="card-grid">
        {references.map((reference, index) => (
          <article className="card" key={index}>
            <p>"{reference.testimonial}"</p>
            <h2>{reference.name}</h2>
            <p>{reference.position}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* Contact page component */
function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    try {
      if (
        formData.firstName === "" ||
        formData.lastName === "" ||
        formData.email === "" ||
        formData.message === ""
      ) {
        setErrorMessage("Please complete all required fields.");
        setSuccessMessage("");
        return;
      }

      setErrorMessage("");
      setSuccessMessage("Thank you! Your message has been captured.");

      console.log("Contact form data:", formData);
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      console.log(error);
    }
  }

  return (
    <section className="page">
      <h1>Contact Me</h1>

      <p>Email: andrewmiller_1@outlook.com</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          First Name *
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>

        <label>
          Last Name *
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>

        <label>
          Contact Number
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </label>

        <label>
          Email Address *
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Message *
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </label>

        <button type="submit">Send Message</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {successMessage && <p className="success-message">{successMessage}</p>}
    </section>
  );
}

/* Footer component */
function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2026 Andrew Miller. All rights reserved.</p>
    </footer>
  );
}


export default App;
