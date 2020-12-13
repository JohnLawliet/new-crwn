// The container is meant to wrap the container oage with spinner and use the state varuables it requires ibstead of bothering shopPage

import {connect} from 'react-redux'
import {compose} from 'redux'
import {createStructuredSelector} from 'reselect'
import {selectIsFetching} from '../../redux/shop/shop.selectors'

import CollectionPage from './collection.component'
import Spinner from '../../components/spinner/spinner.component'

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsFetching
})

const CollectionContainer = compose(
    connect(mapStateToProps),
    Spinner
)(CollectionPage)

export default CollectionContainer