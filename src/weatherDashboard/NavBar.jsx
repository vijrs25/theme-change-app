import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"; // Optional: for better styling

const navLinks = [
  
  { path: "/portfolio", label: "PortFolio" },
  { path: "/login", label: "Login" },
  { path: "/", label: "Weather Dashboard" },
  { path: "/theme", label: "Theme Toggle" },
 // { path: "/test-theme", label: "Test Theme Changer" },
//   { path: "/weatherby", label: "Weather By" },
//   { path: "/pincity", label: "Pin City" },
//   { path: "/fastpincity", label: "Fast Pin City" }
];

function Navbar() {
  return (
    <nav className="navbar">
      {navLinks.map(link => (
        <NavLink
          to={link.path}
          key={link.path}
          end={link.path === "/"}
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navbar;
