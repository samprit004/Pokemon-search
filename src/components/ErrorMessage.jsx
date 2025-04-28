const ErrorMessage = ({ message }) => {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
          <h2 className="font-bold text-lg mb-2">Error Loading Pokémon Data</h2>
          <p>{message}</p>
          <p className="mt-2 text-sm">Please try refreshing the page or check your internet connection.</p>
        </div>
      </div>
    );
  };
  
  export default ErrorMessage;