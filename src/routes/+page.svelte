<script lang="ts">
	import { onMount } from 'svelte';

	let users: any = [];

	async function getUsers() {
		try {
			const response = await fetch('/api/users');
			let data = await response.json();
			users = data.users;
		} catch (error) {
			console.log(error);
		}
	}

	onMount(() => {
		getUsers();
	});
</script>

{#if users !== undefined && users.length > 0}
	<!-- Render frames if frames is defined and not empty -->
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
		{#each users as user}
			<!-- Map frames to display images -->
			<div class="flex flex-col">
				<p>Usuario: <b><i>{user.userName}</i></b></p>
				<p>Nombre: <b><i>{user.name}</i></b></p>
				<p>Correo: <b><i>{user.email}</i></b></p>
			</div>
		{/each}
	</div>
{:else}
	<!-- Render a message if frames is undefined or empty -->
	<p class="text-center text-gray-500 mt-4">No Users available.</p>
{/if}
