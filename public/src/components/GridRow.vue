<template>
    <div class="grid-row">
        <GridColumn
            v-for="(columnData, columnIdx) in rowData"
            :rowIdx="rowIdx"
            :columnData="columnData"
            :columnIdx="columnIdx"
            :turn="turn"
            :end="end">
        </GridColumn>
    </div>
</template>

<script>
import GridColumn from '../components/GridColumn';

export default {
    components: {
        GridColumn
    },

    props: {
        rowData: Array,
        rowIdx: Number,
        turn: String,
        columnActive: Boolean,
        rowActive: Boolean,
        end: Boolean,
    },

    computed: {
        rowData() {
            return this.$store.state.gridData[this.rowIdx]
        }
    },

    data() {
        return {
        }
    },

    mounted() {
    },
}
</script>


<style scope lang="scss">

</style>