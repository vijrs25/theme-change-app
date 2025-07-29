// src/components/Navigation.js
import React, { useEffect } from "react";
import { BiAbacus, BiBellOff, BiPhone } from "react-icons/bi";
import { FaLinkedin, FaLinkedinIn, FaSquareGithub } from "react-icons/fa6";
import "./portfolio.css";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';


const Portfoio = () => {

  useEffect(() => {
  AOS.init({
    duration: 700, 
    once: true,     
  });
}, []);

  return (
    <div className="container">
      <div className="formContainer">
        <div className="profileHeader">
          <div className="profileName">
            <h1>Vijay ratan singh</h1>
          </div>
          
          <div >
            <ul className="profileContact">
              <li className="list">
                <BiPhone /> 
                <span style={{fontSize: '19px',}}> 9284094822 </span>
              </li>
              <li className="list">
                <FaSquareGithub />
                <span style={{fontSize: '20px',}}> Github link</span>
              </li>
              <li className="list">
                <FaLinkedin />
                 <span style={{fontSize: '20px',}}> Linkedin </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="profileTopic">
          <div className="topic">
            <div className="topicHead">Summary</div>
            <div className="subTopic" data-aos="fade-up" data-aos-delay="300" >
              Experienced Software Engineer at Cumulus Systems, specializing in
              API development and integration using Java, Linux shell scripting,
              and software package creation/testing. Skilled in optimizing CI/CD
              processes with Jenkins and Docker, managing NoSQL databases, and
              delivering scalable, secure, and efficient software solutions.{" "}
            </div>
          </div>

          <div className="topic">
            <div className="topicHead">Key Skills</div>
            <div className="subTopic" data-aos="slide-up" data-aos-delay="300">
              • Java, Data Structures, Object-Oriented Programming, Spring
              Framework, Spring Boot, RESTful APIs, • Web Development, ReactJS,
              HTML, CSS, JavaScript, C++, Python, Scripting, Automation, •
              MySQL, NoSQL, Database Design, Database Querying, • GitLab,
              GitHub, Version Control, Code Collaboration, Code Management
            </div>
          </div>
          <div className="topic">
            <div className="topicHead">Work Experience</div>
            <div className="subTopic">
               <div className="subTopicHead">Hitachi Systems Trusted Cyber Management (HSTCM) | Software Engineer</div>
      <p>Nov '21 - Present</p>
      <ul>
        <li>
          Designed and developed Java SE-based applications using Servlets, Spring, Spring Boot, creating RESTful Web Services to deliver scalable and efficient backend solutions.
        </li>
        <li>
          Utilized NoSQL databases for optimized data management, leveraged Shell Scripting for automation, and implemented Docker for streamlined containerization and deployment.
        </li>
        <li>
          Integrated Jenkins for Continuous Integration/Continuous Deployment (CI/CD), automating build pipelines to ensure consistent and seamless delivery of software updates.
        </li>
        <li>
          Led Linux-based projects, including RPM and OVA package installation, bug resolution, and implementing effective solutions, while developing shell scripts for automation and managing SSL configurations.
        </li>
      </ul>

            </div>
          </div>
          <div className="topic">
            <div className="topicHead">PROJECTS</div>
            <div className="subTopic">
              <div className="subTopicHead"> Jobs_Made_Easy_Portal_CDAC </div>
              <div className="subTopicDetail">
      <ul>
        <li>
          Demonstrated strong skills in full-stack development, database management, UI/UX design, and automating recruitment processes, positioning the platform as an innovative solution for modern hiring needs.
        </li>
        <li>
          Developed and implemented an online hiring portal to connect recruiters and candidates, streamlining the recruitment process with features like advanced search, real-time application tracking, and automated candidate recommendations.
        </li>
        <li>
          Designed a user-friendly interface and integrated backend systems using Spring Boot, ReactJS & MySQL ensuring secure data management, seamless user experience, and optimized performance.
        </li>
        <li>
          Technologies: Built with Spring Boot, ReactJS, and a robust backend database.
        </li>
      </ul>
              </div>
               <div className="subTopicHead">  Load Flow Analysis on Transmission Line Model and Verification using PSAT
              Software</div>
              <div className="subTopicDetail">
                <ul>
        <li>
          Demonstrated expertise in power system analysis, load flow studies, and simulation tools like PSAT, with a focus on optimizing transmission system performance.
        </li>
        <li>
          Conducted load flow analysis using PSAT software to evaluate the performance, voltage stability, and power distribution of transmission line models under various load conditions.
        </li>
        <li>
          Modeled transmission line parameters such as impedance, reactance, and losses, performing power flow studies to determine voltage levels, current flows, and power losses across the network.
        </li>
        <li>
          Verified simulation results against real-world benchmarks to ensure accuracy, and analyzed system performance under normal, fault, and contingency scenarios for optimization.
        </li>
      </ul></div>
            </div>
          </div>
          <div className="topic">
            <div className="topicHead">Certifications</div>
            <div className="subTopic">
              Full stack development by IIT Roorkee & Intellipaat • DevOps
              Certification by Intellipaat{" "}
            </div>
          </div>
          <div className="topic">
            <div className="topicHead">Education </div>
            <div className="subTopic">
              <stCollege> Centre for Development of Advanced Computing (CDAC) </stCollege>
              <stCourse>Pune Post Graduate Diploma in Advanced Computing (PG-DAC) </stCourse>
              <stDate>Mar '21 - Sep '21</stDate>

              <stCollege> Shri Ramdeo Baba College of Engineering & Management Nagpur </stCollege>
              <stCourse> Bachelor of Technology (BTech) in Electrical Engineering </stCourse>
              <stDate>Aug '15 - Oct '20</stDate>
               
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfoio;
