<template>
    <div class="address-box">
        <header-back :isLeft="true" title="选择收货地址"></header-back>
        <div class="city_search">
            <div class="search">
                <span class="city" @click="selectCity">
                    {{city}}
                    <i class="fa fa-angle-down"></i>
                </span>
                <i class="fa fa-search"></i>
                <input type="text" v-model="search_val" placeholder="小区/写字楼/学习等">
            </div>
            <location @selectLocation="selectAddress" :address="address"></location>
        </div>
        <scroll class="area" :data="areaList" ref="area">
            <ul class="area_list">
                <li @click="selectAddress(item)" v-for="(item,index) in areaList" :key="index">
                    <h4>{{item.name}}</h4>
                    <p>{{item.district}}{{item.address.length ? item.address : ''}}</p>
                </li>
            </ul>
        </scroll>
    </div>
</template>
<script>
import HeaderBack from '../components/HeaderBack/HeaderBack'
import Location from '../components/Location/Location'
import { mapGetters, mapMutations } from 'vuex'
import Scroll from '../components/Scroll/Scroll'

export default {
    name: "adress",
    data() {
        return {
            city: '',
            search_val: '',
            areaList: []
        }
    },
    computed: {
        ...mapGetters([
            'address'
        ])
    },
    watch: {
        search_val() {
            this.searchPlace()
            this.$nextTick(() => {
                this.$refs.area.refresh()
            })
        },
        areaList() {
            this.$nextTick(() => {
                this.$refs.area.refresh()
            })
        }
    },
    components: {
        HeaderBack,
        Location,
        Scroll
    },
    methods: {
        searchPlace() {
            const self = this
            AMap.plugin('AMap.Autocomplete', function() {
                // 实例化Autocomplete
                var autoOptions = {
                    //city 限定城市，默认全国
                    city: self.city
                }
                var autoComplete = new AMap.Autocomplete(autoOptions);
                autoComplete.search(self.search_val, function(status, result) {
                    // 搜索成功时，result即是对应的匹配数据
                    self.areaList = result.tips
                })
            })
        },
        selectAddress(item) {
            if (item) {
                this.setAddress(item.district + item.address + item.name)
            } else {
                this.setAddress(this.address)
            }
            this.$router.push('/home')
        },
        selectCity() {
            this.$router.push('/city')
        },
        ...mapMutations({
            setAddress: 'SET_ADDRESS'
        })
    },
    beforeRouteEnter(to, from, next) {
        next(res => {
            res.city = to.params.city
        })
    }
}
</script>
<style scoped>
.address-box {
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding-top: 45px;
}

.city_search {
    background-color: #fff;
    padding: 10px 20px;
    color: #333;
}

.search {
    background-color: #eee;
    border-radius: 10px;
    box-sizing: border-box;
        display: flex;
    align-items: center;
}

.search .city {
    padding: 0 10px;
}

.city i {
    margin-right: 10px;
}

.search input {
       flex: 1;
    padding: 0 10px;
    background-color: #eee;
    outline: none;
    border: none;
    height: 40px;
    line-height: 40px;
}

.area {
    margin-top: 15px;
    position: fixed;
    width: 100%;
    overflow: hidden;
    bottom: 45px;
    top: 153px;
}

.area li {
    border-bottom: 1px solid #eee;
    padding: 8px 16px;
    color: #aaa;
    background: #fff;
}

.area li h4 {
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
}
</style>