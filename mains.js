const listPokemons = document.querySelector('#pokemons')
const pokemonDetails = document.querySelector('#details')
const pokemonHeader = document.querySelector('#header')




function main(limit = 5) {
  const pokemons = `
  {
    pokemons(first:${limit}){
      id
      name
      classification
      image
    }
  }`

  requestApi(pokemons).then(res => handleAllPokemons(res.pokemons))
}


function getOnePokemon(id) {
  const query = `
  {
    pokemon(id:"${id}"){
      id
      name
      image
      weaknesses
      weight{
        minimum
        maximum
      }
      height{
        minimum
        maximum
      }
      maxHP
      resistant
      
    }
  }`

  requestApi(query).then(res =>
    handleOnePokemon(res.pokemon)
  )
}



function handleOnePokemon(pokemon) {

  let template = `
    <div class="card" style="display: flex; align-items: center; justify-content: center;" >
      <img class="card-img-top" src="${pokemon.image}" style="width:200px"/>
      <div class="card-body">
        <h5 class="card-title">${pokemon.name}</h5>
      <div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          Peso
          <strong>
          max - ${pokemon.weight.maximum} | min - ${pokemon.weight.minimum}  
          </strong>
        </li>
        <li class="list-group-item">
        Altura
          <strong>
          max - ${pokemon.height.maximum} | min - ${pokemon.height.minimum} 
          </strong>
        </li>
        <li class="list-group-item">
        HP: 
          <strong>
          ${pokemon.maxHP} 
          </strong>
        </li>
        <li class="list-group-item">
          Fraquesas:
          <strong> 
          ${pokemon.weaknesses.join(", ")}
          </strong>
        </li>
        <li class="list-group-item">
          Resistência:  
          <strong>
            ${pokemon.resistant.join(", ")} 
          </strong>
        </li>
      </ul>
    </div>
  `;


  const header = `
  <a class="navbar-brand" href="#">
    <img src="${pokemon.image}" width="30" height="30" alt="" loading="lazy">
    ${pokemon.name}
  </a>
  
  `

  pokemonHeader.innerHTML = header

  pokemonDetails.innerHTML = template


}


function handleAllPokemons(pokemons) {
  let template = ''

  pokemons.forEach(poke => {
    template += `
    <li class="media" id="pokemon">
      <img class="mr-3" width="100" src="${poke.image}">
      <div class="media-body">
        <h5>${poke.name}</h5>
        <p>${poke.classification}</p>
        <button class="btn btn-secondary btn-small" onClick="getOnePokemon('${poke.id}')" >Ver Detalhes</button>
      </div>
    </li>
      
    `
  })
  listPokemons.innerHTML = `
  <ul class="list-unstyled">
    ${template}
  </ul>
  <button class="btn btn-block btn-info" onClick="main(${pokemons.length + 5})">mais...</button>
  `

}


async function requestApi(query) {
  let response = await fetch(`https://graphql-pokemon.now.sh/?query=${query}`)
  response = await response.json()

  return response.data
}





main()