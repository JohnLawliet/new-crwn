import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price*100
    const publishableKey = "pk_test_51H2z6zI5yTOoabrNe9NONixkoVjjpafFdI4WYTi7v8nxL2hbmjBLHFTO6I1c2QRN6fEpq2OspMa6Vt2tFhzoiLrf00uEFoIOfr"

    const onToken = (token) => {
        axios({
            url: 'https://new-crwn.herokuapp.com/payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        })
        .then(response => {
            console.log("res : ",response)
            alert("Payment successful")
        })
        .catch(error => {
            console.log("Error : ",(error))
            alert("Payment failed, use the given test credit card")
        })
    } 

    return(
        <StripeCheckout
            label="pay now"
            name="CRWN Clothing ltd"
            billingAddress
            shippingAddress
            image="https://sendeyo.com/up/d/f3eb2117da"
            description={`Your total price is $${price}`}
            amount={priceForStripe}
            panelLabel="PAY NOW!"
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton