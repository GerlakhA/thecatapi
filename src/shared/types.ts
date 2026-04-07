export type Tab = 'all' | 'favorite'

export interface HeaderData {
	id: number
	name: string
	tab: Tab
}

export interface Cat {
	id: string | number
	url: string
}

export interface CatStore {
	cats: Cat[]
	favorites: Cat[]
	activeTab: Tab
	page: number
	hasMore: boolean
	loadingMore: boolean
	setCats: (cats: Cat[]) => void
	appendCats: (cats: Cat[]) => void
	resetCats: () => void
	setActiveTab: (tab: Tab) => void
	addToFavorites: (cat: Cat) => void
	removeFromFavorites: (catId: string | number) => void
	isFavorite: (catId: string | number) => boolean
	fetchMore: () => Promise<void>
}
