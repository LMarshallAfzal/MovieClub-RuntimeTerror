import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'sidebar-text'
    },
    {
        title: 'Clubs',
        path: '/',
        icon: <MdIcons.MdGroups />,
        cName: 'sidebar-text'
    },
    {
        title: 'Movies',
        path: '/',
        icon: <MdIcons.MdMovie />,
        cName: 'sidebar-text'
    },
    {
        title: 'What\'s on',
        path: '/',
        icon: <BsIcons.BsCollectionPlayFill />,
        cName: 'sidebar-text'
    },
    {
        title: 'Profile',
        path: '/',
        icon: <FaIcons.FaUserEdit />,
        cName: 'sidebar-text'
    },
    {
        title: 'Options',
        path: '/',
        icon: <IoIcons.IoMdSettings />,
        cName: 'sidebar-text'
    },
]
