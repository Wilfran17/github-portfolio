import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import CartContext from "../context/Cartcontext";

function ProductPage () {
 
    const { id } = useParams();
    const [product, setProduct] = useState({});

    const { cart, setCart } = useContext(CartContext);

    const addToCart = () => {

        if (cart.some((item) => item.id === product.id)) {
            alert("Product already in cart");
            return;
        }
        setCart([...cart, product]);
        alert("Product added to cart");

    }
 
    useEffect(() => {

        async function fetchProduct() {
            await fetch(`https://play-ecom-api.allcodeapp.com/api/products/` + id)
                .then(async (data) => {

                    const response = await data.json();
                    setProduct(response);
                });
        }
        fetchProduct();

    }, []);

    

    return (
        <div className="flex gap-8 p-4 mx-20 my-8 bg-gray-200 rounded-lg shadow-md">
            <img src={product.imgUrl} className="w-1/4  object-cover rounded-lg shadow-lg" />
            <div className="flex flex-col gap-3">
                <h1 className="font-semibold text-2xl">{product.name}</h1>
                <p className="text-gray-700 ">{product.description}</p>
                <b>Rating {product.rating} / 5</b>
                <button onClick={addToCart} className="bg-blue-700 text-white px-3 py-2 rounded-lg hover:bg-blue-800 transition duration-300 w-1/4">
                    Add to Cart
                </button>
            </div>
        </div>
       

  );
}

export default ProductPage;