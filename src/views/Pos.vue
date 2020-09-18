<template>
  <div id="pos">
    <el-row>
      <el-col :span="9" class="pos-order" id="order-list">
        <el-tabs v-model="menu">
          <el-tab-pane label="点餐">
            <el-table
              border
              style="width:100%"
              :data="tableData"
              :header-cell-style="{background:'#ececec'}"
            >
              <el-table-column prop="goodsName" label="商品名称"></el-table-column>
              <el-table-column prop="count" label="数量" width="50"></el-table-column>
              <el-table-column prop="price" label="金额" width="70"></el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope1">
                  <el-button type="text" size="small" @click="addOrderList(scope1.row)">增加</el-button>
                  <el-button type="text" size="small" @click="delSingleGoods(scope1.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="total-div">数量:{{totalCount}} 金额：{{totalMoney}}元</div>
            <div class="btn-group">
              <el-button type="warning"  @click="hangOn">挂单</el-button>
              <el-button type="danger" @click="delAllGoods">删除</el-button>
              <el-button type="success" @click="checkout">结账</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="外卖">外卖</el-tab-pane>
          <el-tab-pane label="挂单">挂单</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="15">
        <div class="often-goods">
          <div class="title">常用商品</div>
          <div class="goods-list">
            <ul>
              <li v-for="item in oftenGoods" :key="item.goodsName" @click="addOrderList(item)">
                <span class="title">{{item.goodsName}}</span>
                <span class="single-price">￥{{item.price}}</span>
              </li>
            </ul>
          </div>
          <div class="goods-type">
            <el-tabs>
              <el-tab-pane label="汉堡">
                <ul class="ham">
                  <li v-for="item in typeGoods" :key="item.goodsName" @click="addOrderList(item)">
                    <img src="@/assets/img/ham.jpg" class="foodImage" width="100%" />
                    <div class="info">
                      <span class="foodName">{{item.goodsName}}</span>
                      <span class="foodPrice">￥{{item.price}}</span>
                    </div>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="小食">小食</el-tab-pane>
              <el-tab-pane label="饮料">饮料</el-tab-pane>
              <el-tab-pane label="套餐">套餐</el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import getApi from "../assets/pub";
import axios from "axios";
export default {
  name: "Pos",
  data() {
    return {
      menu: 0,
      oftenGoods: [],
      tableData: [],
      typeGoods: [],
      totalCount: 0,
      totalMoney: 0,
    };
  },
  components: {},
  mounted() {
    this.getOften();
    this.getType();
  },
  methods: {
    hangOn(){
      if(this.tableData.length){
        localStorage.setItem('hanon',JSON.stringify(this.tableData))
        this.tableData=[]
      }else{
        this.tableData=JSON.parse(localStorage.getItem('hanon'))
        localStorage.removeItem('hanon')
      }
      this.getAllMoney()
    },
    checkout() {
      if (this.totalCount != 0) {
        this.tableData = [];
        this.totalCount = 0;
        this.totalMoney = 0;
        this.$message({
          message: "结账成功，感谢你又为店里出了一份力!",
          type: "success",
        });
      } else {
        this.$message.error("不能空结。老板了解你急切的心情！");
      }
    },
    delAllGoods() {
      this.tableData = [];
      this.getAllMoney();
    },
    delSingleGoods(goods) {
      this.tableData = this.tableData.filter(
        (item) => item.goodsName !== goods.goodsName
      );
      this.getAllMoney();
    },
    getAllMoney() {
      this.totalCount = 0;
      this.totalMoney = 0;
      if (this.tableData) {
        this.tableData.forEach((element) => {
          this.totalCount += element.count;
          this.totalMoney = this.totalMoney + element.price * element.count;
        });
      }
    },
    addOrderList(goods) {
      // 判断商品是否已经存在于订单列表中
      // 声明变量
      this.totalCount = 0;
      this.totalMoney = 0;
      let isHave = false;
      let arr = [];
      var res = this.tableData.filter(function (item) {
        return item.goodsName == goods.goodsName;
      });
      if (res.length) {
        isHave = true;
      }
      if (isHave) {
        // 改变列表中的商品数量
        arr = res;
        arr[0].count++;
      } else {
        var newGoods = {
          goodsName: goods.goodsName,
          price: goods.price,
          count: 1,
        };
        this.tableData.push(newGoods);
      }
      this.getAllMoney();
    },
    getOften() {
      axios.get(getApi().getOftenGoods).then((res) => {
        this.oftenGoods = res.data;
      });
    },
    getType() {
      axios.get(getApi().getType).then((res) => {
        this.typeGoods = res.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#pos {
  height: 100%;
  padding-left: 10px;
  .el-row,
  .el-col {
    height: 100%;
  }
  #order-list {
    border-right: 1px solid #ececec;
  }
  .btn-group {
    text-align: center;
    margin-top: 20px;
  }
  .often-goods {
    .title {
      border-bottom: 1px solid #d3dce6;
      background-color: #f9fafc;
      padding: 10px;
    }
    .goods-list {
      li {
        padding: 10px;
        margin: 10px;
        float: left;
        background: #fff;
        border-bottom: 1px solid #e5e9f2;
      }
      .single-price {
        color: blue;
      }
    }
    .goods-type {
      clear: both;
      padding: 10px;
    }
  }
  .ham {
    li {
      display: inline-block;
      width: 23%;

      border: 1px solid #e5e9f2;
      overflow: hidden;
      background-color: #fff;
      padding: 20px;
      margin: 2px;
      > img {
        width: 50%;
      }
      .info {
        float: right;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .foodName {
          color: #f73f34;
        }
      }
    }
  }
}
.total-div {
  background-color: #000;
  color: #fff;
  padding: 20px;
}
</style>