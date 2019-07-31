<template>
    <div class="filter-sort-box" v-if="isShow">
        <div v-for="(item, index) in screenBy" :key="index" class="morefilter">
            <p class="title">{{item.title}}</p>
            <ul>
                <li v-for="(list, i) in item.data" :key="i" :class="{'selected': list.select}" @click="selectScreen(list, item)">
                    <img v-if="list.icon" :src="list.icon" alt="">
                    <span>{{list.name}}</span>
                </li>
            </ul>
        </div>
        <div class="morefilter-btn">
            <span @click="clearFilter" class="morefilter-clear" :class="{'edit': edit}">清空</span>
            <span @click="filterOk" class="morefilter-ok">确定</span>
        </div>
    </div>
</template>
<script>
const MPI = 'MPI'
const OFFER = 'offer'
const PER = 'per'

export default {
    name: "filter-sort",
    props: {
        isShow: Boolean,
        screenBy: Array
    },
    computed: {
        edit() {
            let edit = false
            this.screenBy.forEach(res => {
                res.data.forEach(item => {
                    if (item.select) {
                        edit = true
                    }
                })
            })
            return edit
        }
    },
    methods: {
        selectScreen(list, item) {
            if (item.id !== MPI) {
                item.data.forEach(res => {
                    res.select = false
                })
            }
            list.select = !list.select
        },
        clearFilter() {
            this.screenBy.forEach(res => {
                res.data.forEach(item => {
                    item.select = false
                })
            })
        },
        filterOk() {
            let screenData = {
                [MPI]: '',
                [OFFER]: '',
                [PER]: ''
            }
            let mpiStr = ""
            this.screenBy.forEach(res => {
                res.data.forEach(item => {
                   if (item.select) {
                   	//1.多选 2.单选
                   	if (res.id !== MPI) {
                   		//单选
                   		screenData[res.id] = item.code
                   	}else {
                   		//多选
                   		mpiStr += `${item.code} ,`
                   		screenData[res.id] = mpiStr
                   	}
                   }
                })
            })
            this.$emit('update', {condation: screenData})
        }
    }
}
</script>
<style scoped>
.filter-sort-box {
    background: #fff;
    padding: 0 2.666667vw;
    line-height: normal;
}

.morefilter {
    margin: 2.666667vw 0;
    overflow: hidden;
}

.morefilter .title {
    margin-bottom: 2vw;
    color: #666;
    font-size: 0.5rem;
}

.morefilter ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 0.8rem;
}

.morefilter li {
    box-sizing: border-box;
    width: 30%;
    height: 9.333333vw;
    line-height: 9.333333vw;
    margin: 0.8vw 1%;
    padding-left: 5.333333vw;
    background: #fafafa;
}

.morefilter li img {
    width: 3.466667vw;
    height: 3.466667vw;
    vertical-align: middle;
    margin-right: 0.8vw;
}

.morefilter li span {
    margin-left: 2%;
    vertical-align: middle;
}

.morefilter-btn {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fafafa;
    box-shadow: 0 -0.266667vw 0.533333vw 0 #ededed;
    line-height: 11.466667vw;
    box-sizing: border-box;
}

.morefilter-btn span {
    font-size: 0.826667rem;
    text-align: center;
    text-decoration: none;
    flex: 1;
}

.morefilter-clear {
    color: #ddd;
    background: #fff;
}

.morefilter-ok {
    color: #fff;
    background: #00d762;
    border: 0.133333vw solid #00d762;
}

.selected {
    color: #3190e8 !important;
    background-color: #edf5ff !important;
}

.edit {
    color: #333 !important;
}
</style>