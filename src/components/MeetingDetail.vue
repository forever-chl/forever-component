<template>
    <div class="CMeetingDetail">
        <p class="title">会议主题：{{dataInfo.topic}}</p>
        <div class="dateTime">
            <div class="begin">
                <p class="time">{{dataInfo.time}}</p>
                <p class="date">{{dataInfo.date}}</p>
            </div>
            <div class="detail">
                <p class="duration">
                    <span class="num">30分钟</span>
                    <span class="status">{{MeetingStatus(dataInfo.status)}}</span>
                </p>
            </div>
            <div class="end">
                <p class="time">{{dataInfo.time}}</p>
                <p class="date">{{dataInfo.date}}</p>
            </div>
        </div>
        <van-cell-group class="other">
            <van-cell title="会议号" :value="dataInfo.roomNum"></van-cell>
            <van-cell title="会议文档" is-link></van-cell>
            <van-cell title="参会人员" is-link></van-cell>
            <van-cell title="会议人数上限" value="300人"></van-cell>
        </van-cell-group>
        <div class="btn">
            <van-button type="warning" round size="large" v-if="dataInfo.status === 'NotStarted'|| dataInfo.status === 'InProgress'" @click="$router.push(`/meeting/${dataInfo.roomNum}`)">进入会议</van-button>
            <van-button type="info" round size="large" v-if="dataInfo.status === 'NotStarted'" @click="beginMeeting">开始会议</van-button>
            <van-button type="danger" round size="large" v-if="dataInfo.status === 'InProgress'" @click="endMeeting">结束会议</van-button>
        </div>
    </div>
</template>

<script>
    import { CellGroup,Cell,Icon,Button} from 'vant'
    import {getMeetingDetail,beginMeeting,endMeeting} from '@/api/common'
    import {dateFormat,MeetingStatus} from '@/mixins/utils'

    export default{
        props:['id'],
        data(){
            return {
                dataInfo:{}
            }
        },
        components:{
            [CellGroup.name]:CellGroup,
            [Cell.name]:Cell,
            [Button.name]:Button
        },
        mounted(){
            this.getDataInfo()
        },
        methods:{
            getDataInfo(){
                let param = {}
                param.id = this.id
                getMeetingDetail(param).then(res => {
                    this.dataInfo = res
                    this.dataInfo.date = dateFormat('YYYY年mm月dd日',new Date(this.dataInfo.startTime))
                    this.dataInfo.time = dateFormat('HH:MM',new Date(this.dataInfo.startTime))
                })
            },
            MeetingStatus(val){
                return MeetingStatus(val)
            },
            beginMeeting(){
                let params = {}
                params.id = this.id
                beginMeeting(params).then(() => {
                    this.getDataInfo()
                })
            },
            endMeeting(){
                let param = {}
                param.id = this.id
                endMeeting(param).then(() => {
                    this.getDataInfo()
                })
            }
        }
    }
</script>

<style lang="less">
    .CMeetingDetail{
        color:#333;
        .title{
            background:#fff;
            font-size: 16px;
            padding:10px 20px;
            color: #333;
        }
        .dateTime{
            background:#fff;
            margin-top:10px;
            padding:20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: center;
            .begin,.end{
                width:100px;
                flex-shrink: 0;
                .time{
                    font-size: 30px;
                    font-weight: bold;
                    color:#333;
                }
                .date{
                    font-size: 12px;
                }
            }
            .detail{
                position:relative;
                width:0;
                flex-grow: 1;
                &::before{
                    content:'';
                    position:absolute;
                    height:1px;
                    width:100%;
                    top:50%;
                    left:0;
                    transform: translate(0,-50%);
                    background:#ddd;
                }
                .duration{
                    display: inline-block;
                    padding:0 10px;
                    background:#fff;
                    font-size: 12px;
                    position: relative;
                    .num{
                        padding:2px 10px;
                        background:#ddd;
                        border-radius: 3px;
                    }
                    .status{
                        position:absolute;
                        width:100px;
                        left:50%;
                        bottom:-5px;
                        transform: translate(-50%,100%);
                        margin-top:5px;
                        color:orange;
                        font-size: 12px;
                    }
                }
            }
        }
        .other{
            margin-top: 10px;
        }
        .btn{
            margin:20px;
            .van-button--info{
                background:#1989fa;
                border:none;
            }
            .van-button+.van-button{
                margin-top:20px;
            }
        }
    }
</style>