import React, { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Navbar = () => {

    // const authInformation = useContext(AuthContext);
    const { user, setUser, signOutUser } = useContext(AuthContext);

    const {imageUrl, setImageUrl}= useContext(AuthContext);

    // console.log(authInformation);
    // console.log(name);
    // console.log(user.photoURL);
    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/login'}>Login</NavLink></li>
        <li><NavLink to={'/register'}>Register</NavLink></li>
        {
            user && <>
                <li><NavLink to={'/orders'}>Orders</NavLink></li>
                <li><NavLink to={'/profile'}>Profile</NavLink></li>
            </>
        }


    </>

    const handleLogOut = () => {
        signOutUser()
            .then(() => {

                console.log('Successfully Logged Out');
               setUser('');
            })
            .catch((error) => {
                console.log('ERROR: ', error.message);
            })
    }

    // useEffect( ()=>{
    //     setImageUrl('');
    // },[handleLogOut]);


    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">

                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">DaisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <div className='flex gap-2 items-center'>
                         <div className="avatar">
                            <div className="w-10 h-10 rounded-full">
                                <img src={user.photoURL} />
                            </div>
                        </div>
                        <span>{user?.email}</span>
                        <button onClick={handleLogOut} className='btn'>Log Out</button>
                       </div> : <div>
                       
                        <Link to={'/login'}>Login</Link>
                    </div>
                }

            </div>
        </div>
    );
};

export default Navbar;