import * as types from './mutation-types'

const mutations = {
	[types.SEL_LOCATION] (state, location) {
	  if (location) {
	  	state.location = location
	  } else {
	  	state.location = null
	  }
	},
	[types.SET_ADDRESS] (state, address) {
	  if (address) {
	  	state.address = address
	  } else {
	  	state.address = ''
	  }
	}
}

export default mutations