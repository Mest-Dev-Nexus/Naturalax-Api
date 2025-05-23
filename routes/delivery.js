import { Router } from "express";


import { 
  isAuthenticated, 
  normalizeAuth, 
  authorizeRole,
  authorizeAdmin // Using authorizeAdmin for highest level admin (superadmin)
} from '../middlewares/auth.js';
import { addDelivery, deleteDelivery, getDelivery, patchDelivery } from "../controllers/delivery.js";

const deliveryRouter = Router();


deliveryRouter.get('/delivery', isAuthenticated, normalizeAuth, 
  authorizeRole(["admin"]) , getDelivery);



deliveryRouter.post('/delivery',isAuthenticated, normalizeAuth, 
  authorizeAdmin("super"), addDelivery);


deliveryRouter.patch('/delivery/:id', isAuthenticated,normalizeAuth, 
  authorizeAdmin("super"), patchDelivery);


deliveryRouter.delete('/delivery/:id', isAuthenticated,normalizeAuth, 
  authorizeAdmin("super"),deleteDelivery);






export default deliveryRouter;