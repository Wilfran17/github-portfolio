import { Link, link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-semibold">Alltravel</Link>
                <Link to="/add-country" className="bg-blue-500 text-white hover:bg-blue-400 px-4 py-2 rounde-xl">Add Country</Link>
            </div>
        </nav>
    );
}