import { combineReducers } from 'redux'
import auth from './auth'
import color from './color'
import size from './size'

export default combineReducers({ auth, color, size })
