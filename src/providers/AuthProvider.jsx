import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase.init';

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const name= 'Sagor er Nodi';

    const [user,setUser]= useState(null);
    const [loading, setLoading]= useState(true);
    const [imageUrl, setImageUrl] = useState('');

   

  

    const createUser = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInWithGoogle = ()=>{
        setLoading(true);
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
    const sendVerification = ()=>{
        setLoading(true);
        return sendEmailVerification(auth.currentUser);
    }
    useEffect( ()=>{

        const unSubscribe= onAuthStateChanged(auth, currentUser =>{
        //    console.log('Current User: ', currentUser);
        //    console.log('ProviderId:', currentUser.providerData[0].providerId)
           let providerId= currentUser?.providerData[0].providerId;
         if(currentUser?.emailVerified || providerId=='google.com'){
            setUser(currentUser);
            setLoading(false);

         }
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
        setUser,
        loading, setLoading,
        createUser,
        signInWithGoogle,
        signInUser,
        signOutUser,
        sendVerification,
        imageUrl, setImageUrl,
        
    }
    return (
       <AuthContext.Provider value={authInfo}>
          {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;