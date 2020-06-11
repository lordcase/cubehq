<script>
	import { onMount } from 'svelte';
	import {algs} from './algs.js'
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
	let showHide = []
	let continuous = true
	let sliceMove = undefined

	$: current_alg = '';
	const alg_keys = Object.keys(algs)
	const alg_list = []
	for (let f in algs) {
		for (let a in algs[f]) {
			alg_list.push(algs[f][a].name)
		}
	}
	var active_families = alg_keys
	var active_algs = alg_list
	console.log("args",active_algs)
	var alg_arr = assembleAlgArray()
	const dispatch = createEventDispatcher();
	let seq = []
	console.log(alg_keys)
	console.log(alg_list)
	const reset = () => {
		state = 'idle'
		startTime = 0
		endTime = 0
		solveTime = 0
		currPos = 0
		forceNext = ''
		sliceMove  = undefined
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
	const checkSlice = (m, mode) => {
		if (mode === "prime") {
			if (m === 'L') {
				nextStep = forceNext = "R'"
			} else if (m === "R'") {
				nextStep = forceNext = "L"
			} else {
				return false
			}
			return true
		} else if (mode === "normal") {
			if (m === 'R') {
				nextStep = forceNext = "L'"
			} else if (m === "L'") {
				nextStep = forceNext = "R"
			} else {
				return false
			}
			return true
		} else {
			if (m === 'L') {
				nextStep = forceNext = "R'"
			} else if (m === "R'") {
				nextStep = forceNext = "L"
			} else if (m === 'R') {
				nextStep = forceNext = "L'"
			} else if (m === "L'") {
				nextStep = forceNext = "R"
			} else {
				return false
			}
			return true
		}
	}

	function display_time(){
				if(tstart != -1)
					document.getElementById('time').innerHTML =
						format_time(new Date().getTime() - tstart);
				else
					document.getElementById('time').innerHTML = 0.00;
			}
			
	const switchChildren = (e) => {
		const newState = e.target.checked
		const inputs = document.querySelectorAll(`.algs_${e.target.name} input`)
		for (let i of inputs) {
			i.checked = newState
		}
		reEval()
	}


	export function getRandomAlg() {
		let alg_rnd_key = Math.floor(Math.random() * alg_arr.length)
		if (alg_arr.length < 1) {
			return
		}	else if (!current_alg || alg_arr[alg_rnd_key].name != current_alg.name) {
			current_alg = alg_arr[alg_rnd_key]
			dispatch("newalg", current_alg)
			seq = current_alg.seq.split(' ').map(a=>({state:'', move:a}))
			reset()
		} else if (current_alg && alg_arr.length > 1){
			getRandomAlg()
		}
	}
	
	function assembleAlgArray () {
		let current_algset = []
		for (let i in alg_keys){
			console.log(`curr_key:${i} - ${alg_keys[i]}`)
			if (active_families.indexOf(alg_keys[i])!==-1) {
				console.log(`curr_key:${i} - ${alg_keys[i]} bingo`)
				for (let j in algs[alg_keys[i]]) {
					if (active_algs.indexOf(algs[alg_keys[i]][j].name)!==-1) {
						console.log(`pushing:${j} - `,algs[alg_keys[i]][j])
						current_algset.push({...algs[alg_keys[i]][j], family:alg_keys[i]})
					}
				}
			}
		}
				console.log("current_algset",current_algset)
				alg_arr = current_algset
		return current_algset
	}

	function reEval () {
				// let nodeList = document.querySelectorAll(".families:checked")
				// console.log(`Nodelist`, nodeList)
				// active_families = Array.from(nodeList).map(a=>{
				// 	console.log("a",a.value)
				// 	return a.value
				// })
				// console.log(`active_families`, active_families)
		let nodeList = document.querySelectorAll(".alg:checked")
			active_algs = Array.from(nodeList).map(a=>{
				return a.value
			})
				assembleAlgArray()
	}



	export function handleMove(newMove) {
		console.log("move:", newMove)
		move = newMove
		if ((state === 'success' || state === 'failed') && continuous) {
			reset()
		}
		if ((state === 'success' || state === 'failed') && !continuous) {
			return
		} else if (forceNext !== '' && forceNext !== move) {
			console.log("fail1")
			fail()
			return
		} else if (seq[currPos].move.charAt(0) === 'M' && forceNext === '' ) {
			if (sliceMove) {
				console.log("branch0")
				if (checkSlice(move, "any")) {
					sliceMove = undefined
					proceed()
				} else {
					console.log("fail5")
					fail()
				}
			} else if (seq[currPos].move.length === 1) {
				console.log("branch1a")
				if (checkSlice(move, "normal")) {
					proceed()
				} else {
					console.log("fail2")
					fail()
				}
			} else if (seq[currPos].move.charAt(1) === "'"){
				console.log("branch1b")
				if (checkSlice(move, "prime")) {
					if (seq[currPos].move.length === 3) {
						sliceMove = move
						forceNext = undefined
					}
					proceed()
				} else {
					console.log("fail3")
					fail()
				}
			} else {
				console.log("branch1c")
				if (checkSlice(move, "any")) {
					sliceMove = move
					proceed()
				} else {
					console.log("fail4")
					fail()
				}
			}
		}	else if (move === forceNext || move === seq[currPos].move) {
			forceNext = ''
			if (sliceMove) {
				return
			}
			sliceMove = ''
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
			console.log("fail7")
			fail()
		}
	}
	onMount(()=>{
		
		current_alg = getRandomAlg()
	})
</script>



<form id="families">
	{#each alg_keys as family, i}
		<div class="family family_{family}">
			<div class="family_head" on:click={()=>showHide[family] = !showHide[family]}>
				<input type="checkbox" class="families" name="{family}" value="{family}" checked on:click|stopPropagation={switchChildren}>
				{i + 1}: {family}
				<span class:show={showHide[family]} class="downarrow"></span>
			</div>
			<div class="algs algs_{family} rolldown" class:show={showHide[family]}>
			{#each Object.entries(algs[family]) as [key, alg]}
				<div class="alg_row">
					<input type="checkbox" class="alg" name="{family+"_"+alg.name}" value="{alg.name}" checked on:click={reEval}>{alg.name}
				</div>
			{/each}
			</div>
		</div>
	{/each}
</form>
<div>{current_alg.name}</div>
<button on:click={()=>reveal = !reveal}>{!reveal ? 'reveal' : 'hide'}</button>
<div class:reveal>
<div class="alg">{current_alg.alg}</div>
{#each seq as step}
	<span class="step" class:correct="{step.state === 'correct'}" class:mistake="{step.state === 'mistake'}">{step.move}</span>
{/each}
<div class:success="{state === 'success'}" class:failed="{state === 'failed'}">
	<div>move:{move}</div>
	<div>currpos:{currPos}</div>
	<div>next step:{nextStep}</div>
	<div>Force Next:{forceNext}</div>
	<div>Slice Move:{sliceMove}</div>
	<div>Solve Time:{solveTime}</div>
</div>
<div>State:{state}
<button on:click={reset} >retry</button>
<button on:click={getRandomAlg} >New Alg</button>
<button on:click={()=>continuous=!continuous} style="width: 100px;">{continuous?"Continuous":"Solo"}</button>
</div>
</div>

<style>
.step {
	padding: 3px;
	margin: 3px;
	color: white;
}
.alg {
	color: white;
}
.reveal .step {
	color: black;
}
.reveal .alg {
	color: rgba(0,0,0,.3);
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
.rolldown {
	max-height: 0;
	overflow: hidden;
	transition: all 0.5s ease;
}
.show.rolldown {
	max-height: 250px;
}
.downarrow {
    width: 0px;
    height: 0px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid rgb(149, 171, 193);
    transition: transform 0.6s ease 0s;
    transform: rotate(0deg);
    position: relative;
		top: 10px;
		left: 10px;
}
.downarrow.show {
    transform: rotate(180deg);
}
.family_head {
	background-color:#aaaaaa;
	margin-bottom: 5px;
	text-align: left;
}
.alg_row {
	background-color:#dddddd;
	text-align: left;
	margin-bottom: 5px;
}
input[type=checkbox] {
	margin-right: 5px;
	margin-left: 5px;
}
</style>