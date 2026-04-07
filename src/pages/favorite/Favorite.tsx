import { CatCard } from '@/entities/cat/CatCard'
import { useCatStore } from '@/shared/store/catStore'
import styles from './Favorite.module.scss'

export const Favorite = () => {
	const { favorites } = useCatStore()

	return (
		<main className={styles.favorite}>
			{favorites.length === 0 ? (
				<div className={styles.empty}>
					<p>У вас пока нет избранных котиков</p>
					<p className={styles.hint}>Добавьте котика в избранное, нажав на карточку</p>
				</div>
			) : (
				<div className={styles.grid}>
					{favorites.map(cat => (
						<CatCard key={cat.id} cat={cat} />
					))}
				</div>
			)}
		</main>
	)
}
