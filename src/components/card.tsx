import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Snippet {
  id: number;
  title: string;
  description: string;
  code: string;
  language: string;
}

const Card = ({ snippet, onDelete }: { snippet: Snippet, onDelete: (id: number) => void }) => {
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
        backgroundColor: '#f2d9e0',
        color: 'black',
        borderRadius: '20px',
        padding: '10px',
        fontFamily: 'Josefin Sans',
      },
    });
  };

  const handleDelete = () => {
    onDelete(snippet.id);
    toast("Snippet deleted!", {
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
  };

  return (
    <div className="flex relative flex-col bg-nit-100 w-80 p-5 rounded-2xl shadow-lg max-h-96 text-lg text-semibold">
      <div
        className="absolute top-5 right-5 py-1 px-2 bg-red-500 text-white rounded-full hover:bg-red-700 cursor-pointer"
        onClick={handleDelete}
      >
        Delete
      </div>
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
