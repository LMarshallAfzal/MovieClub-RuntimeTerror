import React from 'react';
import { Link } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './sidebarData'

function sidebar() {
  return (
    <>
      <ul className='sidebar-menu-items'>
        <li className="sidebar-toggle">
          <Link to='#' className='menu-bars'>
            <FaIcons.FaUserCircle />
          </Link>
        </li>
        {SidebarData.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default sidebar