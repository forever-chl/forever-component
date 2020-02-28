<template>
    <meeting-detail :id="meetingId"></meeting-detail>
</template>

<script>
    import MeetingDetail from '@/components/MeetingDetail'
    import { mapMutations } from "vuex";

    export default{
        data(){
            return{
                meetingId: this.$route.params.id
            }
        },
        components:{
            MeetingDetail
        },
        mounted(){
            this.setTitle('会议详情')
        },
        beforeDestroy(){
            this.setTitle('')
        },
        methods:{
            ...mapMutations({
                setTitle: 'setTitle'
            })
        }
    }
</script>