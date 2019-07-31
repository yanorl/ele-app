<template>
    <div class="filter_view-box" :class="{'popover_bg': isSort}" @click.self="hideView">
        <div class="filter_wrap" v-if="filterData">
            <aside class="filter">
                <div class="filter-nav" v-for="(item, index) in filterData.navTab" :key="index" :class="{'filter-bold': currentFilter === index}" @click="filterSort(index)">
                    <span>{{item.name}}</span>
                    <i v-if="item.icon" :class="'fa fa-' + item.icon"></i>
                </div>
            </aside>
        </div>
       <filter-exten :sortBy="filterData.sortBy" :isShow="isSort" v-if="filterData" @changeNav="changeNav" @update="update"></filter-exten>
    </div>
</template>
<script>
import Bus from '../../common/js/bus'
import FilterExten from '../FilterExten/FilterExten'

export default {
    name: "filter_view",
    props: {
        filterData: Object
    },
    data() {
        return{
            currentFilter: 0,
            isSort: false
        }
    },
    components: {
      FilterExten
    },
    methods: {
        filterSort(index) {
            this.currentFilter = index
            switch( index ) {
                case 0:
                  this.isSort = true
                  Bus.$emit('searchFixed', true)
                  break
                case 1:
                  this.$emit('updateShop', {condation: this.filterData.navTab[1].condition})
                  this.hideView()
                  break
                case 2:
                  this.$emit('updateShop', {condation: this.filterData.navTab[2].condition})
                  this.hideView()
                  break
                default:
                  this.hideView()
                  break
            }
        },
        hideView() {
          this.isSort = false
          Bus.$emit('searchFixed', false)
        },
        changeNav(name) {
          this.filterData.navTab[0].name = name
          this.hideView()
        },
        update(condation) {
          this.$emit('updateShop', condation)
        }
    }
}
</script>
<style scoped>
.filter_wrap {
  background: #fff;
  position: sticky;
  top: 64px;
  z-index: 10;
}
.filter {
  position: relative;
  border-bottom: 1px solid #ddd;
  line-height: 10.4vw;
  z-index: 101;
  height: 10.666667vw;
  display: flex;
  justify-content: space-around;
}
.filter-nav {
  flex: 1;
  text-align: center;
  color: #666;
  font-size: 0.8333rem;
}
.filter-nav i {
  width: 1.6vw;
  height: 0.8vw;
  margin-left: 1.333333vw;
  margin-bottom: 0.533333vw;
  fill: #333;
  will-change: transform;
}

.filter-bold {
  font-weight: 600;
  color: #333;
}

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
</style>