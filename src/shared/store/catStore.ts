import { type CatStore } from '@/shared/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { fetchCatsPaginated } from '@/shared/api/catApi'

const CATS_PER_PAGE = 12

export const useCatStore = create<CatStore>()(
	persist(
		(set, get) => ({
			cats: [],
			favorites: [],
			activeTab: 'all',
			page: 1,
			hasMore: true,
			loadingMore: false,
			setActiveTab: tab => set({ activeTab: tab }),
			setCats: cats => set({ cats, page: 1, hasMore: true }),
			appendCats: newCats =>
				set(state => ({
					cats: [...state.cats, ...newCats],
					page: state.page + 1,
					hasMore: newCats.length > 0
				})),
			resetCats: () => set({ cats: [], page: 1, hasMore: true }),
			addToFavorites: cat =>
				set(state => {
					const exists = state.favorites.find(f => f.id === cat.id)
					if (exists) return state
					return { favorites: [...state.favorites, cat] }
				}),
			removeFromFavorites: catId =>
				set(state => ({
					favorites: state.favorites.filter(f => f.id !== catId)
				})),
			isFavorite: catId => {
				return get().favorites.some(f => f.id === catId)
			},
			fetchMore: async () => {
				const { page, loadingMore, hasMore } = get()
				if (loadingMore || !hasMore) return

				set({ loadingMore: true })

				try {
					const result = await fetchCatsPaginated(CATS_PER_PAGE, page)
					set(state => ({
						cats: [...state.cats, ...result],
						page: state.page + 1,
						hasMore: result.length > 0,
						loadingMore: false
					}))
				} catch (error) {
					console.error('Error fetching more cats:', error)
					set({ loadingMore: false })
				}
			}
		}),
		{
			name: 'cat-favorites-storage',
			partialize: state => ({ favorites: state.favorites })
		}
	)
)
