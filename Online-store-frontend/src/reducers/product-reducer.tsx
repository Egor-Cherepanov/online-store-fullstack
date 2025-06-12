import { Product } from "../types"
import { ACTION_TYPE } from "../actions"

const initialProductState = {
  id: null,
  title: null,
  male: null,
  category: null,
  quantity: null,
  image_url: null,
  content: null,
  price: null,
}

type Action = { type: string; payload: Product }

export const productReducer = (state = initialProductState, action: Action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_PRODUCT_DATA: {
      return {
        ...state,
        ...action.payload,
      }
    }
    case ACTION_TYPE.RESET_PRODUCT_DATA: {
      return initialProductState
    }
    default:
      return state
  }
}
