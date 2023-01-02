import { Plus } from 'phosphor-react'
import { useState } from 'react'
import { Container } from '../components/Container'
import { Modal } from '../components/Modal'
import { Navbar } from '../components/Navbar'

export const Clients = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="bg-page-gradient">
        <Navbar />
        <Modal isOpen={isModalOpen} closeModal={closeModal} />

        <Container className="min-h-[calc(100vh-48px)] mt-16 pt-4">
          <h2 className="text-white text-2xl">Clientes</h2>

          <div className="flex justify-end">
            <button
              className="text-white flex justify-center items-center gap-2 p-2 rounded-md border border-white/5 shadow-md transition-colors bg-slate-900 hover:bg-white/5"
              onClick={openModal}
            >
              Cadastrar cliente
              <Plus size={18} />
            </button>
          </div>
        </Container>
      </div>
    </>
  )
}
