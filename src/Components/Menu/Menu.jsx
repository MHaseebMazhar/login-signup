import React from "react";
import "./Menu.css";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/home");
  };
  const handleAboutUsClick = () => {
    navigate("/about-us");
  };
  const handleContactUsClick = () => {
    navigate("/contact-us");
  };
  const handleOurServicesClick = () => {
    navigate("/our-services");
  };
  const handlePortfolioClick = () => {
    navigate("/portfolio");
  };
  const handleBlogClick = () => {
    navigate("/blog");
  };
  const handleCareerClick = () => {
    navigate("/career");
  };
  const handleSettingClick = () => {
    navigate("/setting");
  };

  return (
    <div>
      <h1 className="Menu">Menu</h1>
      <div className="menu-container">
        <div className="menu-item" onClick={handleHomeClick}>Home</div>
        <div className="menu-item" onClick={handleAboutUsClick}>About Us</div>
        <div className="menu-item" onClick={handleContactUsClick}>Contact Us</div>
        <div className="menu-item" onClick={handleOurServicesClick}>Our Services</div>
        <div className="menu-item" onClick={handlePortfolioClick}>Portfolio</div>
        <div className="menu-item" onClick={handleBlogClick}>Blog</div>
        <div className="menu-item" onClick={handleCareerClick}>Career</div>
        <div className="menu-item" onClick={handleSettingClick}>Setting</div>
      </div>



    </div>
  );
};

export default Menu;
