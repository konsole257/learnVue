<template>
	<div id="screen" :class="state" @click="onClick">{{message}}</div>
    <div> 
        반응시간:
        
        <ul v-if="results.length > 0">
            <li v-for="result in results" :key="result.id">{{result}}ms</li>
        </ul>

        <div class="nodata" v-else>0ms</div>
    </div>

    <div>평균시간: {{average}}ms</div>
    
    <button type="button" @click="onReset">Reset</button>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeout = 0;

export default {
	name: 'ResponseCheck',

	data() {
		return {
			results: [],
			state: 'waiting',
			message: '클릭해서 시작하세요.'
		}
	},

    computed: {
        average() {
            return Math.floor((this.results.reduce((a, c) => a+c, 0) / this.results.length)*1000)/1000 || 0;
        }
    },

	methods: {
		onReset() {
			this.results = [];
			this.state = 'waiting';
			this.message = '클릭해서 시작하세요.';
			clearTimeout(timeout);
		},

		onClick() {
			switch(this.state) {
				case 'waiting' :
					this.state = 'ready';
					this.message = '초록색이 되면 다시 클릭!!';

					timeout = setTimeout(() => {
						this.state = 'now';
						this.message = '지금 클릭!!';
						startTime = new Date();
					}, Math.floor(Math.random() * 1000) + 2000);
				break;

				case 'ready' :
					this.state = 'waiting';
					this.message = '너무 빠름';
					startTime = 0;
					endTime = 0;

					clearTimeout(timeout);
				break;

				case 'now' :
					this.state = 'waiting';
					this.message = '클릭해서 시작하세요.';
					endTime = new Date();

					this.results.push(endTime - startTime);
				break;
			}
		}
	},
    
}
</script>

<style scoped lang="scss">
	#screen {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 200px;
		height: 200px;
		user-select: none;

		&.waiting {
			background-color: aqua;
		}

		&.ready {
			background-color: red;
		}

		&.now {
			background-color: green;
		}
	}

	ul {
		padding: 0;
		margin: 0;
		list-style: none;

		li {
			display: flex;
			align-items: center;

			&:before {
				content: '';
				display: block;
				width: 5px;
				height: 5px;
				margin: 0 10px;
				border-radius: 50%;
				background-color: #000;
			}
		}
	}

	.nodata {
		display: flex;
		align-items: center;

		&:before {
			content: '';
			display: block;
			width: 5px;
			height: 5px;
			margin: 0 10px;
			border-radius: 50%;
			background-color: #000;
		}
	}
</style>