<script lang="ts">
	import { page } from '$app/stores'; // Import the page store from SvelteKit
	import { onMount } from 'svelte'; // Optional: If you want to run some code when the component mounts

	// Use the `$page` store to get the data returned by the load function
	const { user } = $page.data.user;

	// Optional: If you need to perform any action on mount
	onMount(() => {
		console.log('Component has mounted', user);
	});
</script>

<!-- Now you can use the `user` data in your component -->
<main>
	<h1>Detalles del Invitado</h1>
	{#if user}
		<p><strong>Usuario:</strong> {user.userName}</p>
		<p><strong>Nombre:</strong> {user.name}</p>
		<p><strong>Email:</strong> {user.email}</p>
		<p><strong>Teléfono:</strong> {user.phoneNumber}</p>
		<p><strong>Genero:</strong> {user.gender}</p>
		<p><strong>Edad:</strong> {user.age}</p>
	{/if}
</main>

<style>
	/* Add your styles here */
</style>
