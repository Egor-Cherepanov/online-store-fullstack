import { ROLE } from "../constants"
import { User } from "../types"
import { ACTION_TYPE } from "../actions"

const initialUserState = {
  id: null,
  login: null,
  role_id: ROLE.GUEST,
  session: null,
}

type Action = { type: string; payload: User }

export const userReducer = (state = initialUserState, action: Action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_USER: {
      return {
        ...state,
        ...action.payload,
      }
    }
    case ACTION_TYPE.LOGOUT: {
      return initialUserState
    }
    default:
      return state
  }
}
