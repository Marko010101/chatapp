import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SpinnerFullPage from "../ui/SpinnerFullPage.jsx";
import { searchGoogle } from "../services/apiGoogleSearch.js";

function Search() {
  const [query, setQuery] = useState("");

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["search", query], // Pass queryKey as an object
    queryFn: () => searchGoogle(query),
    enabled: false, // disable automatic refetch
  });

  const handleSearch = () => {
    refetch();
  };

  console.log(data);

  if (isLoading) return <SpinnerFullPage />;

  return (
    <div>
      <h1>Search Google</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search term"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default Search;
