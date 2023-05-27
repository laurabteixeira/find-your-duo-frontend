import { MagnifyingGlassPlus } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

export function CreateAdBanner() {
  return (
    <div className="pt-1 bg-nlw-gradient self-stretch overflow-hidden rounded-lg mt-8">
      <div className="bg-[#2A2634] px-8 py-6 self-stretch rounded-lg flex justify-between items-center">
        <div>
          <strong className="block font-black text-white text-2xl">
            Não encontrou o seu duo?
          </strong>
          <span className="block text-base text-zinc-400">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>
        <Dialog.Trigger className="py-3 px-4 bg-violet-500 text-white rounded hover:bg-violet-600 transition flex items-center gap-3">
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  )
}
