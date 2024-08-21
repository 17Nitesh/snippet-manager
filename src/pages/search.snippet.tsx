import { useState, useEffect } from "react";
import Card from "../components/card";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { CgWebsite } from "react-icons/cg";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

interface Snippet {
  id: number;
  title: string;
  description: string;
  code: string;
  language: string;
}

const SearchSnippet = () => {
  const [all, showAll] = useState(false);
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const setShowAll = () => {
    showAll(!all);
  };

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
    const updatedSnippets = snippets.filter((snippet) => snippet.id !== id);
    setSnippets(updatedSnippets);
    window.localStorage.setItem("snippets", JSON.stringify(updatedSnippets));
  };

  const filteredSnippets = snippets.filter(
    (snippet) =>
      snippet.title.toLowerCase().includes(searchQuery) ||
      snippet.description.toLowerCase().includes(searchQuery) ||
      snippet.code.toLowerCase().includes(searchQuery) ||
      snippet.language.toLowerCase().includes(searchQuery)
  );

  const topSnippets = filteredSnippets
    .slice(filteredSnippets.length - 6, filteredSnippets.length)
    .reverse(); // Reverse the top 6 snippets

  if (loading) {
    return <p className="text-center text-xl">Loading...</p>;
  }

  const navigateToAdd = () => {
    navigate("/add");
  };

  return (
    <>
      <div className="bg-nit-400 h-full rounded-3xl p-4 mt-5 flex flex-col items-center">
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
            all ? (
              filteredSnippets.map((snippet) => (
                <Card
                  key={snippet.id}
                  snippet={snippet}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              topSnippets.map((snippet) => (
                <Card
                  key={snippet.id}
                  snippet={snippet}
                  onDelete={handleDelete}
                />
              ))
            )
          ) : (
            <div className="flex flex-col gap-5 justify-center text-center">
              <p className="text-center text-xl">No snippets found</p>
              <div
                className="bg-black text-white rounded-full py-1 text-xl hover:text-2xl hover:py-2 px-6 transition-all duration-300 cursor-pointer"
                onClick={navigateToAdd}
              >
                Add Snippets
              </div>
            </div>
          )}
        </div>
        <div
          className="text-4xl mt-5 cursor-pointer font-bold"
          onClick={setShowAll}
        >
          {all ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
        </div>
      </div>
      <footer className="w-full bg-nit-400 py-4 mt-10 text-center text-slate-500 rounded-2xl">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} Snippet. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://www.instagram.com/n.bhardwaj_04"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:underline"
          >
            <FaInstagram className="mr-2 text-xl" /> Instagram
          </a>
          <span className="hidden sm:inline"> | </span>
          <a
            href="https://portfolio-nitesh.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:underline"
          >
            <CgWebsite className="mr-2 text-xl" /> Portfolio
          </a>
          <span className="hidden sm:inline"> | </span>
          <a
            href="https://www.linkedin.com/in/nitesh-bhardwaj-87294a252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:underline"
          >
            <FaLinkedinIn className="mr-2 text-xl" /> LinkedIn
          </a>
          <span className="hidden sm:inline"> | </span>
          <a
            href="https://github.com/17Nitesh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:underline"
          >
            <FaGithub className="mr-2 text-xl" /> GitHub
          </a>
        </div>
      </footer>
    </>
  );
};

export default SearchSnippet;
