const PokemonList = ({ pokemon }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemon.map(p => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    );
  };
  
  const PokemonCard = ({ pokemon }) => {
    const typeColors = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-200',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-300',
      psychic: 'bg-pink-500',
      bug: 'bg-green-400',
      rock: 'bg-yellow-700',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-700',
      dark: 'bg-gray-800',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300',
    };
  
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="bg-gray-200 p-4 flex justify-center">
          <img 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name}
            className="h-32 w-32 object-contain"
          />
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold capitalize">{pokemon.name}</h3>
            <span className="text-gray-600">#{pokemon.id.toString().padStart(3, '0')}</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {pokemon.types.map((type, index) => (
              <span 
                key={index}
                className={`${typeColors[type.type.name] || 'bg-gray-400'} text-white px-3 py-1 rounded-full text-xs font-medium capitalize`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default PokemonList;