import { useState } from 'react';
import { data } from 'react-router-dom';

export default function AddCountry() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: ''
    });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const submitCountry = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4002/add-country', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setSuccess('Country added successfully!');
                setError('');
            } else {
                setError(data.error || 'Failed to add country');
                setSuccess('');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding country');
        }
    };

    return (
        <div className="flex-col gap-4 pt-8">
            <h2 className="text-2xl font-semibold mb-4">Add a New Country</h2>
            { success ? <p className="text-green-500 mb-4">
                {success}
            </p> : null }
            { error ? <p className="text-red-500 mb-4">
                {error}
            </p> : null }
            <form onSubmit={submitCountry} className="bg-gray-200 p-6 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Country Name</label>
                    <input 
                        name='name' 
                        value={formData.name} 
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
                        value={formData.description} 
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
                        value={formData.image} 
                        onChange={handleInputChange} 
                        type="text" 
                        className="w-full px-3 py-2 border rounded" 
                        placeholder="Enter image URL" 
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white hover:bg-blue-400 px-4 py-2 rounded">
                    Add Country
                </button>
            </form>
        </div>
    );
}