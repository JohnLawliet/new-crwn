// Previews all collections i.e hats, etc on shoppage

import React from 'react'

import {CollectionPreviewStyle, Title, Preview} from './collection-preview.styles'
import CollectionItem from '../collection-item/collection-item.component'

const CollectionPreview = ({ title, items}) => {
    return (
        <CollectionPreviewStyle>
            <Title to={`/shop/${title.toLowerCase()}`}>{title}</Title>
            <Preview>
            {
                // displays 4 items of each section (hats, sneakers, etc) out of all items received from shop page 
                items
                .filter((item,index) => index <4 )
                .map(item => (
                    <CollectionItem key={item.id} item={item}/>
                ))
            }
            </Preview>
        </CollectionPreviewStyle>
    )
}

export default CollectionPreview