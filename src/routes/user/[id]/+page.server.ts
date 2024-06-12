// src/routes/users/[id]/+page.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const { id } = params;

	try {
		const response = await fetch(`/api/users/${id}`);
		if (!response.ok) {
			throw new Error(`Failed to fetch user with id ${id}`);
		}

		const user = await response.json();
		return { user };
	} catch (error) {
		console.error('Error loading user:', error);
		throw new Error(`Error loading user: ${error}`);
	}
};
