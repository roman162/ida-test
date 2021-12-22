<template>
  <div
    class="filtres__container"
    @click.stop.prevent="visiblePopup"
  >
    <div
      class="filtres__dropdown"
    >
      <span class="filtres__title">
        {{ activeFiltresName }}
      </span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        :class="filtresShow ? 'filtres__menu-arrow--close' : 'filtres__menu-arrow'"
      >
        <path d="M7.39526 11.3017C7.71427 11.6701 8.28573 11.6701 8.60474 11.3017L12.0498 7.32372C12.4985 6.80561 12.1304 6 11.445 6H4.55497C3.86957 6 3.50152 6.80561 3.95023 7.32372L7.39526 11.3017Z" fill="#C5CCD9"/>
      </svg>
    </div>
    <transition name="filtres">
      <ul
        v-if="filtresShow"
        class="filtres__list"
      >
        <li
          class="filtres__item-container"
          v-for="(filter, index) of filtres"
          :key="index"
          @click="changeFilter(filter)"
        >
          <p class="filter__title">
            {{ filter.title }}
          </p>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filtres: [
        {
          value: 'default',
          title: 'По умолчанию'
        },
        {
          value: 'name',
          title: 'По названию'
        },
        {
          value: 'min',
          title: 'От меньшей цены'
        },
        {
          value: 'max',
          title: 'От большей цены'
        }
      ],
      filtresShow: false
    }
  },
  computed: {
    activeFiltresName () {
      return this.$store.getters.GET_SORT.title
    }
  },
  methods: {
    visiblePopup () {
      if (!this.filtresShow) {
        document.body.addEventListener('click', this.visiblePopup)
      } else {
        document.body.removeEventListener('click', this.visiblePopup)
      }
      this.filtresShow = !this.filtresShow
    },
    changeFilter (filter) {
      this.$store.commit('SET_SORT', filter)
    }
  }
}
</script>

<style lang="scss" scoped>
  .filtres__container{
    position: relative;
    background-color: #fff;
  }

  .filtres__dropdown{
    display: flex;
    align-items: center;
    padding: 16px 10px;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    transition-property: box-shadow;
    transition-duration: .3s;

    &:hover{
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 4px 24px rgba(0, 0, 0, 0.12);
    }

    &:focus{
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 4px 24px rgba(0, 0, 0, 0.12);
    }
  }

  .filtres__menu-arrow--close{
    transform: rotate(180deg)
  }

  .filtres__title{
    margin-right: 8px;
    color: $greys-500;
    font-size: 16px;
    line-height: 20px;
    font-weight: 600;
  }

  .filtres__list{
    border-radius: 10px;
    box-shadow: 0 0 2px rgba(0,0,0,.08),0 4px 24px rgba(0,0,0,.12);
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    right: 0;
    top: 50px;
    width: 300px;
    background-color: #fff;
    position: absolute;
    z-index: 1000;
  }

  .filtres__item-container{
    padding: 6px 12px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;

    &:hover{
      background-color: $green-background;
      color: #fff;
      font-weight: 600;
    }
  }
</style>
