import React, { useState} from 'react'

import {connect} from 'react-redux'
import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import './sign-in.styles.scss'

const SignIn = ({ googleSignInStart, emailSignInStart }) =>{
    const [userCredentials, setUserCredentials] = useState({ email: '' , password: ''}) 
    const {password, email} = userCredentials

    const handleSubmit = async (event) => {
        event.preventDefault()
        emailSignInStart(email, password)
    }

    const handleChange = event => {
        const {value, name} = event.target
        // If name == email then below it will become email else it would be password
        setUserCredentials({ ...userCredentials, [name] : value })
    }

    return(
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                    type="email" 
                    name="email" 
                    value={email} 
                    handleChange={handleChange} 
                    label = "email"
                    required/>

                <FormInput 
                    type="password" 
                    name="password" 
                    value={password} 
                    handleChange={handleChange} 
                    label = "password"
                    required />

                <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton 
                        type="button"
                        onClick={googleSignInStart} isGoogleSignIn>Sign In With Google</CustomButton>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn)
