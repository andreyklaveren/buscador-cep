import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './styles.css'
import  api  from "./services/api";

export default function App() {
  
  const [input, setInput] = useState("")
  const [cep, setCep] = useState({})

  async function handleSearch() {
    if(input  === ""){
      alert('Digite um CEP')
      return;
    }
    if (!/^\d{8}$/.test(input)) {
      alert('Digite um CEP válido com 8 números sem espaços e traço');
      return;
    }
    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")

    } catch {
      alert("Erro");
      setInput("")
    }
  }
  
  function cL() {
    console.log(cep)
  }
  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite seu CEP"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="white"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && //Se o  tamanho do objeto for maior que zero ele vai mostrar os dados do <main> 
      <main className="main">
        <h2>CEP: {cep.cep}</h2>
        <span>Rua: {cep.logradouro}</span>

        {cep.complemento && // se  o complemento não tiver valor exibe apenas a rua e o bairro
          <span>Complemento: {cep.complemento}</span>
        }
        <span>Bairro: {cep.bairro}</span>
        <span>Cidade-Estado: {cep.localidade} - {cep.uf}</span>
        {cL()}
      </main>
      }
    </div>
  );
}
