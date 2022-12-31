import classNames from 'classnames'
import { ReactNode } from 'react'

export const Container = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div
      className={classNames('mx-auto w-[1200px] max-w-full px-8', className)}
    >
      {children}
    </div>
  )
}
