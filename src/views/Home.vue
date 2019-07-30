<template>
  <div class="home-box">
  <my-header :address="address" @clickHeader="clickHeader"></my-header>
  <my-banner :swipeImgs="swipeImgs"></my-banner>
  <my-entries :entries="entries"></my-entries>
  <recommended></recommended>
  </div>
</template>

<script>
import MyHeader from '../components/Header/Header'
import MyBanner from '../components/Banner/Banner'
import MyEntries from '../components/Entries/Entries'
import Recommended from '../components/Recommended/Recommended'

import cityMapMixins from '../common/mixins/cityMixins'
import { getShopping } from '../api/home'

  export default{
    name: "home",
    mixins: [cityMapMixins],
    data() {
      return {
        swipeImgs: [],
        entries: [],
      }
    },
    created() {
      this._getData()
    },
    components: {
      MyHeader,
      MyBanner,
      MyEntries,
      Recommended
    },
    methods: {
      clickHeader() {
      	this.$router.push({name: 'address', params: {city: this.city}})
      },
      _getData() {
         this._getShopping()
      },
      _getShopping() {
        getShopping().then(res => {
          // console.log(res)
          this.swipeImgs = res.swipeImgs
          this.entries = res.entries
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
