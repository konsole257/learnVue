<template>
    <div
        :class="[
            'grid-column',
            
            {
                'row-active': rowActive,
                ['column-active-'+columnData]: columnActive
            },

            columnData
        ]"
        @click="onClick">
        {{columnData}}
    </div>
</template>

<script>
import { SET_WINNER, CLICK_COLUMN, CHANGE_TURN, RESET_GAME, NO_WINNER } from '../store';

export default {
    props: {
        rowIdx: Number,
        columnData: String,
        columnIdx: Number,
        end: Boolean,
    },

    data() {
        return {
            columnActive: false,
            rowActive: false,
            // end: false,
        }
    },

    computed: {
        columnData() {
            return this.$store.state.gridData[this.rowIdx][this.columnIdx];
        },

        gridData() {
            return this.$store.state.gridData;
        },

        turn() {
            return this.$store.state.turn;
        }
    },

    updated() {
        if(!this.$parent.$parent.$data.end) {
            this.columnActive = false;
            this.rowActive = false;
        }
    },

    methods: {
        onClick() {
            
            const parentData = this.$parent.$parent.$data;
            
            this.$store.commit(CLICK_COLUMN, {row: this.rowIdx, column: this.columnIdx});
            // parentData.gridData[this.rowIdx][this.columnIdx] = parentData.turn;

            const gridDataColumnActive = [parentData.gridData[this.rowIdx][1], parentData.gridData[this.rowIdx][2]].every(val => val === parentData.gridData[this.rowIdx][0]) && [parentData.gridData[0][0],parentData.gridData[1][0],parentData.gridData[2][0]].includes('');
            const gridDataRowActive = [parentData.gridData[1][this.columnIdx], parentData.gridData[2][this.columnIdx]].every(val => val === parentData.gridData[0][this.columnIdx]) && [parentData.gridData[0][0],parentData.gridData[0][1],parentData.gridData[0][2]].includes('');
            const gridDataCross1Active = [parentData.gridData[1][1], parentData.gridData[2][2]].every(val => val === parentData.gridData[0][0]) && parentData.gridData[0][0] !== '';
            const gridDataCross2Active = [parentData.gridData[1][1], parentData.gridData[2][0]].every(val => val === parentData.gridData[0][2]) && parentData.gridData[0][2] !== '';

            switch(true) {
                case gridDataColumnActive:
                    parentData.end = true;
                    this.columnActive = true;
                break;

                case gridDataRowActive:
                    parentData.end = true;
                    this.rowActive = true;
                break;

                case gridDataCross1Active:
                    parentData.end = true;
                break;

                case gridDataCross2Active:
                    parentData.end = true;
                break;
            }

            if(parentData.end) {
                parentData.winner = parentData.turn;
                // parentData.turn = 'O';
                // parentData.gridData = [
                //     ['', '', ''],
                //     ['', '', ''],
                //     ['', '', '']
                // ];
                // this.end = false;
            } else {
                // let all = true;
                // parentData.tableData.forEach((row) => {
                //     row.forEach((column) => {
                //         if(!column) {
                //             all = false;
                //         }
                //     })
                // })
            }

            this.$store.commit(CHANGE_TURN);
        },
    },
}
</script>


<style scope lang="scss">

</style>