<template>
  <div class="namemv">
    <!-- 推荐歌单 -->
    <div class="music">
      <div class="musicList">
        <ul class="music-ul">
          <li class="music-li" v-for="(item, index) in mvData" :key="index">
            <div class="music-img">
              <div class="img">
                <img :src="item.imgurl" alt="" class="auto-img" />
              </div>
              <div class="music-btn" @click="goMv(item.id)">
                <img src="../assets/img/play.png" alt="" class="auto-img" />
              </div>
              <div class="scang" @click="Collection(item.id)">
                <img src="../assets/img/soucang.png" alt="" class="auto-img" />
              </div>
            </div>
            <div class="music-text">
              <p>{{ item.name }}</p>
              <p>{{ item.publishTime }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/less/namemv.less'
export default {
  name: "Namemv",
  //数据
  data() {
    return {
      //id
      id: "",
      //mv数据
      mvData: [],
      //收藏的数组
      collection: [],
    };
  },
  //初始化
  created() {
    //路由id
    this.id = sessionStorage.getItem("id");
    this.getmvData();
  },
  //方法
  methods: {
    //列表数据
    getmvData() {
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
        url: "http://localhost:3000/artist/mv",
        params: {
          id: this.id,
        },
      }).then((res) => {
        if (res.status == 200) {
          // 请求成功
          this.$toast.clear();
          this.mvData = res.data.mvs;
          // 
          
        }
      });
    },
    //收藏
    Collection(id) {
      //获取token
      let tkan = localStorage.getItem("tk");
      
      
      if (!tkan) {
        //跳回登录页面
        this.$toast("请先登录");
        return this.$router.push({ name: "Login" });
      }
      this.axios({
        // withCredentials: true,
        method: "GET",
        url:"http://localhost:3000/mv/sub",
        params: {
          mvid:id,
          t:1, 
        },
      }).then((res) => {
        
      });
    },
    //跳转路由
    goMv(id) {
      this.$router.push({ name: "Mv", params: { id } });
    },
    //修改mv收藏数据
    changMvCollection(mv) {
      this.$store.commit("changMvCollection", mv);
    },
  },
};
</script>
