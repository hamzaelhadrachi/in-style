import { useState } from "react";
import FormInput from "../../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from "../../button/button.component";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../../utils/firebase/firebase.utils";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await signInAuthUserWithEmailAndPassword(email, password);
            
            resetFormFields();
        }catch(err){
            switch(err.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated to this email !');
                    break;
                default:
                    console.log(err);
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({
            ...formFields, [name]: value
        })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }
    return (
        <div className='sign-up-container'>
            <h2>Already have an account ?</h2>
            <span>Sign in</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Email'
                    type='text' 
                    required 
                    onChange={handleChange} 
                    name='email' 
                    value={email}
                />
                <FormInput 
                    label='Password'
                    type='password' 
                    required 
                    onChange={handleChange} 
                    name='password' 
                    value={password}
                />
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;