<script>
	import { onMount } from 'svelte';
	import {base_algs} from './algs.js'
	import { createEventDispatcher } from 'svelte';
	import SparkMD5 from 'spark-md5'
	import generateScramble from 'scramble-generator';

	let defAlg = {name: 'Unnamed', img: false, alg: 'Alg_missing', seq: 'Sequence_missing', desc: 'No description', video: false}
	let currPos = 0
	let move = ''
	let forceNext = ''
	let nextStep = ''
	let state = 'idle'
	let reveal = true
	let repeat = false
	let repeatFreq = 20
	let startTime = 0
	let currentRecordTime = 'n/a'
	let recordTimes = new Map()
	let timeSlot
	let showHide = []
	let seq = []
	let continuous = true
	let sliceMove = undefined
	let soundMove = new Audio('/sounds/141121__eternitys__interface1.wav')
	const soundFail = new Audio('/sounds/142608__autistic-lucario__error.wav')
	const soundSuccess = new Audio('/sounds/426889__thisusernameis__beep3.wav')
	const soundRecord = new Audio('/sounds/345299-scrampunk-okay.mp3')
	var currentScramble = {}
	let currentScrambleHash

	let errorMsg = ""
	let blah = ""

	let current_alg = ''
	let current_alg_id = ''

	let alg_f_keys = ["custom", "special"] //alg family keys
	let alg_f_grouping = {"custom":[],"special":[]} //for hierarchical representation
	let alg_map = new Map() //new container for the algs
	let alg_list = [] // mutable array for active algs

	const saveSettings = () => {
		const datastore = {
			'name' : 'default',
			'settings' : {
				reveal,
				continuous,
			},
			'algs' : {
				alg_f_grouping,
				alg_f_keys,
				alg_map,
				alg_list
			},
		}
	}

	//populate alg families, hydrate & hash algs from base
	for (let f in base_algs) {
		alg_f_keys.push(f)
		alg_f_grouping[f] = []
		for (let a in base_algs[f]['algs']) {
			let temp_alg = {...defAlg, ...base_algs[f]['algs'][a]}
			let alg_hash = SparkMD5.hash(JSON.stringify(temp_alg))
			alg_map.set(alg_hash,temp_alg)
			// algs[f][alg_hash] = temp_alg
			alg_list.push(alg_hash)
			alg_f_grouping[f].push(alg_hash)
		}
	}


	//debug logs
	const dlog = () => {
		console.log("base algs", base_algs)
		console.log("family keys", alg_f_keys)
		console.log("family grouping", alg_f_grouping)
		console.log("map", alg_map)
		console.log("alg list", alg_list)
	}

	
	let active_families = alg_f_keys

	// dlog()

	assembleAlgArray()
	const dispatch = createEventDispatcher();
	
	//reset current alg
	const reset = () => {
		state = 'idle'
		startTime = 0
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
		if (currentScrambleHash) {
			// alg_map.delete(currentScrambleHash)
			// if (alg_list.includes(currentScrambleHash)) {
			// 	alg_list.splice(alg_list.indexOf(currentScrambleHash,1))
			// }
			// if (alg_f_grouping["custom"].includes(currentScrambleHash)) {
			// 	alg_f_grouping["custom"].splice(alg_f_grouping["custom"].indexOf(currentScrambleHash,1))
			// }
			removeAlg({'id':currentScrambleHash, 'family':'special'})
		}

		currentScramble = generateScramble();
		let temp_alg = {...defAlg, 'name':'Scramble','alg':currentScramble, 'seq':currentScramble}
		// REMOVED FOR UX TESTING let alg_hash = currentScrambleHash = addAlg(temp_alg, 'special')
			// let alg_hash = currentScrambleHash = SparkMD5.hash(JSON.stringify(temp_alg))
			// alg_map.set(alg_hash,temp_alg)
			// // algs[f][alg_hash] = temp_alg
			// alg_list.push(alg_hash)
			// alg_f_grouping["special"].push(alg_hash)
			// assembleAlgArray()
			// alg_f_grouping = alg_f_grouping
			// REMOVED FOR UX TESTING console.log(`added Scramble: ${alg_hash}`)
	
			// dlog()
	}
	//handle fails
	const fail = () => {
		state = "failed"
		soundFail.play()
		console.log("rail", repeat)
		clearInterval(repeat)
		repeat = false
		seq[currPos].state = 'mistake'
	}
	//handle correct moves
	const proceed = () => {
		if (state === 'idle') {
			state = 'in progress'
		}
	}
	//handle slice moves like M, M'', S etc.
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
	//start counter
	const startTimer = () => {
		if (!repeat) {
			startTime = new Date().getTime()
			timeSlot.innerHTML = "0.00"
			displayTime()
			repeat = setInterval(displayTime, repeatFreq)
		}
	}
	// display time
	function timeTimer() {
		
	}
	function displayTime() {
		console.log("dtime", repeat)
		timeSlot.innerHTML =
			formatTime(new Date().getTime() - startTime);
	}
	//format time
	function formatTime(millis){
		var hrs = (millis - millis % 3600000 ) / 3600000;
		var min = ((millis - millis % 60000 ) / 60000) % 60;
		var sec = ((millis - millis % 1000 ) * 0.001) % 60;
		var hnd = ((millis - millis % 10 ) * 0.1) % 100;
		return	   (hrs > 0 ? hrs + (min < 10 ? ":0" : ":") : "" ) +
		(min > 0 || hrs > 0 ? min + (sec < 10 ? ":0" : ":") : "" ) +
			sec + "." + (hnd < 10 ? "0" : "") + hnd;
	}			
	//select / deselect all children algs in a family
	const switchChildren = (e) => {
		const newState = e.target.checked
		const inputs = document.querySelectorAll(`.algs_${e.target.name} input`)
		for (let i of inputs) {
			i.checked = newState
		}
		reEval()
	}
	//close all family divs 
	const hideAllFamilies = () => {
		for (let f in showHide) {
			showHide[f] = false
		}
	}
	//create move sequence for alg
	const createSequence = () => current_alg.seq.split(' ').map(a=>({state:'', move:a}))
	//select a specific alg for practice directly
	const selectAlg = (e) => {
		current_alg_id = e.target.dataset.id
		current_alg = alg_map.get(current_alg_id)
		dispatch("newalg", current_alg)
		seq = createSequence()
		currentRecordTime = recordTimes.get(current_alg_id) || 'n/a'
		hideAllFamilies()
		reset()
	}
	const addUserAlg = () => {
		console.log(document.getElementById("alg_def").value)
		try {
			let alg_def = JSON.parse(document.getElementById("alg_def").value)
			console.log("alg_def",alg_def)
			addAlg(alg_def)
		}
		catch(error) {
			errorMsg= error
		}
	}
	const addAlg = (alg_def, family = 'custom') => {
		console.log("adding!!!!")
		let temp_alg = {...defAlg, ...alg_def}
		let alg_hash = SparkMD5.hash(JSON.stringify(temp_alg))
		alg_map.set(alg_hash,temp_alg)
		// algs[f][alg_hash] = temp_alg
		alg_list.push(alg_hash)
		alg_f_grouping[family].push(alg_hash)
		assembleAlgArray()
		alg_f_grouping = alg_f_grouping
		return alg_hash
	}	
	//remove an alg from the list - under construction
	const removeAlgRow = (e) => {
		const {id, family} = e.target.dataset
		removeAlg({id, family})
	}
	const removeAlg = (alg) => {
		console.log("del", alg)
		alg_map.delete(alg.id)
		for( let i = 0; i < alg_f_grouping[alg.family].length; i++) {
			if ( alg_f_grouping[alg.family][i] === alg.id) {
				alg_f_grouping[alg.family].splice(i, 1); i--
			}
		}
		alg_f_grouping = alg_f_grouping
		assembleAlgArray()
		// dlog()
	}

	//select a random alg from the active list
	export function getRandomAlg() {
		if (alg_list.length < 1) {
			return
		}
		let alg_rnd_key = Math.floor(Math.random() * alg_list.length)
		if (!current_alg || alg_list[alg_rnd_key].name != current_alg.name) {
			current_alg = alg_list[alg_rnd_key]
			dispatch("newalg", current_alg)
			seq = createSequence()
			reset()
		} else if (current_alg && alg_list.length > 1){
			getRandomAlg()
		}
	}
	//assemble the alg array based on active families
	function assembleAlgArray () {
		let current_algset = []
		for (let i in alg_f_keys){
			// console.log(`curr_key:${i} - ${alg_f_keys[i]}`)
			if (active_families.indexOf(alg_f_keys[i])!==-1) {
				// console.log(`curr_key:${i} - ${alg_f_keys[i]} bingo`)
				for (let j in alg_f_grouping[alg_f_keys[i]]) {
					let curr_id = alg_f_grouping[alg_f_keys[i]][j]
					if (alg_map.has(curr_id)) {
						// console.log(`pushing:${curr_id} - `,alg_map.get(curr_id))
						current_algset.push({...defAlg, ...alg_map.get(curr_id), family:alg_f_keys[i], id:j})
					}
				}
			}
		}
		// console.log("current_algset",current_algset)
		alg_list = current_algset
		dlog()
		return current_algset
	}

	//refresh list of active algs
	function reEval () {
				assembleAlgArray()
	}


	//handle all move events
	export function handleMove(newMove) {
		newMove = trans_alg(trans_alg(newMove, XTR), XTR)
		console.log("move:", newMove)
		move = newMove.trim()
		soundMove = new Audio('/sounds/141121__eternitys__interface1.wav')
		// soundMove.play()
		if ((state === 'success' || state === 'failed') && continuous) {
			reset()
		}
		startTimer()
		if ((state === 'success' || state === 'failed') && !continuous) {
			return
		} else if (forceNext !== '' && forceNext !== move) {
			// console.log("fail1")
			fail()
			return
		} else if (seq[currPos].move.charAt(0) === 'M' && forceNext === '' ) {
			if (sliceMove) {
				// console.log("branch0")
				if (checkSlice(move, "any")) {
					sliceMove = undefined
					proceed()
				} else {
					// console.log("fail5")
					fail()
				}
			} else if (seq[currPos].move.length === 1) {
				// console.log("branch1a")
				if (checkSlice(move, "normal")) {
					proceed()
				} else {
					// console.log("fail2")
					fail()
				}
			} else if (seq[currPos].move.charAt(1) === "'"){
				// console.log("branch1b")
				if (checkSlice(move, "prime")) {
					if (seq[currPos].move.length === 3) {
						sliceMove = move
						forceNext = undefined
					}
					proceed()
				} else {
					// console.log("fail3")
					fail()
				}
			} else {
				// console.log("branch1c")
				if (checkSlice(move, "any")) {
					sliceMove = move
					proceed()
				} else {
					// console.log("fail4")
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
				if ( currentRecordTime === 'n/a' || parseFloat(timeSlot.innerHTML) < parseFloat(currentRecordTime)) {
					soundRecord.play()
					currentRecordTime = timeSlot.innerHTML
					recordTimes.set(current_alg_id, currentRecordTime)
				} else {
					soundSuccess.play()
				}
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
			// console.log("fail7")
			fail()
		}
	}

	//last tuches after document has loaded
	onMount(()=>{
		
		current_alg = getRandomAlg()
		// console.log("alg_map",alg_map)
		timeSlot = document.getElementById('time')
		blah = JSON.stringify(
			{name: 'Your Alg',  alg: "F D F U'", seq: "F D F U'"}
		)

	})
</script>



<form id="families">

	{#each alg_f_keys as family, i}
		{#if alg_f_grouping[family].length > 0}
		<div class="family family_{family}">
			<div class="family_head" on:click={()=>showHide[family] = !showHide[family]}>
				<input type="checkbox" class="families" name="{family}" value="{family}" checked on:click|stopPropagation={switchChildren}>
				{i + 1}: {family}
				<div class="icons"><i class="fas {showHide[family] ? "fa-sort-up":"fa-sort-down"}"></i></div>
			</div>
			<div class="algs algs_{family} rolldown" class:show={showHide[family]}>
			{#each alg_f_grouping[family] as key}
				<label><div class="alg_row">
					<input type="checkbox" class="alg" name="{family+"_"+alg_map.get(key).name}" value="{alg_map.get(key).name}" checked on:click={reEval}>{alg_map.get(key).name}
					<div class="icons">
						<!-- <i class="far fa-minus-square" data-family="{family}" data-id="{key}" on:click|preventDefault|stopPropagation={removeAlgRow}></i> -->
						<i class="fas fa-angle-double-down" data-family="{family}" data-id="{key}" on:click|preventDefault|stopPropagation={selectAlg}></i>
					</div>
				</div></label>
			{/each}
			</div>
		</div>
	{/if}
	{/each}
</form>
<div class="alg_name" style="position: relative;">Current Alg: <strong>{current_alg.name}</strong>
	{#if current_alg.video}
		<a href={current_alg.video} target="_blank" class="play_video"><i class="fab fa-youtube" alt="video"></i></a>
	{/if}
</div>
<div style="clear:both;">
	<button on:click={()=>reveal = !reveal}>{!reveal ? 'Reveal' : 'Hide'} moves</button>
	<div class:reveal>
		<!-- <div class="alg">{current_alg.alg}</div> -->
		{#each seq as step}
			<span class="step" class:correct="{step.state === 'correct'}" class:mistake="{step.state === 'mistake'}">{step.move}</span>
		{/each}
	</div>
</div>
<div style="float: right; width: 25%;">
	{#if current_alg.alg}
		<img src={`http://cube.rider.biz/visualcube.php?fmt=svg&size=150&pzl=3&bg=w&cc=n&case=${current_alg.alg}&nocache`} alt="cube to solve">
		<br>
		<img src={`http://cube.rider.biz/visualcube.php?fmt=svg&size=150&pzl=3&bg=w&cc=n&view=plan&case=${current_alg.alg}&nocache`} alt="cube to solve">
	{/if}
</div>
<div style="float: left; width: 75%;">
	<div class:success="{state === 'success'}" class:failed="{state === 'failed'}">
		<div>Last move:{move}</div>
		<div>Moves:{currPos}</div>
		<!-- <div>next step:{nextStep}</div> -->
		<!-- <div>Force Next:{forceNext}</div> -->
		<!-- <div>Slice Move:{sliceMove}</div> -->
		<div>Solve Time: <span id="time"></span></div>
		<div>Record Time: <span id="recordtime">{currentRecordTime}</span></div>
	</div>
	<div>
		<!-- State:{state} -->
		<button on:click={reset} >Reset Alg</button>
		<div></div>
		<button on:click={getRandomAlg} >New Random Alg</button><br>
		<br />
		<button on:click={()=>continuous=!continuous} style="width: 200px;">Mode:{continuous?"Continuous":"Solo"}</button>
		<div>
			<br />
			<textarea type="text" value={blah} id="alg_def" cols="40" rows="3"></textarea>
			<br />
			<button on:click={addUserAlg}>Add alg</button>
			<br />
			{#if errorMsg}
			Error: {errorMsg}
			{/if}
			<br />
			Insert your alg here based on the above JSON schema. Use standard cube notation.
		</div>
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
	line-height: 29px;
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