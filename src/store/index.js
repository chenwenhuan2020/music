import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        //音频元素
        audioElement: null,
        //音频路径
        audioSrc:"http://m7.music.126.net/20210105090443/972dde33dca32478ff37667a12aa0d4d/ymusic/76e5/ba34/d562/2e95d6640354faee9ef0d6a384d2bc5f.mp3",
        // 当前播放时间
        currentTime: 0,
        //总时间
        durationTime: 0,
        //是否播放
        playFlag: false,
        //歌曲名字
        songName: "点首好歌",
        //歌手图片
        songUrl: require('../assets/img/timg.jpg'),
        //歌曲id
        audioId: "",

        //歌曲下标
        count: 0,
        //歌曲缓存
        song: [],

        //历史记录
        history: [],

        //mv收藏数据
        mvCollection: [],

        //隐藏底部路由
        show: true,
        //隐藏音乐路由
        showM:true,
    },

    mutations: {
        //修改audio
        initAudio(state, audio) {
            state.audioElement = audio;
            
        },
        //修改歌曲初始时间
        changeCurrentTime(state, currentTime) {
            state.currentTime = currentTime;
        },
        //修改总时间
        changeDuration(state, durationTime) {
            state.durationTime = durationTime;
        },
        //修改音乐路径
        changeAudioSrc(state, audioSrc) {
            state.audioSrc = audioSrc;
        },
        // 修改歌曲名字
        changeSongName(state, songName) {
            state.songName = songName;
        },
        //歌手图片
        changeSongUrl(state, songUrl) {
            state.songUrl = songUrl;
        },
        //修改播放状态
        changPlay(state, flag) {
            state.playFlag = flag;
            
        },
        //添加缓存歌曲
        addSong(state, obj) {
            if (state.song) {
                for (let i = 0; i < state.song.length; i++) {
                    if (state.song[i].songId == obj.songId) {
                        return;
                    }
                }
            }
            state.song.push(obj)
            
        },
        //设置歌曲缓存
        songCache(state) {
            localStorage.setItem("song", JSON.stringify(state.song));
        },
        //修改歌曲下标
        update(state, data) {
            state[data[0]] = data[1];
        },
        // 删除缓存
        deleteSong(state, id) {
            for (let i = 0; i < state.song.length; i++) {
                if (state.song[i].songId == id) {
                    if (state.count > i) {
                        state.count--;
                    } else if (state.count == state.song.length - 1) {
                        state.count = 0;
                        state.playFlag = true;
                    }
                    state.song.splice(i, 1);
                }
            }
        },
        //修改id
        changId(state, audioId) {
            state.audioId = audioId;
            
        },
        //修改底部路由状态
        changLy(state, show) {
            state.show = show;
            
        },
        //修改音乐路由状态
        changLyMusic(state,showM){
            state.showM = showM;
            
        },
        //修改搜索历史记录
        changHistory(state, history) {
            state.history = history;
        },
        //mv收藏数据
        changMvCollection(state, mvCollection) {
            state.mvCollection = mvCollection;
            
        }

    },

})