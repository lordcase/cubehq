<script>
	import { onMount } from 'svelte';
	import {algs, alg_keys} from './algs.js'
	import { createEventDispatcher } from 'svelte';
	
	let currPos = 0
	var move = ''
	let forceNext = ''
	let nextStep = ''
	let state = 'idle'
	let reveal = false
	let startTime = 0
	let endTime = 0
	let solveTime = 0

	$: current_alg = '';
	var active_families = alg_keys
	var alg_arr = assembleAlgArray()
	const dispatch = createEventDispatcher();
	let seq = []
	
	const reset = () => {
		state = 'idle'
		startTime = 0
		endTime = 0
		solveTime = 0
		currPos = 0
		forceNext = ''
		nextStep = seq[currPos].move
		for (let s in seq) {
			seq[s].state = ''
		}
	}
	const fail = () => {
		state = "failed"
		seq[currPos].state = 'mistake'
	}
	const proceed = () => {
		if (state === 'idle') {
			state = 'in progress'
			startTime = Date.now()
		}
	}



	export function getRandomAlg() {
		let alg_rnd_key = Math.floor(Math.random() * alg_arr.length)
		if (!current_alg || alg_arr[alg_rnd_key].name != current_alg.name) {
			current_alg = alg_arr[alg_rnd_key]
			dispatch("newalg", current_alg)

			seq = current_alg.seq.split(' ').map(a=>({state:'', move:a}))
			reset()
		} else if (current_alg){
			getRandomAlg()
		}
	}
	
	function assembleAlgArray () {
		let current_algset = []
		console.log('act', active_families)
		for (let i in alg_keys){
			console.log(`curr_key:${i} - ${alg_keys[i]}`)
			if (active_families.indexOf(alg_keys[i])!==-1) {
			console.log(`curr_key:${i} - ${alg_keys[i]} bingo`)
				for (let j in algs[alg_keys[i]]) {
					console.log(`pushing:${j} - `,algs[alg_keys[i]][j])
					current_algset.push({...algs[alg_keys[i]][j], family:alg_keys[i]})
				}
			}
		}
				console.log("current_algset",current_algset)
				alg_arr = current_algset
		return current_algset
	}

	function reEval () {
				let nodeList = document.querySelectorAll(".families:checked")
				console.log(`Nodelist`, nodeList)
				active_families = Array.from(nodeList).map(a=>{
					console.log("a",a.value)
					return a.value
				})
				console.log(`active_families`, active_families)
				assembleAlgArray()

	}



	export function handleMove(newMove) {
		console.log("move:", newMove)
		move = newMove
		if (state === 'success' || state === 'failed') {
			return
		} else if (forceNext !== '' && forceNext !== move) {
			fail()
			return
		}	else if (move === forceNext || move === seq[currPos].move) {
			forceNext = ''
			seq[currPos].state = 'correct'
			currPos++
			if (currPos === seq.length) {
				state = 'success'
				endTime = Date.now()
				solveTime = endTime - startTime
				nextStep = ''
			} else {
				proceed()
				nextStep = seq[currPos].move
			}
		} else if (move.charAt(0) === seq[currPos].move.charAt(0) && seq[currPos].move.charAt(1) === "2") {
			proceed()
			forceNext = move
		} else {
			fail(seq[currPos])
		}
	}
	onMount(()=>{
		
		current_alg = getRandomAlg()
	})
</script>



<form id="families">
	{#each alg_keys as alg, i}
		<input type="checkbox" class="families" name="{alg}" value="{alg}" checked on:click={reEval}>
		{i + 1}: {alg}<br />
	{/each}
</form>
<div>{current_alg.name}</div>
<button on:click={()=>reveal = !reveal}>{!reveal ? 'reveal' : 'hide'}</button>
<div class:reveal>
{#each seq as step}
	<span class="step" class:correct="{step.state === 'correct'}" class:mistake="{step.state === 'mistake'}">{step.move}</span>
{/each}
<div class:success="{state === 'success'}" class:failed="{state === 'failed'}">
	<div>move:{move}</div>
	<div>currpos:{currPos}</div>
	<!-- <div>next step:{nextStep}</div> -->
	<div>Force Next:{forceNext}</div>
	<div>Solve Timte:{solveTime}</div>
</div>
<div>State:{state}
<button on:click={reset} >retry</button>
<button on:click={getRandomAlg} >New Alg</button>
</div>
</div>

<style>
.step {
	padding: 3px;
	margin: 3px;
	color: white;
}
.reveal .step {
	color: black;
}
.step.correct {
	background-color: green;
	color: white;
}
.step.mistake {
	background-color: red;
	color: white;
}
.success {
	background-color: rgba(0,255,0,40);
}
.failed {
	background-color: rgba(255,0,0,40);
}
</style>