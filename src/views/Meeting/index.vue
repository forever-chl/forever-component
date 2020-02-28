<template>
    <div class="meeting">
        <meeting :roomNum="roomNum"></meeting>
    </div>
</template>

<script>
    import Meeting from '@/components/Meeting'

    export default {
        data(){
            return{
                roomNum:this.$route.params.roomNum
            }
        },
        components:{
            Meeting
        }
    }
</script>