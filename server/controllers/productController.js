import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";
import { upload } from '../configs/multer.js'

// do we need {upload} from multer here?? 

// Add Product : /api/product/add
export const addProduct = async (req, res) => {
    console.log("spot a")

    try {
    // gets product info in the form of a JSON from the request body
//         let productData = JSON.parse(req.body.productData);
//        
// // takes images in the form of files
//         const images = req.files;

//         let imagesUrl = await Promise.all(
//             images.map(async (image) => {
//                 // gets the URL of the newly uploaded image, saved as "result"
//                 let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
//                 // the url is made secure by this method.
//                 return result.secure_url
//             })
//         )
//     // creates product data in the database
        //         await Product.create({...productData, image: imagesUrl})
        let newProduct = {};
        await Product.create({
            ...newProduct,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            offerPrice: req.body.offerPrice,
            image: req.body.image,
            category: req.body.category
        })

        res.json({ success: true, message: "Product Added!" });
        // OK the above code WORKS to upload stuff. We made the model not require anything just yet, and it'll get the names from the stuff... BUT we don't have cloudinary in here anywhere... At least it'll upload tho! 

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
} 

// Get Product : /api/product/list
// tested and works! 
export const productList = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
    
} 

// Get Single Product : /api/product/id
export const productById = async (req, res) => {
    try {
        const { id } = req.body
        const product = await Product.findById(id);
        res.json({ success: true, product });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
} 

// Change Product inStock : /api/product/stock
// tested, works, but didn't send data.
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        await Product.findByIdAndUpdate(id, { inStock });
        res.json({ success: true, message: "Stock Updated" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
} 