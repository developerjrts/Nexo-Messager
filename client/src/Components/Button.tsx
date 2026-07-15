import { type ButtonHTMLAttributes, type ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode,
}

const Button = ({
    children,
    ...props
}:ButtonProps) => {
  return (
    <button
    {...props}
    className={`py-2 flex items-center justify-center px-6 rounded-full bg-[#6001d1] text-natural font-medium text-lg`}
    >
        {children}
  
    </button>
  )
}

export default Button