document.addEventListener("DOMContentLoaded", () => {
  const pokemonInput = document.querySelector("#pokemonInput");
  const searchButton = document.querySelector("#searchButton");
  const cardContainer = document.querySelector("#card-container");

  const h1 = document.querySelector("h1");

  const defaultPokemonIds = [1, 4, 7, 25, 39, 52, 133, 150]; // Pokémon IDs (bulbasaur, charmeleon, squirtle, etc.)

  const bgColorPokemon = {
    grass: "#34C759",
    fire: "#FFA07A",
    water: "#3498DB",
    electric: "#F7DC6F",
    psychic: "#F7D2C4",
    normal: "#C9C4B5",
    flying: "#87CEEB",
    poison: "#B2875F",
    ground: "#964B00",
    bug: "#7CFC00",
    rock: "#A8D7F5",
  };

  // Initially fetch and display some Pokémon cards
  defaultPokemonIds.forEach((id) => {
    fetchPokemonData(id);
  });

  async function fetchPokemonData(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Pokémon not found");
      const data = await response.json();
      createPokemonCard(data);
    } catch (error) {
      displayErrorMessage("Pokémon not found. Please try again.");
    }
  }

  // Create and append Pokémon card to the container
  function createPokemonCard(data) {
    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    // Get the Pokémon's type
    const pokemonType = data.types[0].type.name;
    const bgColor = bgColorPokemon[pokemonType] || "#C9C4B5"; // Default to "normal" color if type not found

    card.style.backgroundColor = bgColor;

    card.innerHTML = `
          <img src="${data.sprites.front_default}" alt="${data.name}">
          <h2>${data.name.toUpperCase()}</h2>
          <p>Height: ${data.height} decimeters</p>
          <p>Weight: ${data.weight} hectograms</p>
          <p>Base Experience: ${data.base_experience}</p>
          <div class="type">Type: ${data.types[0].type.name}</div>
        `;
    cardContainer.appendChild(card);
  }

  // Display error message
  function displayErrorMessage(message) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    errorMessage.style.color = "red";
    cardContainer.appendChild(errorMessage);
  }

  // Handle search button click
  searchButton.addEventListener("click", () => {
    const pokemonName = pokemonInput.value.trim().toLowerCase();
    cardContainer.innerHTML = ""; // Clear previous results

    if (pokemonName) {
      fetchPokemonData(pokemonName); // Fetch Pokémon if name is valid
    } else {
      cardContainer.style.display = "block"; // Hide the card container if input is empty
      displayErrorMessage("Please enter a Pokémon name.");
    }
  });

  // Handle "Enter" key press for search
  pokemonInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      const pokemonName = pokemonInput.value.trim().toLowerCase();
      cardContainer.innerHTML = ""; // Clear previous results

      if (pokemonName) {
        fetchPokemonData(pokemonName); // Fetch Pokémon if name is valid
      } else {
        cardContainer.style.display = "block"; // Hide the card container if input is empty
        displayErrorMessage("Please enter a Pokémon name.");
      }
    }
  });

  h1.addEventListener("click", () => {
    cardContainer.innerHTML = ""; // Clear previous results
    defaultPokemonIds.forEach((id) => {
      fetchPokemonData(id);
    });
  });
});
