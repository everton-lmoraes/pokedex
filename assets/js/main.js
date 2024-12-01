const pokemonList = document.getElementById ('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 10
let offset = 0

const modal = document.getElementById('pokemonModal')
const modalName = document.getElementById('modalName')
const modalHeight = document.getElementById('modalHeight')
const modalWeight = document.getElementById('modalWeight')
const closeModal = document.getElementById('closeModal')


function loadPokemonItens (offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}"
                data-name="${pokemon.name}" 
                data-height="${pokemon.height}" 
                data-weight="${pokemon.weight}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                        
                    <img src= "${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `).join('')

        pokemonList.innerHTML += newHtml

        // Adiciona evento de clique aos itens
        addClickEventToItems()

    })
}

function addClickEventToItems() {
    const pokemonItems = document.querySelectorAll('.pokemon');
    pokemonItems.forEach((item) => {
        item.addEventListener('click', () => {
            const name = item.getAttribute('data-name')
            const height = item.getAttribute('data-height')
            const weight = item.getAttribute('data-weight')

            // Exibe as informações no modal
            modalName.textContent = name
            modalHeight.textContent = `Height: ${height}`
            modalWeight.textContent = `Weight: ${weight}`
            modal.style.display = 'flex'
        })
    })
}

// Fecha o modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none'
})

// Fecha o modal ao clicar fora do conteúdo
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none'
    }
})

// Carrega os primeiros Pokémons
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordWithNextPage = offset + limit
    if(qtdRecordWithNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
     
        loadMoreButton.parentElement.removeChild(loadMoreButton)
        return
    } else{
        loadPokemonItens(offset, limit)
    }
})