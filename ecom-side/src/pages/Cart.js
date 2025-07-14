import { useContext } from "react";
import CartContext from "../context/Cartcontext";

function Cart () {
    const { cart, setCart } = useContext(CartContext);

    const removeFromCart = (indexToRemove) => {
        const updatedCart = cart.filter((_, index) => index !== indexToRemove);
        setCart(updatedCart);
    };

    const handleCheckout = () => {
        // Enkel demo-handling – her kan du f.eks. koble på backend eller navigere til et betalingssteg.
        alert("Takk for din bestilling!");
        setCart([]); // Tømmer handlekurven etter checkout
    };

    return (
        <div className="mx-20 my-8">
            <h1 className="text-4xl font-semibold mb-6">Cart</h1>
            <div className="flex flex-col gap-6 p-4 bg-gray-200 rounded-lg shadow-md">

                {cart.length === 0 && (
                    <p>No products have been added to your cart</p>
                )}

                {cart.map((cartItem, index) => (
                    <div key={index} className="flex gap-4 items-center">
                        <img src={cartItem.imgUrl} className="w-[10rem] h-[10rem] object-cover" alt={cartItem.name} />
                        <div>
                            <h3 className="text-2xl">{cartItem.name}</h3>
                            <button 
                                className="text-red-500 underline"
                                onClick={() => removeFromCart(index)}
                            >
                                Remove from cart
                            </button>
                        </div>
                    </div>
                ))}

                {cart.length > 0 && (
                    <>
                        <div className="flex justify-between items-center mt-4">
                            <h2 className="text-2xl font-semibold">
                                Total: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
                            </h2>
                            <button 
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                                onClick={() => setCart([])}
                            >
                                Clear Cart
                            </button>
                        </div>

                        <button 
                            className="bg-blue-700 p-4 text-white rounded-xl text-center mt-4 hover:bg-blue-600 transition duration-300"
                            onClick={handleCheckout}
                        >
                            Checkout
                        </button>
                    </>
                )}

            </div>
        </div>
    );
}

export default Cart;
