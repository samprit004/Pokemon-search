import { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList';
import SearchFilter from './components/SearchFilter';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
      
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await response.json();
        
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );
        
        setPokemonData(pokemonDetails);
        setFilteredPokemon(pokemonDetails);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    let results = pokemonData;
    
    //name
    if (searchTerm) {
      results = results.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    //type
    if (selectedType !== 'all') {
      results = results.filter(pokemon => 
        pokemon.types.some(type => type.type.name === selectedType)
      );
    }
    
    setFilteredPokemon(results);
  }, [searchTerm, selectedType, pokemonData]);

  
  const allTypes = [...new Set(
    pokemonData.flatMap(pokemon => 
      pokemon.types.map(type => type.type.name)
    )
  )].sort();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Pokémon Explorer</h1>
          <p className="mt-2">Discover the first 150 Pokémon!</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <SearchFilter 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          allTypes={allTypes}
        />
        
        {filteredPokemon.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-700">No Pokémon found matching your criteria</h2>
          </div>
        ) : (
          <PokemonList pokemon={filteredPokemon} />
        )}
      </main>
    </div>
  );
}

export default App;
