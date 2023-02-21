<template>
    History:
    <ul>
        <li v-for="wordHistory in wordHistorys">{{wordHistory}}</li>
    </ul>

	<p>{{word}}</p>

	<form @submit.prevent="onSubmit">
		<input type="text" ref="value" v-model="value" @keyup="onKeyUp" @keydown="onKeyDown">
		<button type="submit">Submit</button>
	</form>

    <strong class="caution" v-if="!isKorean">한글만 입력 가능합니다.</strong>
    <strong class="caution" v-if="!isWordLength">3자리 단어만 가능합니다.</strong>
    

	<p>{{result}}</p>
</template>

<script>
export default {
	name: 'WordRelay',
	
	data() {
		return {
			word: '제주도',
			value: '',
            wordHistorys: ['제주도'],
			result: null,
            isKorean: true,
            isWordLength: true,
		}
	},

	methods: {
        onKeyDown() {
            if (event.isComposing) {
                this.koreanComplete = false;
            } else {
                this.koreanComplete = true;
            }
        },

        onKeyUp() {
            const regExp = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
            
            if (regExp.test(this.value)) {
                this.isKorean = false;
            } else {
                this.isKorean = true;
            }
        },

		onSubmit() {
            const regExp = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;

            if (this.value.length === 3) {
                this.isWordLength = true;

                if (regExp.test(this.value)) {
                    this.isKorean = false;
                } else {
                    this.isKorean = true;

                    if (this.word.split('').pop() === this.value[0] && !this.wordHistorys.includes(this.value)) {
                        this.word = this.value;
                        this.wordHistorys.push(this.value);
                        this.result = 'Next!!';
                    } else {
                        if (this.wordHistorys.includes(this.value)) {
                            this.result = 'ReTry..(Already)';
                        } else {
                            this.result = 'ReTry..';
                        }
                    }

                    this.value = '';
                    this.$refs.value.focus();
                }
            } else {
                this.isWordLength = false;
            }
		}
	}
};
</script>

<style scoped lang="scss">
form {
	display: flex;
	align-items: center;
}

ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;

    &:before {
        content: '[';
        margin-right: 10px;
    }

    &:after {
        content: ']';
        margin-left: 10px;
    }

    li {
        

        &:before {
            content: '>';
            margin: 0 10px;
        }

        &:first-child {
            &:before {
                display: none;
            }
        }
    }
}

.caution {
    display: block;
    color: #ff0000;
    margin-top: 5px;
}
</style>