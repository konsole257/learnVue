<template>
    <p>Rock = 1, Scissors = 2, Paper = 5</p>

    <div class="computer" :class="state"></div>

    <div class="btn-area">
        <button type="button" @click="onClickButton('rock')" :disabled="!start">바위</button>
        <button type="button" @click="onClickButton('scissors')" :disabled="!start">가위</button>
        <button type="button" @click="onClickButton('paper')" :disabled="!start">보</button>
    </div>

    <div class="btn-area">
        <button type="button" @click="onStart">Start / Continue</button>
        <button type="button" @click="onReset">Reset</button>
    </div>

    <div>{{result}}</div>
    <div>{{score}}</div>
</template>

<script>
let interval = null;
let getRandomNumber = Math.floor((Math.random()*100) + 1);
const scissorsPer = 80;

export default {
    name: 'RockScissorsPaper',

    data() {
        return {
            result: '',
            score: 0,
            state: 'rock',
            start: false,
        }
    },

    computed: {
        
    },

    methods: {
        onReset() {
            clearInterval(interval);
            
            this.start = false;
            this.result = '';
            this.score = 0;
            this.state = 'rock';
        },

        onStart() {
            clearInterval(interval);
            
            this.start = true;

            interval = setInterval(() => {
                switch(this.state) {
                    case 'rock' :
                        this.state = 'scissors';
                    break;

                    case 'scissors' :
                        this.state = 'paper';
                    break;

                    case 'paper' :
                        this.state = 'rock';
                    break;
                }
            }, 100);
        }, 

        onClickButton(choice) {
            clearInterval(interval);
            
            this.start = false;

            switch(choice) {
                case 'paper' :
                    getRandomNumber = Math.floor((Math.random()*100) + 1);

                    if (scissorsPer > getRandomNumber) {
                        this.state = 'scissors';
                    }
                break;
            }

            if (choice === this.state) {
                this.result = 'Draw';
            } else if (choice === 'rock' && this.state === 'scissors' || choice === 'scissors' && this.state === 'paper' || choice === 'paper' && this.state === 'rock') {
                switch(choice) {
                    case 'rock' :
                        this.score += 1;
                    break;

                    case 'scissors' :
                        this.score += 2;
                    break;

                    case 'paper' :
                        this.score += 5;
                    break;
                }

                this.result = 'Win!';
                
            } else {
                switch(choice) {
                    case 'rock' :
                        this.score -= 1;
                    break;

                    case 'scissors' :
                        this.score -= 2;
                    break;

                    case 'paper' :
                        this.score -= 5;
                    break;
                }

                this.result = 'Loss';
            }
        }
    },
    
    mounted() {
        this.onStart();
    },

    beforeDestroy() {
        clearInterval(interval)
    }
}
</script>

<style scoped lang="scss">
.computer {
    width: 150px;
    height: 200px;
    background-image: url('https://en.pimg.jp/023/182/267/1/23182267.jpg');

    &.rock {
        background-position: -15px 0;
    }

    &.scissors {
        background-position: -135px 0;
    }

    &.paper {
        background-position: -284px 0;
    }
}

.btn-area {
    display: flex;
    width: 150px;
    margin-top: 10px;

    button {
        flex: 1;
    }
}
</style>