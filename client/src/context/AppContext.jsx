import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

// this is how the client accesses the server. 
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY; 
    // VITE_CURRENCY declared in .env file

    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)  //So somehow logging in must change this from false to true... 
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])

    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})

    // Fetch Seller Status - allows seller to refresh page and stay logged in.
    const fetchSeller = async () => {
        try {
            // api call
            const { data } = await axios.get('/api/seller/is-auth');
            if (data.success) {
                setIsSeller(true)
            } else {
                setIsSeller(false)
            }
        } catch (error) {
                setIsSeller(false)
        }
    }

    // Fetch User Auth Status, User Data and Cart Items
    const fetchUser = async () => {
        try {
            //  api call
             const { data } = await axios.get('/api/user/isauth')
            if (data.success) {
                setUser(data.user);
                setCartItems(data.user.cartItems);
             }
         } catch (error) {
            setUser(null);
         }
     }

    // Fetch All Products
    const fetchProducts = async () => {
        // placeholder code - dummyProducts
        // setProducts(dummyProducts)

        try {
            // api call
            const { data } = await axios.get('/api/product/list');
            if (data.success) {
                console.log(data.products);
                setProducts(data.products)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
                toast.error(error.message);
            
        }
    }

    // Add Product to Cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to Cart")
    }

    // Update Cart Item Quantity
    const updateCartItems = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart Updated!")
    }

    // Remove Product from Cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success("Removed from Cart")
        setCartItems(cartData)
    }

    // Get Cart Item Count
    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    }
    // Get Cart Total Amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }


    useEffect(() => {
        // checks if seller is logged in, hopefully stays logged in
        fetchSeller();
        // gets products from database and displays them on Product List page
        fetchProducts(); 
        // checks if user is authenticated/logged in
        fetchUser();
        console.log("Hello")
    },[])

    const value = {
        navigate, user, setUser, setIsSeller, isSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItems, removeFromCart, cartItems, searchQuery, setSearchQuery, getCartAmount, getCartCount, axios, fetchProducts
    };
    
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}