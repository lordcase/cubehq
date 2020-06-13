<script>
	import { onMount } from 'svelte';
	import {algs} from './algs.js'
	import { createEventDispatcher } from 'svelte';
	import SparkMD5 from 'spark-md5'

	let defALg = {name: 'Unnamed', img: false, alg: 'Alg missing', desc: 'No description', video: false}
	let currPos = 0
	var move = ''
	let forceNext = ''
	let nextStep = ''
	let state = 'idle'
	let reveal = false
	let repeat = false
	let repeatFreq = 20
	let startTime = 0
	let timeSlot
	let endTime = 0
	let solveTime = 0
	let showHide = []
	let continuous = true
	let sliceMove = undefined

	$: current_alg = '';
	const alg_f_keys = Object.keys(algs)
	const alg_list = []
	for (let f in algs) {
		for (let a in algs[f]) {
			alg_list.push(algs[f][a].name)
		}
	}
	var active_families = alg_f_keys
	var active_algs = alg_list
	console.log("args",active_algs)
	var alg_arr = assembleAlgArray()
	const dispatch = createEventDispatcher();
	let seq = []
	console.log(alg_f_keys)
	console.log(alg_list)
	const reset = () => {
		state = 'idle'
		startTime = 0
		endTime = 0
		solveTime = 0
		if (repeat) {
			console.log("reset repeat")
			clearInterval(repeat)
		}
		repeat = false
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
		console.log("rail", repeat)
		clearInterval(repeat)
		repeat = false
		seq[currPos].state = 'mistake'
	}
	const proceed = () => {
		if (state === 'idle') {
			state = 'in progress'
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
	const startTimer = () => {
		if (!repeat) {
			startTime = new Date().getTime()
			timeSlot.innerHTML = "0.00"
			displayTime()
			repeat = setInterval(displayTime, repeatFreq)
		}

	}
	function displayTime(){
		console.log("dtime", repeat)
		timeSlot.innerHTML =
			formatTime(new Date().getTime() - startTime);
	}
	function formatTime(millis){
		var hrs = (millis - millis % 3600000 ) / 3600000;
		var min = ((millis - millis % 60000 ) / 60000) % 60;
		var sec = ((millis - millis % 1000 ) * 0.001) % 60;
		var hnd = ((millis - millis % 10 ) * 0.1) % 100;
		return	   (hrs > 0 ? hrs + (min < 10 ? ":0" : ":") : "" ) +
		(min > 0 || hrs > 0 ? min + (sec < 10 ? ":0" : ":") : "" ) +
			sec + "." + (hnd < 10 ? "0" : "") + hnd;
	}			

	const switchChildren = (e) => {
		const newState = e.target.checked
		const inputs = document.querySelectorAll(`.algs_${e.target.name} input`)
		for (let i of inputs) {
			i.checked = newState
		}
		reEval()
	}
	const hideAllFamilies = () => {
		for (let f in showHide) {
			showHide[f] = false
		}
	}
	const selectAlg = (e) => {
		current_alg = algs[e.target.dataset.family][e.target.dataset.alg]
		dispatch("newalg", current_alg)
		seq = current_alg.seq.split(' ').map(a=>({state:'', move:a}))
		hideAllFamilies()
		reset()
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
		for (let i in alg_f_keys){
			console.log(`curr_key:${i} - ${alg_f_keys[i]}`)
			if (active_families.indexOf(alg_f_keys[i])!==-1) {
				console.log(`curr_key:${i} - ${alg_f_keys[i]} bingo`)
				for (let j in algs[alg_f_keys[i]]) {
					if (active_algs.indexOf(algs[alg_f_keys[i]][j].name)!==-1) {
						console.log(`pushing:${j} - `,algs[alg_f_keys[i]][j])
						current_algset.push({...defALg, ...algs[alg_f_keys[i]][j], family:alg_f_keys[i], id:j})
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
		startTimer()
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
				clearInterval(repeat)
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
		console.log("begorrah")
		console.log(alg_arr)
		timeSlot = document.getElementById('time')
	})
</script>



<form id="families">
	{#each alg_f_keys as family, i}
		<div class="family family_{family}">
			<div class="family_head" on:click={()=>showHide[family] = !showHide[family]}>
				<input type="checkbox" class="families" name="{family}" value="{family}" checked on:click|stopPropagation={switchChildren}>
				{i + 1}: {family}
				<div class="icons"><i class="fas {showHide[family] ? "fa-sort-up":"fa-sort-down"}"></i></div>
			</div>
			<div class="algs algs_{family} rolldown" class:show={showHide[family]}>
			{#each Object.entries(algs[family]) as [key, alg]}
				<label><div class="alg_row">
					<input type="checkbox" class="alg" name="{family+"_"+alg.name}" value="{alg.name}" checked on:click={reEval}>{alg.name}
					<div class="icons"><i class="fas fa-angle-double-down" data-family="{family}" data-alg="{key}" on:click|preventDefault|stopPropagation={selectAlg}></i></div>
				</div></label>
			{/each}
			</div>
		</div>
	{/each}
</form>
<div class="alg_name" style="position: relative;">Name of Alg: <strong>{current_alg.name}</strong>
	{#if current_alg.video}
		<a href={current_alg.video} target="_blank" class="play_video"><i class="fab fa-youtube" alt="video"></i></a>
	{/if}
</div>
<div style="clear:both;">
	<button on:click={()=>reveal = !reveal}>{!reveal ? 'Reveal' : 'Hide'} steps</button>
	<div class:reveal>
		<div class="alg">{current_alg.alg}</div>
		{#each seq as step}
			<span class="step" class:correct="{step.state === 'correct'}" class:mistake="{step.state === 'mistake'}">{step.move}</span>
		{/each}
	</div>
</div>
<div style="float: right; width: 25%;">
	{#if current_alg.alg}
	<img src={`http://cube.rider.biz/visualcube.php?fmt=svg&size=150&pzl=3&bg=w&cc=n&view=plan&alg=${current_alg.alg}&nocache`} alt="cube to solve">
	{/if}
</div>
<div style="float: left; width: 75%;">
	<div class:success="{state === 'success'}" class:failed="{state === 'failed'}">
		<div>Last move:{move}</div>
		<div>Steps:{currPos}</div>
		<!-- <div>next step:{nextStep}</div> -->
		<!-- <div>Force Next:{forceNext}</div> -->
		<!-- <div>Slice Move:{sliceMove}</div> -->
		<div>Solve Time: <span id="time"></span></div>
	</div>
	<div>
		<!-- State:{state} -->
		<button on:click={reset} >Reset Alg</button>
		<button on:click={getRandomAlg} >New Alg</button><br>
		<button on:click={()=>continuous=!continuous} style="width: 200px;">Mode:{continuous?"Continuous":"Solo"}</button>
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
.alg_name {
	margin: 7px;
	background: rgba(0,132,132,.5);
	color: white;
}
.alg_name strong {
	font-size: 1.2rem;
	background: white;
	margin: 3px 6px 2px 6px;
	font-weight: 300;
	padding: 0 3px;
}
.alg_name a {
	color:white;
}
.play_video {
	position: absolute;
	right: 10px;
	top: 1px;
	font-size:26px;
	line-height:26px;
}
.play_video:hover {
	color: red;
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
	background-color: rgba(255,0,0,.8);
	color: white;
}
.success {
	background-color: green;
	color: white;
}
.failed {
	background-color: rgba(255,0,0,.8);
	color: white;
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
.icons {
	display: inline-block;
	float:right;
	padding-right: 10px;
}
.fas {
	padding-left: 5px;
	padding-right: 5px;

}
.alg_row .fas:hover {
	background: rgba(255,140,140,.3);
}
input[type=checkbox] {
	margin-right: 5px;
	margin-left: 5px;
}
</style>