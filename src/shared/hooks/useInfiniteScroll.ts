import { useCallback, useEffect, useRef } from 'react'

interface UseInfiniteScrollOptions {
	onLoadMore: () => void
	hasMore: boolean
	isLoading: boolean
}

interface UseInfiniteScrollReturn {
	observerRef: (node: HTMLDivElement | null) => void
	loadingRef: React.RefObject<HTMLDivElement | null>
}

export function useInfiniteScroll({
	onLoadMore,
	hasMore,
	isLoading
}: UseInfiniteScrollOptions): UseInfiniteScrollReturn {
	const observer = useRef<IntersectionObserver | null>(null)
	const loadingRef = useRef<HTMLDivElement | null>(null)
	const onLoadMoreRef = useRef(onLoadMore)

	useEffect(() => {
		onLoadMoreRef.current = onLoadMore
	}, [onLoadMore])

	useEffect(() => {
		const currentObserver = observer.current
		if (currentObserver) currentObserver.disconnect()

		if (isLoading) return

		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && hasMore) {
				onLoadMoreRef.current()
			}
		})

		if (loadingRef.current) {
			observer.current.observe(loadingRef.current)
		}

		return () => {
			if (observer.current) observer.current.disconnect()
		}
	}, [isLoading, hasMore])

	const observerRef = useCallback((node: HTMLDivElement | null) => {
		loadingRef.current = node
	}, [])

	return { observerRef, loadingRef }
}
