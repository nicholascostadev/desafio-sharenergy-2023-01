import { User } from '../@types/user'

type TableProps = {
  data: User[]
  titles: string[]
}

export const Table = ({ data, titles }: TableProps) => {
  return (
    <table className="table-auto border-collapse w-full text-sm">
      <thead className="text-gray-50">
        {titles.map((title) => (
          <th key={title} className="border-b border-slate-400/5 text-left p-2">
            {title}
          </th>
        ))}
      </thead>
      <tbody className="text-gray-300">
        {data.map((user: any) => (
          <tr key={user.id}>
            <td className="p-2">
              <img
                src={user.picture.medium}
                alt={`${user.name.first} ${user.name.last} profile picture`}
                className="rounded-full h-12 w-12"
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
