<template>
    <div class="header-box">
        <div class="address-map" @click="addressClick">
            <i class="fa fa-map-marker"></i>
            <span>{{address}}</span>
            <i class="fa fa-sort-desc"></i>
        </div>
        <div class="search-wrap" :class="{'fixed-view': showFilter}">
            <div class="shop-search">
                <i class="fa fa-search"></i>
                搜索商家 商家名称
            </div>
        </div>
    </div>
</template>
<script>
import Bus from '../../common/js/bus'

export default {
    name: "my-header",
    props: {
        address: String
    },
    data() {
        return {
            showFilter: false
        }
    },
    mounted() {
        this.getBus()
    },
    methods: {
        addressClick() {
            this.$emit('clickHeader')
        },
        getBus() {
            let that = this
            Bus.$on('searchFixed', function(el) {
                that.showFilter = el
            })
        }

    }
}
</script>
<style scoped>
.header-box {
    background-color: #009eef;
}

.header-box .address-map {
    color: #fff;
    font-weight: bold;
    padding: 15px 15px 0;
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

.search-wrap {
    padding: 10px 15px;
    background-color: #009eef;
}

.search-wrap {
    position: sticky;
    top: 0px;
    z-index: 999;
    box-sizing: border-box;
}

.header-box .shop-search {
    background-color: #fff;
    padding: 10px 0;
    border-radius: 4px;
    text-align: center;
    color: #aaa;
}

.fixed-view {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 99;
}
</style>