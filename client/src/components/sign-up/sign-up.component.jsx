import React, { useState } from 'react'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import './sign-up.styles.scss'
// import { auth, createUserProfile } from '../../firebase/firebase.utils'

import {connect} from 'react-redux'
import {signUpStart} from '../../redux/user/user.actions'


const SignUp = ({ signUpStart }) =>{
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        displayName: ''
    })
    const {email, password, confirmPassword, displayName} = userCredentials

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (password !== confirmPassword){
            alert("passwords don't match")
            return
        }
        try{
            signUpStart({email, password, displayName})
        }
        catch(error){
            console.log("error : ",error.message)
        }
    }

    const handleChange = e => {
        const {name, value} = e.target
        setUserCredentials({ ...userCredentials, [name]: value })
    }


    return(
        <div className="sign-up">
            <h2 className="title">I don't have an account</h2>
            <span>Sign up with email and password</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                    label="Display Name"
                    required
                />
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    label="Email"
                    required
                />
                <FormInput
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    label="Password"
                    required
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    label="Confirm Password"
                    required
                />
                <CustomButton type="submit">SIGN UP</CustomButton>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})


export default connect(null, mapDispatchToProps)(SignUp)