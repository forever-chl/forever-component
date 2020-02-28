import {Toast} from 'vant'
import TRTC from '@/assets/js/trtc.js'
export default{
    data(){
        return {
            sdkAppId_: "",
            userId_: "",
            userSig_: "",
            roomId_: "",
            isJoined_: false,
            isPublished_: false,
            remoteStreams_: [],
            localStream_:null,
            client_:null
        };
    },
    mounted(){
        TRTC.checkSystemRequirements().then(result => {
          if (!result) {
            Toast("您的浏览器与TRTC不兼容！请下载Chrome M72+");
          }
        })
    },
    methods:{
        join(params){
            if (this.isJoined_) {
                return;
            }
            this.userId_ = params.userId
            this.roomId_ = params.roomId
            this.sdkAppId_ = params.sdkAppId
            this.userSig_ = params.userSig

            this.client_ = TRTC.createClient({
                mode: "videoCall", // 实时通话模式
                sdkAppId: params.sdkAppId,
                userId: params.userId,
                userSig: params.userSig
            });

            // 进入会议
            this.client_.join({ roomId: params.roomId }).then(() => {
                this.isJoined_ = true
                // 音视频资源采集
                return this.createLocalStream({ audio: true, video: true })
            }).then((res) => {
                console.log(res)
                // 播放本地流
                this.localStream_.play("local_stream")
                // 发布本地流
                this.publish()
            })

            this.client_.on("error", err => {
                Toast("客户端错误：" + err);
            });

            this.client_.on("stream-added", evt => {
                const remoteStream = evt.stream;
                const id = remoteStream.getId();
                const userId = remoteStream.getUserId();
                Toast(`${userId}-进入会议`);
                this.client_.subscribe(remoteStream);
            });

            this.client_.on("stream-subscribed", evt => {
                const remoteStream = evt.stream;
                const id = remoteStream.getId();
                this.remoteStreams_.push(remoteStream);
                this.$nextTick(()=>{
                    remoteStream.play(id);
                })
            });

            this.client_.on("stream-removed", evt => {
                const remoteStream = evt.stream;
                const id = remoteStream.getId();
                remoteStream.stop();
                this.remoteStreams_ = this.remoteStreams_.filter(stream => {
                    return stream.getId() !== id;
                });
                Toast(`${remoteStream.getUserId()}-退出会议`);
            })

            this.client_.on('mute-audio', evt => {
                let userId = evt.userId
                this.remoteStreams_.forEach(item => {
                    if (item.userId_ === userId){
                        item.hasAudio_ = 0
                    }
                })
            })

            this.client_.on('unmute-audio', evt => {
                let userId = evt.userId
                this.remoteStreams_.forEach(item => {
                    if (item.userId_ === userId) {
                        item.hasAudio_ = 1
                    }
                })
            })
        },
        publish(){
            if (!this.isJoined_) {
              return;
            }
            if (this.isPublished_) {
              return;
            }
            this.client_.publish(this.localStream_).then(() => {
                this.isPublished_ = true
            })
        },
        createLocalStream(options) {
            this.localStream_ = TRTC.createStream({
            audio: options.audio, // 采集麦克风
            video: options.video, // 采集摄像头
            userId: this.userId_
            // cameraId: getCameraId(),
            // microphoneId: getMicrophoneId()
            });
            // 设置视频分辨率帧率和码率
            this.localStream_.setVideoProfile('480p');
            return this.localStream_.initialize()
        },
        unpublish(){
            if (!this.isJoined_) {
              return;
            }
            if (!this.isPublished_) {
              return;
            }
            return new Promise(resolve=>{
                this.client_.unpublish(this.localStream_).then(() => {
                  this.isPublished_ = false;
                  resolve()
                })
            })
        },
        leave(){
            return new Promise(resolve => {
                if (!this.isJoined_) {
                    resolve();
                }
                if (this.isPublished_) {
                    this.unpublish().then(this.leaved).then(resolve)
                } else {
                    this.leaved().then(resolve)
                }
            })
        },
        leaved(){
            return new Promise(resolve => {
                this.client_.leave().then(() => {
                    this.isJoined_ = false;
                    this.localStream_.stop();
                    this.localStream_.close();
                    this.localStream_ = null;
                    resolve()
                })
            })
        },
        getVideoDevice(){
            TRTC.getCameras().then(devices => {
                devices.forEach(dev => {
                    console.log(dev)
                });
            });
        },
        changeVideo(){
            this.getVideoDevice()
            let videoTrack = this.localStream_.getVideoTrack()
            console.log(videoTrack)
            // this.localStream_.switchDevice('video', cameraId).then(() => {
            //     console.log('switch camera success');
            // });
        },
        muteVideo(){
            let result = this.localStream_.muteVideo()
            return result

            // let videoTrack = this.localStream_.getVideoTrack();
            // return new Promise(resolve => {
            //     this.localStream_.removeTrack(videoTrack).then(() => {
            //         // 关闭视频通话成功，停止videoTrack并释放摄像头资源
            //         videoTrack.stop();
            //         resolve()
            //     })
            // })
        },
        unmuteVideo() {
            let result = this.localStream_.unmuteVideo()
            return result
        },
        muteAudio(){
            let result = this.localStream_.muteAudio()
            return result
        },
        unmuteAudio() {
            let result = this.localStream_.unmuteAudio()
            return result
        }
    }
}