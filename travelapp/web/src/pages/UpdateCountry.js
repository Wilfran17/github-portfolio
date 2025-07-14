import { useState, useEffect, use } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateCountry() {

    const navigate = useNavigate();
    
    const { id } = useParams();
    const [country, setCountry] = useState({
        name: '',
        description: '',
        image: ''
    });

    const updateCountry = async (e) => {
        e.preventDefault();

        await fetch(`http://localhost:4002/update-country/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(country),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            if (data.success) {
                alert(`Country updated successfully: ${data.data.name}`);
                navigate('/'); // Navigate back to home after successful update
            } else {
                throw new Error(data.error || 'Failed to update country');
            }
        })
        .catch((error) => {
            console.error('Error updating country:', error);
            alert(error.message || 'Error updating country');
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCountry({
            ...country,
            [name]: value
        });
    };
   
    useEffect(() => {
        const getCountry = async () => {
            try {
                const response = await fetch(`http://localhost:4002/country/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCountry(data);
            } catch (error) {
                console.error('Error fetching country:', error);
            }
        };
        getCountry();
    }, [id]);

    return (
        <div className="flex flex-col gap-4 pt-8">
           <div className="flex-col gap-4 pt-8">
            <h2 className="text-2xl font-semibold mb-4">Update {country.name}</h2>
          
            <form onSubmit={updateCountry} className="bg-gray-200 p-6 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Country Name</label>
                    <input 
                        name='name' 
                        value={country.name} 
                        onChange={handleInputChange} 
                        type="text" 
                        className="w-full px-3 py-2 border rounded" 
                        placeholder="Enter country name" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Description</label>
                    <input 
                        name='description' 
                        value={country.description} 
                        onChange={handleInputChange} 
                        type="text" 
                        className="w-full px-3 py-2 border rounded" 
                        placeholder="Enter country description" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Image URL</label>
                    <input 
                        name='image' 
                        value={country.image} 
                        onChange={handleInputChange} 
                        type="text" 
                        className="w-full px-3 py-2 border rounded" 
                        placeholder="Enter image URL" 
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white hover:bg-blue-400 px-4 py-2 rounded">
                    Update Country
                </button>
            </form>
        </div>
        </div>
    );
}