import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';

export const SidebarData = [
    {
        title: 'home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'sidebar-text'
    },
    {
        title: 'dashboard',
        path: '/dashboard',
        icon: <MdIcons.MdSpaceDashboard />,
        cName: 'sidebar-text'
    },
    {
        title: 'clubs',
        path: '/',
        icon: <MdIcons.MdGroups />,
        cName: 'sidebar-text'
    },
    {
        title: 'movies',
        path: '/',
        icon: <MdIcons.MdMovie />,
        cName: 'sidebar-text'
    },
    {
        title: 'what\'s on',
        path: '/',
        icon: <BsIcons.BsCollectionPlayFill />,
        cName: 'sidebar-text'
    },
    {
        title: 'profile',
        path: '/profile',
        icon: <FaIcons.FaUserEdit />,
        cName: 'sidebar-text'
    },
    {
        title: 'options',
        path: '/',
        icon: <IoIcons.IoMdSettings />,
        cName: 'sidebar-text'
    },
]
