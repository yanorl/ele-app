<template>
    <div class="city-box">
        <div class="search-wrap">
            <div class="search">
                <i class="fa fa-search"></i>
                <input type="text" v-model="city_val" placeholder="输入城市名">
            </div>
            <span @click="back">取消</span>
        </div>
        <template v-if="searchList.length === 0">
            <div class="location">
                <location @selectLocation="selectCitys({name: city})" :address="city"></location>
            </div>
            <albhabet :cityInfo="cityInfo" :keys="keys" @selectCitys="selectCitys"></albhabet>
        </template>
        <scroll :data="searchList" class="search-list" v-else>
            <ul>
                <li v-for="(item, index) in searchList" :key="index" @click="selectCitys(item)">{{item.name}}</li>
            </ul>
        </scroll>
    </div>
</template>
<script>
import Location from '../components/Location/Location'
import Albhabet from '../components/Albhabet/Albhabet'
import cityMapMixins from '../common/mixins/cityMixins'
import { getCityInfo } from '../api/citys'
import Scroll from '../components/Scroll/Scroll'

export default {
    name: "City",
    mixins: [cityMapMixins],
    data() {
        return {
            city_val: '',
            cityInfo: null,
            keys: [],
            allCities: [],
            searchList: []
        }
    },
    watch: {
        city_val() {
            this.searchCity()
        }
    },
    components: {
        Location,
        Albhabet,
        Scroll
    },
    created() {
        this._getCityInfo()
    },
    methods: {
        back() {
            this.$router.push({ name: 'address', params: { city: this.city } })
        },
        _getCityInfo() {
            getCityInfo().then(res => {
                    this.cityInfo = res
                    this.keys = this._normalizeKeys(res)

                    this.keys.forEach(key => {
                        this.cityInfo[key].forEach(city => {
                            this.allCities.push(city)
                        })
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        },
        _normalizeKeys(key) {
            let keys = Object.keys(key)
            keys.pop()
            keys.sort()
            return keys
        },
        selectCitys(city) {
            this.$router.push({ name: 'address', params: { city: city.name } })
        },
        searchCity() {
            if (!this.city_val) {
                this.searchList = []
            } else {
                this.searchList = this.allCities.filter(item => {
                    return item.name.indexOf(this.city_val) != -1
                })
            }
        }
    }
}
</script>
<style scoped>
.city-box {
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding-top: 45px;
}

.search-wrap {
    position: fixed;
    top: 0;
    height: 45px;
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    padding: 5px 16px;
    display: flex;
    justify-content: space-between;
}

.search {
    background-color: #eee;
    border-radius: 10px;
    width: 85%;
    box-sizing: border-box;
    padding: 0 16px;
    display: flex;
    align-items: center;
}

.search input {
    flex: 1;
    padding: 10px;
    background: #eee;
    outline: none;
    border: none;
}

.search-wrap span {
    display: inline-block;
    padding: 10px;
    color: #009eef;
}

.location {
    background: #fff;
    padding: 8px 16px;
    height: 65px;
    box-sizing: border-box;
}

.search-list {
    overflow: hidden;
    position: fixed;
    width: 100%;
    bottom: 45px;
    top: 55px;
}

.search-list li {
    background: #fff;
    padding: 10px 16px;
    border-bottom: 1px solid #eee;
    height: 25px;
    line-height: 25px;
}
</style>