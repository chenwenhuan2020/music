<template>
  <div class="rankinglist">
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
            <h3>排行榜</h3>
          </div>
        </template>
      </van-nav-bar>
    </div>
    <!-- 上 -->
    <div class="top">
      <div class="left">
        <img :src="hearderData.coverImgUrl" alt="" class="auto-img" />
      </div>
      <div class="right">
        <div class="title">{{ hearderData.name }}</div>
        <div class="btn">
          <button>
            <p class="img">
              <img src="../assets/img/tj.png" class="auto-img" alt="" />
            </p>
            <p class="txt">{{ hearderData.subscribedCount }}</p>
          </button>
          <button>
            <p class="img">
              <img src="../assets/img/zf.png" class="auto-img" alt="" />
            </p>
            <p class="txt">{{ hearderData.shareCount }}</p>
          </button>
          <button>
            <p class="img">
              <img src="../assets/img/plun.png" class="auto-img" alt="" />
            </p>
            <p class="txt">{{ hearderData.commentCount }}</p>
          </button>
        </div>
      </div>
    </div>
    <!-- 标题 -->
    <div class="center">
      <div class="left">
        <span>歌曲列表:</span>
        <span style="color: red">{{ hearderData.trackCount }}首</span>
      </div>
      <div class="right">
        <span>播放:</span>
        <span>{{ hearderData.playCount }}</span>
      </div>
    </div>
    <!-- 列表 -->
    <div class="list">
      <ul class="list-ul">
        <li class="item" v-for="(item, index) in rankingData" :key="index">
          <p class="item-num">{{ index + 1 }}.</p>
          <p class="item-new">new</p>
          <div class="item-img">
            <img :src="item.al.picUrl" alt="" class="auto-img" />
          </div>
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
import '../assets/less/rankinglist.less'
export default {
  name: "Rankinglist",
  //数据
  data() {
    return {
      //路由id
      id: "",
      //列表数据
      rankingData: [],
      //图片标题数据
      hearderData: [],
      //歌曲长度
      songertime: [],
      // 下标
      num: 0,
      //音乐路径
      musicUrl: "",
      //音乐状态
      playFlag: true,
    };
  },
  //初始化
  created() {
    //拦截路由id
    this.id = this.$route.params.id;
    
    this.getrankingData();
  },
  //方法
  methods: {
    //列表数据
    getrankingData(id) {
      this.axios({
        method: "GET",
        url: "http://localhost:3000/playlist/detail",
        params: {
          id: this.id,
        },
      }).then((res) => {
        for (let i = 0; i < res.data.playlist.tracks.length; i++) {
          if (i < 20) {
            //列表数据
            this.rankingData.push(res.data.playlist.tracks[i]);
            //歌曲时间
            this.songertime.push(this.time(res.data.playlist.tracks[i].dt));
          }
        }
        //标题数据
        this.hearderData = res.data.playlist;
        
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
          this.changPlay(false);
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
    //修改播放状态
    changPlay(flag) {
      this.$store.commit("changPlay", flag);
    },
    // 显示
    btnshow(index) {
      if (this.num == index) {
        
        return;
      }
      this.num = index;
    },
    //修改路由状态
    changLy(show){
     this.$store.commit("changLy", show);
    },
    //返回上一级路由
    onClickLeft() {
      this.changLy(true);
      this.$router.go(-1);
    },
  },
};
</script>
