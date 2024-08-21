import { useState, useEffect } from "react";
import Card from "../components/card";

interface Snippet {
  id: number;
  title: string;
  description: string;
  code: string;
  language: string;
}

const SearchSnippet = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSnippets = () => {
      try {
        const storedSnippet = window.localStorage.getItem("snippets");
        const parsedSnippets = storedSnippet ? JSON.parse(storedSnippet) : [];
        setSnippets(parsedSnippets);
      } catch (error) {
        console.error("Failed to parse snippets from local storage", error);
        setSnippets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleDelete = (id: number) => {
    const updatedSnippets = snippets.filter(snippet => snippet.id !== id);
    setSnippets(updatedSnippets);
    window.localStorage.setItem("snippets", JSON.stringify(updatedSnippets));
  };

  const filteredSnippets = snippets.filter(snippet =>
    snippet.title.toLowerCase().includes(searchQuery) ||
    snippet.description.toLowerCase().includes(searchQuery) ||
    snippet.code.toLowerCase().includes(searchQuery) ||
    snippet.language.toLowerCase().includes(searchQuery)
  );

  if (loading) {
    return <p className="text-center text-xl">Loading...</p>;
  }

  return (
    <div className="bg-nit-400 h-full rounded-3xl p-4 mt-5">
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search snippets..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 w-48 md:w-96 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nit-200"
        />
      </div>
      <div className="min-h-[79vh] h-full flex gap-3 justify-center flex-wrap items-center">
        {filteredSnippets.length > 0 ? (
          filteredSnippets.map((snippet) => (
            <Card key={snippet.id} snippet={snippet} onDelete={handleDelete} />
          ))
        ) : (
          <p className="text-center text-xl">No snippets found</p>
        )}
      </div>
    </div>
  );
};

export default SearchSnippet;
