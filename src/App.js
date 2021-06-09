  
import React, { useState } from "react";
import "./App.css";
const PokeDex = require('pokedex-promise-v2');
const P = new PokeDex();

const App = () => {
  const [pokemon, setPokemon] = useState("eevee");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");
  const [BST, setBST] = useState(0);

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };


  const getPokemon = () => {
    const PokeArray = [];
    let bstcheck = 0;
    console.log(pokemon)
    P.getPokemonByName(pokemon)
      .then(function(res){
        PokeArray.push(res);
        setPokemonData(PokeArray);
        if(res.types[1]){
          const ptypes = res.types[0].type.name + ' | ' + res.types[1].type.name;
          setPokemonType(ptypes);
        }
        else{
          setPokemonType(res.types[0].type.name);
       }
        res.stats.forEach(function(stat){
          bstcheck += stat.base_stat;
        });

        setBST(bstcheck);

    })
     .catch (function(e) {
       alert('Not a valid pokemon name. Remember to specify the form.')
      console.log(e);
    })
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          <input className="input"
            type="text"
            onChange={handleChange}
            placeholder="Enter name or ID"
          />
        </label>
      </form>
      {pokemonData.map((data) => {
        return (
          <div className="container">
            <div className={data.types[0].type.name}>
              <div className='tile-content'>

                <div className="tilecard">
                  <img className='pPic' src={data.sprites["front_default"]} alt="PokemonPic" />
                </div>

                <div className="tilecard">
                  <div className='data'>Number: {" "} {data.id}</div>
                  <div className='data'>Type: {" "} {pokemonType}</div>
                  <div className="data">Height: {" "} {Math.round(data.height * 3.9)}" </div>
                  <div className="data">Weight: {" "} {Math.round(data.weight / 4.3)} lbs</div>
                  <div className="data">Ability: {" "} {data.abilities[0].ability.name}</div>
                  <div className="data">BST: {" "} {BST}</div>
                </div>

                <div className='name'> {data.species.name[0].toUpperCase() + data.species.name.substring(1)}</div>

              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;