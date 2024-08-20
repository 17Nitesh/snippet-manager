import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Snippet {
  title: string;
  description: string;
  code: string;
  language: string;
}

const Card = ({ snippet }: { snippet: Snippet }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet.code);
    toast("Code copied to clipboard!", {
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
          
        },
    })
  };

  return (
    <div className="flex flex-col bg-nit-100 w-80 p-5 rounded-2xl shadow-lg max-h-96 text-lg text-semibold">
      <div>
        Title: <span className="text-pink-600">{snippet.title}</span>
      </div>
      <div>
        Code:
        <textarea
          readOnly
          className="w-full rounded-2xl text-pink-500 p-2 mt-2 hover:bg-nit-200 hover:opacity-10 cursor-pointer overflow-hidden"
          rows={7}
          style={{ resize: "none" }}
          value={snippet.code}
          onClick={copyToClipboard}
        />
      </div>
      
      <div>
        Language: <span className="text-pink-600">{snippet.language}</span>
      </div>
    </div>
  );
};

export default Card;
