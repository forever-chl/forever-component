<template>
    <div class="CmeetingIndex">
        <div class="user">
            <span class="iconfont icon-huiyi"></span>
            <span class="userName">{{JSON.stringify(parseInt(Math.random() * 100000000))}}</span>
        </div>
        <ul class="menu">
            <li @click="showJoin = true">
                <div class="icon">
                    <span class="iconfont icon-76xinzeng"></span>
                </div>
                <p class="name">加入会议</p>
            </li>
            <li @click="createMeet">
                <div class="icon">
                    <span class="iconfont icon-shandian"></span>
                </div>
                <p class="name">快速会议</p>
            </li>
            <li @click="$router.push('/book')">
                <div class="icon">
                    <span class="iconfont icon-meeting-management-arrangements-for-the-meeting"></span>
                </div>
                <p class="name">预定会议</p>
            </li>
        </ul>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getDataList">
             <ul class="meetList">
                <li v-for="(info,key) in list" :key="key">
                    <!-- 日期 -->
                    <p class="date">
                        <span class="day">{{getMonthAndDay(key,'d')}}</span>
                        <span class="month">{{getMonthAndDay(key,'m')}}月</span>
                        <span class="tips" v-if="new Date().toLocaleDateString() === key">今天</span>
                    </p>
                    <!-- 会议 -->
                    <ul class="todayMeeting">
                        <li v-for="(item,index) in info" :key="item.roomNum" @click="$router.push(`/detail/${item.id}`)">
                            <van-swipe-cell>
                                <p class="time">
                                    <span class="begin">{{timeConvert(item.startTime,1)}}</span>
                                    <!-- <span class="end">17:00</!-->
                                    <span class="meetingNO">{{item.roomNum}}</span>
                                    <span class="status">{{MeetingStatus(item.status)}}</span>
                                </p>
                                <p class="bookUser">会议主题：{{item.topic}}</p>
                                <template slot="right">
                                    <van-button square type="danger" text="撤销" @click="deleteMeeting(item.id,key,index)"/>
                                    <van-button square type="info" text="邀请" />
                                </template>
                            </van-swipe-cell>
                        </li>
                    </ul>
                </li>
             </ul>
        </van-list>
        <van-dialog 
            v-model="showJoin" 
            title="会议编号" 
            show-cancel-button
            @confirm="$router.push(`/meeting/${joinMeeting}`)"
            @cancel="showJoin = false"
        >
            <div class="content">
                <input type="text" v-model="joinMeeting" placeholder="请输入会议室编号">
            </div>
        </van-dialog>
    </div>
</template>

<script>
    import { getMeetingList,deleteMeeting, createMeet } from '@/api/common' 
    import { timeConvert, MeetingStatus,dateFormat } from "@/mixins/utils"
    import {List,SwipeCell,Button,Dialog, Toast} from 'vant'

    export default{
        data(){
            return{
                dataList:[],
                list:{},
                pageNo:0,
                pageSize:10,
                loading: false,
                finished: false,
                showJoin: false,
                joinMeeting:''
            }
        },
        components:{
            [List.name]:List,
            [Button.name]:Button,
            [SwipeCell.name]:SwipeCell,
            [Dialog.Component.name]:Dialog.Component
        },
        methods:{
            getDataList(){
                let param = {}
                param.pageSize = this.pageSize
                param.pageNo = this.pageNo + 1

                getMeetingList(param).then(res => {
                    let { result,pageNo,hasNext } = res
                    this.dataList = pageNo === 1 ? result : [...this.dataList,...result]
                    this.pageNo = pageNo
                    this.loading = false
                    this.finished = !hasNext
                    this.groupData()
                })
            },
            groupData(){
                let list = {}
                this.dataList.forEach(item => {
                    let day = new Date(item.startTime).toLocaleDateString()
                    if(!list[day]){
                        list[day] = []
                    }
                    list[day].push(item)
                })
                this.list = list
            },
            getMonthAndDay(val,type){
                let vals = val.split('/')
                switch (type) {
                    case 'd':return vals[2]
                    case 'm':return vals[1]
                    default:return ''
                }
            },
            MeetingStatus(val){
                return MeetingStatus(val)
            },
            timeConvert(val){
               return timeConvert(val)
            },
            deleteMeeting(id,key,index){
                let params = {}
                params.id = id
                deleteMeeting(params).then(res => {
                    this.list[key].splice(index,1)
                })
            },
            createMeet(){
                let param = {} 
                param.topic = '快速会议'
                param.chairman = JSON.stringify(parseInt(Math.random() * 100000000))
                param.startTime = dateFormat('YYYY-mm-dd HH:MM:SS',new Date())
                param.members = ''

                createMeet(param).then(res => {
                    if(res.roomNum){
                        this.$router.push(`/meeting/${res.roomNum}`)
                    } else {
                        Toast('创建快速会议失败，请稍后重试')
                    }
                })
            },
        }
    }
</script>

<style lang="less">
    .CmeetingIndex{
        .user{
            padding:10px 30px;
            background:#fff;
            display: flex;
            align-items: center;
            border-bottom:solid 1px #f5f5f5;
            .iconfont{
                font-size: 50px;
            }
            .userName{
                margin-left:10px;
                font-size: 14px;
            }
        }
        .menu{
            display: flex;
            justify-content: space-between;
            background:#fff;
            padding:30px 30px;
            border-bottom:solid 1px #f5f5f5;
            li{
                width:80px;
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                .icon{
                  width:60px;
                  height:60px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-radius: 5px;
                  background:#c3d6f2;
                  .iconfont{
                      font-size: 30px;
                      color:#fff;
                  }
                }
                .name{
                    margin-top: 10px;
                    font-size: 16px;
                }
            }
        }
        .meetList{
            background:#fff;
            padding:0 30px;
            &>li{
                border-bottom:solid 1px #f5f5f5;
                padding:10px 0;
                .date{
                    font-size: 14px;
                    .day{
                        font-size: 20px;
                    }
                    .month{
                        margin-left:5px;
                    }
                    .tips{
                        margin-left:5px;
                    }
                }
                .todayMeeting{
                    margin-top:10px;
                    li{
                        .time{
                            font-size: 12px;
                            color:#999;
                            .meetingNO{
                                margin-left:10px;
                            }
                            .status{
                                color:orange;
                                margin-left:10px;
                            }
                        }
                        .bookUser{
                            font-size: 14px;
                            margin-top:5px;
                        }
                    }
                    li+li{
                        margin-top:20px;
                    }
                }
            }
        }
        .content{
            padding: 20px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            input{
                height:40px;
                border:solid 1px #f5f5f5;
                border-radius: 3px;
                background:#fff;
                font-size: 16px;
                color:#333;
                padding:0 5px;
            }
        }
    }
</style>