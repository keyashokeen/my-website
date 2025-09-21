// App.js
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Menu, X, Construction } from 'lucide-react';
import './App.css';
import myPic from './me.JPG';
import myPic2 from './me_2.JPG';

import pcbImage from './pcb.png';
import handImage from './hand.jpg';
import pacmanImage from './pacman.jpg';
import clawImage from './claw.jpg';
import gomoku from './gomoku.jpg';
import autocompleteImage from './autocomplete.jpg';
import roboglove from './roboglove.png';
import circsim from './circsim.png';
import ergo from './ergo.png';

// Sample project data
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
    skills: ["Sensor Integration (ToF, IMU)", "Embedded Systems"],
    description: "Designed and developed a piano posture assistant for 88Keys children's music school, integrating real-time feedback and gamification features that improved student posture awareness and increased engagement during practice. Engineered hardware using ultrasonic and ToF sensors with Arduino-based motion tracking, exploring gyroscope integration to assess accuracy potential, which informed optimized sensor selection for reliable posture tracking."
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

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  // Scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    let interval;
    if (isPlaying && activeSection === 'projects') {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeSection]);

  // Carousel scroll effect
  useEffect(() => {
    if (carouselRef.current && activeSection === 'projects') {
      const cardWidth = carouselRef.current.querySelector('.project-card')?.offsetWidth || 0;
      carouselRef.current.scrollTo({
        left: currentIndex * (cardWidth + 16),
        behavior: 'smooth'
      });
    }
  }, [currentIndex, activeSection]);

  const handleEnterSite = () => {
    setShowLanding(false);
  };

  const scrollToSection = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);

    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setIsPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projectsData.length) % projectsData.length);
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Landing Screen
  if (showLanding) {
    return (
      <div className="landing-screen">
        <div className="landing-content">
          <div className="landing-image-container">
            <img src={myPic} alt="Keya Shokeen" className="landing-image" />
          </div>
          <h1 className="landing-title">Welcome to My Portfolio</h1>
          <p className="landing-subtitle">Keya Shokeen - Engineering Student</p>
          <button onClick={handleEnterSite} className="enter-button">
            Enter Site
          </button>
          <div className="wip-notice">
            <Construction size={16} />
            <span>Work in Progress</span>
          </div>
        </div>
        <div className="landing-background"></div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand">
            <img src={myPic} alt="Keya" className="nav-avatar" />
            <span>Keya Shokeen</span>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links">
            <button
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => scrollToSection('about')}
            >
              About Me
            </button>
            <button
              className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={() => scrollToSection('projects')}
            >
              Projects
            </button>
            <button
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </button>
          </div>

          {/* Work in Progress Badge */}
          <div className="wip-badge">
            <Construction size={14} />
            <span>WIP</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <button
              className={`mobile-nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => scrollToSection('about')}
            >
              About Me
            </button>
            <button
              className={`mobile-nav-link ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={() => scrollToSection('projects')}
            >
              Projects
            </button>
            <button
              className={`mobile-nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </button>
          </div>
        )}
      </nav>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="profile-pic-container">
              <img src={myPic2} alt="Keya Shokeen" className="profile-pic" />
            </div>
            <div className="about-text">
              <p>
                I'm passionate about leveraging my engineering background to solve
                complex problems at the intersection of hardware and software.
                Currently, I'm focusing on research in photonics while developing
                practical applications in AI, software, signal processing and control systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <div className="container">
          <h2 className="section-title">Projects</h2>

          {/* Carousel Controls */}
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
            <div ref={carouselRef} className="carousel">
              {projectsData.map((project) => (
                <div key={project.id} className="project-card">
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
                          <span key={index} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <p className="project-description">{project.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Indicators */}
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
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
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

            <button type="submit" className="submit-button">Send Message</button>
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
