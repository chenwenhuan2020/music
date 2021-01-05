<template>
  <div class="smallplay" v-show="lyShow">
    <!-- 播放器 -->
    <div class="music-play" @click.stop="goSmalLplay">
      <!-- 播放区 -->
      <div class="audio">
        <!-- 上 -->
        <!-- 进度条 -->
        <div class="top">
          <ul ref="progress" id="progress">
            <van-slider
              v-model="currentTime"
              bar-height="5px"
              button-size="5px"
              active-color="#FF80B0"
              step="0.5"
              :max="durationTime"
              @change="changTime"
            />
          </ul>
          <!-- 路径 -->
          <div class="audio-music">
            <audio
              ref="audio"
              :src="audiosrc"
              @timeupdate="listenAudioChange"
            ></audio>
          </div>
        </div>
        <!-- 下 -->
        <div class="bottom">
          <!-- 图片 -->
          <div class="audio-img">
            <img :src="songUrl" alt="" class="auto-img" />
          </div>
          <!-- 歌名 -->
          <div class="music-title">
            <p>{{ songName }}</p>
          </div>
          <!-- 按钮 -->
          <div class="audio-btn">
            <div class="audio-last" @click.stop="last">
              <img class="auto-img" src="../assets/img/last.png" alt="" />
            </div>
            <div class="audio-play" @click.stop="playaudio">
              <img :src="isFlag ? pauseSrc : playSrc" alt="" class="auto-img" />
            </div>
            <div class="audio-next" @click.stop="next">
              <img src="../assets/img/next.png" alt="" class="auto-img" />
            </div>
          </div>
          <!-- 歌词 -->
          <div class="music-text">
            <img src="../assets/img/lyric.png" alt="" class="auto-img" />
          </div>
          <!-- 音量 -->
          <div class="volume">
            <img
              ref="volume"
              class="auto-img"
              src="../assets/img/volume.png"
              alt=""
              @click.stop="move"
            />
            <div class="voice-box" ref="voiceBox" style="display: none">
              <input
                type="range"
                ref="voiceRange"
                min="0"
                max="100"
                value="20"
                @input="musicvolume"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Smallplay",
  //数据
  data() {
    return {
      //路由显示隐藏
      lyShow: true,
      // 播放图片
      playSrc: require("../assets/img/play.png"),
      pauseSrc: require("../assets/img/pause.png"),
      //当前时间
      currentTime: 0,
      //总时间
      durationTime: 100,
      //音量布尔值
      isdisplay: true,
      //歌曲名
      musicName: "",
      //歌曲图片
      musicUrl: "",
      //音频链接
      audioUrl: "",
      //音频id
      musicId: "",
      //歌曲缓存
      cache: "",
    };
  },
  // 初始化
  created() {
    //获取audio元素
    this.$nextTick(() => {
      this.changeAudio(this.$refs.audio);
    });
    //获取缓存
    this.cache = JSON.parse(localStorage.getItem("song"));
    
    //是否存在缓存
    if (this.cache) {
      this.song = JSON.parse(localStorage.getItem("song"))[0];
    }
  },
  // 计数
  computed: {
    // 获取audio元素
    audioElemet() {
      return this.$store.state.audioElement;
    },
    //获取歌手图片
    songUrl() {
      return this.$store.state.songUrl;
    },
    //获取歌曲名字
    songName() {
      return this.$store.state.songName;
    },
    //获取播放状态
    isFlag() {
      // 
      return this.$store.state.playFlag;
    },
    //获取音频链接
    audiosrc() {
      return this.$store.state.audioSrc;
    },
    //获取当前音频时间
    musicCurrentTime() {
      //赋值
      this.currentTime = this.$store.state.currentTime;
      return this.$store.state.currentTime;
    },
    //获取音频总时间
    musicDurationTime() {
      return this.$store.state.durationTime;
    },
    //获取歌曲下标
    songCount() {
      return this.$store.state.count;
    },
    //下标对映的数据
    songData() {
      return this.$store.state.song[this.songCount];
    },
  },
  //方法
  methods: {
    // 监听歌曲
    listenAudioChange() {
      //获取音频当前播放时间
      this.currentTime = this.$store.state.audioElement.currentTime;
      //获取总时间 赋值
      this.durationTime = this.$store.state.audioElement.duration;
      // 修改初始时间
      this.changeCurrentTime(this.currentTime);
      if (this.currentTime == this.durationTime) {
        //修改进度条
        this.changeCurrentTime(0);
        //播放状态
        this.changPlay(false);
      }
      // 修改总时间
      this.changeDuration(this.durationTime);
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
      //  
    },
    // 下一首
    next() {
      // if(this.$store.state.song)
      //获取缓存长度
      let length = this.$store.state.song.length - 1;
      //  
      //判断
      if (this.songCount >= length) {
        this.$toast("末");
        return;
      }
      // 下标加1
      let data = ["count", this.songCount + 1];
      //  
      //修改下标
      this.$store.commit("update", data);
      //调用歌曲
      this.getAudio(this.songData);
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
        this.audioUrl = res.data.data[0].url;
        //音乐id
        this.musicId = res.data.data[0].id;
        // 歌曲名
        this.musicname = obj.songName;
        //歌曲图片
        this.musicUrl = obj.songImg;
        //修改当前时间
        this.changeCurrentTime(0);
        //修改音乐路径
        this.changeAudioSrc(this.audioUrl);
        //修改歌曲名字
        this.changeSongName(this.musicname);
        //修改歌手图片
        this.changeSongUrl(this.musicUrl);
        //修改播放状态
        this.changPlay(true);
        //修改歌曲id
        this.changId(this.musicId);
        //自动播放
        this.audioElemet.autoplay = true;
      });
    },
    // 修改audio元素
    changeAudio(audio) {
      this.$store.commit("initAudio", audio);
    },
    //修改初始化时间
    changeCurrentTime(currentTime) {
      this.$store.commit("changeCurrentTime", currentTime);
    },
    //修改总时间
    changeDuration(duration) {
      this.$store.commit("changeDuration", duration);
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
    //修改播放状态
    changPlay(flag) {
      this.$store.commit("changPlay", flag);
    },
    //修改歌曲id
    changId(bb) {
      this.$store.commit("changId", bb);
    },
    //播放音频
    playaudio() {
      //判断播放状态
      this.$store.state.playFlag = !this.$store.state.playFlag;
      if (this.$store.state.playFlag) {
        this.$store.state.audioElement.play();
      } else {
        this.$store.state.audioElement.pause();
      }
    },
    //显示音量
    move() {
      if (this.isdisplay) {
        this.$refs.voiceBox.style.display = "block";
        this.isdisplay = false;
      } else {
        this.$refs.voiceBox.style.display = "none";
        this.isdisplay = true;
      }
    },
    //改变音量
    musicvolume() {
      let v1 = this.$refs.voiceRange.value;
      let v2 = v1 / 100;
      this.$refs.audio.volume = v2;
    },
    //点击进度条
    changTime() {
      //赋值
      this.$refs.audio.currentTime = this.currentTime;
      //播放
      this.$store.state.audioElement.play();
      //修改状态
      this.$store.commit("changPlay", true);
      //修改时间
      this.changeDuration(this.currentTime);
    },
    // 跳转路由
    goSmalLplay() {
        this.changLyMusic(false);
        this.changLy(false);
        this.changPlay(true);
        this.$router.push({ name: "Playinterface" });
    },
    //修改底部布尔值
    changLyMusic(flag) {
      this.$store.commit("changLyMusic", flag);
    },
    //修改音乐路由布尔值
    changLy(flag) {
      this.$store.commit("changLy", flag);
    },
  },
  // 侦听器
  watch: {
    //监听播放的状态
    //  isFlag: function () {
    //   this.isFlag = !this.isFlag;
    //   
    // },
    //监听音频初始化时间
    musicCurrentTime: function () {
      this.currentTime = this.musicCurrentTime;
    },
    musicDurationTime: function () {
      this.durationTime = this.musicDurationTime;
    },
  },
};
</script>

