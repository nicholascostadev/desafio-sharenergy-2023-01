import classNames from 'classnames'

type TableProps = {
  titles: string[]
  rows?: string[][]
}

export const Table = ({ titles, rows }: TableProps) => {
  return (
    <table className="table-auto border-collapse w-full text-lg overflow-scroll">
      <thead className="text-gray-50 ">
        {titles.map((title, i) => (
          <th
            key={title}
            className={classNames(
              'border-b border-slate-400/5 text-left p-2',
              (i === titles.length - 1 || i === 0) && 'text-center',
              'min-w-[155px]',
            )}
          >
            {title}
          </th>
        ))}
      </thead>
      <tbody className="text-gray-300 text-base">
        {rows?.map((row) => {
          return (
            <tr key={String(Math.random() + Math.random())}>
              {row.map((item, i) => {
                if (item.startsWith('https://')) {
                  return (
                    <td className="p-2 flex justify-center" key={item}>
                      <img
                        src={item}
                        alt="profile picture"
                        className="rounded-full h-16 w-16"
                      />
                    </td>
                  )
                }

                return (
                  <td
                    className={classNames(
                      'p-2',
                      i === row.length - 1 && 'text-center',
                    )}
                    key={item}
                  >
                    {item}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
