<template>
  <div class="namezj">
    <div class="zj">
      <van-grid :border="false" :column-num="4">
        <van-grid-item v-for="(item, index) in zjData" :key="index" @click="gonewdisc(item.id)">
          <van-image :src="item.picUrl" />
          <p class="zj-name" style="color:#ff677d">{{ item.name }}</p>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  name: "Namezj",
  //数据
  data() {
    return {
      //id
      id: "",
      //专辑数据
      zjData: [],
    };
  },
  //初始化
  created() {
    this.id = sessionStorage.getItem("id");
    
    //列表数据
    this.getziData();
  },
  //方法
  methods: {
    //专辑数据
    getziData() {
      this.$toast.loading({
        //文本提示
        message: "加载中...",
        //禁止穿透点击
        forbidClick: true,
        //提示时间, 0: 没有时间限制
        duration: 0,
      });
      this.axios({
        method: "GET",
        url: "http://localhost:3000/artist/album",
        params: {
          id: this.id,
          limit:20,
        },
      }).then((res) => {
        if (res.status == 200) {
          // 请求成功
          this.$toast.clear();
          this.zjData = res.data.hotAlbums;
          
        }
      });
    },
    //跳转专辑列表
    gonewdisc(id){
      
     this.$router.push({ name: "Namezjlist", params: { id } });
    }
  },
};
</script>

<style lang="less" scoped>
.namezj {
  .zj-name {
    font-size: 10px;
    font-weight: bold;
    padding-top: 5px;
    columns: #656565;
  }
}
</style>