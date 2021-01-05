<template>
  <div class="remlist">
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
            <h3>推荐歌单</h3>
          </div>
        </template>
      </van-nav-bar>
    </div>
    <!-- 上 -->
    <div class="top">
      <div class="top-img">
        <img :src="titleData.coverImgUrl" alt="" class="auto-img" />
      </div>
      <div class="top-title">
        <p class="p">{{ titleData.name }}</p>
        <div class="toux">
          <div class="t-img">
            <img :src="titleData2.avatarUrl" alt="" class="auto-img" />
          </div>
          <div class="t-txt">{{ titleData2.nickname }}</div>
          <div class="t-cj">2020-05-01 创建</div>
        </div>
        <p class="top-txt">介绍：{{ titleData.description }}</p>

        <div class="btn">
          <button>
            <p class="img">
              <img src="../assets/img/tj.png" class="auto-img" alt="" />
            </p>
            <p class="txt">{{ titleData.subscribedCount }}</p>
          </button>
          <button>
            <p class="img">
              <img src="../assets/img/zf.png" class="auto-img" alt="" />
            </p>
            <p class="txt">{{ titleData.shareCount }}</p>
          </button>
          <button>
            <p class="img">
              <img src="../assets/img/plun.png" class="auto-img" alt="" />
            </p>
            <p class="txt">{{ titleData.commentCount }}</p>
          </button>
        </div>
      </div>
    </div>
    <!-- 中 -->
    <div class="center">
      <div class="left">
        <span>歌曲列表:</span>
        <span style="color: red">{{ titleData.trackCount }}首</span>
      </div>
      <div class="right">
        <span>播放:</span>
        <span>{{ titleData.playCount }}次</span>
      </div>
    </div>
    <!-- 下 -->
    <div class="list">
      <ul class="list-ul">
        <li class="item" v-for="(item, index) in listData" :key="index">
          <p class="item-num">{{ index + 1 }}.</p>
          <div class="item-signame">{{ item.name }}</div>
          <div class="item-time" @click="btnshow(index)">
            {{ songertime[index] }}

            <div class="time-btn" :class="[num == index ? 'activeTime' : '']">
              <button @click="collection(item)">
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
          <div class="item-zj">{{ item.ar[0].name }}</div>
          <h3 class="item-name">{{ item.al.name }}</h3>
          <div
            class="item-btn"
            @click="playMusic(item.id, item.name, item.al.picUrl)"
          >
            <img src="../assets/img/play.png" alt="" class="auto-img" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import '../assets/less/remlist.less'
import { Test } from "../components/libs/mv";
export default {
  name: "Remlist",
  //数据
  data() {
    return {
      //路由id
      id: "",
      //列表数据
      rankingData: [],
      //图片标题数据
      listData: [],
      //标题数据
      titleData: [],
      //标题数据2
      titleData2: [],
      //歌曲时间
      songertime: [],
      //音乐路径
      musicUrl: "",
      //下标
      num: 0,
      //缓存歌曲数据
      songArr: [],
    };
  },
  //初始化
  created() {
    //获取路由id
    this.id = this.$route.params.id;
    
    // 列表数据
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
          //歌曲时间
          this.songertime.push(this.time(res.data.playlist.tracks[i].dt));
        }

        //标题数据
        this.titleData = res.data.playlist;
        //标题数据2
        this.titleData2 = res.data.playlist.creator;
        //列表数据
        this.listData = Test(res.data.playlist.tracks);
        
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
    playMusic(id, name, url) {
      this.axios({
        method: "GET",
        url: "http://localhost:3000/song/url",
        params: {
          id: id,
        },
      }).then((res) => {
        this.musicUrl = res.data.data[0].url;
        
        //秀修改音乐路径
        this.changeAudioSrc(this.musicUrl);
        //修改当前时间
        this.changeCurrentTime(0);
        //修改播放状态
        this.changPlay(false);
        //修改歌曲名字
        this.changeSongName(name);
        // 修改歌曲图片
        this.changeSongUrl(url);
        //修改id
        this.changId(res.data.data[0].id);
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
    //修改歌手图片
    changeSongUrl(songUrl) {
      this.$store.commit("changeSongUrl", songUrl);
    },
    //修改初始化时间
    changeCurrentTime(currentTime) {
      this.$store.commit("changeCurrentTime", currentTime);
    },
    //播放状态
    changPlay(flag) {
      this.$store.commit("changPlay", flag);
    },
    //修改歌曲id
    changId(musicId) {
      this.$store.commit("changId", musicId);
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
      this.changLy(true)
      this.$router.go(-1);
    },
    // 缓存数据
    collection(item) {
      item.isCollection = !item.isCollection;
      if (item.isCollection) {
        let singerStr = "";
        for (let i = 0; i < item.ar.length; i++) {
          singerStr = item.ar[0].name + "/";
        }
        singerStr = singerStr.substring(0, singerStr.length - 1);
        let obj = {
          songId: item.id,
          songName: item.name,
          singer: singerStr,
          songImg: item.al.picUrl,
          audioSrc:
            "https://music.163.com/song/media/outer/url?id='+item.id+'.mp3",
          duration: item.dt,
        };
        
        //修改缓存
        this.$store.commit("addSong", obj);
        if (!this.$store.state.playFlag) {
          let data = ["count", this.$store.state.song.length - 1];
          this.$store.commit("update", data);
        }
        //延时缓存
        setTimeout(() => {
          this.$store.commit("songCache");
        }, 0);
      } else {
        // 删除缓存
        
      }
    },
     //修改底部路由
    changLy(flag){
      this.$store.commit("changLy", flag);
    },
  },
};
</script>
