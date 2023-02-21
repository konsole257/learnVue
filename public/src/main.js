import { createApp } from "vue";
import App from "./App.vue";
import Router from './router'
import TicTacToeStore from './store/TicTacToeStore'
import MineSweeperStore from './store/MineSweeperStore'

// import "./assets/main.css";

createApp(App)
.use(Router)
.use(TicTacToeStore)
.use(MineSweeperStore)
.mount("#app");
