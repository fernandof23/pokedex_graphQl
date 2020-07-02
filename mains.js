const listPokemons = document.querySelector('#pokemons')
const pokemonDetails = document.querySelector('#details')



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
    <div class="card">
      <img class="card-img-top" src="${pokemon.image}"/>
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



/* 
  - Contador de Visitas
*/

function setCookie(nome, valor, dias) {
  diasms = (new Date()).getTime() + 1000 * 3600 * 24 * dias;
  dias = new Date(diasms);
  expires = dias.toGMTString();
  document.cookie = escape(nome) + "=" + escape(valor) + "; expires=" + expires;
}


if (!document.cookie) {
  setCookie("cookie", "1", 365);
  document.write("<font face='verdana' size='1'>Suas Visitas : 1</font>");
} else {
  var cont = document.cookie;
  var dividindo = cont.split("=");
  //document.write(dividindo[1]);
  var numero = parseInt(dividindo[1]);
  var soma = numero + 1;
  document.write("<font face='verdana' size='1'>Suas Visitas : " + soma + "</font>");
  setCookie("cookie", soma, 365);
}


main()