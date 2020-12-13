// utility function is for cleaning the reducer code


// This function adds a property called quantity if its unavailable else adds onto it if the item is found
export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id )
    if (existingItem){
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id ?
            {...cartItem, quantity: cartItem.quantity +1} :
            cartItem)
    }
    else
        return [...cartItems, {...cartItemToAdd, quantity: 1}]
}


// Removes item completely
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    return cartItems.filter(cartItem => (
        cartItem.id !== cartItemToRemove.id
    ))
}


// Decrease quantity
export const decreaseQuantity = (cartItems, cartItemToRemove) => {
    if (cartItemToRemove.quantity <= 1)
        return removeItemFromCart(cartItems, cartItemToRemove)
    else{
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToRemove.id ?
            {...cartItem, quantity: cartItem.quantity - 1} :
            cartItem)
    }
}