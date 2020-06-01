<script>
	
	import {Giiker} from './giiker.js';
import { onMount } from 'svelte';
	
		onMount(()=>{
		const button = document.querySelector('#connectButton');
		const textarea = document.querySelector('textarea');
		
		button.addEventListener('click', async () => {
		  button.classList.add('is-loading');
		  button.disabled = true;
		
		  const connect = async () => {
		    const giiker = new Giiker();
		    await giiker.connect();
		    return giiker;
		  };
			let retry = setTimeout(() => {
				
			}, )
		  const giiker = await connect();
		  button.classList.remove('is-loading');
		  button.textContent = 'Connected!';
		
		  giiker.on('move', (move) => {
		    textarea.value += ` ${move.notation}`;
		  });
		
		  // Expose giiker object for testing on console
		  window.giiker = giiker;
		});
}) 


</script>


	<button class="button is-primary is-large is-rounded" id="connectButton">Connect!</button>
	<textarea class="textarea is-primary" type="text" placeholder="Primary textarea"></textarea>
