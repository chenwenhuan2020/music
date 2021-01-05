<template>
  <div class="list">
    <!-- 导航 -->
    <div class="search">
      <van-nav-bar>
        <template #title>
          <h3 class="search-title">排行榜</h3>
        </template>
      </van-nav-bar>
    </div>
    <!-- banner介绍区 -->
    <div class="banner">
      <div class="left">
        <p class="p1">巴黎音乐周榜播放&nbsp;2020年第42周</p>
        <p class="p2">DJ点评，每周更新</p>
      </div>
      <div class="right">
        <img class="auto-img" src="../assets/img/b1.jpg" alt="" />
      </div>
      <div class="list-title">
        <strong>巴黎乐 · 榜&gt;&gt;</strong>
      </div>
    </div>
    <!-- 榜单标题 -->
    <div class="music-title">
      <h3>巴黎音乐官方榜</h3>
    </div>
    <!-- 榜单列表 -->
    <div class="music-list">
      <div
        class="music-item"
        v-for="(item, index) in characteristicData"
        :key="index"
        @click="goRankinglist(item.id)"
      >
        <div class="item-img">
          <img class="auto-img" :src="item.coverImgUrl" alt="" />
        </div>
        <div class="item-text">
          <p>{{ item.name }}</p>
          <p style="font-weight:500">{{ item.updateFrequency }}</p>
        </div>
      </div>
    </div>
    <!-- 全球权威 -->
    <div class="authority">
      <h3>全球权威</h3>
    </div>
    <!-- 权威列表 -->
    <div class="authority-list">
      <van-grid :border="false" :column-num="3">
        <van-grid-item v-for="(item, index) in globalData" :key="index" @click="goRankinglist(item.id)">
          <van-image :src="item.coverImgUrl"></van-image>
          <p class="authority-title">{{ item.name }}</p>
          <p class="authority-p">{{ item.updateFrequency }}</p>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import "../assets/less/list.less";
export default {
  name: "List",
  //数据
  data() {
    return {
      //特色榜数据
      characteristicData: [],
      //全球数据
      globalData: [],
    };
  },
  //初始化
  created() {
    this.getCharacteristic();
  },
  //方法
  methods: {
    // 特色榜数据
    getCharacteristic() {
      this.axios({
        method: "GET",
        url: "http://localhost:3000/toplist",
      }).then((res) => {
        
        for (let i = 0; i < res.data.list.length; i++) {
          if (i < 4) {
            this.characteristicData.push(res.data.list[i]);
          } else {
            this.globalData.push(res.data.list[i]);
          }
        }
      });
    },
    //修改路由状态
    changLy(show){
     this.$store.commit("changLy", show);
    },
    // 跳转榜单列表
    goRankinglist(id){
      this.changLy(false);
       this.$router.push({ name: "Rankinglist", params: { id } });
    }
  },
};
</script>
