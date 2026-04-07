import type { Cat } from '../types'

const BASE_URL = 'https://api.thecatapi.com/v1'

function getHeaders(): Headers {
	return new Headers({
		'Content-Type': 'application/json',
		'x-api-key': import.meta.env.THE_CAT_API_KEY
	})
}

function getOptions(): RequestInit {
	return {
		method: 'GET',
		headers: getHeaders(),
		redirect: 'follow' as RequestInit['redirect']
	}
}

export async function fetchCats(limit: number = 12): Promise<Cat[]> {
	const response = await fetch(`${BASE_URL}/images/search?limit=${limit}`, getOptions())

	if (!response.ok) {
		throw new Error('Failed to fetch cats')
	}

	return response.json()
}

export async function fetchCatsPaginated(limit: number, page: number): Promise<Cat[]> {
	const response = await fetch(
		`${BASE_URL}/images/search?limit=${limit}&page=${page}`,
		getOptions()
	)

	if (!response.ok) {
		throw new Error('Failed to fetch cats')
	}

	return response.json()
}
