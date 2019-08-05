<template>
    <div class="filter-tab-box">
        <div class="filter_wrap" ref="filterWrap">
            <aside class="filter" v-if="navTab">
                <div class="filter-nav" v-for="(item, index) in navTab" :key="index" :class="{'filter-bold': currentFilter === index}" @click="filterSort(index)">
                    <span>{{item.name}}</span>
                    <i v-if="item.icon" :class="'fa fa-' + item.icon"></i>
                </div>
            </aside>
        </div>
    </div>
</template>
<script>
import Bus from '../../common/js/bus'

export default {
    name: "filterTab",
    props: {
        navTab: Array
    },
    data() {
        return {
            currentFilter: 0
        }
    },
    methods: {
        filterSort(index) {
            this.currentFilter = index
            switch (index) {
                case 0:
                    let flogData = {
                        isSort: true,
                        isScreen: false
                    }
                    this.$emit('ShowFlog', flogData)
                    Bus.$emit('searchFixed', true)
                    break
                case 1:
                    this.$emit('updateShop', { condation: this.navTab[1].condition })
                    this.$emit('hideView')
                    break
                case 2:
                    this.$emit('updateShop', { condation: this.navTab[2].condition })
                    this.$emit('hideView')
                    break
                case 3:
                    let flogDatas = {
                        isSort: false,
                        isScreen: true
                    }
                    this.$emit('ShowFlog', flogDatas)
                    Bus.$emit('searchFixed', true)
                    break
                default:
                     this.$emit('hideView')
                    break
            }
        },
        ClientTop() {
           return this.$refs.filterWrap.getBoundingClientRect().top
        }
    }
}
</script>
<style scoped>
.filter_wrap {
    background: #fff;
    position: relative;
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
</style>