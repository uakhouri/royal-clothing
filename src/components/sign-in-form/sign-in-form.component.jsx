import { useState } from "react"
// import { createAuthUserDocumentWithEmailandPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import './sign-in-form.styles.scss'
import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import { signInAuthUserDocumentWithEmailandPassword } from "../../utils/firebase/firebase.utils"


const defaultFormFields = {

    email: "",
    password: "",

}


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields


    // console.log(formFields)

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value })

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("In function")
        

        try {
            console.log("Before await")
            const response = await signInAuthUserDocumentWithEmailandPassword(formFields.email,formFields.password)
            console.log(response)
            resetFormFields()


        }
        catch (error) {
            if(error.code==="auth/invalid-login-credentials")
            {
                alert("Invalid Login Credentials")
            }
            console.log(error)

        }


    }

    const signInWithGoogle = async () => {


        try {

            const { user } = await signInWithGooglePopup();

            console.log({ user })
            await createUserDocumentFromAuth(user);
        }
        catch (err) {
            console.log(err)
        }


    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)

    }

    return (
        <div className="sign-up-container">
            <h2>Already Have an Account?</h2>

            <span>
                Sign in with your email and password
            </span>
            <form onSubmit={handleSubmit}>



                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput label="Password " type="password" required onChange={handleChange} name="password" value={password} />

                <div className="buttons-container">
                <Button type='submit' >Sign In</Button>
                <Button button_type='google' onClick={signInWithGoogle}>Google Sign in</Button>
                </div>
                </form>

        </div>
    )
}
export default SignInForm