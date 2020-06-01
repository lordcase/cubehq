<script>
import { onMount } from 'svelte';
import Alger from './Alger.svelte'
import CubeConnect from './CubeConnect.svelte'

var state = "await"
$: giiiker = window.giiker

	function catchKeystroke(e) {
		switch (state) {
			case "await":
				if (e.key === " ") {
//					Alger.getRandomAlg(assembleAlgArray())
				}
		}
	}

</script>

<svelte:body on:keypress={catchKeystroke} />
<main>
<h1>Cube trainer</h1>
<div>
	{giiiker}
	<Alger></Alger>
</div>
<div id="connect">
	<CubeConnect />
</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	#connect {
		position: fixed;
		top: 0;
		right: 0;
		width: 200px;
		height: 50px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>