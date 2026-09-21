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
   
        <button onClick={() => setCurrentPage("contact")}>Contact Me</button>
        
      </div>
    </nav>
  );
}

/* Home page component */
function Home() {
  return (
    <section className="page hero">
      <h1>Hey, I'm <span className="hero_name">Andrew Miller.</span></h1>

      <p>
        I'm a Software Engineer and this portfolio highlights some of my software
        development skills, projects, services, and professional goals.
      </p>

      <p>
        I am currently building my skills in React, JavaScript, Python,
        databases, and software design.
      </p>

      <h3>Mission Statement</h3>
      <p>
        My goal and passion is to create full stack projects towards finance, crypto technology, and business solutions.
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
            software design. I do plan on picking up C++ starting September 2026 to truly expand my possibilities.
          </p>

          <p>
            In the future, I want to use my technical skills to build practical
            applications for businesses, customers, crypto, and personal projects.
          </p>

          <a href="/andrew-miller-resume.pdf" target="_blank" rel="noopener noreferrer">
            View My Resume
          </a>
        </div>
      </div>
    </section>
  );
}

/* Projects page component */
function Projects() {
  // null means the project-selection screen is displayed.
  // When a card is clicked, this stores the selected project.
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Financial Tracker App",

      shortDescription:
        "A financial application for tracking spending, setting goals, and reviewing financial progress.",

      description:
        "The Financial Tracker helps users understand their spending habits, create savings goals, and review reports across different time periods.",

      role:
        "I planned the application requirements, use cases, user stories, account-management flow, and financial-tracking features.",

      challenge:
        "The main challenge was organizing several financial features into a system that remained understandable and easy to navigate.",

      outcome:
        "This project strengthened my understanding of application planning, financial software, use cases, and system design.",

      technologies: ["React", "JavaScript", "Node.js", "MongoDB"],

      video: "/videos/financial-tracker-demo.mp4",

      // Add the real links when available.
      liveUrl: "",
      githubUrl: ""
    },

    {
      id: 2,
      title: "PC Parts Price Comparison Tool",

      shortDescription:
        "A browser-based tool for comparing PC-part prices and planning compatible computer builds.",

      description:
        "This application helps users compare computer-component prices while considering compatibility and their overall budget.",

      role:
        "I worked on the project idea, frontend structure, product-search logic, and backend API planning.",

      challenge:
        "The main challenge was organizing product information from different sources and presenting useful comparisons clearly.",

      outcome:
        "This project helped me practise JavaScript, API planning, search functionality, and problem-solving for real users.",

      technologies: ["JavaScript", "Browser APIs", "HTML", "CSS"],

      video: "/videos/pc-parts-demo.mp4",
      liveUrl: "",
      githubUrl: ""
    },

    {
      id: 3,
      title: "Pressure Washing Quote Calculator",

      shortDescription:
        "A quote-calculation application that generates service estimates based on customer selections.",

      description:
        "Customers select a pressure-washing service, provide the required measurements, and receive an estimated price.",

      role:
        "I planned the service options, pricing calculations, customer-information flow, and quote-generation process.",

      challenge:
        "The main challenge was translating real service-pricing rules into consistent application logic.",

      outcome:
        "This project connected my software-development skills with a practical local service-business problem.",

      technologies: ["React", "JavaScript", "CSS"],

      video: "/videos/pressure-washing-demo.mp4",
      liveUrl: "",
      githubUrl: ""
    }
  ];

  // Display the full view when a project has been selected.
  if (selectedProject) {
    return (
      <section className="page projects-page">
        <div className="project-detail">
          <button
            type="button"
            className="project-back-button"
            onClick={() => setSelectedProject(null)}
          >
            ← Back to Projects
          </button>

          <div className="project-detail-heading">
            <p className="project-label">FEATURED PROJECT</p>

            <h1>{selectedProject.title}</h1>

            <p>{selectedProject.shortDescription}</p>

            <div className="technology-list">
              {selectedProject.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </div>

          <div className="project-detail-layout">
            <div className="project-video-container">
              <video controls preload="metadata">
                <source
                  src={selectedProject.video}
                  type="video/mp4"
                />

                Your browser does not support HTML video.
              </video>
            </div>

            <div className="project-information">
              <div>
                <h2>About the Project</h2>
                <p>{selectedProject.description}</p>
              </div>

              <div>
                <h2>My Contribution</h2>
                <p>{selectedProject.role}</p>
              </div>

              <div>
                <h2>Technical Challenge</h2>
                <p>{selectedProject.challenge}</p>
              </div>

              <div>
                <h2>Outcome</h2>
                <p>{selectedProject.outcome}</p>
              </div>

              <div className="project-link-buttons">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="project-primary-link"
                  >
                    Open Live Demo
                  </a>
                )}

                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="project-secondary-link"
                  >
                    View Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Display all project cards when selectedProject is null.
  return (
    <section className="page projects-page">
      <div className="projects-heading">
        <p className="project-label">MY WORK</p>

        <h1>Featured Projects</h1>

        <p>
          Select a project to watch its demonstration and explore the
          decisions behind its development.
        </p>
      </div>

      <div className="project-selection-grid">
        {projects.map((project) => (
          <button
            type="button"
            className="project-selection-card"
            key={project.id}
            onClick={() => setSelectedProject(project)}
          >
            <span className="project-number">
              {String(project.id).padStart(2, "0")}
            </span>

            <h2>{project.title}</h2>

            <p>{project.shortDescription}</p>

            <div className="project-card-technologies">
              {project.technologies.slice(0, 3).map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>

            <span className="project-view-text">
              View Project →
            </span>
          </button>
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
