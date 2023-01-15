<script lang="ts">
	import Robot, { type Direction } from "$lib/Robot";
	import Cell, { RedCell, YellowCell, GrayCell } from "$lib/Cell";
	import { onMount } from "svelte";

	var gridSize = 5;
	var robot: Robot | null = null;
	var grid: Cell[][] = [];
	var started = false;
	var steps = 0;

	onMount(() => {
		for (let i = 0; i < gridSize; i++) {
			grid[i] = [];
			for (let j = 0; j < gridSize; j++) {
				const random = Math.random();
				if (random < 0.33) {
					grid[i][j] = new RedCell();
				} else if (random < 0.66) {
					grid[i][j] = new YellowCell();
				} else {
					grid[i][j] = new GrayCell();
				}
			}
		}
	});

	async function start() {
		steps = 0;
		started = true;
		await robot?.start(grid, (updatedSteps) => {
			steps = updatedSteps;
		});
		alert(`Vége! Lépések: ${steps}`);
		started = false;
	}

	function placeRobot(x: number, y: number, direction: Direction) {
		robot = new Robot(
			x,
			y,
			direction,
			'background-image: url("/karesz.png"); image-rendering: pixelated;'
		);
		start();
	}
</script>

<template>
	<div class="container w-1/2 m-auto flex flex-col gap-4 p-8">
		<h1 class="text-center text-2xl font-bold font-mono uppercase">Cody Color</h1>
		<div
			class="grid gap-1 aspect-square place-items-center w-full"
			style="grid-template-columns: repeat({gridSize +
				2}, 1fr); grid-template-rows: repeat({gridSize + 2}, 1fr);"
		>
			{#each new Array(gridSize + 2).fill(null) as _, i}
				{#if i != 0 && i != gridSize + 1 && !started}
					<button class="start-spot top" on:click={() => placeRobot(i - 1, 0, "south")} />
				{:else}
					<div />
				{/if}
			{/each}

			{#each grid as row, i}
				{#each row as cell, j}
					{#if j == 0}
						{#if !started}
							<button class="start-spot left" on:click={() => placeRobot(0, i, "east")} />
						{:else}
							<div />
						{/if}
					{/if}

					{#key steps}
						<div class="cell" style={cell.css}>
							{#if robot?.x == j && robot?.y == i}
								<div class="robot" style={robot.css} />
							{/if}
						</div>
					{/key}

					{#if j == gridSize - 1}
						{#if !started}
							<button
								class="start-spot right"
								on:click={() => placeRobot(grid[0].length - 1, i, "west")}
							/>
						{:else}
							<div />
						{/if}
					{/if}
				{/each}
			{/each}

			{#each new Array(gridSize + 2).fill(null) as _, i}
				{#if i != 0 && i != gridSize + 1 && !started}
					<button
						class="start-spot bottom"
						on:click={() => placeRobot(i - 1, grid.length - 1, "north")}
					/>
				{:else}
					<div />
				{/if}
			{/each}
		</div>
	</div>
</template>

<style lang="postcss">
	:global(html) {
		@apply bg-zinc-900 text-gray-200;
	}

	.cell {
		@apply w-full h-full rounded-md flex justify-center items-center;
	}

	.robot {
		@apply aspect-square w-3/4 bg-no-repeat bg-center bg-cover;
	}

	.start-spot {
		@apply aspect-square w-3/4 bg-no-repeat bg-center bg-cover;
		background-image: url("/start.png");

		&.bottom {
			rotate: 180deg;
		}

		&.left {
			rotate: -90deg;
		}

		&.right {
			rotate: 90deg;
		}

		&.top {
			rotate: 0deg;
		}
	}
</style>
