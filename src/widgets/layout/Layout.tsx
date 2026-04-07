import { Favorite } from '@/pages/favorite/Favorite'
import Home from '@/pages/home/Home'
import { useCatStore } from '@/shared/store/catStore'
import { Header } from '../header'
import './Layout.scss'

export const Layout = () => {
	const { activeTab } = useCatStore()

	return (
		<div className='layout'>
			<Header />
			<main className='layout-content'>{activeTab === 'all' ? <Home /> : <Favorite />}</main>
		</div>
	)
}
