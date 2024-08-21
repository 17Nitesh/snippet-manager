import { useState } from "react"
import { CgMenuGridO } from "react-icons/cg"
import { Link } from "react-router-dom"

const Nav = () => {
    const [expanded, setExpanded] = useState(false);
    const menu = () =>{
        setExpanded(!expanded);
    }

  return (
    <div className={`font-josefin flex flex-col text-center md:flex-row justify-between items-center py-4 ${expanded?"border-b-2 md:border-b-0 border-black":""}`}>
        <div className="border-b-2 border-black w-full md:w-auto md:border-b-0">
            <h1 className="font-bold text-3xl">{`<Snippet />`}</h1>
            <CgMenuGridO className="md:hidden absolute text-3xl top-4 right-10 cursor-pointer" onClick={menu} />
        </div>
        <div className="">
            {expanded?<ul className="list-none flex-row md:hidden items-center font-semibold text-lg md:gap-14">
                <Link to={'/'}>
                    <li className="cursor-pointer my-4 md:my-0 hover:text-xl transition-all duration-300">Home</li>
                </Link>
                <Link to={'/add'}>
                    <li className="cursor-pointer my-4 md:my-0 hover:text-xl transition-all duration-300">Add Snippet</li>
                </Link>
                <Link to={'/search'}>
                    <li className="cursor-pointer my-4 md:my-0 hover:text-xl transition-all duration-300">Search Snippet</li>
                </Link>
            </ul>:null}
                <div className="md:block hidden">
                <ul className="list-none flex-row md:flex items-center font-semibold text-lg md:gap-14">
                <Link to={'/'}>
                    <li className="cursor-pointer my-4 md:my-0 hover:text-xl transition-all duration-300">Home</li>
                </Link>
                <Link to={'/add'}>
                    <li className="cursor-pointer my-4 md:my-0 hover:text-xl transition-all duration-300">Add Snippet</li>
                </Link>
                <Link to={'/search'}>
                    <li className="cursor-pointer my-4 md:my-0 hover:text-xl transition-all duration-300">Search Snippet</li>
                </Link>
            </ul>
                </div>
            
            
        </div>
        <div className="hidden md:flex list-none items-center font-semibold text-lg gap-14 text-nit-100 bg-black hover px-3 py-1 rounded-full">
            <Link to={'/contact'}>
                <li className="cursor-pointer hover:text-xl transition-all duration-300">Contact</li>
            </Link>
        </div>
    </div>
  )
}

export default Nav
