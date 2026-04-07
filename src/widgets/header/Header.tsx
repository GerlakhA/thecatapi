import { HEADER_DATA } from '@/shared/lib/header-data'
import { useCatStore } from '@/shared/store/catStore'
import styles from './Header.module.scss'

export const Header = () => {
	const { activeTab, setActiveTab } = useCatStore()

	return (
		<header className={styles.header}>
			<nav>
				{HEADER_DATA.map(data => (
					<button
						key={data.id}
						className={activeTab === data.tab ? styles.active : ''}
						onClick={() => setActiveTab(data.tab)}
					>
						{data.name}
					</button>
				))}
			</nav>
		</header>
	)
}
