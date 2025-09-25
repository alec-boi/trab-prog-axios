import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Styles/Header.module.css';

function Header() {
    return (
        <div className={styles.header + ' w-full h-38 px-56 py-6'}>
            <nav className='w-full flex items-center justify-between px-0 py-4 text-lg text-white font-plex'>
                <span className='logo text-5xl text-red-500 text-shadow-none font-bold font-federo'>Logo</span>

                <ul className='flex gap-16'>
                    <li className='inline-block py-2 after:bg-red-500 hover:text-red-500'>
                        <Link to="/" className='font-bold'>Home</Link>
                    </li>
                    <li className='inline-block py-2 after:bg-red-500 hover:text-red-500'>
                        <Link to="/list" className='font-bold'>List</Link>
                    </li>
                    <li className='inline-block py-2 after:bg-red-500 hover:text-red-500'>
                        <Link to="/about" className='font-bold'>About</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;
