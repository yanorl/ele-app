<template>
  <div class="header-box">
  	<div class="address-map" @click="addressClick">
  		<i class="fa fa-map-marker"></i>
  		<span>{{address}}</span>
  		<i class="fa fa-sort-desc"></i>
  	</div>
  	<div class="shop-search">
  		<i class="fafa-search"></i>
  		搜索商家 商家名称
  	</div>
  </div>
</template>

<script>
  export default{
    name: "my-header",
    props: {
      address: String
    },
    methods: {
      addressClick() {
        this.$emit('clickHeader')
      }
    }
  }
</script>
<style scoped>
.header-box {
  background-color: #009eef;
  padding: 16px;
}
.header-box .address-map {
  color: #fff;
  font-weight: bold;
}
.address-map i {
  margin: 0 3px;
  font-size: 18px;
}
.address-map span {
  display: inline-block;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.header-box .shop-search {
  margin-top: 10px;
  background-color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  color: #aaa;
}
</style>
