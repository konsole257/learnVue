<template>
	<nav>
		<router-link to="/Home">홈</router-link>
		<router-link to="/MultiplicationTable">구구단</router-link>
		<router-link to="/WordRelay">끝말잇기</router-link>
        <router-link to="/NumberBaseball">숫자야구</router-link>
        <router-link to="/ResponseCheck">반응속도</router-link>
        <router-link to="/RockScissorsPaper">가위 바위 보</router-link>
        <router-link to="/LottoGenerator">로또</router-link>
        <router-link to="/TicTacToe">틱택토</router-link>
        <router-link to="/MineSweeper">지뢰찾기</router-link>
	</nav>
</template> 

<script>
export default {
	name: 'Header',
}
</script>

<style scoped lang="scss">
nav {
    display: inline-block;
    
	a {
        display: flex;
        align-items: center;
        color: #000;

        &:before {
            content: '';
            display: inline-block;
            width: 5px;
            height: 5px;
            margin-right: 10px;
            border-radius: 50%;
            background-color: #000;
        }

        &[class*='active'] {
            font-weight: 700;
            color: #ff0000;
        }
	}
}
</style>