<template>
    <div class="recommended-box">
        <div class="shoplist-title">推荐商家</div>
        <filter-view :filterData="filterData" @updateShop="updateShop"></filter-view>
        <shop-list :datas="restaurants"></shop-list>
    </div>
</template>
<script>
import { getFilter, getshop } from '../../api/recommended'
import FilterView from '../FilterView/FilterView'
import ShopList from '../ShopList/ShopList'

export default {
    name: "recommended",
    data() {
        return {
            filterData: null,
            page: 1,
            size: 10,
            restaurants: []
        }
    },
    created() {
        this._getFilter()
        this._getshop()
    },
    methods: {
        _getFilter() {
            getFilter().then(res => {
                // console.log(res)
                this.filterData = res
            })
        },
        _getshop() {
          getshop(this.page, this.size).then(res => {
            // console.log(res)
            this.restaurants = res
          })
        },
        updateShop(condition){
            console.log(condition)
        }
    },
    components: {
        FilterView,
        ShopList
    }
}
</script>
<style scoped>
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