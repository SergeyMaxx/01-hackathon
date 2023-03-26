import {Module} from '../core/module';

export class JingleModule extends Module {
  trigger() {
    super.trigger();
    document.body.innerHTML = `
      <button id="show-pokemon">Показать покемона</button>
      <div id="pokemon-container"></div>
    `;
    const showPokemonButton = document.getElementById('show-pokemon');
    const pokemonContainer = document.getElementById('pokemon-container');

    showPokemonButton.addEventListener('click', () => {
      const randomPokemonNumber = Math.floor(Math.random() * 898) + 1;

      const pokemonImage = document.createElement('img');
      pokemonImage.classList.add('pokemon-image');
      pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemonNumber}.png`;
      pokemonContainer.appendChild(pokemonImage);
    });
  }
}