// This container is meant to clean the code from shopPage in the sense that the states acquired from mapStateToProps are just meant for passing
// onto collection overview so it makes sense to make this container with those states along with the spinner component

import {connect} from 'react-redux'
import {compose} from 'redux'
import {createStructuredSelector} from 'reselect'
import {selectIsFetching} from '../../redux/shop/shop.selectors'

import CollectionOverview from './collection-overview.component'
import Spinner from '../../components/spinner/spinner.component'

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsFetching
})

const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    Spinner
)(CollectionOverview)

export default CollectionOverviewContainer