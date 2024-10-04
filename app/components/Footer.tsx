import React from "react";
import { FaLinkedin, FaFacebook, FaEtsy, FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="p-4 bg-black bg-opacity-50 backdrop-filter backdrop-blur-md text-center text-copper-300">
      <div className="container mx-auto">
        <div className="flex justify-center space-x-4 mb-2">
          <a
            href="https://www.linkedin.com/company/hoopsnake"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-2xl hover:text-neon-cyan transition-colors" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61566584246518"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook className="text-2xl hover:text-neon-cyan transition-colors" />
          </a>
          <a
            href="https://www.etsy.com/shop/StickersAndSticks"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Etsy"
          >
            <FaEtsy className="text-2xl hover:text-neon-cyan transition-colors" />
          </a>
          <a
            href="https://github.com/JonathanEdwardLee"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub className="text-2xl hover:text-neon-cyan transition-colors" />
          </a>
        </div>
        <p>© {new Date().getFullYear()} Hoop Snake Designs</p>
      </div>
    </footer>
  );
};

export default Footer;
