import { MagnifyingGlass } from 'phosphor-react'
import { FilterOpts } from '../@types/filter'
import { Input } from './Input'

type SearchProps = {
  title: string
  filter: string
  searchByOptions: string[]
  changeSearch: (newSearch: string) => void
  changeFilter: (newFilter: FilterOpts) => void
}

export const Search = ({
  title,
  filter,
  searchByOptions,
  changeSearch,
  changeFilter,
}: SearchProps) => {
  console.log('Filter: ', filter)
  return (
    <div>
      <div className="flex w-full">
        <Input
          placeholder="Pesquise aqui"
          className="placeholder:text-sm text-sm flex-1 mt-0 h-full"
          onChange={(e) => changeSearch(e.target.value)}
          rightIcon={<MagnifyingGlass size={18} />}
        />
      </div>
      <div className="flex text-white text-sm gap-2 border border-white/5 shadow-lg p-2 rounded-md my-2">
        <h3>{title}</h3>
        {searchByOptions.map((option) => (
          <label key={option} className="flex gap-1">
            <input
              type="radio"
              value={option}
              name="filter"
              onChange={(e) =>
                changeFilter(e.target.value.toLowerCase() as FilterOpts)
              }
              defaultChecked={filter === option || option === 'Nome'}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  )
}
