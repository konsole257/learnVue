import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home';
import MultiplicationTable from '../views/MultiplicationTable';
import WordRelay from '../views/WordRelay';
import NumberBaseball from '../views/NumberBaseball';
import ResponseCheck from '../views/ResponseCheck';
import RockScissorsPaper from '../views/RockScissorsPaper';
import LottoGenerator from '../views/LottoGenerator';
import TicTacToe from '../views/TicTacToe';
import MineSweeper from '../views/MineSweeper';



export default new createRouter({
 	history : createWebHistory(),

	routes: [
		{
            path: '/',
            redirect: '/Home/',
        },

		{
			path: '/Home',
			name: 'Home',
			component: Home,
		},

        {
			path: '/MultiplicationTable',
			name: 'MultiplicationTable',
			component: MultiplicationTable,
		},

        {
			path: '/WordRelay',
			name: 'WordRelay',
			component: WordRelay,
		},

        {
			path: '/NumberBaseball',
			name: 'NumberBaseball',
			component: NumberBaseball,
		},

        {
			path: '/ResponseCheck',
			name: 'ResponseCheck',
			component: ResponseCheck,
		},

        {
			path: '/RockScissorsPaper',
			name: 'RockScissorsPaper',
			component: RockScissorsPaper,
		},

        {
			path: '/LottoGenerator',
			name: 'LottoGenerator',
			component: LottoGenerator,
		},

        {
			path: '/TicTacToe',
			name: 'TicTacToe',
			component: TicTacToe,
		},

        {
			path: '/MineSweeper',
			name: 'MineSweeper',
			component: MineSweeper,
		},
	]
});
