import {createSelector} from 'reselect'

const selectShop = state => state.shop

export const selectShopItems = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectIsFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
)


// originally we used find array property but data where the content can be huge like over 1000, data should 
// be normalized i.e converted to object as big O reduces to O(1) from O(n)
export const selectCollection = collectionUrlParam => createSelector(
    [selectShopItems],
    collections => (collections ? collections[collectionUrlParam] : null)
)


// since collections is now an object, overview won't work as it was using maps so here we are converting object to array specifically 
// for overview component. Object.keys returns an array of keys i.e [hats,sneaker,etc] then we use each keyword in collections object itself
export const selectCollectionForOverview = createSelector(
    [selectShopItems],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)
