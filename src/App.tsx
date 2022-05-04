import './App.css';
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from 'react';
import PokemonColection from './components/pokemonCollection';
import { Pokemon } from './components/interface';
import PokemonList from './components/PokemonList';

interface Pokemons{
  name:string,
  url:string
}
const App:React.FC = () =>{
  const [pokemons,setPokemons] = useState<Pokemon[]>([]);

  const getPokemon = async () => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`)
    const pokemonRes: AxiosResponse[] = [];
    for (const r of res.data.results) {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${r.name}`)
        pokemonRes.push(poke);
    }
   const poks: Pokemon[] = pokemonRes.map(p => ({ id: p.data.id, name: p.data.name, sprites: p.data.sprites }));
   console.log(poks)
    setPokemons(poks);
  }

  useEffect(()=>{
    getPokemon();
  },[])
  return(
    <div className='App'>
        <div className="container">
          <header className="pokemon-header">
            Pokemon
          </header>
          <PokemonColection pokemons = {pokemons}/>
        </div>
    </div>
  );
}

export default App;
