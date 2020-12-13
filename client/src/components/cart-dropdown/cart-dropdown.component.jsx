import React from 'react'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {createStructuredSelector} from 'reselect'
import CustomButton from '../custom-button/custom-button.component'
import './cart-dropdown.styles.scss'

import CartItem from '../cart-item/cart-item.component'
import {selectCartItems} from '../../redux/cart/cart.selector'
import {toggleCartHidden} from '../../redux/cart/cart.actions'

const Cart = ({cartItems, history, dispatch}) => (
    <div className="cart-dropdown">
        <div className="cart-items" >
        {
            cartItems.length ?
            cartItems.map(cartItem => (
                <CartItem key={cartItem.id} item={cartItem}/>
            )) :
            <span className="empty-message">Your cart is empty</span>
        }
        </div>        
        <CustomButton onClick={() => {
            history.push('/checkout')
            dispatch(toggleCartHidden())
        }}>GO TO CHECKOUT</CustomButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems : selectCartItems
})

// NOTE: when using connect, mapdispatchtoprops can be used in a shorthand as connect automatically passes dispatch param to the component
// which can u=be used by calling the dispatch function
// withRouter HOC enables component to use the history,match, param props that are required for redirection of page
export default withRouter(connect(mapStateToProps)(Cart))