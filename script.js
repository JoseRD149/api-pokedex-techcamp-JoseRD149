const api_url="https://pokeapi.co/api/v2/pokemon?limit=150"
const poke_container = document.getElementById('poke-container')
const pokemon_count = 150
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

// Obtener todos los pokemon
async function fetchAllPokemon() {
	try {
	  const response = await fetch(api_url);
	  if (!response.ok) {
		throw new Error(`Error en la solicitud: ${response.status}`);
	  }
  
	  const data = await response.json();
	  const results = data.results;
  
	  // Obtener detalles 
	  const pokemonPromises = results.map(pokemon => fetch(pokemon.url).then(res => res.json()));
	  return await Promise.all(pokemonPromises);
	} catch (error) {
	  console.error("Error al obtener los Pokémon:", error);
	  return [];
	}
  }
  
  // Asignar un color por tipo
  function getBackgroundColor(type) {

	return colors[type] || "#68A090"; // Color predeterminado por si no hay
  }
  
  // Crear tarjeta de unico pokemon
  function createPokemonCard(pokemon) {
	const { id, name, types } = pokemon;
	const type = types[0].type.name; // primer tipo principal
	const backgroundColor = getBackgroundColor(type);
  
	const card = document.createElement("div");
	card.className = "pokemon";
	card.style.backgroundColor = backgroundColor;
  
	//creamos el html de la tarjeta
	card.innerHTML = `
	  <div class="img-container">
		<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="${name}">
	  </div>
	  <div class="info">
		<span class="number">#${id.toString().padStart(3, "0")}</span>
		<h3 class="name">${name}</h3>
		<small class="type">Type:  <span>${type}</span></small>
	  </div>
	`;
  
	return card;
  }
  
  // Renderizar las tarjetas
  async function renderPokemonCards() {
	const container = document.getElementById("poke-container");
	if (!container) {
	  console.error("No se encontró el contenedor con el ID 'poke-container'");
	  return;
	}
  
	// Limpiar el contenedor html antes de agregar las tarjetas dinamizamente
	container.innerHTML = "";
  
	const allPokemon = await fetchAllPokemon();
  
	allPokemon.forEach(pokemon => {
	  const card = createPokemonCard(pokemon);
	  container.appendChild(card);
	});
  }
  
  // Ejecutar el renderizado al cargar 
  document.addEventListener("DOMContentLoaded", () => {
	renderPokemonCards();
  });