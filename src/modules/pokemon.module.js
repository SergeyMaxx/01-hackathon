import {Module} from '../core/module';

export class PokemonModule extends Module {
  trigger() {
    super.trigger();

    const container = document.createElement('div');
    const showPokemonButton = document.createElement('button');
    showPokemonButton.textContent = 'Показать покемона';
    showPokemonButton.classList.add('press')
    const pokemonContainer = document.createElement('div');
    container.append(showPokemonButton, pokemonContainer);
    document.body.append(container)

    showPokemonButton.addEventListener('click', () => {
      const randomPokemonNumber = Math.floor(Math.random() * 898) + 1;

      const pokemonImage = document.createElement('img');
      pokemonImage.classList.add('pokemon-image');
      pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemonNumber}.png`;
      pokemonContainer.appendChild(pokemonImage);
    });
  }
}