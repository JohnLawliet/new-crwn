// Collections overview represents the page that shows individual collection items like page of sneaker, hats etc
// Preview is the one which is a subdirectory of shop and from where user can go to desired collection page (overview)

import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectCollectionForOverview} from '../../redux/shop/shop.selectors'
import CollectionPreview from '../collection-preview/collection-preview.component'
import './collection-overview.styles.scss'

const CollectionOverview = ({ collections }) => {
    return(
        <div className="collections-overview">
        {
            collections.map(({id, ...otherCollectionProps}) => (
                <CollectionPreview key={id} {...otherCollectionProps} />
            ))
        }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForOverview
})


export default connect(mapStateToProps)(CollectionOverview)