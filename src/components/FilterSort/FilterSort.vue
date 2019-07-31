<template>
  <div class="filter-sort-box" v-if="isShow">
  	<div v-for="(item, index) in screenBy" :key="index" class="morefilter">
  		<p class="title">{{item.title}}</p>
  		<ul>
  			<li v-for="(list, i) in item.data" :key="i">
  				<img v-if="list.icon" :src="list.icon" alt="">
  				<span>{{list.name}}</span>
  			</li>
  		</ul>
  	</div>
  	<div class="morefilter-btn">
  		<span class="morefilter-clear">清空</span>
  		<span class="morefilter-ok">确定</span>
  	</div>
  </div>
</template>

<script>
  export default{
    name: "filter-sort",
    props: {
    	isShow: Boolean,
    	screenBy: Array
    }
  }
</script>
<style scoped>

.filter-sort-box {
  background: #fff;
  padding: 0 2.666667vw;
  line-height: normal;
}
.morefilter {
  margin: 2.666667vw 0;
  overflow: hidden;
}
.morefilter .title {
  margin-bottom: 2vw;
  color: #666;
  font-size: 0.5rem;
}
.morefilter ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 0.8rem;
}
.morefilter li {
  box-sizing: border-box;
  width: 30%;
  height: 9.333333vw;
  line-height: 9.333333vw;
  margin: 0.8vw 1%;
  background: #fafafa;
}
.morefilter li img {
  width: 3.466667vw;
  height: 3.466667vw;
  vertical-align: middle;
  margin-right: 0.8vw;
}
.morefilter li span {
  margin-left: 2%;
  vertical-align: middle;
}

.morefilter-btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fafafa;
  box-shadow: 0 -0.266667vw 0.533333vw 0 #ededed;
  line-height: 11.466667vw;
  box-sizing: border-box;
}
.morefilter-btn span {
  font-size: 0.826667rem;
  text-align: center;
  text-decoration: none;
  flex: 1;
}
.morefilter-clear {
  color: #ddd;
  background: #fff;
}
.morefilter-ok {
  color: #fff;
  background: #00d762;
  border: 0.133333vw solid #00d762;
}
</style>
