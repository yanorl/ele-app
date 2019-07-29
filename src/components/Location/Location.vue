<template>
  <div class="location-box">
  	<div class="title">当前定位</div>
  	<div class="des" @click="selectLocation">
  		<i class="fa fa-location-arrow"></i>
  		<span>{{address}}</span>
  	</div>
  </div>
</template>

<script>
  export default{
    name: "location",
    props: {
    	address: String
    },
    methods: {
      selectLocation() {
        this.$emit('selectLocation')
      }
    }
  }
</script>
<style scoped>

.title {
  margin: 10px 0;
  font-size: 12px;
}
.des i {
  color: #009eef;
}
.des span {
  color: #333;
  font-weight: bold;
  margin-left: 5px;
  display: inline-block;
  width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
