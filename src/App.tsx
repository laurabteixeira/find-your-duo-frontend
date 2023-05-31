import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'

import './styles/main.css'
import logoImg from './assets/logo-nlw-esports.svg'

import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'

import { CreateAdModal } from './components/CreateAdModal'
import axios from 'axios'

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
    axios('http://localhost:3333/games').then((response) => {
      setGames(response.data)
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
        <CreateAdModal />
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
