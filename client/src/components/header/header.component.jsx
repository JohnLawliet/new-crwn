import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'


import CartIcon from '../cart-icon/cart-icon.component'
import Cart from '../cart-dropdown/cart-dropdown.component'
import {selectCartHidden} from '../../redux/cart/cart.selector'
import {selectCurrentuser} from '../../redux/user/user.selector'
import {signOutStart} from '../../redux/user/user.actions'

import {HeaderContainer, OptionLink, OptionsContainer, LogoContainer} from './header.styles'
import {ReactComponent as Logo} from '../../assets/crown.svg'

const Header = ({ currentUser, hidden, signOutStart  }) => {
    return(
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo className="logo"/>
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to="/shop">SHOP</OptionLink>
                <OptionLink to="/shop">CONTACT</OptionLink>
                {                    
                    currentUser ?
                    <OptionLink as='div' onClick={signOutStart } >
                        SIGN OUT
                    </OptionLink> :
                    <OptionLink to="/signin">SIGN IN</OptionLink>
                }
                <CartIcon />
            </OptionsContainer>
            {
                hidden? null : (<Cart/>)
            }
            
            
        </HeaderContainer>
    )
}

// createStructuredSelector is useful when there r multiple selectors
// it passes the overall state to each selector so no need of passing state as param or doing selectCartHidden(state)
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentuser,
    hidden: selectCartHidden
})

// NOTE: SHORT FORM OF MAPDISPATCHTOPROPS doesn't chain redux sagas, using shortform with signoutstart wouldn't call clearCart in cart saga
const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
  });

export default connect(mapStateToProps, mapDispatchToProps)(Header);