import classNames from 'classnames'
import {
  cloneElement,
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactElement,
} from 'react'
import { FieldError } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { ErrorText } from './ErrorText'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask?: string
  name?: string
  label?: string
  error?: FieldError | undefined
  rightIcon?: ReactElement
  leftIcon?: ReactElement
}

const InputBase: ForwardRefRenderFunction<any, InputProps> = (
  { name, error, label, rightIcon, leftIcon, mask, className, ...rest },
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
        <label htmlFor={name} className="text-white flex flex-col">
          {label}
          {mask ? (
            <InputMask
              mask={mask}
              className={classNames('default-input w-full', className)}
              ref={ref}
              {...rest}
            />
          ) : (
            <input
              name={name}
              className={classNames('default-input w-full', className)}
              ref={ref}
              {...rest}
            />
          )}
        </label>
        {rightIcon &&
          cloneElement(rightIcon, {
            className:
              'text-white absolute right-4 top-[50%] translate-y-[-50%]',
          })}

        {error && (
          <ErrorText className="text-sm mt-2">{error.message}</ErrorText>
        )}
      </div>
    )
  }

  return (
    <div className="w-full relative">
      {leftIcon &&
        cloneElement(leftIcon, {
          className: 'text-white absolute left-4 top-[50%] translate-y-[-50%]',
        })}
      {mask ? (
        <InputMask
          mask={mask}
          className={classNames(
            'default-input w-full',
            leftIcon && 'pl-12',
            className,
          )}
          ref={ref}
          {...rest}
        />
      ) : (
        <input
          name={name}
          className={classNames(
            'default-input w-full',
            leftIcon && 'pl-12',
            className,
          )}
          ref={ref}
          {...rest}
        />
      )}
      {rightIcon &&
        cloneElement(rightIcon, {
          className: 'text-white absolute right-4 top-[50%] translate-y-[-50%]',
        })}
      {error && <p className="text-red-400 text-sm mt-2">{error.message}</p>}
    </div>
  )
}

export const Input = forwardRef(InputBase)
