<script>
	import { onMount } from 'svelte';
	import {algs, alg_keys} from './algs.js'
	let key = 'world';
	$: current_alg = '';
	$: active_families = alg_keys
	

	function getRandomAlg(alg_arr) {
		let alg_rnd_key = Math.floor(Math.random() * alg_arr.length)
		if (!current_alg || alg_arr[alg_rnd_key].name != current_alg.name) {
			current_alg = alg_arr[alg_rnd_key]
		} else {
			//		getRandomAlg({key:" "})
		}
	}
	
	function assembleAlgArray () {
		let current_algset = []
		console.log('act', active_families)
		for (let i in alg_keys){
			console.log(`curr_key:${i} - ${alg_keys[i]}`)
			if (active_families.indexOf(alg_keys[i])) {
			console.log(`curr_key:${i} - ${alg_keys[i]} bingo`)
				for (let j in algs[alg_keys[i]]) {
					console.log(`pushing:${j} - `,algs[alg_keys[i]][j])
					current_algset.push({...algs[alg_keys[i]][j], family:alg_keys[i]})
				}
			}
		}
				console.log("current_algset",current_algset)
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

	}
	onMount(()=>{
		
		getRandomAlg(assembleAlgArray())
	})
</script>




<form id="families">
	{#each alg_keys as alg, i}
		<input type="checkbox" class="families" name="{alg}" value="{alg}" checked on:click={reEval}>
		{i + 1}: {alg}<br />
	{/each}
</form>
