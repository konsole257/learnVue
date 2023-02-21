<template>
	<p>{{result}}</p>
	<form @submit.prevent="onSubmit">
		<label ref="answerLabel">
			<span>숫자 입력</span>
			<input type="text" minlength="4" maxlength="4" ref="answer" v-model="value" @keydown="onKeydown" @keyup="onKeyup" @focus="onFocus" @blur="onBlur">
		</label>
		<button type="submit">Submit</button>
		<button type="button" @click="onReset">Reset</button>
	</form>

	<p class="description">숫자만 맞으면 ball, 숫자와 자리가 맞으면 strike</p>

	<!-- <div>{{this.answer.join(',')}}</div> -->
	<p>Try: {{tries.length}}</p>

	<ul>
		<li v-for="attempt in tries">{{attempt.try}} - {{attempt.result}}</li>
	</ul>
</template>

<script>
const getRandomNumber = () => {
	let randomNumber = [];
	let temp = null;

	for (let i = 0; i < 4; i++) { 
		temp = Math.floor(Math.random()*10);
		randomNumber.includes(temp) ? i-- : randomNumber.push(temp);
	}

	return randomNumber;
}

export default {
	name: 'NumberBaseball',

	data() {
		return {
			answer: getRandomNumber(),
			tries: [],
			value: '',
			valueTemp: '',
			valueTempSize: 0,
			valueCurrentSize: 0,
			result: null,
		}
	},

	methods: {
		onKeydown(e) {
			this.valueTemp = this.value;
			this.valueTempSize = new Set(this.value).size;
		},

		onKeyup(e) {
			this.valueCurrentSize = new Set(this.value).size;

			if (this.valueTempSize === this.valueCurrentSize) {
				this.value = this.valueTemp;
				this.result = `중복된 숫자 금지`;
			} else {
				this.result = '';
			}
		},

		onSubmit() {
			if (this.value === this.answer.join('')) {
				this.tries.push({
					try: this.value,
					result: 'Homerun!!'
				});
			} else {
				this.tries.length >= 9 ? this.result = `10번 넘게 틀려서 실패! 정답은 ${this.answer.join(',')}입니다.`: '';
				
				let strike = 0;
				let ball = 0;

				const answerArr = this.value.split('').map(v => parseInt(v));
				
				for (let i = 0; i < 4; i++) {
					if (answerArr[i] === this.answer[i]) {
						strike++;
					} else if (this.answer.includes(answerArr[i])) {
						ball++;
					}
				}

				this.tries.push({
					try: this.value,
					result: `${strike} strike, ${ball} ball`
				});
			}
			
			this.value = '';
			this.$refs.answer.focus();
		},

		onReset() {
			this.answer = getRandomNumber();
			this.tries = [];
			this.result= null;
			this.value = '';
			this.$refs.answer.focus();
		},

		onFocus() {
			this.$refs.answerLabel.classList.add('hasFocus');
		},

		onBlur() {
			this.value === ''? this.$refs.answerLabel.classList.remove('hasText'): this.$refs.answerLabel.classList.add('hasText');
			this.$refs.answerLabel.classList.remove('hasFocus');
		}
	}
}
</script>

<style scoped lang="scss">
label {
	display: inline-block;
	position: relative;
	cursor: text;

	input {
		height: 30px;
	}

	span {
		transition-duration: 300ms;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		height: 21px;
		font-size: 13px;
		color: #999;
		padding: 0 5px;
		margin: auto;
		background-color: transparent;
	}

	&.hasFocus span,
	&.hasText span {
		transform: translate(5px, -150%);
		height: 12px;
		font-size: 11px;
		background-color: #fff;
	}
}
</style>