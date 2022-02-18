import React from 'react';
import { NavLink } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './sidebarData'
import "../styling/components/Sidebar.css";

function sidebar() {
  return (
    <>
      <div className='sidebar'>
        <ul className='sidebar-list'>
          {SidebarData.map((item, index) => {
            return (
              <li key={index}
                className={item.cName} //sidebar-text
                id={window.location.pathname == item.path ? "active" : ""}
                onClick={() => { window.location.pathname = item.path; }}>
                <div id='title'>{item.title}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default sidebar