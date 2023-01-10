import { CaretLeft, CaretRight } from 'phosphor-react'
import { FormEvent, useRef } from 'react'

type PaginationProps = {
  page: number
  totalPages?: number
  perPage: number
  onNextPage: () => void
  onPrevPage: () => void
  onPerPageChange: (newPerPage: number) => void
}

export const Pagination = ({
  page,
  onNextPage,
  onPrevPage,
  totalPages,
  perPage,
  onPerPageChange,
}: PaginationProps) => {
  const perPageRef = useRef<HTMLInputElement>(null)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (perPageRef.current) {
      const newPerPage = Number(perPageRef.current.value)
      if (newPerPage > 0) onPerPageChange(newPerPage)
    }
  }

  return (
    <div className="flex justify-end items-center gap-2 p-2">
      <p className="text-white">
        Mostrando{' '}
        <form onSubmit={handleSubmit} className="inline">
          <input
            type="number"
            className="bg-slate-800 border border-white/5 rounded-md w-10 text-center input-w-arrow"
            defaultValue={perPage}
            ref={perPageRef}
          />
        </form>{' '}
        resultados
        {totalPages && ` de ${totalPages} página${totalPages > 1 ? 's' : ''}`}
      </p>
      <button
        name="Go back one page"
        className="text-gray-300 hover:text-white disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
        onClick={onPrevPage}
        disabled={page <= 1}
      >
        <p className="sr-only">Go to previous page</p>
        <CaretLeft size={20} />
      </button>
      <button
        name="Go forwards one page"
        className="text-gray-300 hover:text-white disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
        onClick={onNextPage}
        disabled={page === totalPages}
      >
        <p className="sr-only">Go to next page</p>
        <CaretRight size={20} />
      </button>
    </div>
  )
}
