<template>
    <div class="CBookMeeting">
        <van-cell-group title="forever预定的会议">
            <van-cell title="开始时间" @click="showDateBegin = true">{{begin.toLocaleString()}}</van-cell>
            <van-cell title="结束时间" @click="showDateEnd = true">{{end.toLocaleString()}}</van-cell>
        </van-cell-group>
        <van-cell-group title="参会密码">
            <van-cell title="是否开启入会密码">
                <van-switch v-model="isPassword" />
            </van-cell>
            <van-field v-model="password" placeholder="请输入4-6位数的密码" />
        </van-cell-group>
        
        <van-popup v-model="showDateBegin" position="bottom">
            <van-datetime-picker type="datetime" v-model="begin" @confirm="showDateBegin = false"/>
        </van-popup>
        <van-popup v-model="showDateEnd" position="bottom">
            <van-datetime-picker type="datetime" v-model="end" @confirm="showDateEnd = false"/>
        </van-popup>
    </div>
</template>

<script>
    import { CellGroup,Cell,Button,Calendar,Switch,Popup,Icon,DatetimePicker,Field } from "vant"

    export default{
        data(){
            return{
                begin:new Date(),
                end: new Date(),
                showDateBegin: false,
                showDateEnd: false,
                isPassword: false,
                password: '',
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
            [Field.name]:Field
        }
    }
</script>