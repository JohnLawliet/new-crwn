import ShopActionTypes from './shop.types'
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'

export const fetchCollectionStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTION_START
})

export const fetchCollectionSuccess = collections => ({
    type: ShopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload: collections
})

export const fetchCollectionFailure = error => ({
    type: ShopActionTypes.FETCH_COLLECTION_FAILURE,
    payload: error
})

export const fetchCollectionStartAsync = () => dispatch => {
    const collectionRef = firestore.collection('collections')
    dispatch(fetchCollectionStart())

    collectionRef.get().then(snapShot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapShot)
        dispatch(fetchCollectionSuccess(collectionsMap))
    })
    .catch(error => dispatch(fetchCollectionFailure(error)))
}