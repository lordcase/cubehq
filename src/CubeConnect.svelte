<script>
	
	import {Giiker} from './giiker.js';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	

	const dispatch = createEventDispatcher();
	const select = num => () =>  dispatch('cubemove', {move:{notation:controls[num]}});

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
		padding-bottom: 20px;
		z-index: 10;
	}

	button {
		margin: 0
	}
</style>

	
	<div class="keypad">
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
	<button class="button is-primary is-large is-rounded" id="connectButton">Connect!</button>
	
	</div>