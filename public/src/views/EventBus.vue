<template>
    이벤트 버스

    <button type="button" :click="onClickBtn">Click!!</button>
</template>

<script>

// import EventBus from '../EventBus';

export default {
    methods: {
        onClickBtn() {
            // EventBus.$emit('onClick')
        }
    },

    created() {
        // EventBus.$on('onClick', this.onClickBtn);
    }
}
</script>

<style lang="scss">
    
</style>