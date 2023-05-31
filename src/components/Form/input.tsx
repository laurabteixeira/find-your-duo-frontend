import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
// O InputHTMLAttributes importa todos as propriedades do input, como "id" e "placeholder", automaticamente. Dessa maneira, não é preciso colocar "{props.id}" ou "{props.placeholder}" no componente. Podemos chamar todas de uma vez, utilizando o {...props}.

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
    />
  )
}
