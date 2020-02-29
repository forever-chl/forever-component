<template>
    <div class="CMeeting">
        <div class="video-grid" id="video_grid">
            <div id="local_stream" class="video-placeholder">
                <div class="toolbar" v-if="localStream_">
                    <span :class="'iconfont icon-yinpin '+(audio ? 'green' : '')"></span>
                    <span class="username">{{userId_}}</span>
                </div>
            </div>
            <div v-for="info in remoteStreams_" :id="info.id_" class="video-view">
                <div class="toolbar">
                    <span :class="'iconfont icon-yinpin '+(info.hasAudio_ ? 'green' : '')"></span>
                    <span class="username">{{info.userId_}}</span>
                </div>
            </div>
        </div>
        <van-grid column-num="5">
            <van-grid-item text="关闭语音" v-if="audio" @click="closeAudio">
                <span class="iconfont icon-yinpin" slot="icon"></span>
            </van-grid-item>
            <van-grid-item text="打开语音" v-if="!audio" @click="openAudio">
                <span class="iconfont icon-yinpin" slot="icon"></span>
            </van-grid-item>
            <van-grid-item text="关闭摄像头" @click="closeMedia" v-if="camera">
                <span class="iconfont icon-ai-video" slot="icon"></span>
            </van-grid-item>
            <van-grid-item text="打开摄像头" @click="openMedia" v-if="!camera">
                <span class="iconfont icon-ai-video" slot="icon"></span>
            </van-grid-item>
            <van-grid-item icon="clear" text="退出会议" @click="leaveMeeting"/>
            <van-grid-item icon="photo-o" text="邀请成员" @click="toShareMeet">
                <span class="iconfont icon-chengyuan-tianjia-tianchong" slot="icon"></span>
            </van-grid-item>
            <van-grid-item icon="photograph" text="切换摄像头" @click="changeVideo"/>
        </van-grid>
        <van-dialog v-model="showShare" title="复制二维码分享给朋友" >
            <div class="content" id="shareContent" ref="shareContent">
                <div class="qrCode" id="qrCode"></div>
                <p class="roomNum">会议室编号：{{roomNum}}</p>
            </div>
            <img class="canvasImg" :src="shareImgUrl">
        </van-dialog>
    </div>
</template>

<script>
    import {Toast,Grid,GridItem,Dialog} from 'vant'
    import rtcClient from '@/mixins/rtc-client'
    import {getUserSig} from '@/api/common'
    import html2canvas from 'html2canvas'
    import QRCode  from "qrcodejs2"

    export default{
        props:['roomNum'],
        data(){
            return {
                camera:true,
                audio:true,
                shareMeet:{},
                showShare: false,
                shareImgUrl: ''
            }
        },
        mixins:[rtcClient],
        components: {
            [Toast.name]:Toast,
            [Grid.name]:Grid,
            [GridItem.name]:GridItem,
            [Dialog.Component.name]:Dialog.Component
        },
        mounted(){
            this.joinMeeting()
        },
        beforeDestroy(){
            if(this.localStream_){
                this.leave()
            }
        },
        methods: {
            joinMeeting() {
                let userId = JSON.stringify(parseInt(Math.random() * 100000000))
                let roomId = this.roomNum
                getUserSig({
                    userId:userId
                }).then(res => {
                    this.join({
                        userId : userId,
                        roomId : roomId,
                        sdkAppId : res.sdkappid,
                        userSig : res.userSig
                    })
                })
                this.getVideoDevice()
            },
            leaveMeeting(){
                this.leave().then(()=>{
                    this.$router.go(-1)
                })
            },
            operateClick(item){
                if(item === 1) this.joinMeeting()
            },
            closeMedia(){
                let result = this.muteVideo()
                if(result) {
                    this.camera = false
                }
            },
            openMedia(){
                let result = this.unmuteVideo()
                if(result){
                    this.camera = true
                }
            },
            closeAudio(){
                let result = this.muteAudio()
                if(result){
                    this.audio = false
                }
            },
            openAudio(){
                let result = this.unmuteAudio()
                if(result){
                    this.audio = true
                }
            },
            toShareMeet(item){
                this.showShare = true
                setTimeout(() => {
                    this.$refs.shareContent.style.display = 'flex'
                    document.querySelector('#qrCode').innerHTML= ''
                    this.shareImgUrl = ''
                    this.qrcode()
                },1000)
            },
            qrcode() {
                let _this = this
                new QRCode('qrCode', {
                    width: document.querySelector('#qrCode').clientWidth,
                    height: document.querySelector('#qrCode').clientHeight,
                    text: `${window.location.origin}/meeting/${_this.roomNum}`
                })
                this.htmlToCanvas()
            },
            htmlToCanvas(){
                html2canvas(document.getElementById('shareContent')).then(canvas => {
                    this.shareImgUrl = canvas.toDataURL();
                    this.$refs.shareContent.style.display = 'none'
                })
            },
        }
    }
</script>

<style lang="less">
    .CMeeting{
        background:#fff;
        .video-grid{
            padding:0 0 20px 20px;
            display: flex;
            flex-wrap: wrap;
            #local_stream,.video-view {
                flex-shrink: 0;
                position:relative;
                width: 155px;
                height: 155px;
                margin:20px 20px 0 0;
                .toolbar{
                    position:absolute;
                    left:0;
                    bottom:0;
                    width:100%;
                    height:30px;
                    padding:0 10px;
                    z-index: 1;
                    background:rgba(255,255,255,0.5);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .iconfont{
                        font-size: 20px;
                    }
                    .username{
                        font-size:14px;
                        font-weight: bold;
                        color:#333;
                    }
                }
            }
            video{
                left:0;
            }
        }
        .van-grid{
            .van-grid-item{
                overflow: hidden;
            }
            .van-grid-item__text{
                display: block;
                width:100%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                text-align: center;
            }
            .iconfont{
                font-size: 28px;
            }
        }
        .content{
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .qrCode{
                width:200px;
                height:200px;
                background:#ccc;
                margin:auto;
            }
            .topic{
                margin-top:10px;
                font-size:16px;
                color:#333;
            }
            .roomNum,.meetingTime{
                font-size: 14px;
                color:#999;
                line-height: 28px;
            }
            
        }
        .van-dialog{
            .canvasImg{
                width:100%;
            }
        }
    }
</style>