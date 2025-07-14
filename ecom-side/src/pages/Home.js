import { useEffect, useState } from "react";
import { Link } from "react-router";
import Productt from "../components/Product";

function Home(){
   
  const [featured, setFeatured] = useState([]);
  
  useEffect(() => {

    async function fetchFeaturedProducts() {
      
    await fetch('https://play-ecom-api.allcodeapp.com/api/featured') 
     .then(async (data) => {

        const response = await data.json();
        setFeatured(response);
    
    });

    }     

    fetchFeaturedProducts();
 
  },[]);

    return (
        <main>
            <header className="h-[30rem] w-screen relative">
                <img src={featured.bannerUrl}  className="w-screen h-[30rem] object-cover" />
                <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col justify-center items-center text-white">
                    <h1 className="text-6xl font-bold mb-4">{featured.promoTitle}</h1>
                    <Link to={"/products/" + featured.id} 
                    className="bg-white text-black px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ">
                        View Product
                    </Link>
                    </div>
            </header>
            <Productt />
        </main>
    );
}

export default Home;