<template>
    <div class="CmeetingIndex">
        <div class="user">
            <span class="iconfont icon-huiyi"></span>
            <span class="userName">xxxx</span>
        </div>
        <ul class="menu">
            <li>
                <div class="icon">
                    <span class="iconfont icon-76xinzeng"></span>
                </div>
                <p class="name">加入会议</p>
            </li>
            <li>
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
        <ul class="meetList">
            <li>
                <p class="date">
                    <span class="day">25</span>
                    <span class="month">2月</span>
                    <span class="tips">今天</span>
                </p>
                <ul class="todayMeeting">
                    <li>
                        <p class="time">
                            <span class="begin">16:00</span>-
                            <span class="end">17:00</span>
                            <span class="meetingNO">859737319</span>
                            <span class="status">待开始</span>
                        </p>
                        <p class="bookUser">forever预定的会议</p>
                    </li>
                    <li>
                        <p class="time">
                            <span class="begin">16:00</span>-
                            <span class="end">17:00</span>
                            <span class="meetingNO">859737319</span>
                            <span class="status">待开始</span>
                        </p>
                        <p class="bookUser">forever预定的会议</p>
                    </li>
                </ul>
            </li>
            <li>
                <p class="date">
                    <span class="day">25</span>
                    <span class="month">2月</span>
                    <span class="tips">今天</span>
                </p>
                <ul class="todayMeeting">
                    <li>
                        <p class="time">
                            <span class="begin">16:00</span>-
                            <span class="end">17:00</span>
                            <span class="meetingNO">859737319</span>
                            <span class="status">待开始</span>
                        </p>
                        <p class="bookUser">forever预定的会议</p>
                    </li>
                    <li>
                        <p class="time">
                            <span class="begin">16:00</span>-
                            <span class="end">17:00</span>
                            <span class="meetingNO">859737319</span>
                            <span class="status">待开始</span>
                        </p>
                        <p class="bookUser">forever预定的会议</p>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

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
    }
</style>