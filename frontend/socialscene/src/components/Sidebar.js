import React from 'react';
import { SidebarData } from './SidebarData'
import "../styling/components/Sidebar.css";
import {Link, useLocation} from "react-router-dom";

function sidebar() {
  return (
    <>
      <div className='sidebar'>
        <ul className='sidebar-list'>
          {SidebarData.map((item, index) => {
              const location = useLocation();
            return (
              <li key={index} className={"sidebar-list-item"}
                id={location.pathname === (item.path) ? "active" : ""}
              >
                  <Link className={"sidebar-list-link-box"} to={item.path}>
                      <div className={"sidebar-list-link-text"}>
                          {item.title}
                      </div>
                  </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default sidebar
