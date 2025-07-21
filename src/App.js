// App.js
import React, { useState, useEffect, useRef } from 'react'; // **FIXED: Added missing useRef import**
import { Play, Pause, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import './App.css';
import myPic from './me.JPG'; // Make sure this path is correct
import myPic2 from './me_2.JPG';

import pcbImage from './pcb.jpg';
import handImage from './hand.jpg';
import pacmanImage from './pacman.jpg';
import clawImage from './claw.jpg';
import gomokuImage from './gomoku.jpg';
import autocompleteImage from './autocomplete.jpg';

// Sample project data - replace with your actual projects
const projectsData = [
  {
    id: 1,
    name: "Radio Transceiver: Class D Amplifier and Low-Pass Filter Design",
    image: pcbImage,
    skills: ["RF Circuit Design", "PCB Layout (Altium)", "Soldering"],
    description: "Designed and simulated a multi-stage Class D RF amplifier and Butterworth low-pass filter using LTspice; validated output using oscilloscope measurements and Python-based FFT analysis, achieving target waveform fidelity with a low distortion of 0.58%. Debugged signal distortion, gate timing errors, and PCB-level faults through staged troubleshooting and frequency-domain analysis, improving amplifier efficiency and ensuring compliance with project performance benchmarks."
  },
  {
    id: 2,
    name: "Piano Posture Wristband",
    image: handImage,
    skills: ["Microcontroller Programming (Arduino)", "Sensor Integration (ToF, IMU)", "Embedded Systems Prototyping"],
    description: "Designed and developed a piano posture assistant for 88Keys children’s music school, integrating real-time feedback and gamification features that improved student posture awareness and increased engagement during practice. Engineered hardware using ultrasonic and ToF sensors with Arduino-based motion tracking, exploring gyroscope integration to assess accuracy potential, which informed optimized sensor selection for reliable posture tracking."
  },
  {
    id: 3,
    name: "FPGA (RISC-V Softcore Processor) Pacman Game",
    image: pacmanImage,
    skills: ["Verilog", "PS/2 Interfacing", "VGA Controller Design"],
    description: "Coded a Pacman game on FPGA using Verilog, leveraging finite state machines for game control, optimized VGA rendering for smooth visuals, and integrated PS/2 keyboard input for responsive player movement, resulting in a fully functional arcade experience. Designed efficient memory mapping to track positions and detect collisions, using real-time debugging with LEDs and HEX displays to verify system correctness."
  },
  {
    id: 4,
    name: "FPGA (RISC-V Softcore Processor) Claw Machine Game",
    image: clawImage,
    skills: ["C++", "Assembly", "Interrupts & Polling"],
    description: "Built a graphics-based claw machine arcade game using C and RISC-V assembly on an FPGA, implementing memory-mapped I/O, PS/2 polling, timer interrupts, and FSM gameplay logic to deliver a real-time embedded game system. Programmed bare-metal firmware to manage synchronization and peripheral control, enabling smooth user interaction and reliable timing within resource-constrained hardware."
  },
  {
    id: 5,
    name: "Autocomplete Software Development",
    image: autocompleteImage,
    skills: ["C", "Binary Search Optimization", "Lexicographic Sorting"],
    description: "Coded autocomplete functionality in C to provide instant text suggestions from a large dataset, enabling low-latency user input and seamless typing experience. Implemented an optimized binary search on lexicographically sorted terms, reducing query lookup time and efficiently handling datasets exceeding 100,000 entries."
  },
  {
    id: 6,
    name: "Robotic American Sign Language (ASL) Glove",
    image: roboglove,
    skills: ["C"],
    description: "Building a wearable glove using flex sensors and an IMU, capturing hand gestures to recognize static ASL letters, and displaying real-time text output on a connected screen to support accessible communication."
  },
  {
    id: 7,
    name: "Circuit Simulator",
    image: circsim,
    skills: ["C++"],
    description: "Programmed a C++ program to parse circuit commands, dynamically manage resistor networks, and accurately calculate node voltages, enabling the development of a simulation tool for complex circuits. Applied object-oriented programming, error handling with C++ streams, and dynamic memory allocation to ensure program reliability and scalability."
  },
  {
    id: 8,
    name: "Ergonomics Monitor",
    image: ergo,
    skills: ["Sensor Integration", "Arduino IDE"],
    description: "Built a screen proximity alert system that promptly warns users when dangerously close to their screens, promoting healthier viewing habits and reducing eye strain risks. Designed and implemented a neck posture monitoring algorithm to detect prolonged neck bending, enabling timely user reminders to prevent strain and improve ergonomics. Developed a light sensing system to detect low ambient light conditions and device usage, enabling context-aware alerts that prompt users to adjust lighting or take breaks."
  },
  {
    id: 9,
    name: "AI for the Game of Gomoku",
    image: gomoku,
    skills: ["Python"],
    description: "Programmed an AI engine for an 8x8 Gomoku game featuring turn-based play and accurate win condition detection, enabling competitive gameplay against human players. Implemented a heuristic evaluation function and optimized board representation with NumPy, significantly improving move calculation speed and enabling real-time decision-making."
  }
];
/*
function ContactForm() {
  const [state, handleSubmit] = useForm("xpwdldnl"); // Replace with your actual form ID from Formspree

  return (
    <section className="section contact-section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>

        {state.succeeded ? (
          <div className="form-success">
            <p>Thank you for your message! I'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Your email"
                required
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="How can I help you?"
                rows="5"
                required
              />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
                className="error-message"
              />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="submit-button"
            >
              {state.submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}

        <div className="contact-info">
          <div className="contact-item">
            <h3>Email</h3>
            <p>keya.shokeen@mail.utoronto.ca</p>
          </div>
          <div className="contact-item">
            <h3>LinkedIn</h3>
            <p>
              <a href="https://linkedin.com/in/keyashokeen" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/keyashokeen
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
*/
function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const carouselRef = useRef(null);

  /*
  Need Effects for when automatic gallery should play but pause pressed
  Need Effects for when paused but play pressed
  */

  /*
  useEffect(() => {
    // code to run when the component loads OR changes
    return () => {
      // cleanup code (like removing event listeners)
    };
  }, [dependencies]);
  */

  // AUTOMATIC BACKGROUND (BY DEFAULT) MOTIONS
  useEffect(() => {
    // not really polling
    let interval;
    // int interval;
    // declares a variable to store the interval id
    if (isPlaying) {
      // only run timer if the slideshow is playing
      interval = setInterval(() => {
        // setInterval() is a built in javascript function
        // a function can be a variable here - odd
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
      }, 2000)
      // just renamed by prevIndex here is currentIndex (most recent currentIndex rather)
    };
    return () => clearInterval(interval);
  }, [isPlaying])

  useEffect(() => {
    if (carouselRef.current) {
      // If DOM element ready and attached, then go ahead and use it
      const cardWidth = carouselRef.current.querySelector('.project-card').offsetWidth; // **FIXED: Added missing cardWidth variable**
      // carouselRef like an object of a class
      // querySelector is a built in DOM method
      // find the first element with class project-card inside the carousel div
      // offsetWidth is a built in DOM property that returns the visible width of an element in pixels
      // ^does not take into account margins (only width + border + padding)
      // ^const width = element.offsetWidth;
      carouselRef.current.scrollTo({
        // scrollTo is also built in for DOMs
        // carouselRef.current can access properties and perform actions
        left: currentIndex * (cardWidth + 16),
        behavior: 'smooth'
        // : just javascript object syntax
        // passing an object with different settings
        // smooth is a built-in string keyword
        // ^: in { key: value } - standard object syntax
      });
      // carouselRef is the ref object (not the class, like a pointer holding the object)
      // carouselRef.current is the DOM element (actual object)
    }
  }, [currentIndex]);

  // MORE SO EVENT LISTENERS (not traditional one, custom)
  const handlePrevious = () => {
    setIsPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projectsData.length) % projectsData.length);
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
  };

  const togglePlayPause = () => {
    /* Alternate Approach:
    if (isPlaying) {
      setIsPlaying(false);
    }
    */
    setIsPlaying(!isPlaying);
  };
  // Alternate Approach below
  // element.addEventListener("click", togglePlayPause);

  const openProjectDetails = (project) => { // **FIXED: Added missing project parameter**
    setSelectedProject(project);
    setIsPlaying(false);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  return (
    <div className="App">
      {/* Header/Hero Section */}
      <header
        className={`header ${scrolled ? 'header-scrolled' : ''}`}
        style={{ backgroundImage: `url(${myPic})` }}
      >
        <div className="overlay"></div>
        <div className="header-content">
          <h1 className="typewriter">Keya Shokeen</h1>
        </div>
      </header>

      {/* About Section */}
      <section className="section about-section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="profile-pic-container">
              <img src={myPic2} alt="Keya Shokeen" className="profile-pic" />
            </div>
            <div className="about-text">
              <h3>Specializing in:</h3>
              <ul>
                <li>Photonics and Semiconductor Physics</li>
                <li>Control, Communication, and Digital Signal Processing</li>
                <li>Computer Hardware and Networks</li>
                <li>Minor in Robotics and Mechatronics</li>
              </ul>
              <p>
                I'm passionate about leveraging my engineering background to solve
                complex problems at the intersection of hardware and software.
                Currently, I'm focusing on research in photonics while developing
                practical applications in signal processing and control systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {/*
      <section className="section projects-section">
        <div className="container">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            // Project 1

            <div className="project-card">
              <h3>Photonics Research Project</h3>
              <p>Research on semiconductor physics and photonic applications</p>
              <div className="tech-stack">
                <strong>Technologies:</strong> MATLAB, Python, Simulation Tools
              </div>
            </div>

            // Project 2
            <div className="project-card">
              <h3>Digital Signal Processing System</h3>
              <p>Communication system with advanced signal processing</p>
              <div className="tech-stack">
                <strong>Technologies:</strong> C++, FPGA, DSP Algorithms
              </div>
            </div>

            // Project 3
            <div className="project-card">
              <h3>Robotics Control System</h3>
              <p>Mechatronics project focusing on precise motion control</p>
              <div className="tech-stack">
                <strong>Technologies:</strong> ROS, Arduino, Control Theory
              </div>
            </div>
          </div>
        </div>
      </section>
      */}
      <section className="projects-section">
        <div className="container">
          <h2 className="section-title">Projects</h2>

          {/* Controls */}
          <div className="carousel-controls">
            <button
              onClick={handlePrevious}
              className="control-button prev-button"
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={togglePlayPause}
              className="control-button play-button"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            <button
              onClick={handleNext}
              className="control-button next-button"
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Carousel */}
          <div className="carousel-container">
            <div
              ref={carouselRef}
              className="carousel"
            >
              {projectsData.map((project) => (
                <div
                  key={project.id}
                  className="project-card"
                >
                  <div className="project-card-inner">
                    <div className="project-image-container">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="project-image"
                      />
                    </div>
                    <div className="project-content">
                      <h3 className="project-title">{project.name}</h3>
                      <div className="project-skills">
                        {project.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="skill-tag"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => openProjectDetails(project)}
                        className="learn-more-button"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress indicator */}
            <div className="progress-indicators">
              {projectsData.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${currentIndex === index ? 'active' : ''}`}
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentIndex(index);
                  }}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Project Details Modal */}
          {selectedProject && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title">{selectedProject.name}</h2>
                  <button
                    onClick={closeProjectDetails}
                    className="close-button"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                <div className="modal-image-container">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    className="modal-image"
                  />
                </div>

                <div className="modal-skills">
                  {selectedProject.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="skill-tag"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="modal-description">{selectedProject.description}</p>

                <div className="modal-actions">
                  <button
                    className="visit-button"
                    onClick={closeProjectDetails}
                  >
                    <ExternalLink size={16} className="icon" />
                    Visit Project
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* <ContactForm /> */}
      <section className="projects-section">
        <div className="container">
          <h2 className="section-title">Get in Touch</h2>
          <form
            action="https://formsubmit.co/keya.shokeen@mail.utoronto.ca"
            method="POST"
            className="contact-form"
          >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" rows="5" required></textarea>
            </div>

            <button type="submit" className="submit-button">Send</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Built by Keya in React</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
