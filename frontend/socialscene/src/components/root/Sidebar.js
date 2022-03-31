import React from 'react';
import "../../styling/components/Sidebar.css";
import {Link, useLocation} from "react-router-dom";

function sidebar(props) {

    // const tabs = [
    // {title: 'home', path: ''},
    // {title: 'profile', path: 'profile'},
    // {title: 'movies', path: 'movies'},
    // {title: 'clubs', path: 'clubs'},
    // {title: 'discussion', path: 'discussion'},
    // {title: 'options', path: 'options'},
    // ]

        return (
            <div className='sidebar'>

                <ul className='sidebar-list'>

                    {props.tabs.map((item, index) => {

                        return (

                            <li
                                key={index}
                                className={"sidebar-list-item"}
                                id={props.current === (item.title) ? "active" : ""}>

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
        );
    }

export default sidebar
