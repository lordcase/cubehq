<script>
	
	import {Giiker} from './giiker.js';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	

	const dispatch = createEventDispatcher();
	const select = num => () =>  dispatch('cubemove', {move:{notation:controls[num]}});
	let visible = false

	const controls = {
		R: "R",
		Rp: "R'",
		L: "L",
		Lp: "L'",
		U: "U",
		Up: "U'",
		D: "D",
		Dp: "D'",
		F: "F",
		Fp: "F'",
		B: "B",
		Bp: "B'",
		M: "M",
		Mp: "M'",
}
	
	onMount(()=>{
		const button = document.querySelector('#connectButton');

		button.addEventListener('click', async () => {
		  button.classList.add('is-loading');
		  button.disabled = true;
		
		  const connect = async () => {
		    const giiker = new Giiker();
		    await giiker.connect();
		    return giiker;
		  };
			let retry = setTimeout(() => {
				console.log(`hit timeout`)
	
				button.classList.remove('is-loading');
				button.textContent = 'Connect';
			}, 30000)
			const giiker = await connect();
			clearTimeout(retry)
			console.log(`cleared timeout`)
	
		  button.classList.remove('is-loading');
		  button.textContent = 'Connected!';
		
		  giiker.on('move', (move) => {
				console.log(move)
				dispatch('cubemove', {move})
		  });
		
		  // Expose giiker object for testing on console
		  window.giiker = giiker;
		});
}) 


</script>
<style>
	.keypad {
		display: grid;
		grid-template-columns: repeat(5, 3em);
		grid-template-rows: repeat(4, 3em);
		grid-gap: 0.5em;
		z-index: 10;
		max-height: 0;
		transition: max-height .3s linear;
		overflow: hidden;
	}
	.keypad.visible {
		max-height: 350px;
		padding-bottom: 20px;
	}

	button {
		margin: 0
	}
	#connect_button {
		float: left;
	}
	#connect_toggle {
		float: right;
	}
	#connect_toggle.visible button {
		background: #20a1B2;
	}
	#connect_toggle.visible button:hover {
		background: #20d1B2;
	}
</style>

<!-- 	
	<div class="keypad" class:visible>
		<div></div>
		<button on:click={select('U')}>U</button>
		<div></div>
		<button on:click={select('Up')}>U'</button>
		<div></div>
		<button on:click={select('Lp')}>L'</button>
		<button on:click={select('Fp')}>F'</button>
		<button on:click={select('Mp')}>M'</button>
		<button on:click={select('F')}>F</button>
		<button on:click={select('R')}>R</button>
		<button on:click={select('L')}>L</button>
		<button on:click={select('B')}>B</button>
		<button on:click={select('M')}>M</button>
		<button on:click={select('Bp')}>B'</button>
		<button on:click={select('Rp')}>R'</button>
		<div></div>
		<button on:click={select('Dp')}>D'</button>
		<div></div>
		<button on:click={select('D')}>D</button>
		<div></div>
	</div>
		 -->
	<div style="clear:both;">
		<div id="connect_button">
			<button class="button is-primary is-large is-rounded" id="connectButton">Connect!</button>
		</div>
		<!-- <div id="connect_toggle" class:visible>
			<button class="button is-primary is-large is-rounded" on:click={()=>{visible = !visible}}>Controls</button>
		</div> -->
	</div>