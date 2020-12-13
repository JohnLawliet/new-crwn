After cloning:
1. change axios url in stripe-checkout-button to http://localhost:5000/payment
2. create a .env file which contains REACT_APP_STRIPE_KEY={your_secret_key_of_stripe}
3. in stripe-checkout-button page, const publishableKey = {your_publishable_key_of stripe}
4. depending on your country change currency to that of your own country in stripe-checkout-button page as well as server.js
5. copy paste your own firebase config into var config = {} in firebase.utils
6. on localhost, run the app using "npm run dev" to start off both server.js and the frontend



For deployment to heroku:
1. change axios url in stripe-checkout-button to {your_heroku_app_baseurl}/payment
2. do heroku config:set REACT_APP_STRIPE_KEY={your_secret_key_of_stripe}
