const express = require('express')
const cors = require('cors')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

if (process.env.NODE_ENV !== "production") require("dotenv").config();


const stripe = require("stripe")(process.env.REACT_APP_STRIPE_KEY)


const app = express()
// if deployed to heroku, heroku allocates its own port through process.env.PORT
const port = process.env.PORT || 5000


// bodyparser just parses all json strings. Using express.json() is same as bodyParser.json()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(cors())

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')))

    app.get('*',function(req,res) {
        res.sendFile(path.join(__dirname,'client/build','index.html'))
    })
}

// app.post('/payment',(req, res) => {
//     // Taking in the required params from stripe frontend to pass on to stripe
//     const body = {
//         source: req.body.token.id,
//         amount: req.body.amount,
//         currency: "usd",
//     }

//     // stripe.charges.create creates a session? and the response from stripe whether error or success is sent back to client via res
//     // The param of create is similar to req,res coz the body here is sent as req, the (stripeErr, stripeRes) is the res from stripe
//     stripe.charges.create(body, (stripeErr, stripeRes) => {
//         if (stripeErr){
//             res.status(500).send({ error: stripeErr })
//         }
//         else{
//             res.status(200).send({ success: stripeRes })
//         }
//     })
// })

app.post('/payment', (req,res) => {
    const {priceForStripe, token} = req.body
    const idempotencykey = uuidv4()

    return stripe.customers.create({
        email: token.email,
        source: token.id
    })
    .then(customer => {
        stripe.charges.create({
            amount: priceForStripe,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
        },{idempotencykey})
    })
    .then(result => res.status(200).json(result))
    .catch(error => console.log(error))
})


app.listen(port, error => {
    if (error) throw error
    console.log("server running on port ",port)
})