import { createApp } from 'vue';
import { createStore } from 'vuex';

export const SET_WINNER = 'SET_WINNER';
export const CLICK_COLUMN = 'CLICK_COLUMN';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

export default createStore({
    namespaced: true,

    state: {
        gridData: [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ],
        turn: 'O',
        winner: '',
        end: false,
    },

    getters: {

    },

    mutations: {
        [SET_WINNER](state, winner) {
            state.winner = winner;
        },

        [CLICK_COLUMN](state, {row, column}) {
            // Vue.set(state.gridData[row], column, state.turn);

            state.gridData[row][column] = state.turn;
        },

        [CHANGE_TURN](state) {
            state.turn = state.turn === 'O' ? 'X' : 'O';
        },

        [RESET_GAME](state) {
            state.gridData = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];
            state.turn = 'O';
            state.winner = '';
            state.end = false;
        },

        [NO_WINNER](state) {
            state.winner = '';
        }
    },

    actions: {

    }
})
