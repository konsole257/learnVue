<template>
	<div class="mine-sweeper">
		<form>
		<input type="number" title="세로 갯수 입력" placeholder="세로" :value="row" @change="onChangeRow">
		<input type="number" title="가로 갯수 입력" placeholder="가로" :value="cell" @change="onChangeCell">
		<input type="number" title="지뢰 갯수 입력" placeholder="지뢰" :value="mine" @change="onChangeMine">
		<button type="button" @click="onClickBtn">START!</button>
	</form>

		<div>{{ timer }}s</div>

		<div>{{ result }}</div>

		<div class="grid">
			<div class="grid-row" v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
				<div class='grid-cell'
				v-for="(cellData, cellIndex) in rowData"
				:key="cellIndex"
				:style="cellDataStyle(rowIndex, cellIndex)"
				@click="onClickCell(rowIndex, cellIndex)"
				@contextmenu.prevent="onRightClickCell(rowIndex, cellIndex)">
					{{ cellDataText(rowIndex, cellIndex) }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import store, { CODE, START_GAME, INCREMENT_TIMER, OPEN_CELL, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL, CLICK_MINE } from '../store/MineSweeperStore.js';

import MineForm from '../components/MineForm';

let interval;

export default {
	store,

	components: {
		MineForm,
	},

	data() {
		return {
			row: 10,
			cell: 10,
			mine: 20,
		}
	},

	computed: {
		...mapState(['tableData', 'timer', 'result', 'halted']),

		cellDataStyle(state) {
			return (row, cell) => {
				switch(this.$store.state.tableData[row][cell]) {
					case CODE.NORMAL:
					case CODE.MINE:
						return {
							backgroundColor: '#444',
						}
					break;
					
					case CODE.CLICKED_MINE:
					case CODE.OPENED:
						return {
							backgroundColor: 'white',
						}
					break;
					
					case CODE.FLAG:
					case CODE.FLAG_MINE:
						return {
							backgroundColor: 'red',
						}
					break;

					case CODE.QUESTION:
					case CODE.QUESTION_MINE:
						return {
							backgroundColor: 'yellow',
						}
					break;
				}
			}
		},

		cellDataText() {
			return (row, cell) => {
				switch(this.$store.state.tableData[row][cell]) {
					case CODE.MINE:
						return '';
					break;
					
					case CODE.NORMAL:
						return '';
					break;
					
					case CODE.FLAG:
					case CODE.FLAG_MINE:
						return '!';
					break;

					case CODE.QUESTION:
					case CODE.QUESTION_MINE:
						return '?';
					break;

					case CODE.CLICKED_MINE:
						return 'X';
					break;

					default:
						return this.$store.state.tableData[row][cell];
					break;
				}
			}
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
			this.$store.commit(START_GAME, {
				row: this.row,
				cell: this.cell, mine: this.mine
			});
		},

		onClickCell(row, cell) {
			if (!this.halted) {
				switch(this.tableData[row][cell]) {
					case CODE.NORMAL:
						console.log(`normal`)
						this.$store.commit(OPEN_CELL, {row, cell});
					break;

					case CODE.MINE:
						console.log(`mine`)
						this.$store.commit(CLICK_MINE, {row, cell});
					break;
				}
			}

			
		},

		onRightClickCell(row, cell) {
			if (!this.halted) {
				switch(this.tableData[row][cell]) {
					case CODE.NORMAL:
					case CODE.MINE:
						this.$store.commit(FLAG_CELL, {row, cell});
					break;

					case CODE.FLAG_MINE:
					case CODE.FLAG:
						this.$store.commit(QUESTION_CELL, {row, cell});
					break;

					case CODE.QUESTION_MINE:
					case CODE.QUESTION:
						this.$store.commit(NORMALIZE_CELL, {row, cell});
					break;
				}
			}
		}
	},

	watch: {
		halted(value, oldValue) {
			if(value === false) {
				interval = setInterval(() => {
					this.$store.commit(INCREMENT_TIMER);
				}, 1000);
			} else {
				clearInterval(interval);
			}
		}
	}
}
</script>

<style scope lang="scss">
.mine-sweeper {
	user-select: none;

	.grid {
		display: flex;
		flex-direction: column;
		width: 500px;
		margin-top: 20px;

		&-row {
			flex: 1;
			display: flex;

			&:nth-child(1) {
				.grid-cell {
					border-top: 1px solid #000;
				}
			}
		}
		
		&-cell {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			height: 50px;
			border-bottom: 1px solid #000;
			border-left: 1px solid #000;
			box-sizing: border-box;

			&:last-child {
				border-right: 1px solid #000;
			}
		}
	}
}
</style>