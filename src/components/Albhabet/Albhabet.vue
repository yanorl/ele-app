<template>
    <scroll class="albhabet-box" v-if="cityInfo" :data="[...cityInfo]" ref="listview" :listenScroll="listenScroll" :probeType="probeType" @scroll="scroll">
        <div class="scroll_wrap">
            <!-- 热门城市 -->
            <div class="hot_wrap citylist" ref="hot_wrap">
                <div class="title">热门城市</div>
                <ul class="hot_city">
                    <li v-for="(item,index) in cityInfo.hotCities" :key="index" @click="selectCity(item)">{{item.name}}</li>
                </ul>
            </div>
            <!-- 所有城市 -->
            <div class="city_wrap">
                <!-- 循环按字母排序的key -->
                <div class="city_content citylist" ref="listGroup" v-for="(item,index) in keys" :key="index">
                    <div class="title">{{item}}</div>
                    <!-- 根据字母key展示城市名 -->
                    <ul>
                        <li v-for="(city,indexs) in cityInfo[item]" :key="indexs" @click="selectCity(city)">{{city.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="area_keys" @touchstart="onShortcutTouchSart" @touchmove.stop.prevent="onShortcutTouchMove">
            <ul>
                <li>#</li>
                <li v-for="(item,index) in keys" :key="index" :data-index="index" :class="{'current': currentIndex === index}">{{item}}</li>
            </ul>
        </div>
    </scroll>
</template>
<script>
import Scroll from '../Scroll/Scroll'
import { getData } from '../../common/js/dom'

const ANCHOR_HEIGHT = 16
const TITLE_HEIGHT = 34

export default {
    name: "albhabet",
    props: {
        cityInfo: Object,
        keys: Array
    },
    data() {
        return {
            scrollY: -1,
            currentIndex: 0
        }
    },
    created() {
        this.touch = {}
        this.listenScroll = true
        this.listHeight = 0
        this.probeType = 3
        this.defaultHeight = 0
    },
    watch: {
        cityInfo() {
            this.$nextTick(() => {
                this._calculateHeight()
            })
        },
        scrollY(newY) {
            // newY = newY -
            const listHeight = this.listHeight
            //  当滚动到顶部， newY > 0
            if (newY > 0) {
                this.currentIndex = 0
                return
            }
            //  在中间部分滚动
            for (let i = 0; i < listHeight.length - 1; i++) {
                let height1 = listHeight[i]
                let height2 = listHeight[i + 1]
                // console.log(newY)
                // console.log(height1)
                // console.log(height2)
                if (!height2 || (-newY >= height1 && -newY < height2)) {
                    this.currentIndex = i
                    // console.log(this.currentIndex)
                    return
                }
            }
            //  当滚动到底部，且-newY大于最后一个元素的上限
            this.currentIndex = listHeight.length - 2
        }
    },
    components: {
        Scroll
    },
    mounted() {
        this.$nextTick(() => {
            this._calculateHeight()
        })
    },
    methods: {
        scroll(pos) {
            this.scrollY = this.defaultHeight + pos.y
        },
        refresh() {
            this.$refs.listview.refresh()
        },
        _calculateHeight() {
            this.listHeight = []
            if (this.$refs.listGroup) {
                const list = this.$refs.listGroup
                let height = 0
                this.listHeight.push(height)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    height += item.clientHeight
                    this.listHeight.push(height)
                }
            }
            if (this.$refs.hot_wrap) {
                this.defaultHeight = this.$refs.hot_wrap.clientHeight
            }

        },
        _scrollTo(index) {
            // console.log(index)
            if (!index && index !== 0) {
                return
            }
            if (index < 0) {
                index = 0
            } else if (index > this.listHeight.length - 2) {
                index = this.listHeight.length - 2
            }
            this.scrollY = -this.listHeight[index]
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
        },
        onShortcutTouchSart(e) {
            let anchorIndex = getData(e.target, 'index')
            let firstTouch = e.touches[0]
            this.touch.y1 = firstTouch.pageY
            this.touch.anchorIndex = anchorIndex
            this._scrollTo(anchorIndex)
        },
        onShortcutTouchMove(e) {
            let firstTouch = e.touches[0]
            this.touch.y2 = firstTouch.pageY
            let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
            let anchorIndex = parseInt(this.touch.anchorIndex) + delta
            this._scrollTo(anchorIndex)
            // console.log(anchorIndex)
        },
        selectCity(item) {
            this.$emit('selectCitys', item)
        }
    }
}
</script>
<style scoped>
.albhabet-box {
    margin-top: 10px;
    box-sizing: border-box;
    overflow: hidden;
    position: fixed;
    bottom: 45px;
    top: 110px;
    width: 100%;
}

.scroll_wrap {
    background: #fff;
    overflow: auto;
}

.title {
    padding: 10px 15px;
    background: #e4e4e4;
}

.hot_city {
    padding: 5px 16px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.hot_city li {
    width: 30%;
    background: #f1f1f1;
    margin: 5px;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
}

.city_content ul {
    margin: 0 15px;
}

.city_content li {
    padding: 15px;
    border-bottom: 1px solid #eee;
}

.area_keys {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    font-size: 12px;
    line-height: 1.4;
    color: #eee;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
    font-family: Helvetica;
}

.area_keys li.current {
    color: #000;
}
</style>