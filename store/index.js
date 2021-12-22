export const state = () => ({
  goods: [],
  sort: {
    value: 'default',
    title: 'По умолчанию'
  }
})

export const getters = {
  GET_GOODS: state => state.goods,
  GET_SORT: state => state.sort
}

export const mutations = {
  SET_GOODS (state, goods) {
    state.goods = goods
  },
  DELETE_GOOD (state, id) {
    const index = state.goods.findIndex(good => good.id === id)
    if (index >= 0) {
      state.goods.splice(index, 1)
    }
  },
  ADD_GOOD (state, good) {
    state.goods.push(good)
  },
  SET_SORT (state, sort) {
    state.sort = sort
  }
}
