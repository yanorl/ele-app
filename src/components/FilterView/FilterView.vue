<template>
    <div class="filter_view-box" :class="{'popover_bg': isSort || isScreen}" @click.self="hideView">
        <div class="filter_wrap" ref="filterWrap">
            <aside class="filter"  v-if="filterData" >
                <div class="filter-nav" v-for="(item, index) in filterData.navTab" :key="index" :class="{'filter-bold': currentFilter === index}" @click="filterSort(index)">
                    <span>{{item.name}}</span>
                    <i v-if="item.icon" :class="'fa fa-' + item.icon"></i>
                </div>
            </aside>
        </div>
        <div class="filter-content" v-if="isSort || isScreen">
           <filter-exten :sortBy="filterData.sortBy" :isShow="isSort" v-if="filterData" @changeNav="changeNav" @update="update"></filter-exten>
            <filter-sort :screenBy="filterData.screenBy" :isShow="isScreen" v-if="filterData" @update="update"></filter-sort>
        </div>
      
    </div>
</template>
<script>
import FilterSort from '../FilterSort/FilterSort'
import FilterExten from '../FilterExten/FilterExten'
import FilterTab from '../FilterTab/FilterTab'

export default {
    name: "filter_view",
    props: {
        filterData: Object
    },
    data() {
        return{}
    },
    components: {
      FilterTab,
      FilterExten,
      FilterSort
    },
    methods: {
        filterSort(index) {
            this.currentFilter = index
            switch( index ) {
                case 0:
                  this.isSort = true
                  this.isScreen = false
                  Bus.$emit('searchFixed', true)
                  this.$emit('changFlog', index)
                  break
                case 1:
                  this.$emit('updateShop', {condation: this.filterData.navTab[1].condition})
                  this.hideView()
                  break
                case 2:
                  this.$emit('updateShop', {condation: this.filterData.navTab[2].condition})
                  this.hideView()
                  break
                case 3:
                   this.isSort = false
                   this.isScreen = true
                   Bus.$emit('searchFixed', true)
                   this.$emit('changFlog', index)
                  break
                default:
                  this.hideView()
                  break
            }
        },
        hideView() {
          this.isSort = false
          this.isScreen = false
          Bus.$emit('searchFixed', false)
          this.$emit('newResh')
        },
        changeNav(name) {
          this.filterData.navTab[0].name = name
        },
        update(condation) {
          this.$emit('updateShop', condation)
           this.hideView()
        },
        ClientTop() {
           return this.$refs.filterWrap.getBoundingClientRect().top
        }
    }
}
</script>
<style scoped>

.popover_bg{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  z-index: 3;
}
.filter-content{
   background-color: #fff;
  color: #333;
  padding-top: 8px;
  position: absolute;
  width: 100%;
  z-index: 4;
  left: 0;
}
</style>