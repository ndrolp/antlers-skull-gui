import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import React, { useMemo } from 'react'

type PaginatorProps = {
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    pageSize: number
    maxSize: number
}

type PaginatorAction = 'next' | 'previous' | 'fixed'

export default function Paginator({
    page,
    setPage,
    pageSize,
    maxSize,
}: PaginatorProps) {
    const maxPage = useMemo(
        () => Math.ceil(maxSize / pageSize),
        [maxSize, pageSize],
    )

    const move = (action: PaginatorAction, position?: number) => {
        switch (action) {
            case 'next':
                if (maxPage < page + 1) return
                setPage(page + 1)
                break

            case 'previous':
                if (page - 1 === 0) return
                setPage(page - 1)
                break

            case 'fixed':
                if (!position) return
                if (position === 0 || position > maxPage) return
                setPage(position)
                break
        }
    }

    const allowedPages = useMemo(() => {
        const maxShownPages = maxPage > 5 ? 5 : maxPage
        const PAGES_TO_SHOW = 5
        const baseArray = [
            ...Array(
                maxShownPages < PAGES_TO_SHOW ? maxShownPages : PAGES_TO_SHOW,
            ).keys(),
        ].map(index => index + 1)
        if (page === 1) return baseArray
        if (page === 2) return baseArray
        // if (page < maxShownPages && maxShownPages <= 5) return baseArray
        if (page > 2) {
            const startPos = page + 1 >= maxPage ? page - 3 : page - 2
            const pages = [startPos]
            while (
                (pages[pages.length - 1] ?? 0) < maxPage &&
                pages.length < PAGES_TO_SHOW
            ) {
                pages.push((pages.length ? pages[pages.length - 1] : 0) + 1)
            }
            return pages
        }
        return baseArray
    }, [maxPage, page])

    return (
        <Pagination className={`mt-2 ${maxPage > 1 ? '' : 'hidden'}`}>
            <PaginationContent>
                {page - 1 === 0 ? (
                    ''
                ) : (
                    <PaginationItem>
                        <PaginationPrevious
                            className='cursor-pointer'
                            onClick={() => move('previous')}
                        />
                    </PaginationItem>
                )}
                {allowedPages.map(currentPage => {
                    return (
                        <PaginationItem key={currentPage}>
                            {page === currentPage ? (
                                <PaginationLink
                                    className='border cursor-pointer'
                                    onClick={() => move('fixed', currentPage)}
                                >
                                    {currentPage}
                                </PaginationLink>
                            ) : (
                                <PaginationLink
                                    className='cursor-pointer'
                                    onClick={() => {
                                        move('fixed', currentPage)
                                    }}
                                >
                                    {currentPage}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    )
                })}
                {allowedPages?.length &&
                    allowedPages[allowedPages.length - 1] > maxPage ? (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                ) : (
                    ''
                )}
                {page + 1 > maxPage ? (
                    ''
                ) : (
                    <PaginationItem>
                        <PaginationNext
                            className='cursor-pointer'
                            onClick={() => move('next')}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    )
}
