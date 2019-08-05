<template>
  <div class="shop-list-box">
  	<ul>
  		<li class="shop-item" v-for="(item, index) in datas" :key="index">
  			<div class="shop-info">
  				<div class="img-box">
  					<img :src="item.restaurant.image_path" alt="">
  				</div>
  				<div class="shop-content">
  					<div class="shop-name">
  						<i v-if="item.restaurant.is_premium">品牌</i>
  						<span>{{item.restaurant.name}}</span>	
  					</div>
  					<div class="rate-box">
  						<my-rating :rating="item.restaurant.rating"></my-rating>
  						<span class="rate-text">{{item.restaurant.rating}}</span>
  						<span>月售{{item.restaurant.recent_order_num}}单</span>
  					</div>
  					<div class="limit-box">
  						<div class="limit-left">
  							<span>¥{{item.restaurant.float_minimum_order_amount}}起送</span> |
  							<span>配送费¥{{item.restaurant.float_delivery_fee}}</span>
  						</div>
  						<div class="limit-right">
  							<span>{{(item.restaurant.distance / 1000).toFixed(2)}}km</span> |
  							<span>{{item.restaurant.order_lead_time}}</span>
  						</div>
  					</div>
  				</div>
  			</div>
  		</li>
  	</ul>
  </div>
</template>

<script>
import MyRating from '../Rating/Rating'

  export default{
    name: "shop-list",
    props: {
    	datas: Array
    },
    components: {
    	MyRating
    }
  }
</script>
<style scoped>
.shop-item {
  background: #fff;
  color: #666;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}
.shop-info {
  display: flex;
  justify-content: flex-start;
  padding: 0 10px;
  align-items: stretch;
}
.img-box {
  width: 65px;
  height: 65px;
}
.img-box img {
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 2px;
}
.shop-content {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  flex-direction: column;
  padding-left: 10px;
  font-size: 12px;
  flex-grow: 1;
}
.shop-name {
  align-items: center;
  color: #333;
  font-weight: 700;
  font-size: 14px ;
}
.shop-name i {
  background: #ffe800;
  margin-right: 5px;
  padding: 2px 3px;
  text-align: center;
  white-space: nowrap;
  font-size: 12px
}
.shop-name span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rate-box {
  display: flex;
  align-items: center;
  overflow: hidden;
}
.rate-text {
  margin-right: 5px;
}
.limit-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.limit-right{
  color: #999;
}
/*.delivery {
  display: flex;
  align-items: center;
  font-size: 0.6rem;
  margin-left: 1.066667vw;
}
.delivery .icon-hollow {
  color: #fff;
  background-color: #2395ff;
  padding: 2px;
  box-sizing: border-box;
}*/
</style>
