<template>
    <div class="home-box">
        <my-header :address="address" @clickHeader="clickHeader" ref="headerBoxs"></my-header>
        <div class="filter_view-box" :class="{'popover_bg': isSort || isScreen}" @click.self="hideView"  >
          <div :class="{'filterPosition': isSort || isScreen}">
            <filter-tab ref="filterTab" :navTab="filterData.navTab" @ShowFlog="ShowFlog" @updateShop="updateShop" @hideView="hideView" v-if="!ShowFilter"></filter-tab>
            <div class="filter-content" v-if="isSort || isScreen">
                <filter-exten :sortBy="filterData.sortBy" :isShow="isSort"  @changeNav="changeNav"></filter-exten>
                <filter-sort :screenBy="filterData.screenBy" :isShow="isScreen" @hideView="hideView"  @update="updateShop"></filter-sort>
            </div>
          </div>
            
        </div>
        <scroll :data="[...this.swipeImgs, ...this.entries, ...this.restaurants]" class="home-scroll" ref="homeScroll" :listenScroll="listenScroll" :probeType="probeType" @scroll="scroll" :class="{'no-scroll': noScroll}">
            <div>
                <my-banner :swipeImgs="swipeImgs"></my-banner>
                <my-entries :entries="entries"></my-entries>
                <div class="recommended-box">
                    <div class="shoplist-title">推荐商家</div>
                    <div class="filter-placeholder">
                        <filter-tab ref="filterTab" :navTab="filterData.navTab" @ShowFlog="ShowFlog" @updateShop="updateShop" @hideView="hideView" v-if="ShowFilter"></filter-tab>
                    </div>
                    <shop-list :datas="restaurants"></shop-list>
                </div>
            </div>
        </scroll>
    </div>
</template>
<script>
import MyHeader from '../components/Header/Header'
import MyBanner from '../components/Banner/Banner'
import MyEntries from '../components/Entries/Entries'
import FilterTab from '../components/FilterTab/FilterTab'
import FilterSort from '../components/FilterSort/FilterSort'
import FilterExten from '../components/FilterExten/FilterExten'
import ShopList from '../components/ShopList/ShopList'

import cityMapMixins from '../common/mixins/cityMixins'
import { getShopping, getFilter, getshop } from '../api/home'
import Bus from '../common/js/bus'

import Scroll from '../components/Scroll/Scroll'

export default {
    name: "home",
    mixins: [cityMapMixins],
    data() {
        return {
            swipeImgs: [],
            entries: [],
            filterData: {},
            restaurants: [],
            page: 1,
            size: 10,
            scrollY: -1,
            filter_y: 0,
            ShowFilter: true,
            noScroll: false,
            headerClient: 0,
            isSort: false,
            isScreen: false,
            ScrollTab: true
        }
    },
    created() {
        this._getData()
        this.listenScroll = true
        this.probeType = 3
    },
    watch: {
        scrollY(newY) {
          // console.log(newY +"--"+ this.filter_y)
            if (Math.abs(newY) >= this.filter_y) {
                this.ScrollTab = false
                this.ShowFilter = false
            } else {
                 this.ScrollTab = true
                this.ShowFilter = true
            }
        }
    },
    mounted() {
        this.filter_y = this.$refs.filterTab.ClientTop()
        this.headerClient = this.$refs.headerBoxs.ChildClentHeight()
    },
    components: {
        MyHeader,
        MyBanner,
        MyEntries,
        FilterTab,
        FilterSort,
        FilterExten,
        ShopList,
        Scroll
    },
    methods: {
        clickHeader() {
            this.$router.push({ name: 'address', params: { city: this.city } })
        },
        _getData() {
            this._getShopping()
            this._getFilter()
            this._getshop()
        },
        _getShopping() {
            getShopping().then(res => {
                this.swipeImgs = res.swipeImgs
                this.entries = res.entries
            })
        },
        _getFilter() {
            getFilter().then(res => {
                this.filterData = res
            })
        },
        _getshop() {
            getshop(this.page, this.size).then(res => {
                this.restaurants = res
            })
        },
        scroll(pos) {
            this.scrollY = this.headerClient + Math.abs(pos.y)
        },
        updateShop(condition) {
            console.log(condition)
        },
        // ----
        ShowFlog(data) {
          this.isSort = data.isSort
          this.isScreen = data.isScreen
          this.ShowFilter = false
       },
       hideView() {
          this.isSort = false
          this.isScreen = false
          if (this.ScrollTab) {
            this.ShowFilter = true
          } else {
            this.ShowFilter = false 
          }
          Bus.$emit('searchFixed', false)
        },
        changeNav(data) {
          this.filterData.navTab[0].name = data.name
          this.updateShop(data.condation)
           this.hideView()
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

.home-scroll {
    position: fixed;
    width: 100%;
    overflow: hidden;
    top: 87px;
    bottom: 45px;
}

.no-scroll {
    top: 54px;
    bottom: 0;
    z-index: 1;
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
.filter-content{
   background-color: #fff;
  color: #333;
  padding-top: 8px;
  position: absolute;
  width: 100%;
  z-index: 4;
  left: 0;
}
.filterPosition {
    top: 54px;
    position: relative;
}

.filter-placeholder {
    height: 40px;
}

.shoplist-title {
    display: flex;
    align-items: flex;
    justify-content: center;
    height: 9.6vw;
    line-height: 9.6vw;
    font-size: 16px;
    color: #333;
    background: #fff;
}

.shoplist-title:after,
.shoplist-title:before {
    display: block;
    content: "一";
    width: 5.333333vw;
    height: 0.266667vw;
    color: #999;
}

.shoplist-title:before {
    margin-right: 3.466667vw;
}

.shoplist-title:after {
    margin-left: 3.466667vw;
}
</style>