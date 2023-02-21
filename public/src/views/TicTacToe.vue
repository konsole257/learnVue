<template>
    <div class="tic-tac-toe">
        <div class="grid-wrap">
            <div class="grid">
                <GridList>
                    <div class="grid-row" v-for="(rowData, rowIdx) in gridData" :key="rowIdx">
                        <div class='grid-column' @click="onclickColumn(rowIdx, columnIdx)" v-for="(columnData, columnIdx) in rowData" :key="columnIdx">{{columnData}}</div>
                    </div>
                </GridList>
            </div>

            <p v-if="turn">{{turn}} 차례 입니다.</p>
            <p v-if="winner">{{winner}}!!!</p>

            <!-- <div class="btn-area" v-if="end">
                <button type="button" class="btn-start" @click="onStart">ReStart</button>
            </div> -->
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import store, { CHANGE_TURN, CLICK_COLUMN, SET_WINNER, NO_WINNER, RESET_GAME } from '../store/TicTacToeStore';
import GridList from '../components/GridNodata';

export default {
    store,

    components: {
        GridList,
    },

    computed: {
        ...mapState(['winner', 'turn', 'gridData']),

        // gridData() {
        //     return this.$store.state.gridData;
        // },

        // turn() {
        //     return this.$store.state.turn;
        // },

        // winner() {
        //     return this.$store.state.winner;
        // },

        // end() {
        //     return this.$store.state.end;
        // },
    },

    methods: {
        onStart() {
            this.$store.commit(RESET_GAME);
        },

        onclickColumn(rowIdx, columnIdx) {
            // const this = this.$parent.$parent.$data;
            
            this.$store.commit(CLICK_COLUMN, {row: rowIdx, column: columnIdx});
            // this.gridData[rowIdx][columnIdx] = this.turn;

            let win = false;

            const gridDataColumnActive = [this.gridData[rowIdx][1], this.gridData[rowIdx][2]].every(val => val === this.gridData[rowIdx][0]) && [this.gridData[0][0],this.gridData[1][0],this.gridData[2][0]].includes('');
            const gridDataRowActive = [this.gridData[1][columnIdx], this.gridData[2][columnIdx]].every(val => val === this.gridData[0][columnIdx]) && [this.gridData[0][0],this.gridData[0][1],this.gridData[0][2]].includes('');
            const gridDataCross1Active = [this.gridData[1][1], this.gridData[2][2]].every(val => val === this.gridData[0][0]) && this.gridData[0][0] !== '';
            const gridDataCross2Active = [this.gridData[1][1], this.gridData[2][0]].every(val => val === this.gridData[0][2]) && this.gridData[0][2] !== '';

            switch(true) {
                case gridDataColumnActive:
                    win = true;
                break;

                case gridDataRowActive:
                    win = true;
                break;

                case gridDataCross1Active:
                    win = true;
                break;

                case gridDataCross2Active:
                    win = true;
                break;
            }

            this.$store.commit(CHANGE_TURN);

            if(win) {
                // this.winner = this.turn;
                this.$store.commit(SET_WINNER, this.turn);
                this.$store.commit(RESET_GAME);
                // this.turn = 'O';
                // this.gridData = [
                //     ['', '', ''],
                //     ['', '', ''],
                //     ['', '', '']
                // ];
                // this.end = false;
            } else {
                // let all = true;
                // this.tableData.forEach((row) => {
                //     row.forEach((column) => {
                //         if(!column) {
                //             all = false;
                //         }
                //     })
                // })
            }
        }
    }
}
</script>

<style scope lang="scss">
.tic-tac-toe {
    .grid-wrap {
        position: relative;
        width: 600px;
    }

    .grid {
        $grid: &;
        display: grid;
        grid-template-areas:
        '.'
        '.'
        '.';
        width: 600px;
        height: 600px;

        &-row {
            display: grid;
            grid-template-areas: '. . .';

            &:nth-child(1) {
                .grid-column {
                    border-top: 1px solid #000;
                }
            }

            &:nth-child(1) {
                .row-active {
                    &:before {
                        border-bottom-width: 0px;
                    }
                }
            }

            &:nth-child(2) {
                .row-active {
                    &:before {
                        border-top-width: 0px;
                        border-bottom-width: 0px;
                    }
                }
            }

            &:nth-child(3) {
                .row-active {
                    &:before {
                        border-top-width: 0px;
                    }
                }
            }
        }

        &-column {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            width: calc(600px / 3);
            height: calc(600px / 3);
            border-bottom: 1px solid #000;
            border-left: 1px solid #000;
            box-sizing: border-box;

            &:nth-child(3n + 3) {
                border-right: 1px solid #000;
            }

            &:nth-child(1) {
                &.column-active {
                    &:before {
                        border-right-width: 0px;
                    }
                }
            }

            &:nth-child(2) {
                &.column-active {
                    &:before {
                        border-right-width: 0px;
                        border-left-width: 0px;
                    }
                }
            }

            &:nth-child(3) {
                &.column-active {
                    &:before {
                        border-left-width: 0px;
                    }
                }
            }

            &.row-active {
                &:before {
                    content: "";
                    position: absolute;
                    top:  0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: 3px solid #ff0000;
                    box-sizing: border-box;
                }
            }

            &.column-active {
                &:before {
                    content: "";
                    position: absolute;
                    top:  0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: 3px solid #ff0000;
                    box-sizing: border-box;
                }
            }
        }

    }

    .btn-area {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);

        .btn-start {
            height: 50px;
        }
    }
}
</style>