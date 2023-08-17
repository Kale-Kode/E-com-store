export const initialState = {
    prices: [],
    products: {}
}

export const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case "add_product": { //action is: id
            return {
                ...state,
                products: {
                    ...state.products,
                    [action.value]: 1
                }
            }   
        }

        case "remove_product": { //action is: id
            return {
                ...state,
                products: Object.keys(state.products).reduce((acc, curr) => {
                    if (curr !== action.value) {
                        return {
                            ...acc,
                            [curr]: state.products[curr]  
                        }
                    }
                })
            }   
        }

        case "vary_count": { //action is: [id, newCount] 
            return {
                ...state,
                products: {
                    ...state.products,
                    [action.value[0]]: action.value[1]
                }
            }
        }
        
        case "load_items": { //action is: { products: {...}, prices: [...] }
            return {
                ...state,
                products: action.value.products,
                prices: action.value.prices
            }   
        }

        case "set_prices": { //action is: newPrices
            return {
                ...state,
                prices: action.value
            }
        }
    }
}