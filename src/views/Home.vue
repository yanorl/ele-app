<template>
  <div class="home-box">
  <my-header :address="address" @clickHeader="clickHeader"></my-header>
  <my-banner :swipeImgs="swipeImgs"></my-banner>
  </div>
</template>

<script>
import MyHeader from '../components/Header/Header'
import MyBanner from '../components/Banner/Banner'

import cityMapMixins from '../common/mixins/cityMixins'
import { getShopping } from '../api/home'

  export default{
    name: "home",
    mixins: [cityMapMixins],
    data() {
      return {
        swipeImgs: []
      }
    },
    created() {
      this._getShopping()
    },
    components: {
      MyHeader,
      MyBanner
    },
    methods: {
      clickHeader() {
      	this.$router.push({name: 'address', params: {city: this.city}})
      },
      _getShopping() {
        getShopping().then(res => {
          // console.log(res)
          this.swipeImgs = res.swipeImgs
        })
      }
    }
  }
</script>
<style scoped>
.home-box {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
</style>
