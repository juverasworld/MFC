import { useState, useEffect } from "react";
// import "./styles/Footer.scss";

const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer>
      <p>&copy; {currentYear} My Family Companion. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
