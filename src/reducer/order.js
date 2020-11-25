export const address_selected = (state, data) => {
    return {...state, address_id: data.id}
};


export const order_placed = (state, data) => {
    localStorage.removeItem("cart");
    localStorage.removeItem("merchandise_id");
    return {...state, cart: [], merchandise_id: null, address_id: null}
};