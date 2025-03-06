import React from "react";
import "./Menu.css";
const Menu = () => {
  return (
    <div>
      <h1 className="Menu">Menu</h1>
      <div className="menu-container" onClick={() => alert("Clicked")}>
        <div className="menu-item">Dashboard
         
          
        </div>
        <div className="menu-item">Menu</div>
        <div className="menu-item">Home</div>
        <div className="menu-item">About</div>
        <div className="menu-item">Contact</div>
        <div className="menu-item">Services</div>
        <div className="menu-item">Portfolio</div>
        <div className="menu-item">Blog</div>
        <div className="menu-item">Career</div>
        <div className="menu-item">Setting</div>
      </div>



    </div>
  );
};

export default Menu;