<style lang="less" scoped>
.auto-img {
  width: 100%;
  height: 100%;
  display: block;
}
.music-play {
  width: 80%;
  height: auto;
  position: fixed;
  background-color: #e4e6e6;
  left: 50%;
  bottom: 48px;
  transform: translateX(-50%);

  .audio {
    width: 100%;
    height: 30px;
    .top {
      width: 100%;
      height: 2px;

      #progress {
        width: 100%;
        height: 100%;
        background-color: yellow;
        border-radius: 10px;
      }
    }

    .bottom {
      width: 100%;
      height: 20px;
      display: flex;
      align-items: center;
      margin-top: 4px;
      display: flex;
      justify-content: space-around;

      .audio-img {
        flex: 0 0 5%;
        height: 100%;
        margin-left: 10px;
      }

      .music-title {
        flex: 0 0 40%;
        height: 100%;

        p {
          margin-left: 10px;
          font-size: 10px;
          color: rgb(240, 98, 122);
          line-height: 20px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
      }

      .audio-btn {
        flex: 0 0 25%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        div {
          width: 20px;
          height: 20px;
        }
      }

      .music-text {
        flex: 0 0 8%;
        height: 20px;
        text-align: center;
      }

      .volume {
        flex: 0 0 5%;
        height: 20px;
        text-align: center;
        position: relative;

        .voice-box {
          width: 60px;
          height: 10px;
          position: absolute;
          left: -28px;
          top: -35px;
          transform: rotate(-90deg);
          input {
            width: 100%;
            height: 10px;
          }
        }
      }
    }
  }
}
</style>