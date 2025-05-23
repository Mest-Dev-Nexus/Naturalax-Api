import { deliveryAddressModel } from "../models/deliveryAddress.js";
import { deliveryAddressValidation } from "../validators/deliveryAddress.js";



export const addDelivery = async (req, res, next) => {
  try {
    const {error,value} = deliveryAddressValidation.validate(req.body,{abortEarly:false});
    if (error) {
      return res.status(422).json({
        message: "Validation error",
        error: error.details.map((detail)=>detail.message)
      })}
    const result = await deliveryAddressModel.create(value);
    return res.status(201).json({
      message: "delivery successfully created",
      data: result
    })
  } catch (error) {
    next(error)
  }
}  

export const getDelivery = async (req, res, next) =>{
 try {
  const {filter = '{}',sort = '{}'} = req.query;
      const result = await deliveryAddressModel.find(JSON.parse(filter)).sort(JSON.parse(sort))
      return res.status(200).json(result);
 } catch (error) {
  next(error)
 }
}

export const patchDelivery = async (req, res, next) =>{
  try {
   const result = await deliveryAddressModel.findByIdAndUpdate(req.params.id, req.body,{
    new:true,
    runValidators:true
   });
   if (!result){
    return res.status(404).json({
      message:"Delivery not found"
    })
   }
   return res.json({
    message: "Delivery updated successfully",
    data: result
  });
  } catch (error) {
   next(error)
  }
 }
export const deleteDelivery = async (req, res, next) =>{
  try {
   const result = await deliveryAddressModel.findByIdAndDelete(req.params.id);
   if (!result){
    return res.status(404).json({
      message:"Delivery not found"
    })
   }
   return res.json({
    message: "Delivery deleted successfully"
  });
  } catch (error) {
   next(error)
  }
 }