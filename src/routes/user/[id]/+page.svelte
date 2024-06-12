<script lang="ts">
	import { page } from '$app/stores'; // Import the page store from SvelteKit
	import { onMount } from 'svelte'; // Optional: If you want to run some code when the component mounts

	// Use the `$page` store to get the data returned by the load function
	const { user } = $page.data.user;

	const userId = user.id;

	let qrCode: string;
	let qrCodeLoading: string =
		'https://firebasestorage.googleapis.com/v0/b/cartas-a-bris.appspot.com/o/qr%2Fqr-loading.gif?alt=media&token=9de90db0-b6f6-4f4d-8970-b8e7f24afcf7';

	// Construct the base URL based on page url origin
	const baseUrl: string = $page.url.origin;

	const QR_API_URL: string = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=';

	async function getQRCode() {
		try {
			const response = await fetch(`${QR_API_URL}${baseUrl}/user/${userId}`);
			qrCode = response.url;
		} catch (error) {
			console.log(error);
		}
	}

	// Optional: If you need to perform any action on mount
	onMount(() => {
		console.log('Component has mounted', user);
		console.log('base url', $page.url.origin);
		setTimeout(() => {
			getQRCode();
		}, 2500); // 2500 milliseconds (2.5 seconds) delay
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
	<br />
	{#if qrCode}
		<div class="qr-container">
			<img src={qrCode} width="150" height="150" alt="QR code" />
		</div>
	{:else}
		<img src={qrCodeLoading} width="150" height="150" alt="QR code" />
	{/if}
</main>

<style>
	.qr-container {
		background-color: white;
		padding: 20px;
		width: 150px;
		height: 150px;
	}
</style>
