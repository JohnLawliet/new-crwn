import {all, call, put, takeLatest} from 'redux-saga/effects'
import ShopActionTypes from './shop.types'
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import { fetchCollectionFailure, fetchCollectionSuccess } from './shop.actions'


// yield is like await and saga is like promises async await version of redux thunk code
// call runs a function along with passing in the param in 2nd param of call to the function. Also, it it requires 'yield'
// The reason we use yield with 'convert...' is to ensure async code or if convert... takes longer time than reqd
// put = dispatch() + yield
export function* fetchCollectionAsync(){
    yield console.log("I GOT BLASTED")
    try{
        const collectionRef = firestore.collection('collections')
        const snapShot = yield collectionRef.get()
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapShot)
        yield put(fetchCollectionSuccess(collectionsMap))
    }
    catch(error){
        yield put(fetchCollectionFailure(error.message))
    }
}


// Although saga is a middleware, it works consecutively with reducer as in after reducer, the logic passes onto saga if the saga is watching out
// for any particular action
// takeEvery 
// saga watches for the below action and calls the function in 2nd para
export function* fetchCollectionStart(){
    yield takeLatest(ShopActionTypes.FETCH_COLLECTION_START, fetchCollectionAsync)
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionStart)
    ])
}