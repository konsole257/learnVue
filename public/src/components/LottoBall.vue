<template>
    <div :class="`ball${ball}`">{{ ball }}</div>
</template>

<script>
export default {
    name: 'LottoBall',

    props: {
        ball: Number,
    },

    data() {
        return {
        }
    }
}
</script>

<style scoped lang="scss">
[class^='ball'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    font-weight: 700;
    color: #fff;
    text-shadow: 0px 0px 3px rgb(41 56 0 / 80%);
    border-radius: 50%;

    &[class$='1'],
    &[class$='2'],
    &[class$='3'],
    &[class$='4'],
    &[class$='5'],
    &[class$='6'],
    &[class$='7'],
    &[class$='8'],
    &[class$='9'] {
        background-color: #fbc400;
    }

    &[class$='10'],
    &[class$='11'],
    &[class$='12'],
    &[class$='13'],
    &[class$='14'],
    &[class$='15'],
    &[class$='16'],
    &[class$='17'],
    &[class$='18'],
    &[class$='19'] {
        background-color: #69c8f2;
    }

    &[class$='20'],
    &[class$='21'],
    &[class$='22'],
    &[class$='23'],
    &[class$='24'],
    &[class$='25'],
    &[class$='26'],
    &[class$='27'],
    &[class$='28'],
    &[class$='29'] {
        background-color: #ff7272;
    }

    &[class$='30'],
    &[class$='31'],
    &[class$='32'],
    &[class$='33'],
    &[class$='34'],
    &[class$='35'],
    &[class$='36'],
    &[class$='37'],
    &[class$='38'],
    &[class$='39'] {
        background-color: #aaa;
    }

    &[class$='40'],
    &[class$='41'],
    &[class$='42'],
    &[class$='43'],
    &[class$='44'],
    &[class$='45'] {
        background-color: #b0d840;
    }
}
</style>