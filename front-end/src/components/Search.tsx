import { MagnifyingGlass } from 'phosphor-react'
import { Input } from './Input'

type SearchProps = {
  changeSearch: (newSearch: string) => void
  changeFilter: (newFilter: string) => void
  filter: string
  title: string
  searchByOptions: string[]
}

export const Search = ({
  filter,
  changeFilter,
  changeSearch,
  title,
  searchByOptions,
}: SearchProps) => {
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
              onChange={(e) => changeFilter(e.target.value)}
              defaultChecked={filter === option}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  )
}
