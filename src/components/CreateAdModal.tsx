import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Input } from './Form/input'
import { Check, GameController } from 'phosphor-react'
import { useEffect, useState, FormEvent } from 'react'
import axios from 'axios'
// O * significa "tudo". Importar tudo do Dialog, por exemplo.

interface Game {
  id: string
  title: string
}
export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)

  useEffect(() => {
    axios('http://localhost:3333/games').then((response) => {
      setGames(response.data)
    })
  }, [])

  // O fetch é mais verboso do que o axios, por isso, usarei o axios.

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if (!data.name) {
      return
    }

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: data.yearsPlaying,
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel,
      })
      alert('Anúncio criado com sucesso!')
    } catch (err) {
      console.log(err)
      alert('Erro ao criar o anúncio.')
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed">
        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/40">
          <Dialog.Title className="text-3xl font-black">
            Publique um anúncio
          </Dialog.Title>
          {/* O comportamento padrão do forms do html é redirecionar o usuário para outra tela. No entanto, não queremos que isso aconteça nesse caso, por isso, usamos o event.preventDefault() no handleCreateAd(). */}
          <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">
                Qual o game?
              </label>
              <select
                name="game"
                id="game"
                className="bg-zinc-900 py-3 px-4 rounded text-sm appearance-none"
                defaultValue=""
              >
                <option disabled value="">
                  Selecione o que deseja jogar
                </option>

                {games.map((game) => {
                  return (
                    <option key={game.id} value={game.id}>
                      {game.title}
                    </option>
                  )
                })}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input
                name="name"
                id="name"
                type="text"
                placeholder="Como te chamam dentro do game?"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                <Input
                  type="number"
                  name="yearsPlaying"
                  id="yearsPlaying"
                  placeholder="Tudo bem ser 0!"
                  min="0"
                  max="100"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual o seu discord?</label>
                <Input
                  name="discord"
                  id="discord"
                  type="text"
                  placeholder="Ex: SeuNick#0000"
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="weekDays">Quando costuma jogar?</label>

                <ToggleGroup.Root
                  type="multiple"
                  className="grid grid-cols-4 gap-2"
                  value={weekDays}
                  onValueChange={setWeekDays}
                >
                  <ToggleGroup.Item
                    value="0"
                    title="Domingo"
                    className={`${
                      weekDays.includes('0')
                        ? 'w-8 h-8 rounded bg-violet-500'
                        : 'w-8 h-8 rounded bg-zinc-900'
                    }`}
                  >
                    D
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="1"
                    title="Segunda"
                    className={`${
                      weekDays.includes('1')
                        ? 'w-8 h-8 rounded bg-violet-500'
                        : 'w-8 h-8 rounded bg-zinc-900'
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="2"
                    title="Terça"
                    className={`${
                      weekDays.includes('2')
                        ? 'w-8 h-8 rounded bg-violet-500'
                        : 'w-8 h-8 rounded bg-zinc-900'
                    }`}
                  >
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="3"
                    title="Quarta"
                    className={`${
                      weekDays.includes('3')
                        ? 'w-8 h-8 rounded bg-violet-500'
                        : 'w-8 h-8 rounded bg-zinc-900'
                    }`}
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="4"
                    title="Quinta"
                    className={`${
                      weekDays.includes('4')
                        ? 'w-8 h-8 rounded bg-violet-500'
                        : 'w-8 h-8 rounded bg-zinc-900'
                    }`}
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="5"
                    title="Sexta"
                    className={`${
                      weekDays.includes('5')
                        ? 'w-8 h-8 rounded bg-violet-500'
                        : 'w-8 h-8 rounded bg-zinc-900'
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="6"
                    title="Sábado"
                    className={`${
                      weekDays.includes('6')
                        ? 'w-8 h-8 rounded bg-violet-500'
                        : 'w-8 h-8 rounded bg-zinc-900'
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="hourStart">Em qual horário?</label>
                <div className="grid grid-cols-2 gap-1">
                  <Input
                    name="hourStart"
                    id="hourStart"
                    type="time"
                    placeholder="De"
                  />
                  <Input
                    name="hourEnd"
                    id="hourEnd"
                    type="time"
                    placeholder="Até"
                  />
                </div>
              </div>
            </div>

            <label className="mt-2 flex gap-2 text-sm">
              <Checkbox.Root
                checked={useVoiceChannel}
                className="w-6 h-6 rounded bg-zinc-900 p-1"
                onCheckedChange={(checked) => {
                  if (checked === true) {
                    setUseVoiceChannel(true)
                  } else {
                    setUseVoiceChannel(false)
                  }
                }}
              >
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-lime-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz.
            </label>

            <footer className="mt-4 flex justify-end gap-4">
              <Dialog.Close
                type="button"
                className="bg-zinc-500 rounded-md px-5 h-12 font-semibold hover:bg-zinc-600 transition-colors"
              >
                Cancelar
              </Dialog.Close>
              <button
                type="submit"
                className="bg-violet-500 rounded-md px-5 h-12 font-semibold flex items-center gap-3 hover:bg-violet-600 transition-colors"
              >
                <GameController size={24} />
                Encontrar duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  )
}
