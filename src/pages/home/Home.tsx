import { CatCard } from '@/entities/cat/CatCard'
import { fetchCats } from '@/shared/api/catApi'
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll'
import { useCatStore } from '@/shared/store/catStore'
import { useEffect, useState } from 'react'
import styles from './Home.module.scss'

function Home() {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const { cats, setCats, fetchMore, loadingMore, hasMore } = useCatStore()
	const { observerRef: lastCatElementRef } = useInfiniteScroll({
		onLoadMore: fetchMore,
		hasMore,
		isLoading: loading || loadingMore
	})

	useEffect(() => {
		const loadCats = async () => {
			try {
				const result = await fetchCats(12)
				setCats(result)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Unknown error')
			} finally {
				setLoading(false)
			}
		}

		loadCats()
	}, [])

	if (loading) {
		return (
			<div className={styles.home}>
				<div className={styles.loader}>Загрузка...</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className={styles.home}>
				<div className={styles.error}>Ошибка: {error}</div>
			</div>
		)
	}

	return (
		<main className={styles.home}>
			<div className={styles.grid}>
				{cats.map((cat, index) => {
					if (index === cats.length - 1) {
						return (
							<div ref={lastCatElementRef} key={cat.id}>
								<CatCard cat={cat} />
							</div>
						)
					}
					return <CatCard key={cat.id} cat={cat} />
				})}
			</div>
			{loadingMore && <div className={styles.loadingMore}>... загружаем еще котиков ...</div>}
		</main>
	)
}

export default Home
