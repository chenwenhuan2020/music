<template>
  <div class="namezjlist">
    <!-- 导航 -->
    <div class="nav">
      <van-nav-bar left-arrow @click-left="onClickLeft">
        <template #left>
          <div class="left">
            <img src="../assets/img/fh.png" class="auto-img" alt="" />
          </div>
        </template>
        <template #title>
          <div class="title">
            <h3>歌手专辑</h3>
          </div>
        </template>
      </van-nav-bar>
    </div>
    <!-- 下 -->
    <div class="top">
      <div class="top-img">
        <img :src="informationTop.picUrl" alt="" class="auto-img" />
      </div>
      <div class="top-title">
        <p class="p">
          <span class="top-zj">专辑</span>{{ informationTop.name }}
        </p>
        <div class="top-name">
          歌手：<span style="color: blue">{{ songername }}</span>
        </div>
        <div class="top-time">发行时间：2020-11-20</div>
        <div class="top-gs">发行公司：{{ informationTop.company }}</div>
        <div class="btn">
          <button>
            <p class="img">
              <img src="../assets/img/scang.png" class="auto-img" alt="" />
            </p>
            <p class="txt">收藏</p>
          </button>
          <button>
            <p class="img">
              <img src="../assets/img/zf.png" class="auto-img" alt="" />
            </p>
            <p class="txt">{{ informationBtn.shareCount }}</p>
          </button>
          <button>
            <p class="img">
              <img src="../assets/img/xzai.png" class="auto-img" alt="" />
            </p>
            <p class="txt">下载</p>
          </button>
          <button>
            <p class="img">
              <img src="../assets/img/plun.png" class="auto-img" alt="" />
            </p>
            <p class="txt">{{ informationBtn.commentCount }}</p>
          </button>
        </div>
      </div>
    </div>
    <!-- 简介 -->
    <div class="jianjie">
      <h3>专辑介绍：</h3>
      <p>{{ informationTop.description }}</p>
    </div>
    <!-- 中 -->
    <div class="center">
      <div class="left">
        <span>包含的歌曲列表:</span>
        <span style="color: red">{{ informationTop.size }}首</span>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="songer-list">
      <ul class="list-ul">
        <li class="item" v-for="(item, index) in songerList" :key="index">
          <p class="item-num">{{ index + 1 }}.</p>
          <div class="item-signame">{{ item.name }}</div>
          <div class="item-time" @click="btnshow(index)">
            {{ songertime[index] }}

            <div class="time-btn" :class="[num == index ? 'activeTime' : '']">
              <button>
                <img src="../assets/img/scang.png" alt="" class="auto-img" />
              </button>
              <button>
                <img src="../assets/img/xzai.png" alt="" class="auto-img" />
              </button>
              <button>
                <img src="../assets/img/zf.png" alt="" class="auto-img" />
              </button>
            </div>
          </div>
          <h3 class="item-name">{{ item.ar[0].name }}</h3>
          <div
            class="item-btn"
            @click="playmusic(item.id, item.name, item.al.picUrl)"
          >
            <img src="../assets/img/play.png" alt="" class="auto-img" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import '../assets/less/namelist.less'
export default {
  name: "Newdisc",
  //数据
  data() {
    return {
      // 专辑列表数据
      discdataTop: [],
      discdataBottom: [],
      //信息
      informationTop: [],
      informationBtn: [],
      //歌手名
      songername: "",
      //歌曲列表
      songerList: [],
      //歌曲时间
      songertime: [],
      //路由id
      id: "",
      //下标
      num: 0,
    };
  },
  //初始化
  created() {
    this.id = this.$route.params.id;
    
    this.getinformation();
  },
  //方法
  methods: {
    //获取音乐路径
    playmusic(id, name, url) {
        this.axios({
          method: "GET",
          url: "http://localhost:3000/song/url",
          params: {
            id: id,
          },
        }).then((res) => {
          //音乐路径
          this.musicUrl = res.data.data[0].url;
          
          //修改歌手图片
          this.changeSongUrl(url);
          // 修改歌曲名字
          this.changeSongName(name);
          //修改音乐路径
          this.changeAudioSrc(this.musicUrl);
          //修改当前时间
          this.changeCurrentTime(0);
        });
    },
    //修改音乐路径
    changeAudioSrc(audioSrc) {
      this.$store.commit("changeAudioSrc", audioSrc);
    },
    //修改歌曲名字
    changeSongName(songName) {
      this.$store.commit("changeSongName", songName);
    },
    //修改歌收图片
    changeSongUrl(songUrl) {
      this.$store.commit("changeSongUrl", songUrl);
    },
    //修改初始化时间
    changeCurrentTime(currentTime) {
      
      this.$store.commit("changeCurrentTime", currentTime);
    },
    //获取信息
    getinformation() {
      this.axios({
        method: "GET",
        url: "http://localhost:3000/album",
        params: {
          id: this.id,
        },
      }).then((res) => {
        
        for (let i = 0; i < res.data.songs.length; i++) {
          //歌曲时间
          this.songertime.push(this.time(res.data.songs[i].dt));
        }
        this.songerList = res.data.songs;
        this.informationTop = res.data.album;
        this.informationBtn = res.data.album.info;
        this.songername = res.data.album.artists[0].name;
        
        
      });
    },
    //格式化时间
    time(seconds) {
      let h, m, s;
      //计算小时 分钟 秒钟
      m = Math.floor(seconds / 1000 / 60);
      s = Math.floor((seconds / 1000) % 60);

      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;

      return m + ":" + s;
    },
    //显示收藏
    btnshow(index) {
      if (this.num == index) {
        
        return;
      }
      this.num = index;
    },
    //返回上一级路由
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

