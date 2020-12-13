import React, { useEffect } from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom'
import {createStructuredSelector} from 'reselect'
import {selectCurrentuser} from './redux/user/user.selector'

import CheckoutPage from './pages/checkout/checkout.component'
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import {userAuthentication} from './redux/user/user.actions'
import {connect} from 'react-redux'


const App = ({ userAuthentication, currentUser }) => {

  // userAuthentication is used in param here as it is retrieved from store and not imported from parent
  useEffect(() => {
    userAuthentication()
  }, [userAuthentication])

  // componentDidMount() {
    
  //   // This is creating an open subsription which runs anytime app in firebase related to this app is changed. Needs to be closed also to prevent mem leaks
  //   // This is similar to setinterval usage
  //   // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
  //   //   if (userAuth){
  //   //     const userRef = await createUserProfile(userAuth)
  //   //     userRef.onSnapshot(snapShot => {
  //   //       setCurrentUser ({
  //   //           id: snapShot.id,
  //   //           ...snapShot.data()
  //   //         })
  //   //       })
  //   //   }
  //   //   else
  //   //   setCurrentUser(userAuth)
  //   //   // filter collectionsArray to keep just title and items. This was to be run only once so that we can store the initial data in firestore
  //   //   // addCollectionAndDocuments('collections', collectionsArray.map( ({items, title}) => ({items, title}) ))
  //   // })
  // }

  // componentWillUnmount(){
  //   this.unsubscribeFromAuth()
  // }

  return ( 
    <div>
    <Header/>
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route path="/signin" render={() => 
          currentUser ? 
          (<Redirect to="/" />) : 
          (<SignInAndSignUp />)
        } />
    </Switch>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  userAuthentication: () => dispatch(userAuthentication())
})


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentuser
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
