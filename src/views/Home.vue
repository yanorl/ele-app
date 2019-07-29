<template>
  <div class="home-box">
  <my-header :address="address" @clickHeader="clickHeader"></my-header>
  </div>
</template>

<script>
import MyHeader from '../components/Header/Header'
import cityMapMixins from '../common/mixins/cityMixins'

  export default{
    name: "home",
    mixins: [cityMapMixins],
    data() {
      return {}
    },
    components: {
      MyHeader
    },
    methods: {
      clickHeader() {
      	this.$router.push({name: 'address', params: {city: this.city}})
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
