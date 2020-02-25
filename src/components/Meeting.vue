<template>
    <div class="Meeting">
        <div class="inputBox">
            <span class="label">用户ID:</span>
            <input type="text" v-model="userId">
        </div>
        <div class="inputBox">
            <span class="label">房间号:</span>
            <input type="text" v-model="roomId">
        </div>
        <div class="button">
            <span class="btn" @click="joinMeeting">进入会议</span>
        </div>
        <div class="device">
            <select name="camera" id="cameraId"></select>
            <select name="phone" id="microphoneId"></select>
        </div>
        <div class="video-grid" id="video_grid">
            <div id="local_stream" class="video-placeholder">
                <div id="local_video_info" class="video-info"></div>
            </div>
        </div>
        <SectorMenu :btnList="btnList" @operateClick="operateClick" v-show="showMenu"/>
    </div>
</template>

<script>
    let rtc;
    import SectorMenu from './SectorMenu.vue'
    export default{
        data(){
            return {
                userId:parseInt(Math.random() * 100000000),
                roomId:'889988',
                showMenu: false,
                btnList: [
                    {
                        text:"退出会议",
                        item: 1
                    },
                    {
                        text:"开始推流",
                        item: 2
                    },
                    {
                        text:"停止推流",
                        item: 3
                    }
                ]
            }
        },
        components: {
            SectorMenu
        },
        methods: {
            joinMeeting() {
                if(rtc) return
                let userId =JSON.stringify(this.userId)
                let roomId = this.roomId
                const config = window.genTestUserSig(userId)
                /* eslint-disable */
                rtc = new RtcClient({
                    userId,
                    roomId,
                    sdkAppId: config.sdkAppId,
                    userSig: config.userSig
                })
                rtc.join();
                this.showMenu = true
            },
            leave(){
                rtc.leave();
            },
            operateClick(item){
                if(item === 1) this.leave()
            }
        }
    }
</script>

<style lang="less">
    .Meeting{
        background:#fff;
        padding: 50px 20px;
        .inputBox{
            display: flex;
            margin-bottom:20px;
            height:40px;
            align-items: center;
            .label{
                font-size:14px;
                width:80px;
                text-align: right;
            }
            input{
                flex-grow: 1;
                width:0;
                box-shadow: none;
                background:transparent;
                border:solid 1px #f5f5f5;
                border-radius: 5px;
                margin-left:10px;
                padding: 0 5px;
                font-size: 14px;
                height:80%;
            }
        }
        .button{
            text-align: center;
            .btn{
                display: inline-block;
                width:100%;
                background:cornflowerblue;
                color:#fff;
                border-radius: 40px;
                height:40px;
                line-height: 40px;
            }
        }
        .device{
            margin-top:20px;
            display: flex;
            justify-content: space-between;
            select{
                width:45%;
                height:40px;
                font-size:14px;
            }
        }
        .video-view,
            #local_stream, #local_video_info {
                width: 480px;
                height: 320px; 
            }
            #local_stream{
                position:relative;
            }
            #local_video_info{
                position: absolute;
            }
            video{
                left:0;
            }
        }
</style>