<template>
  <div class="good-form__container">
    <form class="good-form">
      <label class="good-form__label">
        <span class="good-form__text good-form__text--required">
          Наименование товара
        </span>
        <input
          type="text"
          class="good-form__input"
          :class="titleError ? 'good-form__input--error' : ''"
          v-model="title"
          placeholder="Введите наименование товара"
          @blur="validTitle"
        >
        <span
          v-if="titleError"
          class="input__error"
        >
          {{ titleError }}
        </span>
      </label>
      <label class="good-form__label">
        <span class="good-form__text">
          Описание товара
        </span>
        <textarea
          type="text"
          class="good-form__textarea"
          placeholder="Введите описание товара"
          v-model="description"
        />
      </label>
      <label class="good-form__label">
        <span class="good-form__text good-form__text--required">
          Ссылка на изображение товара
        </span>
        <input
          type="text"
          class="good-form__input"
          :class="linkError ? 'good-form__input--error' : ''"
          v-model="link"
          placeholder="Введите ссылку"
          @blur="validLink"
        >
        <span
          v-if="linkError"
          class="input__error"
        >
          {{ linkError }}
        </span>
      </label>
      <label class="good-form__label">
        <span class="good-form__text good-form__text--required">
          Цена товара
        </span>
        <input
          type="text"
          class="good-form__input"
          :class="priceError ? 'good-form__input--error' : ''"
          placeholder="Введите цену"
          v-model="price"
          @blur="validPrice"
        >
        <span
          v-if="priceError"
          class="input__error"
        >
          {{ priceError }}
        </span>
      </label>
      <button
        class="good-form__button"
        :class="isActive ? 'good-form__button--active' : 'good-form__button--disable'"
        @click="addGood"
      >
        Добавить товар
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: null,
      description: null,
      link: null,
      price: null,
      titleError: null,
      linkError: null,
      priceError: null
    }
  },
  computed: {
    isActive () {
      return this.title && this.link && this.price && !this.titleError && !this.linkError && !this.priceError
    },
    goods () {
      return this.$store.getters.GET_GOODS
    }
  },
  methods: {
    addGood () {
      if (this.isActive) {
        const id = this.goods.length > 0 ? this.goods[this.goods.length - 1].id + 1 : 1
        const good = {
          id,
          title: this.title,
          description: this.description,
          link: this.link,
          price: this.price
        }
        this.$store.commit('ADD_GOOD', good)
      }
    },
    validTitle () {
      if (!this.title) {
        this.titleError = 'Поле является обязательным'
      } else {
        this.titleError = null
      }
    },
    validLink () {
      if (this.link) {
        const re = /[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/gi
        if (!re.test(this.link)) {
          this.linkError = 'Введите корректную ссылку'
        } else {
          this.linkError = null
        }
      } else {
        this.linkError = 'Поле является обязательным'
      }
    },
    validPrice () {
      if (this.price) {
        const re = /^[0-9]+$/
        if (!re.test(this.price)) {
          this.priceError = 'Введите число'
        } else {
          this.priceError = null
        }
      } else {
        this.priceError = 'Поле является обязательным'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .good-form__container{
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
    border-radius: 4px;
    background-color: $white-background;
    padding: 24px;
    width: 332px;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: $mobile) {
      width: 100%;
    }
  }

  .good-form__label{
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 16px;
    color: $temp-darks;
    font-weight: 400;
    font-size: 10px;
    line-height: 12.57px;
    letter-spacing: -2%;
  }

  .good-form__text{
    margin-bottom: 4px;
    position: relative;
    align-self: start;

    &--required{
      &:after{
        content: '';
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: $red-background;
        top: 2px;
        right: -6px;
      }
    }
  }

  .good-form__input{
    @include input;

    &:focus{
      border-color: $green-background;
    }

    &--error{
      border-color: $red-background;
    }
  }

  .good-form__textarea{
    @include input;
    min-height: 108px;
    outline: none;

    &:focus{
      border-color: $green-background;
    }
  }

  .input__error{
    color: $red-background;
  }

  .good-form__button{
    width: 100%;
    padding: 10px;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    line-height: 14.52px;
    letter-spacing: -2%;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;

    &--disable{
      background-color: $grey-background;
      color: $greys-500;
    }

    &--active{
      background-color: $green-background;
      color: #fff;
      cursor: pointer;
    }
  }
</style>
