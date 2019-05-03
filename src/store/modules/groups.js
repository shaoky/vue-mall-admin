/**
* 获取权限列表
*
*/
// import * as types from '../types'
import { getUserAuthority } from '@/api/getData'

const state = {
    group: ''
}

const actions = {
    'AGetAuthority' ({commit}) {
        getUserAuthority().then((res) => { commit('MSetAuthority', res.data) })
    }
}

const mutations = {
    'MSetAuthority' (state, group) {
        state.group = group
    }
}

const groups = {
    state,
    actions,
    mutations
}

export default groups
