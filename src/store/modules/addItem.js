export default {
    namespaced: true,

    state: {
        listItem: [],
    },

    getters: {
        listItem(state) {
            return state.listItem;
        }
    },

    mutations: {
        insertItem(state, payload) {
            state.listItem.push(payload)
        }
    },
}