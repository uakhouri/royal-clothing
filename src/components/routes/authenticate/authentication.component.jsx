// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

// import { auth,signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../../utils/firebase/firebase.utils";

import SignUpForm from "../../sign-up-form/sign-up-form.component";
import SignInForm from "../../sign-in-form/sign-in-form.component";
import './authentication.styles.scss'

const Authentication = () => {
    // useEffect(() => {
    //   const fetchRedirectResult = async () => {
    //     try {
    //       const response= await getRedirectResult(auth);
    //       const userDocRef = createUserDocumentFromAuth(response.user);
    //     } catch (error) {
    //       console.error('Error fetching redirect result:', error);
    //     }
    //   };
  
    //   fetchRedirectResult();
    // }, []);
  
  

    // const logGooglePopupUser = async () => {


    //     try {

    //         const {user} = await signInWithGooglePopup();
            
    //         console.log({user})
    //         const userDocRef = createUserDocumentFromAuth(user);
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }


    // }
    

    return (
        <div className="authentication-container">
           
            {/*// <button onClick={logGooglePopupUser}>
            // Sign in with Google Popup
            // </button>
            // <button onClick={signInWithGoogleRedirect}>
            // Sign in with Google Redirect
    // </button>*/}
            <SignInForm />
            <SignUpForm />
        </div>
    );
}

export default Authentication;