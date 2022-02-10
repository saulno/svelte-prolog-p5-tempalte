<script>
	import {consultFrame} from './prolog';
	import Graph from './Graph.svelte';

	let numPoints = 150;
	let size = 600;
	let realModel = [[0,0], [0,0], [0,0], [0,0]];
	let points = [];
	let learntModel = [[0,0], [0,0], [0,0], [0,0]];
	let error = 0;
	let showReal = true;
	let showLearnt = true;

	const learnModel = () => {
		consultFrame(numPoints, size, (r, p, m, e) => {
			realModel = r;
			points = p;
			learntModel = m;
			error = e;
		});
	}

	$: graphProps = {
		size, realModel, points, learntModel, showReal, showLearnt,
	}
</script>

<main>
	<h1>Rectangular Frame</h1>
	<label>
		Ammount of points:
		<input type="number" bind:value={numPoints}>
		<input on:click={learnModel} type="button" value="Learn Model!">
	</label>

	<h3> <span class="blue">Real Model:</span> ({realModel[0]}), ({realModel[1]}), ({realModel[2]}), ({realModel[3]})</h3>
	<h3> <span class="red">Learnt Model:</span> ({learntModel[0]}), ({learntModel[1]}), ({learntModel[2]}), ({learntModel[3]})</h3>
	<h4>Error: {error}%</h4>

	<label>
		<input type=checkbox bind:checked={showReal}>
		Show <span class="blue">real</span> model
		<input type=checkbox bind:checked={showLearnt}>
		Show <span class="red">learnt</span> model

	</label>
	
	<Graph {...graphProps} />
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
		font-size: 3em;
		font-weight: 100;
	}

	.blue {
		color: #1ec8b4;
	}	

	.red {
		color: #c81e64;
	}	

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>