import {ProductModel} from "../models/products.js";
import { addProductValidator } from "../validators/products.js";


export const addProduct = async (req, res, next) => {
    try {
      console.log(req.auth);
      //validate product information
      const { error, value } = addProductValidator.validate({
        ...req.body,
  
        // image: req.file?.filename,
  
        pictures: req.files?.map((file) => {
          return file.filename;
        }),
      });
      if (error) {
        return res.status(422).json(error);
      }
  
      //save product information in database
      const result = await ProductModel.create({
        ...value,
        userId: req.auth.id,
      });
      // Return response
      res.json(result);
    } catch (error) {
      if (error.name === "MongooseError") {
        return res.status(409).json(error.message);
      }
      next(error);
    }
  };
  
  export const getProducts = async (req, res, next) => {
    try {
      const { filter = "{}", sort = "{}" } = req.query;
      // Fetch products from database
      const result = await ProductModel.find(JSON.parse(filter)).sort(
        JSON.parse(sort)
      );
  
      // Return respone
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
  
  export const countProducts = (req, res) => {
    res.send("Products counted!");
  };
  
  export const updateProduct = (req, res) => {
    res.send(`Products with id ${req.params.id} updated`);
  };
  
  export const replaceProduct = async (req, res, next) =>{
    
    const result = await ProductModel.findOneAndReplace(
           { _id: req.params.id},
           req.body,
           {new: true}
    );
    // Return Respone
  
  }
  
  export const deleteProduct = (req, res) => {
    res.send(`Products with id ${req.params.id} deleted`);
  };
  