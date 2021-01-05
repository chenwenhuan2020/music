<template>
  <div class="playinterface">
    <!-- 背景 -->
    <div class="bg"></div>
    <!-- 内容 -->
    <div class="bigBaner">
      <!-- 导航 -->
      <div class="nav">
        <van-nav-bar @click-left="onClickLeft">
          <template #left>
            <div class="left-img">
              <img class="auto-img" src="../assets/img/fahui.png" alt="" />
            </div>
          </template>
          <template #title>
            <div>
              <p>{{ songName }}</p>
            </div>
          </template>
          <template #right>
            <div class="right">
              <img src="../assets/img/pc.png" alt="" class="auto-img" />
            </div>
          </template>
        </van-nav-bar>
      </div>
      <!-- 上面小按钮 -->
      <div class="ban1">
        <button v-for="(item, index) in topBtn" :key="index">
          {{ item.title }}
        </button>
      </div>
      <!-- 头像 -->
      <div :class="[isFlag ? 'play-tou1' : 'play-tou2']" ref="tou">
        <img :src="pp" alt="" class="img" />
      </div>
      <!-- 歌词 -->
      <div class="lyric">
        <div class="lyricList" ref="ul" :style="{ top: bb + 'px' }">
          <p
            v-for="(item, index) in afterLrc"
            :key="index"
            class="text"
            :class="[lrcIndex == index ? 'activeMusic' : '']"
          >
            {{ item.txt }}
          </p>
        </div>
      </div>
      <!-- 底部块 -->
      <div class="play-bottom">
        <!-- 下面小按钮 -->
        <div class="ban2">
          <div
            class="ban2-item"
            v-for="(item, index) in bottomBtn"
            :key="index"
          >
            <button>
              <img :src="item.src" alt="" class="auto-img" />
            </button>
          </div>
        </div>
        <!-- 进度条和时间 -->
        <div class="barTime">
          <div class="start-time">
            <p id="start">{{ startTime }}</p>
          </div>
          <div class="progess">
            <div class="bar">
              <ul id="progress">
                <van-slider
                  v-model="currentTime"
                  bar-height="10px"
                  button-size="10px"
                  active-color="#FF80B0"
                  step="0.1"
                  :max="durationTime"
                  @input="changBar()"
                />
              </ul>
            </div>
          </div>
          <div class="end-time">
            <p id="end">{{ endTime }}</p>
          </div>
        </div>
        <!-- 播放区域 -->
        <div class="play">
          <div class="play-left">
            <img src="../assets/img/m6.png" alt="" class="auto-img" />
          </div>
          <div class="play-center">
            <div>
              <img
                src="../assets/img/last.png"
                @click="last"
                alt=""
                class="auto-img"
              />
            </div>
            <div>
              <img
                :src="isFlag ? playBtn : puaseBtn"
                @click="changeStart()"
                alt=""
                class="auto-img"
              />
            </div>
            <div>
              <img
                src="../assets/img/next.png"
                @click="next"
                alt=""
                class="auto-img"
              />
            </div>
          </div>
          <div class="play-right">
            <img src="../assets/img/m7.png" alt="" class="auto-img" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/playinterface.less";
