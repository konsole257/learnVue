import { createApp } from 'vue';
import { createStore } from 'vuex';

import TicTacToeStore from './TicTacToeStore'
import MineSweeperStore from './MineSweeperStore'

export default createStore({
    modules: {
        TicTacToeStore: TicTacToeStore,
        MineSweeperStore: MineSweeperStore,
    }
})