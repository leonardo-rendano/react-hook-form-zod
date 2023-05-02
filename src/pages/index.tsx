import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const createUserFormSchema = z.object({
  email: z.string()
  .nonempty("O e-mail é obrigatório")
  .email("Formato de e-mail inválido"),
  password: z.string()
  .min(6, "A senha deve ter no mínimo 6 caracteres.")
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

export default function Home() {
  const [output, setOutput] = useState<string>()
  const { register, handleSubmit, formState } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  })

  function createUser(data: any) {
    setOutput(JSON.stringify(data, null, 2))
  }

  return (
    <main className="h-screen flex-col gap-10 bg-zinc-950 text-zinc-300 flex items-center justify-center">
      <form 
        onSubmit={handleSubmit(createUser)}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="email">E-mail</label>
          <input 
            type="email"
            className="border border-zinc-800 bg-zinc-800 text-white shadow-sm rounded h-10 px-3"
            {...register("email")}
          />
          {formState.errors.email && <span>{formState.errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="senha">Senha</label>
          <input 
            type="password"
            className="border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white"
            {...register("password")}
          />
          {formState.errors.password && <span>{formState.errors.password.message}</span>}
        </div>

        <button
         type="submit"
         className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600"
         >
          Salvar
          </button>
      </form>

      <pre>
        {output}
      </pre>
    </main>
  );
}
