import type { InputHTMLAttributes } from "react"

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string,
    label?: string,
    className?: string
}

const TextField = ({className, placeholder, label, ...props}:TextFieldProps) => {
  return (
    <div className={`flex flex-col gap-2 p-2 px-6 ${className} `}>
       {label &&  <p>{label}</p>}
        <input 
        {...props}
        placeholder={placeholder}
        type="text" className="outline-none  rounded-full text-xl px-4 p-2 w-full bg-gray-500/5" />
    </div>
  )
}

export default TextField