import classNames from 'classnames'
import {
  cloneElement,
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactElement,
} from 'react'
import { FieldError } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string
  label?: string
  error?: FieldError | undefined
  rightIcon?: ReactElement
  leftIcon?: ReactElement
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error, label, rightIcon, leftIcon, className, ...rest },
  ref,
) => {
  if (label) {
    return (
      <div className="w-full relative">
        {leftIcon &&
          cloneElement(leftIcon, {
            className:
              'text-white absolute left-4 top-[50%] translate-y-[-50%]',
          })}
        <label htmlFor={name} className="text-white">
          {label}
          <input
            name={name}
            className={classNames('login-input w-full', className)}
            ref={ref}
            {...rest}
          />
        </label>
        {rightIcon &&
          cloneElement(rightIcon, {
            className:
              'text-white absolute right-4 top-[50%] translate-y-[-50%]',
          })}

        {error && <p className="text-red-400 text-sm mt-2">{error.message}</p>}
      </div>
    )
  }

  return (
    <div className="w-full relative">
      {leftIcon &&
        cloneElement(leftIcon, {
          className: 'text-white absolute left-4 top-[50%] translate-y-[-50%]',
        })}
      <input
        name={name}
        className={classNames(
          'login-input w-full',
          leftIcon && 'pl-12',
          className,
        )}
        ref={ref}
        {...rest}
      />
      {rightIcon &&
        cloneElement(rightIcon, {
          className: 'text-white absolute right-4 top-[50%] translate-y-[-50%]',
        })}
      {error && <p className="text-red-400 text-sm mt-2">{error.message}</p>}
    </div>
  )
}

export const Input = forwardRef(InputBase)
