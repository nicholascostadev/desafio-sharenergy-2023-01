import classNames from 'classnames'
import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react'
import { FieldError } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string
  label?: string
  error?: FieldError | undefined
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error, label, className, ...rest },
  ref,
) => {
  return (
    <div>
      <label htmlFor={name} className="text-white">
        {label}
        <input
          name={name}
          className={classNames('login-input w-full', className)}
          ref={ref}
          {...rest}
        />
      </label>
      {error && <p className="text-red-400 text-sm mt-2">{error.message}</p>}
    </div>
  )
}

export const Input = forwardRef(InputBase)
