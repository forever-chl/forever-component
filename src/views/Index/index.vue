<template>
    <div class="meetingIndex">
        <meeting-index></meeting-index>
    </div>
</template>

<script>
import MeetingIndex from '@/components/MeetingIndex.vue'
import { mapMutations,mapState } from "vuex";

export default{
    components: {
        MeetingIndex
    },
    mounted(){
        this.setTitle('视频会议')
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