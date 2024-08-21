import { useState } from "react";
import { CgWebsite } from "react-icons/cg";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { toast } from "react-toastify";
import { z } from "zod";

const AddSnippet = () => {
  const snipSchema = z.object({
    id: z.number(),
    title: z.string().min(1, "Title is required"),
    code: z.string().min(1, "Code is required"),
    description: z.string().min(1, "Description is required"),
    language: z.string().min(1, "Language is required"),
  });

  const [snippet, setSnippet] = useState({
    id: Date.now(),
    title: "",
    code: "",
    description: "",
    language: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setSnippet((prevSnippet) => ({
      ...prevSnippet,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      snipSchema.parse(snippet);

      const storedSnippets = localStorage.getItem("snippets");
      const snippets = storedSnippets ? JSON.parse(storedSnippets) : [];

      const updatedSnippets = [...snippets, snippet];

      localStorage.setItem("snippets", JSON.stringify(updatedSnippets));

      setSnippet({
        id: Date.now(),
        title: "",
        code: "",
        description: "",
        language: "",
      });
      toast("Snippet Saved Succesfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: '#f2d9e0', // Your primary color
          color: 'black', // Text color
          borderRadius: '20px',
          padding: '10px',
          fontFamily: 'Josefin Sans',
          
        },})

      setErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors: { [key: string]: string } = {};
        err.errors.forEach((error) => {
          formattedErrors[error.path[0] as string] = error.message;
        });
        setErrors(formattedErrors);
      }
    }
  };

  return (<>
    <div className="bg-nit-400 h-full rounded-3xl p-4 mt-5 flex flex-col justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-5 justify-center items-center"
      >
        <div>
          <div className="text-4xl font-semibold p-5">Add Snippets</div>
          <div className="gap-1 my-1 text-xl bg-nit-300 py-4 px-6 rounded-2xl shadow-2xl w-54S md:w-full">
            <div className="flex flex-col">
              <label htmlFor="title" className="">
                Title :
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={snippet.title}
                onChange={handleInputChange}
                className="bg-nit-white rounded-lg text-lg p-1 shadow-sm"
                placeholder="Title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 my-1 w-full text-xl">
              <label htmlFor="description" className="mt-2">
                Description :
              </label>
              <textarea
                name="description"
                id="description"
                value={snippet.description}
                onChange={handleInputChange}
                className="bg-white rounded-lg text-lg p-2 shadow-sm"
                placeholder="Enter snippet description"
                rows={4}
                style={{ resize: "none" }}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>
          </div>
        </div>
        <div className="bg-nit-300 py-4 px-6 rounded-2xl shadow-2xl w-full h-full flex flex-col justify-center gap-5 mx-5 my-5">
          <div className="text-xl flex flex-col md:flex-row gap-3">
            <label htmlFor="language">Language :</label>
            <select
              name="language"
              id="language"
              value={snippet.language}
              onChange={handleInputChange}
              className="rounded-lg bg-white hover:bg-nit-400 focus:bg-nit-400 focus:ring-2 focus:ring-nit-200 text-center text-black p-2"
            >
              <option value="">Select a language</option>
              <option value="c++">C++</option>
              <option value="java">Java</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="ruby">Ruby</option>
              <option value="other">Other</option>
            </select>
            {errors.language && (
              <p className="text-red-500 text-sm mt-1">{errors.language}</p>
            )}
          </div>
          <div className="text-xl flex flex-col">
            <label htmlFor="code">Code :</label>
            <textarea
              name="code"
              id="code"
              value={snippet.code}
              onChange={handleInputChange}
              className="p-4 m-2 rounded-2xl text-lg"
              rows={13}
              placeholder="Paste your code here"
              style={{ resize: "none" }}
            />
            {errors.code && (
              <p className="text-red-500 text-sm mt-1">{errors.code}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-black text-white p-2 rounded-full shadow-lg hover:text-xl w-40 transition-all duration-300"
          >
            Add Snippet
          </button>
        </div>
      </form>
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
  </footer></>
  );
};

export default AddSnippet;
