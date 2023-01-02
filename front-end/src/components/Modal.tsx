import { Dialog, Transition } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Spinner } from 'phosphor-react'
import { Fragment } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from './Input'
import InputMask from 'react-input-mask'
import { validateCPF } from '../utils/cpfValidator'

type ModalProps = {
  closeModal: () => void
  isOpen: boolean
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome tem que ter pelo menos 1 caractere')
    .max(60, 'Nome pode ter no máximo 60 caracteres'),
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  telephone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .refine(
      (val) => {
        console.log(val)
        return val.length === 11
      },
      {
        message: 'Telefone inválido',
      },
    ),
  CPF: z.string().length(11, 'CPF deve ter 11 dígitos').refine(validateCPF, {
    message: 'CPF informado não existe',
  }),
})

type FormData = z.infer<typeof formSchema>

export const Modal = ({ closeModal, isOpen }: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      telephone: '',
      CPF: '',
      email: '',
      name: '',
    },
  })

  const handleAddClient = (data: FormData) => {
    console.log(data)
    closeModal()
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-md bg-slate-900 border border-white/5 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-50 mb-4"
                  >
                    Cadastrar cliente
                  </Dialog.Title>
                  <form
                    className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 [&_*]:outline-0"
                    onSubmit={handleSubmit(handleAddClient)}
                  >
                    <Input
                      placeholder="Nome"
                      label="Nome do Cliente"
                      className="py-1 px-2"
                      error={errors.name}
                      {...register('name')}
                    />
                    <Input
                      placeholder="Email"
                      label="E-mail do cliente"
                      className="py-1 px-2"
                      error={errors.email}
                      {...register('email')}
                    />
                    <div className="w-full relative">
                      <label className="flex flex-col text-white">
                        Telefone
                        <Controller
                          control={control}
                          name="telephone"
                          render={({ field: { onChange, value } }) => {
                            return (
                              <div className="w-full">
                                <InputMask
                                  mask="(99) 9 9999 9999"
                                  placeholder="Telefone"
                                  className="default-input relative py-1 px-2 w-full"
                                  onChange={(e) =>
                                    onChange(
                                      e.target.value
                                        .replaceAll(' ', '')
                                        .replaceAll('(', '')
                                        .replaceAll(')', '')
                                        .replaceAll('_', ''),
                                    )
                                  }
                                />
                                <p className="text-red-400 text-sm mt-2">
                                  {errors.telephone?.message}
                                </p>
                              </div>
                            )
                          }}
                        />
                      </label>
                    </div>
                    <div className="w-full relative">
                      <label className="flex flex-col text-white">
                        CPF
                        <Controller
                          control={control}
                          name="CPF"
                          render={({ field: { onChange, value } }) => {
                            return (
                              <div className="w-full">
                                <InputMask
                                  mask="999.999.999-99"
                                  placeholder="CPF"
                                  // label="CPF do cliente"
                                  className="default-input relative py-1 px-2 w-full"
                                  onChange={(e) =>
                                    onChange(
                                      e.target.value
                                        .replaceAll('.', '')
                                        .replaceAll('-', '')
                                        .replaceAll('_', ''),
                                    )
                                  }
                                />
                                <p className="text-red-400 text-sm mt-2">
                                  {errors.CPF?.message}
                                </p>
                              </div>
                            )
                          }}
                        />
                      </label>
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center items-center gap-2 rounded-md border border-white/5 bg-transparent hover:bg-white/5 px-4 py-2 text-sm text-white font-medium transition-colors disabled:bg-white/20 disabled:text-gray-500 disabled:cursor-not-allowed"
                        disabled={
                          isSubmitting /* || Object.keys(errors).length > 0 */
                        }
                      >
                        {isSubmitting && (
                          <Spinner className="animate-spin" size={16} />
                        )}
                        Confirmar
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