export default {
  name: "Playinterface",
  //数据
  data() {
    return {
      //上面小按钮
      topBtn: [
        { title: "标准" },
        { title: "MV" },
        { title: "音效" },
        { title: "封面" },
      ],
      //下面小按钮
      bottomBtn: [
        { src: require("../assets/img/m1.png") },
        { src: require("../assets/img/m2.png") },
        { src: require("../assets/img/m3.png") },
        { src: require("../assets/img/m4.png") },
        { src: require("../assets/img/m5.png") },
      ],
      //按钮图片
      playBtn: require("../assets/img/pause.png"),
      puaseBtn: require("../assets/img/play.png"),
      pp: require("../assets/img/bj.jpg"),
      //没过虑的歌词
      lyrics: "",
      //歌词
      afterLrc: [],
      //当前时间
      currentTime: 0,
      //总时间
      durationTime: 100,
      //初始时间,总时间
      startTime: "00:00",
      endTime: "00:00",
      //歌词开始时间
      lrcIndex: 0,
      //偏移量
      bb: "",
      // 根据时间获取歌词
      current: 0,
      //歌曲id
      musicId: "",
      // 歌曲名字
      songName: "",
      //歌曲图片
      musicUrl: "",
    };
  },
  //初始化
  created() {
    //获取缓存
    if (this.$store.state.song.length >= 0) {
      this.song = this.$store.state.song[this.$store.state.count];
      this.tabPlay = this.$store.state.isPlay;
      this.currentTime = this.$store.state.currentTime;
      this.durationTime = this.$store.state.durationTime;
    }
    //获取歌曲id
    this.musicId = this.getId;
    //获取歌曲名
    this.songName = this.getName;
    
 
  },

  updated() {
    //格式化总时间
    this.format();
    //获取歌词
    this.getLyric(this.musicId);
  },

  //计数
  computed: {
    //获取播放状态
    isFlag() {
      return this.$store.state.playFlag;
    },
    //获取音频元素
    audioElement() {
      return this.$store.state.audioElement;
    },
    //获取音频链接
    audiosrc() {
      return this.$store.state.audioSrc;
    },
    //获取当前音频时间
    musicCurrentTime() {
      this.currentTime = this.$store.state.currentTime;
      return this.$store.state.currentTime;
    },
    //获取音频总时间
    musicDurationTime() {
      //赋值总时间
      this.durationTime = this.$store.state.durationTime;
      return this.$store.state.durationTime;
    },
    //获取歌曲名
    getName() {
      return this.$store.state.songName;
    },
    //获取歌曲id
    getId() {
      
      return this.$store.state.audioId;
    },
    //缓存数据的下标
    songCount() {
      return this.$store.state.count;
    },
    //缓存数据
    songData() {
      return this.$store.state.song[this.$store.state.count];
    },
  },
  //方法
  methods: {
    //播放
    changeStart() {
      this.$store.state.playFlag = !this.$store.state.playFlag;
      if (this.$store.state.playFlag) {
        this.audioElement.play();
      } else {
        this.audioElement.pause();
      }
    },
    // 上一首
    last() {
      //判断
      if (this.songCount <= 0) {
        this.$toast("首");
        return;
      }
      //下标减1
      let data = ["count", this.songCount - 1];
      //修改下标
      this.$store.commit("update", data);
      this.getAudio(this.songData);
      // 格式化总时间
      // this.format();
    },
    // 下一首
    next() {
      //获取缓存长度
      let length = this.$store.state.song.length - 1;
      //判断
      if (this.songCount >= length) {
        this.$toast("末");
        return;
      }
      // 下标加1
      let data = ["count", this.songCount + 1];
      //修改下标
      this.$store.commit("update", data);
      //获取音频链接
      this.getAudio(this.songData);
      // this.format();
    },
    //获取音频链接
    getAudio(obj) {
      this.axios({
        method: "GET",
        url: "http://localhost:3000/song/url",
        params: {
          id: obj.songId,
        },
      }).then((res) => {
        //音频
        this.audioUrl = res.data.data[0].url;
        //音乐id
        this.musicId = res.data.data[0].id;
        // 歌曲名
        this.songName = obj.songName;
        //歌曲图片
        this.musicUrl = obj.songImg;
        //修改当前时间
        this.changeCurrentTime(0);
        //修改歌曲总时间
        // this.changeDuration();
        //修改音乐路径
        this.changeAudioSrc(this.audioUrl);
        //修改歌曲名字
        this.changeSongName(this.songName);
        //修改歌手图片
        this.changeSongUrl(this.musicUrl);
        //修改歌曲id
        this.changId(this.musicId);
        //修改播放状态
        this.changPlay(true);
        //自动播放
        this.audioElement.autoplay = true;
      });
    },
    //改变进度条
    changBar() {
      this.$store.state.audioElement.currentTime = this.currentTime;
      //播放音乐
      this.$store.state.audioElement.play();
    },
    //修改音乐路径
    changeAudioSrc(audioSrc) {
      this.$store.commit("changeAudioSrc", audioSrc);
    },
    // 修改初始化时间
    changeCurrentTime(currentTime) {
      this.$store.commit("changeCurrentTime", currentTime);
    },
    // 修改总时间
    changeDuration(duration) {
      this.$store.commit("changeDuration", duration);
    },
    //格式化总时间
    format() {
      let m, s;
      //计算小时 分钟 秒钟
      m = Math.floor(this.musicDurationTime / 60);
      s = Math.floor(this.musicDurationTime % 60);

      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;
      this.endTime = m + ":" + s;
    },
    //获取歌词
    getLyric(qq) {
      if(!qq){
        return;
      }
      this.axios({
        withCredentials: true,
        method: "GET",
        url: "http://localhost:3000/lyric",
        params: {
          id: qq,
        },
      }).then((res) => {
        this.lyrics = res.data.lrc.lyric;
        this.getLrc(this.lyrics);
        // console.log(this.afterLrc)
      });
    },
    //格式化歌词
    getLrc() {
      var lyrics = this.lyrics.split("\n");
      var lrcObj = [];
      var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
      for (var i = 0; i < lyrics.length; i++) {
        var timeRegExpArr = lyrics[i].match(timeReg);
        if (!timeRegExpArr) continue;
        var txt = lyrics[i].replace(timeReg, "");
        // 处理时间
        for (var k = 0; k < timeRegExpArr.length; k++) {
          var array = {};
          var t = timeRegExpArr[k];
          /*eslint-disable */
          var min = Number(String(t.match(/\[\d*/i)).slice(1));
          var sec = Number(String(t.match(/\:\d*/i)).slice(1));
          /*eslint-enable */
          var time = min * 60 + sec;
          array.time = time;
          array.txt = txt;
          lrcObj.push(array);
        }
      }
      this.afterLrc = lrcObj;
      // console.log(this.afterLrc)
    },
    //歌词偏移
    lrcOffset() {
      if (this.afterLrc) {
        // 1、根据时间获得歌词
        this.current = Math.floor(this.currentTime);
        // 
        //遍历歌词
        for (var i = 0; i < this.afterLrc.length; i++) {
          if (this.afterLrc[i].time === this.current) this.lrcIndex = i;
        }
        this.bb = -this.lrcIndex * 20;
        // 
      }
    },
    //修改播放状态
    changPlay(flag) {
      this.$store.commit("changPlay", flag);
    },
    //修改歌曲名字
    changeSongName(songName) {
      this.$store.commit("changeSongName", songName);
    },
    //修改歌手图片
    changeSongUrl(songUrl) {
      this.$store.commit("changeSongUrl", songUrl);
    },
    //修改歌曲id
    changId(bb) {
      this.$store.commit("changId", bb);
    },
    //返回上一级路由
    onClickLeft() {
      this.changLy(true);
      this.changLyMusic(true);
      this.$router.push({ name: "Home" });
    },
    //修改底部路由布尔值
    changLy(flag) {
      this.$store.commit("changLy", flag);
    },
    //修改音乐路由布尔值
    changLyMusic(flag) {
      this.$store.commit("changLyMusic", flag);
    },
  },

  // 监听
  watch: {
    //监听初始时间
    musicCurrentTime: function () {
      //格式化时间
      let m, s;
      // 
      //计算小时 分钟 秒钟
      m = Math.floor(this.currentTime / 60);
      s = Math.floor(this.currentTime % 60);
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;
      this.startTime = m + ":" + s;
      //歌词偏移
      this.lrcOffset();
    },
  },
};
</script>
