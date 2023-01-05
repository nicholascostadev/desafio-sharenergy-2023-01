import { MagnifyingGlass } from 'phosphor-react'
import { FilterOpts } from '../@types/filter'
import { Input } from './Input'
import { ChangeEvent } from 'react'

type Option = {
  value: string
  filterInQuery: string
}

type SearchProps = {
  title: string
  filter: string
  searchByOptions: Option[]
  changeSearch: (newSearch: string) => void
  changeFilter: (newFilter: FilterOpts) => void
  resetPageOnChange: () => void
  className?: string
}

export const Search = ({
  title,
  filter,
  searchByOptions,
  changeSearch,
  changeFilter,
  resetPageOnChange,
  className,
}: SearchProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (resetPageOnChange) resetPageOnChange()
    changeSearch(e.target.value)
  }
  return (
    <div className={className}>
      <div className="flex w-full">
        <Input
          placeholder="Pesquise aqui"
          className="placeholder:text-base text-base flex-1 mt-0 h-full p-3"
          onChange={handleInputChange}
          rightIcon={<MagnifyingGlass size={20} />}
        />
      </div>
      <div className="flex flex-col sm:flex-row text-white text-sm gap-2 border border-white/5 shadow-lg p-2 rounded-md my-2">
        <h3 className="text-lg">{title}</h3>
        {searchByOptions.map(({ value, filterInQuery }) => (
          <label key={value} className="flex gap-1 items-center text-base">
            <input
              type="radio"
              value={value}
              name="filter"
              onChange={() => changeFilter(filterInQuery as FilterOpts)}
              defaultChecked={filter === filterInQuery}
            />
            {value}
          </label>
        ))}
      </div>
    </div>
  )
}
