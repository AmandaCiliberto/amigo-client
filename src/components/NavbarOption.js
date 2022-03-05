import React from 'react'
import '../css/NavbarOption.css';

//passing Icon component as prop
function NavbarOption({ active, text, icon }) {
  return (
    //modifying the state of 'sidebarOption' to active
    <div className={`sidebarOption ${active && 'sidebarOption--active'}`}>
      {icon}
      <h2>{text}</h2>
    </div>
  )
}

export default NavbarOption;