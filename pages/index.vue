<template>
  <main class="page-container">
    <div class="page-main">
      <header class="page-header">
        <h1 class="page-header__title">
          Добавление товара
        </h1>
        <filter-dropdown />
      </header>
      <div class="page-wrapper">
        <div class="page-form">
          <good-form />
        </div>
        <good-list
          class="page-list"
        />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  computed: {
    goods () {
      return this.$store.getters.GET_GOODS
    }
  },
  watch: {
    goods (val) {
      this.setGoods()
    }
  },
  mounted () {
    this.getGoods()
  },
  methods: {
    setGoods () {
      localStorage.setItem('goodsList', JSON.stringify(this.goods))
    },
    getGoods () {
      let goods = JSON.parse(localStorage.getItem('goodsList'))
      if (!goods) {
        goods = []
      }
      this.$store.commit('SET_GOODS', goods)
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-container{
    background-color: rgba(255, 254, 251, 0.8);
  }
  .page-main{
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    padding: 32px;
  }

  .page-header{
    padding: 8px;
    padding-top: 32px;
    padding-bottom: 16px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: $mobile) {
      flex-direction: column;
      justify-content: start;
    }
  }

  .page-header__title{
    @media screen and (max-width: $mobile) {
      margin-bottom: 24px;
    }
  }

  .page-form{
    margin-right: 8px;
    align-self: start;
    position: sticky;
    top: 24px;

    @media screen and (max-width: $mobile) {
      position: static;
      width: 100%;
      padding: 8px;
      margin: 0;
      margin-bottom: 24px;
    }
  }

  .page-wrapper{
    display: flex;

    @media screen and (max-width: $mobile) {
      flex-direction: column;
    }
  }
</style>
