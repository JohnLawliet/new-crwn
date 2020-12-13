// Page to display the collection items of a particular collection depending on collection chose via Route

import React from 'react'
import {connect} from 'react-redux'
import {selectCollection} from '../../redux/shop/shop.selectors'
import CollectionItem from '../../components/collection-item/collection-item.component'
import './collection.styles.scss'

const CollectionPage = ({ collection }) => {
    const {title, items} = collection
    return(
        <div className="collection-page">
            <h2 className="title">{title}</h2>
            <div className="items">
            {
                items.map(item => (
                    <CollectionItem key={item.id} item={item}/>
                ))
            }
            </div>
        </div>
    )
}

// passing props of the component to map
// Route from shopPage passes on route props to collectionPage which are then passed onto mapStateToProps. mapstatetoProps passees it down to
// selectCollection selector as a parameter which then references COLLECTION_ID_MAP to render the correct collection 
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage)