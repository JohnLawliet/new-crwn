// this saga is meant to pull off users instead of pulling off users from app.js using the observables pattern

import {takeLatest, put, all, call} from 'redux-saga/effects'
import { auth, createUserProfile, googleProvider, getCurrentUser } from '../../firebase/firebase.utils';
import {
    signInSuccess, 
    signInFailure, 

    signOutSuccess,
    signOutFailure,

    signUpSuccess,
    signUpFailure,
} from './user.actions'
import UserActionTypes from './user.types'



function* getSnapshotFromUserAuth (userAuth, additionalData) {
    try{
        const userRef = yield call(createUserProfile, userAuth, additionalData)
        const userSnapshot = yield userRef.get()
        yield put(signInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }))
    }
    catch(error){
        yield put(signInFailure(error.message))
    }
}


// googleProvider shows up the google account popup, createUserProfile sets the user with details in firebase, userRef.get() is similar
// to onSnapShot i.e it gets the data from firebase of the newly created profile. onSnapShot watches for any changes in data to profile
// both ways of signIn have same code so we refactored it in getSnapshotFromUserAuth(user)
function* signInWithGoogle() {
    try{
        const {user} = yield auth.signInWithPopup(googleProvider)
        yield getSnapshotFromUserAuth(user)
    }
    catch(error){
        yield put(signInFailure(error.message))
    }
}


function* signInWithEmail({ payload : {email, password}}){
    try{
        const {user} = yield auth.signInWithEmailAndPassword(email, password)
        yield getSnapshotFromUserAuth(user)
    }
    catch(error){
        yield put(signInFailure(error))
    }
}


function* isUserAuthenticated () {
    try{
        const userAuth = yield getCurrentUser()
        if (!userAuth) return
        yield getSnapshotFromUserAuth(userAuth)
    }
    catch(error){
        yield put(signInFailure(error))
    }
}

function* signOut() {
    try{
        yield auth.signOut()
        yield put(signOutSuccess())
    }
    catch(error){
        yield put(signOutFailure(error))
    }
}



function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapshotFromUserAuth(user, additionalData);
}


function* signUpStart({ payload: {email, password, displayName}}){
    try{
        // returns userAuth object that contains user
        const {user} = yield auth.createUserWithEmailAndPassword(email, password)
        yield put(signUpSuccess({ user, additionalData: { displayName } }));
    } catch (error) {
      yield put(signUpFailure(error));
    }
}




export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}


export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}


export function* onCheckUserAuthentication(){
    yield takeLatest(UserActionTypes.CHECK_USER_IS_AUTHENTICATED, isUserAuthenticated)
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart(){
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUpStart)
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}



export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserAuthentication),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}