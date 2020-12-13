//page to route to different collections

import React, {useEffect} from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchCollectionStart} from '../../redux/shop/shop.actions'

import CollectionOverviewContainer from '../../components/collection-overview/collection-overview.container'
import CollectionContainer from '../collection/collection.container'


const ShopPage = ({fetchCollectionStart, match}) =>{

    // This method of using subscribing to api is the observable pattern where the series of events(for auth in this case) is always active on firebase
    // However, firebase offers a way to convert it to promises method and using native fetch call that is seen on most apps
    // onSnapShot or onAuthChanged are the functions of observable pattern.
    // The caveat with using .get().then() method is that we r getting the data only once and it won't watch for any changes and subsequentyle update the app
    
    useEffect(() =>{
        fetchCollectionStart()
    }, [fetchCollectionStart])


    // using render inplace of component requires passing the original props, in this case, props of <Route/> as well as any other props
    // Also, its not possible to pass props to Route so using render we send props like normally passing props to component
    return(
        <div className="shop-page">
            <Route 
                exact path={`${match.path}`} 
                component={CollectionOverviewContainer}/>
            <Route 
                exact path={`${match.path}/:collectionId`} 
                component={CollectionContainer}/>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionStart: () => dispatch(fetchCollectionStart())
})


export default connect(null, mapDispatchToProps)(ShopPage)


