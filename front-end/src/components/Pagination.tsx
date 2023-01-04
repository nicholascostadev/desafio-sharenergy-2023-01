import { CaretLeft, CaretRight } from 'phosphor-react'

type PaginationProps = {
  page: number
  onNextPage: () => void
  onPrevPage: () => void
  totalPages?: number
  perPage: number
}

export const Pagination = ({
  page,
  onNextPage,
  onPrevPage,
  totalPages,
  perPage,
}: PaginationProps) => {
  const showing = page * perPage - perPage + 1
  const to = page * perPage
  return (
    <div className="flex justify-end items-center gap-2 p-2">
      <p className="text-white">
        Mostrando {showing} - {to} {totalPages && ` de ${totalPages} páginas`}
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
