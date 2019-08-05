<template>
    <div class="recommended-box">
        <div class="shoplist-title">推荐商家</div>
        <filter-view :filterData="filterData" @updateShop="updateShop" ref="filterViews"></filter-view>
        <shop-list :datas="restaurants"></shop-list>
    </div>
</template>
<script>
import FilterView from '../FilterView/FilterView'
import ShopList from '../ShopList/ShopList'

export default {
    name: "recommended",
    props: {
        filterData: Object,
        restaurants: Array
    },
    data() {
        return {}
    },
    components: {
        FilterView,
        ShopList
    },
    methods: {
        updateShop(condition) {
            console.log(condition)
        },
        ChildClientTop() {
           return this.$refs.filterViews.ClientTop()
        }
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