<template>
    <div class="book">
        <book-meeting></book-meeting>
    </div>
</template>

<script>
import BookMeeting from '@/components/BookMeeting.vue'
import {mapMutations} from 'vuex'

export default{
    components: {
        BookMeeting
    },
    mounted(){
        this.setTitle('预定会议')
    },
    beforeDestroy(){
        this.setTitle('')
    },
    methods:{
        ...mapMutations({
            setTitle:'setTitle'
        })
    }
}

</script>