import { useNavigate } from 'react-router-dom'
import { Client } from '../../../@types/client'
import { CaretLeft, PencilLine, Trash } from 'phosphor-react'

type ClientPageActionButtonsProps = {
  client: Client
  onEdit: (client: Client) => void
  onDelete: (clientId: string) => void
}

export const ClientPageActionButtons = ({
  client,
  onEdit,
  onDelete,
}: ClientPageActionButtonsProps) => {
  const navigate = useNavigate()
  return (
    <div className="flex justify-between w-full">
      <button
        className="p-4 transition-colors text-gray-300 hover:text-gray-400"
        onClick={() => navigate('/dashboard/clients')}
      >
        <span className="sr-only">Edit client</span>
        <CaretLeft size={24} />
      </button>
      <div>
        <button
          className="p-4 transition-colors text-gray-300 hover:text-indigo-400"
          onClick={() => onEdit(client)}
        >
          <span className="sr-only">Edit client</span>
          <PencilLine size={24} />
        </button>
        <button
          className="p-4 transition-colors text-gray-300 hover:text-red-400"
          onClick={() => onDelete(client.id)}
        >
          <span className="sr-only">Delete client</span>
          <Trash size={24} />
        </button>
      </div>
    </div>
  )
}
