const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
        <span className="ml-4 text-xl font-semibold">Loading Pokémon...</span>
      </div>
    );
  };
  
  export default LoadingSpinner;