<script>
import { onMount } from 'svelte';
import Alger from './Alger.svelte'
import CubeConnect from './CubeConnect.svelte'

var state = "await"
var textarea
let AlgerComponent
let seq
let newMove

	function catchKeystroke(e) {
		return
		switch (state) {
			case "await":
				if (e.key === " ") {
					AlgerComponent.getRandomAlg()
				}
			case "newalg":
				if (e.key === " ") {
					AlgerComponent.getRandomAlg()
				}
		}
	}

function handleMove (event) {
	textarea.value += ` ${event.detail.move.notation}`;
	AlgerComponent.handleMove(event.detail.move.notation)
}
function handleNewAlg (event) {
	state = "newalg"
	console.log(event)
	seq = event.detail.seq.split(" ")
	if (textarea) textarea.value = ''
	console.log(seq)
}

onMount(()=>{
		textarea = document.querySelector('textarea');
		AlgerComponent.getRandomAlg()
})
</script>

<svelte:body on:keypress={catchKeystroke} />
<main>
<h1>Cube trainer</h1>
<div id="slot_alger">
	<Alger bind:this={AlgerComponent} on:newalg={handleNewAlg}></Alger>
</div>
<div id="slot_moves">
	<textarea class="textarea is-primary" type="text" placeholder="Primary textarea"></textarea>
</div>
<div id="slot_connect">
	<CubeConnect on:cubemove={handleMove}/>
</div>
<div class="clear"></div>
</main>
<footer>
<!-- TODO
<ul>
<li>cuber insert</li>
<li>random shuffle alg</li>
<li>save preferences</li>
<li>save best times</li>
<li>free train</li>
<li>record session</li>
<li>add more algs</li>
<li>add custom algs, in arrays</li>
<li>validate alg objects</li>
<li>responisivity</li>
<li>code cleanup</li>
<li>turn per second</li>
<li>avg alg time</li>
<li>timer rewrite</li>
<li>img cache</li>

</ul> --><br />
Home of the project: <a href="https://github.com/lordcase/cubehq" target="_blank">https://github.com/lordcase/cubehq</a><br /><br />
</footer>
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
	#slot_alger {
		float:left;
		width: 50%;
		min-width: 500px;
	}
	#slot_moves {
		float:right;
		width: 40%;
	}
	#slot_connect {
		position: fixed;
		bottom: 0;
		right: 0;
		height: 300px;
		border-radius: 30px;
		background: rgba(0,170,170,.3);
		padding: 20px;
	}
	.clear {
		clear: both;
	}
	footer {
		margin-top: 20px;
		background: #088;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>