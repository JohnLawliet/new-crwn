import {all, call} from 'redux-saga/effects'
import {shopSagas} from './shop/shop.sagas'
import {userSagas} from './user/user.sagas'
import {cartSagas} from './cart/cart.sagas'


// all is used to initialize all the starting sagas. It's possible to use the sagas individually using call but in that case, we would be
// waiting for the first saga call to finish then get to the next saga.  
function* rootSaga() {
    yield all([
        call(userSagas),
        call(shopSagas),
        call(cartSagas)
    ])
}

export default rootSaga