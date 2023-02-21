<template>
	<p>{{first}} X {{second}} =</p>

	<form @submit.prevent="onSubmit">
		<input type="number" ref="value" v-model="value">
		<button>Submit</button>
	</form>

    <p>{{value}}</p>
	<p>{{result}}</p>
</template>

<script>
export default {
	name: 'MultiplicationTable',
	
	data() {
		return {
			first: Math.ceil(Math.random() * 9),
			second: Math.ceil(Math.random() * 9),
			value: '',
			result: null,
		}
	},

	methods: {
		onSubmit() {
            if (this.value === this.first * this.second) {
                this.result = 'Correct!!';
                this.questions();
            } else {
                this.result = 'Fail...';
            }
            
            this.value = '';
            this.$refs.value.focus();
		},

		questions() {
			this.first = Math.ceil(Math.random() * 9);
			this.second = Math.ceil(Math.random() * 9);
		}
	}
};
</script>

<style scoped lang="scss">
form {
	display: flex;
	align-items: center;
}
</style>
