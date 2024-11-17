import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase.init';

const Register = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');


    
    const { createUser, sendVerification, imageUrl, setImageUrl } = useContext(AuthContext);

   
   
    const handlePasswordShow = () => {
        setShowPassword(!showPassword);
    }

    
    const navigate = useNavigate();
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleRegister = e => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const photo = e.target.photo.value;
        const terms = e.target.terms.checked;

        // console.log(photo);

        setImageUrl(photo);
      

          
       
        // console.log(name, email, password, terms, photo);

      


     

        setErrorMessage('');
        setSuccessMessage('');
        setSuccess(false);
        // setVerificationMessage('');
        if (!terms) {
            return;
        }
        if (!regex.test(password)) {
            setErrorMessage('Password should be at least one upper case letter, one lower case letter, one digit, one special character and total length should be at least 8');
            return;
        }
        createUser(email, password)
            .then(result => {
              
                e.target.reset();
                // navigate('/');
                // send verification email address 
                sendVerification()
                    .then(() => {
                        // console.log('Verification email send');
                        // setVerificationMessage('Verification email send');
                    })

                const profile= {
                    displayName: name,
                    email: email,
                    photoURL: photo,
                }
                // console.log(profile);
          

                updateProfile(auth.currentUser, profile)
                .then( ()=>{

                })
                .catch( error =>{
                    setErrorMessage(error.errorMessage);
                })

                // console.log(result);



                setSuccess(true);
                setErrorMessage('');
                setSuccessMessage('Successfully Registered and Send email verification. Please verify!');
            })
            .catch(error => {
                // console.log('ERROR:', error.message);
                setErrorMessage(error.message);
            })




    }
    // useEffect( ()=>{
    //     setImageUrl('');
    // },[handleRegister]);
    return (
        <div className="hero bg-base-200 ">
            <div className="hero-content flex-col ">
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl font-bold">Register now!</h1>

                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                        </div>
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
                            <input type={showPassword ? 'text' : 'password'} name='password' placeholder="password" className="input input-bordered" required />
                            <button type='button' onClick={handlePasswordShow} className='absolute right-4 top-12'> {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}  </button>

                        </div>

                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>

                            <input type="text" name='photo' placeholder="photoURL" className="input input-bordered" required />
                       

                        </div>
                        <div className="form-control">
                            <label className="label justify-start cursor-pointer">
                                <input type="checkbox" name='terms' className="checkbox" />
                                <span className="label-text ml-2">Accept our terms and condition</span>

                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                    <p className='ml-4 mb-4 mr-4'>
                        Already have an account ? Please <Link to={'/login'}>Login</Link>
                    </p>
                    {
                        errorMessage && <p className='text-red-600 ml-4 mb-4 mr-4 '>
                            {errorMessage}

                        </p>
                    }
                    {
                        success && <p className='text-green-600 ml-4 mb-4 mr-4 '>
                            {successMessage}

                        </p>
                    }
                    {/* {
                        verificationMessage && <p className='text-black ml-4 mb-4 mr-4 '> 
                          {verificationMessage}

                        </p>
                    } */}

                </div>
            </div>
        </div>
    );
};

export default Register;