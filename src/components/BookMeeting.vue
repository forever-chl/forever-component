<template>
    <div class="CBookMeeting">
        <van-cell-group title="会议主题">
            <van-field type="text" v-model="topic" placeholder="请输入会议主题" />
        </van-cell-group>
        
        <van-cell-group title="forever预定的会议">
            <van-cell title="开始时间" @click="showDateBegin = true" is-link>{{begin.toLocaleString()}}</van-cell>
            <van-cell title="结束时间" @click="showDateEnd = true" is-link>{{end.toLocaleString()}}</van-cell>
        </van-cell-group>
        <van-cell-group title="会议文档">
            <van-cell title="会议文档" 点击添加 is-link></van-cell>
            <van-cell title="允许成员上传文档">
                <van-switch v-model="isMenberFile" active-color="#1989fa"/>
            </van-cell>
        </van-cell-group>
        <van-cell-group title="参会人员">
            <van-field type="text" placeholder="请输入参会人数" label="参会人数"/>
            <van-cell title="参会人员" is-link></van-cell>
        </van-cell-group>
        <div class="button">
            <van-button type="info" size="large" @click="newMeeting" round>立即预定</van-button>
        </div>
        <van-popup v-model="showDateBegin" position="bottom">
            <van-datetime-picker type="datetime" v-model="begin" @confirm="showDateBegin = false"/>
        </van-popup>
        <van-popup v-model="showDateEnd" position="bottom">
            <van-datetime-picker type="datetime" v-model="end" @confirm="showDateEnd = false"/>
        </van-popup>
    </div>
</template>

<script>
    import { CellGroup,Cell,Button,Calendar,Switch,Popup,Icon,DatetimePicker,Field,Toast } from "vant"
    import {createMeet} from '@/api/common'
    import { dateFormat } from "@/mixins/utils";

    export default{
        data(){
            return{
                begin:new Date(),
                end: new Date(),
                showDateBegin: false,
                showDateEnd: false,
                isPassword: false,
                password: '',
                isMenberFile: false,
                topic:''
            }
        },
        components:{
            [CellGroup.name]: CellGroup,
            [Cell.name]: Cell,
            [Button.name]:Button,
            [Calendar.name]:Calendar,
            [Switch.name]:Switch,
            [Popup.name]:Popup,
            [Icon.name]:Icon,
            [DatetimePicker.name]:DatetimePicker,
            [Field.name]:Field,
            [Toast.name]:Toast
        },
        methods:{
            newMeeting(){
                let param = {} 
                param.topic = this.topic
                param.chairman = JSON.stringify(parseInt(Math.random() * 100000000))
                param.startTime = dateFormat('YYYY-mm-dd HH:MM:SS',this.begin)
                param.members = ''

                if(!this.topic){
                    Toast('会议主题不能为空')
                    return
                }

                createMeet(param).then(res => {
                    Toast({
                        message: '会议创建成功',
                        onClose: () => {
                            this.$router.go(-1)
                        }
                    })
                })
            }
        }
    }
</script>

<style lang="less">
    .CBookMeeting{
        .button{
            padding:20px;
            .van-button--info{
                background:#1989fa;
            }
        }
    }
</style>