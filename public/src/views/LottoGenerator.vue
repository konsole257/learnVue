<template>
    <div class="ball-area">
        결과: 
        <ul class="ball-list">
            <li class="list-item" v-for="ball in balls" :key="ball">
                <LottoBall :ball="ball"></LottoBall>
                <!-- <div :class="`ball${ball}`">{{ ball }}</div> -->
            </li>

        </ul>

        <div class="bonus">
            보너스:
            <LottoBall :ball="bonus"></LottoBall>
            <!-- <div :class="`ball${bonus}`">{{ bonus }}</div> -->
        </div>
    </div>
    
    <button type="button" @click="onRandom">Random Number</button>
    <button type="button" @click="onHistory">History Number</button>
</template>

<script>
import LottoBall from '../components/LottoBall';

import jsonData from "../assets/result.json";

const getRandomNumber = (minNumber, maxNumber, length) => {
	let randomNumber = [];
	let temp = null;

	for (let i = 0; i < length; i++) { 
		temp = Math.floor(Math.random()*maxNumber) + minNumber;
		randomNumber.includes(temp) ? i-- : randomNumber.push(temp);
	}

	return randomNumber;
}

export default {
    name: 'LottoGenerator',

    components: {
        LottoBall,
    },

    data() {
        return {
            balls: [],
            bonus: null,
            resultHistorys: jsonData,
        }
    },

    methods: {
        onRandom() {
            this.balls = getRandomNumber(1, 45, 7);
            this.bonus = this.balls.pop();
        },

        onHistory() {
            this.balls = [];
            this.bonus = null;

            let resultHistory = [],
                resultHistoryB = [],
                chance = [];

            Object.values(this.resultHistorys).map((value) => {
                resultHistory = resultHistory.concat(value.a, value.b, value.c, value.d, value.e, value.f)
                resultHistoryB.push(value.bonus);
            });

            resultHistory = resultHistory.reduce((accumulator, currentValue) => {
                accumulator[currentValue] = (accumulator[currentValue] || 0) + 1;
                return accumulator;
            }, {});

            Object.values(resultHistory).map((value) => {
                chance.push(value*100/(this.resultHistorys.length*6));
            });

            chance.map((item, idx) => {
                if(idx === 0) {
                    chance[idx] = chance[idx];
                } else if (idx > 0) {
                    chance[idx] = chance[idx-1] + chance[idx];
                }
            });

            for(let drawLength = 0; drawLength < 7; drawLength++) {
                let draw = Math.random()*100;

                chance.map((item, idx) => {
                    if(idx === 0) {
                        if(draw <= chance[idx]) {
                            if (drawLength < 6) {
                                this.balls.push(idx+1);
                            } else {
                                this.bonus = idx+1;
                            }
                        }
                    } else if (idx > 0) {
                        if(draw > chance[idx-1] && draw <= chance[idx]) {
                            let temp = idx+1;
                            if (drawLength < 6) {
                                this.balls.includes(temp) ? drawLength-- : this.balls.push(temp);
                            } else {
                                this.balls.includes(temp) ? drawLength-- : this.bonus = temp;
                            }
                        }
                    }
                });
            }
        }
    },

    watch: {
        balls(value, oldValue) {
            if (value) {
            }
        }
    },
}
</script>

<style scoped lang="scss">
.ball-area {
    width: 500px;
    padding: 20px;
    background-color: #eee;
}
.ball-list {
    display: flex;
    justify-content: flex-start;
    padding: 0;

    .list-item {
        list-style: none;
        margin-left: 10px;

        &:first-child {
            margin-left: 0;
        }
    }
}
</style>