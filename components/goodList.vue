<template>
  <div class="goods__list-wrapper">
    <div
      v-if="visibleGoods"
      class="goods__list-container"
    >
      <transition-group
        name="list-complete"
        class="goods__list"
        tag="ul"
      >
        <li
          class="goods__item"
          v-for="good of visibleGoods"
          :key="good.id"
        >
          <good-item
            :good="good"
          />
        </li>
      </transition-group>
    </div>
    <div
      v-else
      class="no-goods"
    >
      <p class="no-goods__text">
        Пожалуйста добавьте товары
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visibleGoods: null
    }
  },
  computed: {
    goods () {
      return this.$store.getters.GET_GOODS
    },
    sort () {
      return this.$store.getters.GET_SORT
    }
  },
  watch: {
    goods (val) {
      this.visibleGoods = [...this.goods]
      this.sortList()
    },
    sort (val) {
      this.sortList()
    }
  },
  mounted () {
    this.visibleGoods = [...this.goods]
  },
  methods: {
    compare (field, order) {
      let len = arguments.length
      let fields, orders
      if (typeof field === 'object') {
        fields = Object.getOwnPropertyNames(field)
        orders = fields.map(key => field[key])
        len = fields.length
      } else {
        fields = new Array(len)
        orders = new Array(len)
        for (let i = len; i > 0; i--) {
          fields[i] = arguments[i]
          orders[i] = 1
        }
      }
      return (a, b) => {
        for (let i = 0; i < len; i++) {
          if (a[fields[i]] < b[fields[i]]) { return orders[i] }
          if (a[fields[i]] > b[fields[i]]) { return -orders[i] }
        }
        return 0
      }
    },
    sortList () {
      if (this.sort.value === 'name') {
        this.visibleGoods.sort((a, b) => {
          if (a.title > b.title) {
            return 1
          }
          if (a.title < b.title) {
            return -1
          }
          return 0
        })
      } else if (this.sort.value === 'min') {
        this.visibleGoods.sort((a, b) => {
          return a.price - b.price
        })
      } else if (this.sort.value === 'max') {
        this.visibleGoods.sort((a, b) => {
          return b.price - a.price
        })
      } else {
        this.visibleGoods = [...this.goods]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .goods__list-container{
    width: 100%;
  }

  .goods__list{
    padding: 8px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16px;

    @media screen and (max-width: $desktop) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: $tab) {
      grid-template-columns: 1fr;
    }
  }

  .goods__item{
    transition: all .5s
  }

  .list-complete-enter, .list-complete-leave-to {
    opacity: 0;
    transform: translateX(0) translateY(-30px)
  }

  .list-complete-leave-active {
    position: absolute;
  }

  .list-complete-move{
    transition: transform .5s
  }

  .no-goods{
    height: 100vh;
    width: 100%;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .no-goods__text{
    text-align: center;
  }
</style>
