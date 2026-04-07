import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Layout } from '@/widgets/layout/Layout'
import './index.scss'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Layout />
	</StrictMode>
)
