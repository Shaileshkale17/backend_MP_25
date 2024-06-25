console.log('Customer routes loaded');

import express from 'express';
import {
    createCustomer,
    deleteCustomer,
    getCustomerById,
    getCustomers,
    updateCustomer,
    
} from '../Controllers/customerController.js';

const router = express.Router();

router.post('/save', createCustomer);
router.get('/fetch-all', getCustomers);
router.get('/fetch/:id', getCustomerById);
router.put('/update/:id', updateCustomer);
router.delete('/delete/:id', deleteCustomer);

export default router;
