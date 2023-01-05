import { Dialog, Transition } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Spinner } from 'phosphor-react'
import { Fragment } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Input } from './Input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../libs/axios'
import { Client } from '../@types/client'
import { formSchema, ClientModalFormData } from '../validations/forms'

type ModalProps = {
  closeModal: () => void
  isOpen: boolean
  initialData?: Client
}

export const RegisterClientModal = ({
  closeModal,
  isOpen,
  initialData,
}: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    control,
    reset,
  } = useForm<ClientModalFormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      address: {
        additionalInfo: '',
      },
    },
    values: initialData
      ? {
          ...initialData,
          address: {
            ...initialData.address,
            additionalInfo: initialData.address.additionalInfo || '',
          },
        }
      : undefined,
  })

  const queryClient = useQueryClient()
  const { mutate: createClient } = useMutation({
    mutationFn: async (clientData: ClientModalFormData) => {
      return await api.post('/clients', clientData).then((res) => res.data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['clients'],
      })
      closeModal()
      reset()
    },
  })

  const { mutate: sendEditedUserData } = useMutation({
    mutationFn: async (clientData: ClientModalFormData & { id: string }) => {
      return await api
        .put(`/clients/${initialData?.id}`, clientData)
        .then((res) => res.data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['clients'],
      })
      queryClient.invalidateQueries({
        queryKey: ['client'],
      })
      closeModal()
      reset()
    },
  })

  const handleAddClient = (data: ClientModalFormData) => {
    if (initialData) {
      sendEditedUserData(data as Client)
    } else {
      createClient(data)
    }
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            closeModal()
            reset({
              cpf: '',
              telephone: '',
              email: '',
              name: '',
              address: {
                additionalInfo: '',
                city: '',
                neighborhood: '',
                number: '',
                state: '',
                street: '',
                zipCode: '',
              },
            })
          }}
        >
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
                      defaultValue={initialData?.name ?? ''}
                      {...register('name')}
                    />
                    <Input
                      placeholder="Email"
                      label="E-mail do cliente"
                      className="py-1 px-2"
                      error={errors.email}
                      defaultValue={initialData?.email ?? ''}
                      {...register('email')}
                    />
                    <Controller
                      control={control}
                      name="telephone"
                      render={({ field: { onChange } }) => {
                        return (
                          <Input
                            mask="(99) 9 9999 9999"
                            placeholder="Telefone"
                            className="default-input relative py-1 px-2 w-full"
                            defaultValue={initialData?.telephone}
                            onChange={(e) =>
                              onChange(
                                e.target.value
                                  .replaceAll(' ', '')
                                  .replaceAll('(', '')
                                  .replaceAll(')', '')
                                  .replaceAll('_', ''),
                              )
                            }
                            error={errors.telephone}
                            label="Telefone do cliente"
                          />
                        )
                      }}
                    />
                    <Controller
                      control={control}
                      name="cpf"
                      render={({ field: { onChange } }) => {
                        return (
                          <Input
                            mask="999.999.999-99"
                            placeholder="CPF"
                            label="CPF do cliente"
                            defaultValue={initialData?.cpf}
                            className="default-input relative py-1 px-2 w-full"
                            onChange={(e) =>
                              onChange(
                                e.target.value
                                  .replaceAll('-', '')
                                  .replaceAll('.', '')
                                  .replaceAll('_', ''),
                              )
                            }
                            error={errors.cpf}
                          />
                        )
                      }}
                    />
                    <div className="grid grid-cols-2 w-full col-span-full gap-4">
                      <h3 className="col-span-full text-white">Endereço</h3>
                      <Input
                        placeholder="Estado"
                        label="Estado do cliente"
                        className="py-1 px-2"
                        error={errors.address?.state}
                        defaultValue={initialData?.address?.street ?? ''}
                        {...register('address.state')}
                      />
                      <Input
                        placeholder="Cidade"
                        label="Cidade do cliente"
                        className="py-1 px-2"
                        error={errors.address?.city}
                        defaultValue={initialData?.address?.street ?? ''}
                        {...register('address.city')}
                      />
                      <Input
                        placeholder="Rua"
                        label="Rua do cliente"
                        className="py-1 px-2"
                        error={errors.address?.street}
                        defaultValue={initialData?.address?.street ?? ''}
                        {...register('address.street')}
                      />
                      <Input
                        placeholder="Bairro"
                        label="Bairro do cliente"
                        className="py-1 px-2"
                        error={errors.address?.neighborhood}
                        defaultValue={initialData?.address?.street ?? ''}
                        {...register('address.neighborhood')}
                      />
                      <Controller
                        control={control}
                        name="address.zipCode"
                        render={({ field: { onChange } }) => {
                          return (
                            <Input
                              mask="99999-999"
                              placeholder="CEP"
                              className="default-input relative py-1 px-2 w-full"
                              defaultValue={initialData?.address?.zipCode}
                              onChange={(e) =>
                                onChange(
                                  e.target.value
                                    .replaceAll('.', '')
                                    .replaceAll('-', '')
                                    .replaceAll('_', ''),
                                )
                              }
                              label="CEP do cliente"
                              error={errors.address?.zipCode}
                            />
                          )
                        }}
                      />
                      <Input
                        placeholder="Número (ex: 52)"
                        label="Número da residência do cliente"
                        className="py-1 px-2"
                        error={errors.address?.number}
                        defaultValue={initialData?.address?.number ?? ''}
                        {...register('address.number')}
                      />
                      <Input
                        placeholder="Complemento"
                        label="Complemento"
                        className="py-1 px-2"
                        error={errors.address?.additionalInfo}
                        defaultValue={
                          initialData?.address?.additionalInfo ?? ''
                        }
                        {...register('address.additionalInfo')}
                      />
                    </div>

                    <div className="mt-4 col-span-full">
                      <button
                        type="submit"
                        className="inline-flex justify-center items-center gap-2 rounded-md border border-white/5 bg-transparent hover:bg-white/5 px-4 py-2 text-sm text-white font-medium transition-colors disabled:bg-white/20 disabled:text-gray-500 disabled:cursor-not-allowed"
                        disabled={isSubmitting || !isDirty}
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
