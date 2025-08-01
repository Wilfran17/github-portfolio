import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Productt (){

    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        
        async function fetchProducts() {

            await fetch('https://play-ecom-api.allcodeapp.com/api/products')
                .then(async (data) => {
                    const response = await data.json();
                    setProducts(response);
                });
        }

        fetchProducts();
    }, []);

    return (
        <div className="20-p mt-[orem] m-4">
            <h1 className="text-3xl font-semibold mb-4">Products</h1>
            <div className=" grid grid-cols-5   gap-6">
                {products.map((product, index) => (
                    <Product product={product} key={index}/>
                ))}
            </div>

        </div>
    );
}

function Product({product}) {
    return (
        <div className="flex flex-col p-4 gap-4 bg-gray-300 rounded-xl shadow-md justify-between">
            <img src={product.imgUrl} className="w-full h-[10rem] object-cover"/>
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="">{product.rating} / 5</p>
            <Link to={"/Products/" + product.id} className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition duration-300 text-center">
             View Product
            </Link>
        </div>
    );
}

export default Productt;