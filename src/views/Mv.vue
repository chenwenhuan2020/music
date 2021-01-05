<template>
  <div class="mv">
    <!-- 返回 -->
     <!-- 导航 -->
    <div class="mv-fh">
      <van-nav-bar @click-left="goleft">
        <template #left>
          <div class="left">
            <img src="../assets/img/fh.png" alt="" class="auto-img">
          </div>
        </template>
        <template #title>
          <h3 class="search-title" style=" color:#ff808b;">MV</h3>
        </template>
      </van-nav-bar>
    </div>
    <!-- mv -->
    <div class="video">
      <video :src="mvUrl" autoplay
       controls style="width: 100%; height: 200px"></video>
    </div>
    <!-- mv数据 -->
    <div class="mv-btn">
      <button>
        <div class="img">
          <img src="../assets/img/dz.png" alt="" class="auto-img" />
        </div>
        <p>{{ mvzfs.likedCount }}</p>
      </button>
      <button>
        <div class="img">
          <img src="../assets/img/zf.png" alt="" class="auto-img" />
        </div>
        <p>{{ mvzfs.shareCount }}</p>
      </button>
    </div>
    <!-- 评论 -->
    <div class="mv-pl">
      评论<span>共{{ plsum }}条评论</span>
    </div>
    <!-- 精彩评论 -->
    <div class="jc-pl">
      <div class="pl-title">精彩评论</div>
      <div class="pl-liuyan">
        <div class="pl-item" v-for="(item, index) in jcpl" :key="index">
          <div class="left">
            <img :src="item.user.avatarUrl" alt="" class="auto-img" />
          </div>
          <div class="right">
            <div class="text">
              <span class="text-name">{{ item.user.nickname }}：</span>
              <span class="text-pl">
                {{ item.content }}
              </span>
            </div>
            <div class="text-bon">
              <div class="dzimg"></div>
              <p class="dz">{{ item.likedCount }}</p>
              <p class="hf">回复</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/less/mv.less'
export default {
  name: "Mv",
  data() {
    return {
      //mv链接
      mvUrl: "",
      //mv转发收藏数据
      mvzfs: [],
      //评论总条数
      plsum: "",
      //精彩评论
      jcpl: [],
      //路由id
      id: "",
    };
  },
  //初始化
  created() {
    //拦截路由id
    this.id = this.$route.params.id;
    
    this.getJcpl();
    this.getMvurl();
    this.getMvzfs();
  },
  //方法
  methods: {
    getJcpl() {
      this.axios({
        method: "GET",
        url: "http://localhost:3000/comment/mv",
        params: {
          id: this.id,
        },
      }).then((res) => {
        //评论总数
        this.plsum = res.data.total;
        //精彩评论
        this.jcpl = res.data.hotComments;
        // 
        // 
      });
    },

    getMvzfs() {
      this.axios({
        method: "GET",
        url: "http://localhost:3000/mv/detail/info",
        // url: "http://localhost:3000/mv/detail",
        params: {
          mvid: this.id,
        },
      }).then((res) => {
        this.mvzfs = res.data;
        // 
      });
    },

    getMvurl() {
      this.axios({
        method: "GET",
        url: "http://localhost:3000/mv/url",
        params: {
          id: this.id,
        },
      }).then((res) => {
        // 
        this.mvUrl = res.data.data.url;
      });
    },
    // 返回上一级路由
    goleft(){
       this.$router.go(-1);
    }
  },
};
</script>
