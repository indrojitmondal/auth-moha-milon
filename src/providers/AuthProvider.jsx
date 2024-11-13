import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase.init';

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const name= 'Sagor er Nodi';

    const [user,setUser]= useState(null);
    const [loading, setLoading]= useState(true);

    const createUser = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInWithGoogle = ()=>{
        return signInWithPopup(auth, googleProvider);

    }
    const signInUser = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const signOutUser = ()=>{
        setLoading(true);
        return signOut(auth);
    }
    useEffect( ()=>{

        const unSubscribe= onAuthStateChanged(auth, currentUser =>{
           console.log('Current User: ', currentUser);
            setUser(currentUser);
            setLoading(false);
        })
        return (()=>{
            unSubscribe(); // cleanup 
        })

    },[])
    // onAuthStateChanged(auth, currentUser =>{

    //     if(currentUser){
    //         console.log('Currently logged user: ',currentUser);
    //         setUser(currentUser);
    //     }
    //     else{
    //         console.log('No user logged in');
    //         setUser(null);
    //     }

    // })
    const authInfo ={
        name,
        user,
        loading,
        createUser,
        signInWithGoogle,
        signInUser,
        signOutUser,
    }
    return (
       <AuthContext.Provider value={authInfo}>
          {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;