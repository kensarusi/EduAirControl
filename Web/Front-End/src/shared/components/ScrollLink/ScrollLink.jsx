import { useNavigate, useLocation } from "react-router-dom";

function ScrollLink({ to, children, className }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    e.preventDefault();

    const scrollToSection = () => {
      const section = document.getElementById(to);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    if (location.pathname !== "/landing") {
      navigate("/landing");

      setTimeout(scrollToSection, 300);
    } else {
      scrollToSection();
    }
  };

  return (
    <a href={`#${to}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

export default ScrollLink;