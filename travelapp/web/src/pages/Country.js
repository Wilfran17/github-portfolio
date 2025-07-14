import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function Country() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [country, setCountry] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getCountry = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:4002/country/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCountry(data);
                setError(null);
            } catch (error) {
                console.error('Error fetching country:', error);
                setError(error.message || 'Failed to fetch country details');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            getCountry();
        }
    }, [id]);

    const deleteCountry = async () => {
        try {
            const response = await fetch(`http://localhost:4002/delete-country/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Optionally, redirect or update state after deletion
            console.log('Country deleted successfully');
        } catch (error) {
            console.error('Error deleting country:', error);
        }
        navigate('/');
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }



    
    return (
        <div className="flex flex-col gap-4 pt-8">
            <img src={country ? country.image : ''} className="w-full h-96 object-cover rounded-lg" alt={country ? country.name : 'Country Image'} />
            <div className="flex justify-between items-center font-semibold">
            <h2 className="text-4xl font-semibold">
                {country ? country.name : 'Loading...'}
            </h2>
            <div className="flex gap-4">
                <button onClick={deleteCountry} className=" bg-red-500 hover:underline px-4 py-2 text-white rounded-xl">
                    Delete
                </button>
                <Link to={"/update-country/" + country.id} className=" bg-blue-500 hover:underline px-4 py-2 text-white rounded-xl">
                    Edit
                </Link>
            </div>
            </div>
            <p>
                {country ? country.description : 'Loading description...'}
            </p>
        </div>
    );
}