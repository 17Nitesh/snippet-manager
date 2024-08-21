import { useNavigate } from "react-router-dom";
import image from "../assets/altumcode-PNbDkQ2DDgM-unsplash.jpg";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

const Home = () => {
  const navigate = useNavigate();

  const navigateToAdd = () => {
    navigate("/add");
  };

  const navigateToSearch = () => {
    navigate("/search");
  };

  return (
    <>
      <div className="p-4 flex flex-col-reverse md:flex-row gap-5 md:gap-5 justify-center mt-5 md:mt-14 min-h-screen items-center md:items-start">
        <div className="flex flex-col bg-nit-400 p-8 py-14 rounded-2xl shadow-xl w-[70vw] min-h-[70vh] gap-10">
          <div className="">
            <h1 className="text-2xl font-bold text-gray-900 md:text-4xl">
              Streamline Your Workflow, Save and Manage Your Snippets
              Seamlessly.
            </h1>
          </div>
          <div className="flex flex-col">
            <p className="mt-4 text-lg text-gray-700 md:text-xl">
              Boost your productivity by organizing your{" "}
              <b>most-used code snippets.</b> No more searching through old
              files or projects—store everything in one convenient place and{" "}
              <b>access it whenever you need.</b>
            </p>
            <div
              className="bg-black mt-10 w-fit text-white rounded-full py-1 text-xl hover:text-2xl hover:py-2 px-6 transition-all duration-300 cursor-pointer"
              onClick={navigateToAdd}
            >
              Add Snippets
            </div>
            <div
              className="bg-black mt-5 w-fit text-white rounded-full py-1 text-xl hover:text-2xl hover:py-2 px-6 transition-all duration-300 cursor-pointer"
              onClick={navigateToSearch}
            >
              Search Snippets
            </div>
          </div>
        </div>
        <div className="w-[60vw] md:w-[50vw] px-10 mt-5 md:mt-0">
          <img
            src={image}
            alt="Streamline Your Workflow"
            className="rounded-full shadow-xl"
          />
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

export default Home;
