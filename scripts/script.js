

new Vue({
  el: "#app",

  
  
  data() {
    return {
      volume: null,
      slider: null,
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "ericdoa",
          artist: "Greater Than One",
          cover: "https://raw.githubusercontent.com/Konme123/WebMp3/main/img/gekko.png",
          source: "https://github.com/Konme123/WebMp3/raw/main/3.mp3",
          url: "https://www.youtube.com/watch?v=N7dUOC4x55E",
          favorited: false
        },
        {
          name: "Yoko Takahashi",
          artist: "残酷な天使のテーゼ",
          cover: "https://raw.githubusercontent.com/Konme123/WebMp3/main/img/evang.jpeg",
          source: "https://github.com/Konme123/WebMp3/raw/main/5.mp3",
          url: "https://www.youtube.com/watch?v=o6wtDPVkKqI",
          favorited: false
        },
        {
          name: "Kendric Lamar",
          artist: "King Kunta",
          cover: "https://raw.githubusercontent.com/Konme123/WebMp3/main/img/kendric.jpg",
          source: "https://github.com/Konme123/WebMp3/raw/main/2.mp3",
          url: "https://www.youtube.com/watch?v=AC4bb9Q9-04",
          favorited: true
        },
        {
          name: "dckwrth",
          artist: "Start A Riot",
          cover: "https://raw.githubusercontent.com/Konme123/WebMp3/main/img/spidaman.jpg",
          source: "https://github.com/Konme123/WebMp3/raw/main/4.mp3",
          url: "https://www.youtube.com/watch?v=dNRC137o0j8",
          favorited: false
        },
        {
          name: "Kenshi Yonezu",
          artist: "KICK BACK",
          cover: "https://raw.githubusercontent.com/Konme123/WebMp3/main/img/chainsaw.jpeg",
          source: "https://github.com/Konme123/WebMp3/raw/main/7.mp3",
          url: "https://www.youtube.com/watch?v=zoNJ6HOt3zw",
          favorited: true
        },
        {
          name: "Franz Ferdinand",
          artist: "This Is Fffire",
          cover: "https://raw.githubusercontent.com/Konme123/WebMp3/main/img/01cyberpunk.jpg",
          source: "https://github.com/Konme123/WebMp3/raw/main/6.mp3",
          url: "https://www.youtube.com/watch?v=DkWML41wUCo",
          favorited: false
        },
        {
          name: "Vaudy",
          artist: "不可幸力",
          cover: "https://raw.githubusercontent.com/Konme123/WebMp3/main/img/vaudy.jpg",
          source: "https://github.com/Konme123/WebMp3/raw/main/9.mp3",
          url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
          favorited: true
        },
        {
          name: "Ye West",
          artist: "Lift Yourself",
          cover: "https://raw.githubusercontent.com/Konme123/WebMp3/main/img/Lift_Yourself.jpg",
          source: "https://github.com/Konme123/WebMp3/raw/main/8.mp3",
          url: "https://www.youtube.com/watch?v=00-Rl3Jlx-o",
          favorited: false
        },
        {
          name: "Radiohead",
          artist: "How to Disappear Completely",
          cover: "https://raw.githubusercontent.com/Konme123/WebMp3/main/img/1.jpg",
          source: "https://github.com/Konme123/WebMp3/raw/main/1.mp3",
          url: "https://www.youtube.com/watch?v=6W6HhdqA95w",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }

  /*slider*/



});
