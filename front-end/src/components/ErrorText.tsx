import classNames from 'classnames'
import { HTMLProps, PropsWithChildren } from 'react'

export interface ErrorTextProps
  extends PropsWithChildren<HTMLProps<HTMLParagraphElement>> {
  className?: string
}

export const ErrorText = ({ className, children, ...rest }: ErrorTextProps) => {
  return (
    <p className={classNames('text-red-400', className)} {...rest}>
      {children}
    </p>
  )
}
