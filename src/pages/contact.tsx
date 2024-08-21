import { useState } from "react";
import { CgWebsite } from "react-icons/cg";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { toast } from "react-toastify";
import { z } from "zod";
import image from "../assets/me.jpg";

const Contact = () => {
  const contactSchema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().nonempty("Message is required"),
  });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult("Sending....");

    try {
      
      contactSchema.parse(form);
      

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("message", form.message);
      formData.append("access_key", "deba6966-d5a7-45db-ae50-2816ebc4ea1c");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        setForm({ name: "", email: "", message: "" });
        setErrors({});
        toast("Message sent successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: '#f2d9e0',
            color: 'black',
            borderRadius: '20px',
            padding: '10px',
            fontFamily: 'Josefin Sans',
          },
        });
      } else {
        console.log("Error", data);
        setResult(data.message || "An error occurred");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          errorMessages[err.path[0] as string] = err.message;
        });
        setErrors(errorMessages);
      } else {
        setResult("An error occurred");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center lg:flex-row justify-center lg:gap-24 pb-4">
        <div>
          <img
            src={image}
            alt="Contact Image"
            className="h-[60vh] w-[60vh] rounded-full border-4 border-nit-600 shadow-lg object-cover"
          />
        </div>
        <div className="bg-nit-400 h-full md:w-[50vw] lg:w-[40vw] w-full rounded-3xl py-4 px-10 mt-5 border-2 border-black shadow-xl">
          <div className="text-center font-bold text-5xl my-6 mt-2">
            Get In touch
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 text-xl px-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                className={`p-1 rounded-xl px-2 w-full text-base text-gray-800 ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                className={`p-1 rounded-xl px-2 w-full text-base text-gray-800 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message">Your Message:</label>
              <textarea
                name="message"
                id="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Enter Your Message Here"
                className={`p-3 rounded-xl text-base w-full text-md text-gray-800 ${errors.message ? "border-red-500" : ""}`}
                style={{ resize: "none" }}
              ></textarea>
              {errors.message && <span className="text-red-500 text-sm">{errors.message}</span>}
            </div>
            <button
              type="submit"
              className="bg-black text-white rounded-full py-2 px-6 text-xl hover:bg-nit-600 transition-all duration-300"
            >
              Submit Form
            </button>
          </form>
          {result && <p className="text-center text-xl mt-4">{result}</p>}
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

export default Contact;
