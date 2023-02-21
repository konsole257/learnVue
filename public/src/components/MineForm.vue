<template>
	<form>
		<input type="number" title="세로 갯수 입력" placeholder="세로" :value="row" @change="onChangeRow">
		<input type="number" title="가로 갯수 입력" placeholder="가로" :value="cell" @change="onChangeCell">
		<input type="number" title="지뢰 갯수 입력" placeholder="지뢰" :value="mine" @change="onChangeMine">
		<button type="button" @click="onClickBtn">START!</button>
	</form>
</template>

<script>
import { mapState } from 'vuex';
import store, { START_GAME } from '../store/MineSweeperStore.js';

export default {
	data() {
		return {
			row: 10,
			cell: 10,
			mine: 20,
		}
	},

	methods: {
		onChangeRow(e) {
			this.row = e.target.value;
		},

		onChangeCell(e) {
			this.cell = e.target.value;
		},

		onChangeMine(e) {
			this.mine = e.target.value;
		},

		onClickBtn() {
			this.$store.commit(START_GAME, {row: this.row, cell: this.cell, mine: this.mine});
		}
	}
}
</script>

<style lang="scss">
	
</style>