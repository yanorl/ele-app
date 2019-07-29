import * as types from './mutation-types'

export const  setLocation = function ({commit}, location){
  commit(types.SEL_LOCATION, location)
}

export const  setAddress = function ({commit}, address){
  commit(types.SET_ADDRESS, address)
}