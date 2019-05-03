import * as types from '../types'

const state = {
    navIndex: ''
}

const getters = {
    getNavIndex (state) {
        return state.navIndex || '/'
    }
}

const mutations = {
    [types.MSetNavIndex] (state, n) {
        state.navIndex = n
    }
}

const nav = {
    state,
    getters,
    mutations
}

export default nav
