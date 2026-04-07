import { useCatStore } from '@/shared/store/catStore'
import { type Cat } from '@/shared/types'
import styles from './CatCard.module.scss'

interface CatCardProps {
	cat: Cat
}

export const CatCard = ({ cat }: CatCardProps) => {
	const { addToFavorites, removeFromFavorites, isFavorite } = useCatStore()
	const favorite = isFavorite(cat.id)

	const handleToggleFavorite = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		if (favorite) {
			removeFromFavorites(cat.id)
		} else {
			addToFavorites(cat)
		}
	}

	return (
		<div className={styles.card}>
			<img src={cat.url} alt='Cat' className={styles.image} />
			<button
				onClick={handleToggleFavorite}
				className={`${styles.favoriteButton} ${favorite ? styles.active : ''}`}
			>
				{favorite ? (
					<img src={'/favorite_full.png'} alt='favorite-full' width={48} height={48} />
				) : (
					<img src={'/favorite.png'} alt='favorite' width={48} height={48} />
				)}
			</button>
		</div>
	)
}
