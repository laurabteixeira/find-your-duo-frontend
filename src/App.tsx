import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import { GameController } from 'phosphor-react'

import './styles/main.css'
import logoImg from './assets/logo-nlw-esports.svg'

import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then((response) => response.json())
      .then((data) => {
        setGames(data)
      })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{' '}
        <span className="text-transparent bg-nlw-gradient bg-clip-text ">
          duo
        </span>{' '}
        está aqui!
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16 ">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed">
            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/40">
              <Dialog.Title className="text-3xl font-black">
                Publique um anúncio
              </Dialog.Title>

              <Dialog.Content>
                <form>
                  <div>
                    <label htmlFor="game">Qual o game?</label>
                    <input
                      id="game"
                      placeholder="Selecione o que deseja jogar"
                    />
                  </div>

                  <div>
                    <label htmlFor="name">Seu nome (ou nickname)</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Como te chamam dentro do game?"
                    />
                  </div>

                  <div>
                    <label htmlFor="yearsPlaying">Joga há quanto tempo?</label>
                    <input
                      id="yearsPlaying"
                      type="number"
                      placeholder="Tudo bem ser um iniciante!"
                    />
                  </div>

                  <div>
                    <label htmlFor="discord">Qual o seu discord?</label>
                    <input
                      id="discord"
                      type="text"
                      placeholder="Ex: SeuNick#0000"
                    />
                  </div>

                  <div>
                    <div>
                      <label htmlFor="weekDays">
                        Quantas vezes por semana costuma jogar?
                      </label>
                    </div>
                    <div>
                      <label htmlFor="hourStart">Em qual horário?</label>
                      <div>
                        <input id="hourStart" type="time" placeholder="De" />
                        <input id="hourEnd" type="time" placeholder="Até" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <input type="checkbox" />
                    Costumo me conectar ao chat de voz.
                  </div>

                  <footer>
                    <button>Cancelar</button>
                    <button type="submit">
                      <GameController />
                      Encontrar duo
                    </button>
                  </footer>
                </form>
              </Dialog.Content>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App

// Obs.:

// useState: permite que os componentes mudem seu estado após uma interação do usuário, por exemplo. Exemplo: um botão que, ao ser clicado, exibe uma mensagem.
// Não podemos passar um array para o useState sem dizer o tipo dele. Por isso, na linha 10, eu criei o 'interface Game' com as propriedades e tipos que vamos receber no array. Para passar o array tipado ao useState, usamos <>, da maneira: <Game[]>.

// useEffects: usado para lidar com os efeitos colaterais gerados quando nosso código faz requisições em API's. Se passarmos um array vazio dentro do segundo parâmetro do useEffects, o código dentro dele só será executado uma única vez durante todo o fluxo da aplicação.

// Usamos o .then() quando o código está retornando uma promisse. Ele é usado para lidar com promisses sem travar a aplicação.
// Exemplo: na linha 13, no useEffects, foi usado um .then() porque a API retornada uma response, que era uma promisse e a response foi transformada para json(), que é uma promisse, para depois ser salva em data. Por isso, utilizei 2 .then().

// A prop 'key' passada no GameBanner serve para o React encontrar e diferenciar mais facilmente cada jogo, para não haver erros e os jogos acabarem sendo todos apagados. Geralmente se passa o id, que é a informação mais única possível dos jogos.
