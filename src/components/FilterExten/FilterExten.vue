<template>
  <div class="filter-exten-box" v-if="isShow">
  	<ul>
  		<li v-for="(item, index) in sortBy" :key="index" @click="selectSort(item, index)">
  			<span :class="{'selectName': currentSort === index}">{{item.name}}</span>
  			<i v-show="currentSort === index" class="fa fa-check"></i>
  		</li>
  	</ul>
  </div>
</template>

<script>

  export default{
    name: "filter_exten",
    props: {
      isShow: Boolean,
      sortBy: Array
    },
    data() {
    	return {
    		currentSort: 0
    	}
    },
    methods: {
    	selectSort(item, index){
    		this.currentSort = index
        console.log(index)
        return
        let datas = {
          name: this.sortBy[index].name,
          condation: {condation: item.code}
        }
    		this.$emit('changeNav', datas)
    	}
    }
  }
</script>
<style scoped>
.filter-exten-box li {
  position: relative;
  padding-left: 5.333333vw;
  line-height: 10.666667vw;
  overflow: hidden;
}
.fa-check {
  float: right;
  color: #009eef;
  margin-right: 3.733333vw;
  line-height: 10.666667vw;
}

.selectName {
  color: #009eef;
}
</style>
