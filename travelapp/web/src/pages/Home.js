import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        async function getCountries() {
            try {
                const response = await fetch('http://localhost:4002/countries');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error('Error fetching countries:', error);
                setCountries([]); // Set empty array if fetch fails
            }
        }
        getCountries();
    }
, []); // denne "[]" betyr at useEffect kun skal kjøre en gang når komponenten monteres og brukes veldig sjelden 

    return (
    
        <div className="grid grid-cols-4 gap-10 pt-8"> 
           {countries.map((country) => (
             <div key={country.id} className="flex flex-col gap-4">
             <img src={country.image} className="w-full h-64 object-cover rounded-lg" alt={country.name} />
             <h2 className="text-2xl font-semibold">
                {country.name}
             </h2>
             <Link to={`/country/${country.id}`} className="bg-blue-800 hover:underline px-4 py-2 text-white rounded-xl text-center">View Details</Link>
         </div>
           ))}
        
        </div>

    );
}

