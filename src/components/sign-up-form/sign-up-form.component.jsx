import { useState } from "react"
import { createAuthUserDocumentWithEmailandPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import './sign-up-form.styles.scss'
import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmed_password: ""
}


const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmed_password } = formFields


    // console.log(formFields)

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value })

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formFields.password !== formFields.confirmed_password) {
            alert("Unmatched Passwords")
            return;
        }
        try {
            const response = await createAuthUserDocumentWithEmailandPassword(formFields.email, formFields.password)
            console.log(typeof (response.user))
            await createUserDocumentFromAuth(response.user, { displayName: formFields.displayName });
            resetFormFields()


        }
        catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Try different Email")
            }
            else {

                console.log("User creation encountered an error: ", error)
            }
        }




    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)

    }

    return (
        <div className="sign-up-container">
            <h2> I do not have an account</h2>

            <span>
            Sign up with your email and password
            </span>
                <form onSubmit={handleSubmit}>

                    <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />

                    <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

                    <FormInput label="Password " type="password" required onChange={handleChange} name="password" value={password} />

                    <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmed_password" value={confirmed_password} />
                    <Button  type = "submit">Sign Up </Button>
                </form>
            
        </div>
    )
}
export default SignUpForm