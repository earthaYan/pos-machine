<template>
  <div id="left-nav">
    <ul>
      <li>
        <svg class="icon">
          <use xlink:href="#icongoumai" />
        </svg>
        <span>收银</span>
      </li>
      <li>
        <svg class="icon">
          <use xlink:href="#iconjinrudianpu" />
        </svg>
        <span>店铺</span>
      </li>
      <li>
        <svg class="icon">
          <use xlink:href="#icontianmaopaidui" />
        </svg>
        <span>商品</span>
      </li>
      <li>
        <svg class="icon">
          <use xlink:href="#iconhuiyuanqia" />
        </svg>
        <span>会员</span>
      </li>
      <li>
        <svg class="icon">
          <use xlink:href="#iconquanbudingdan" />
        </svg>
        <span>统计</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
#left-nav{
    height: 100%;
    background-color: #1D8ce0;
    color: #fff;
    li{
        border-bottom:1px solid #20a0ff;
        text-align: center;
        padding: 10px;
        .icon{
           margin-right: 5px;
        }
    }
}
</style>