import dayjs from 'dayjs'
import { isDateKey } from '../../../utils/isDateKey'

type TableRowProps = {
  title: string
  value: string
}
export const TableRow = ({ title, value }: TableRowProps) => {
  if (isDateKey(title)) {
    return (
      <tr className="table-row">
        <th className="font-bold text-left">{title}</th>
        <td>{dayjs(new Date(value as string)).format('LL')}</td>
      </tr>
    )
  }

  return (
    <tr className="table-row">
      <th className="font-bold text-left">{title}</th>
      <td>{value as string}</td>
    </tr>
  )
}
