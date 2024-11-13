import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";



const Login = () => {
    const navigate = useNavigate();
    const {signInUser,signInWithGoogle} = useContext(AuthContext);
    const [showPassword, setShowPassword]= useState(false);
    const handlePasswordShow = ()=>{
        setShowPassword(!showPassword);
    }
    const handleLogIn = (e)=>{
        e.preventDefault();
        const email = e.target.email.value;
        console.log(email);
        const password = e.target.password.value;
        console.log(password);
        signInUser(email, password)
        .then( result=>{
            console.log(result.user);
            e.target.reset();
            navigate('/');
        })
        .catch(error =>{
            console.log('ERROR: ', error.message);
        })

    }
    const handleGoogleSignIn = ()=>{
      
        signInWithGoogle()
        .then( result=>{
            console.log(result)
            navigate('/');
        })
        .catch( error =>{
            console.log('ERROR: ', error.message);
        })
    }
    return (
        <div className="hero bg-base-200 ">
            <div className="hero-content flex-col ">
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl font-bold">Login now!</h1>
                    
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={showPassword? 'text': 'password'} name='password' placeholder="password" className="input input-bordered" required />
                            <button onClick={handlePasswordShow} className='absolute right-4 top-12'> {showPassword ?  <AiOutlineEye /> : <AiOutlineEyeInvisible />  }  </button>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <p className='ml-4 mb-4 mr-4'>
                        New to this website ? Please <Link to={'/register'}>Register</Link>
                    </p>
                    <p>
                        <button onClick={handleGoogleSignIn}
                         className='btn btn-ghost'>Google</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;