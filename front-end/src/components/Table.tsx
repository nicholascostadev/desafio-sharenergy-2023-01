import classNames from 'classnames'
import { User } from '../@types/user'

type TableProps = {
  data: User[]
  titles: string[]
}

export const Table = ({ data, titles }: TableProps) => {
  return (
    <table className="table-auto border-collapse w-full text-lg overflow-scroll">
      <thead className="text-gray-50">
        {titles.map((title, i) => (
          <tr key={title}>
            <th
              className={classNames(
                'border-b border-slate-400/5 text-left p-2',
                i === titles.length - 1 && 'text-center',
                'min-w-[155px]',
              )}
            >
              {title}
            </th>
          </tr>
        ))}
      </thead>
      <tbody className="text-gray-300 text-base">
        {data.map((user: any) => (
          <tr key={user.id}>
            <td className="p-2">
              <img
                src={user.picture.medium}
                alt={`${user.name.first} ${user.name.last} profile picture`}
                className="rounded-full h-16 w-16"
              />
            </td>
            <td className="p-2">{user.login.username}</td>
            <td className="p-2">{`${user.name.first} ${user.name.last}`} </td>
            <td className="p-2">{user.email}</td>
            <td className="p-2 text-center">{user.dob.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
