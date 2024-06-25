import Customer from '../Models/customer.js';
import asyncHandler from '../utils/asyncHandler.js';
import { v4 as uuidv4 } from 'uuid';


export const createCustomer = asyncHandler(async (req, res) => {
    const { name, email, mobile, projectName, projectLocation  } = req.body;
    const emailFound = await Customer.findOne({email});
    if (emailFound){
        return res.status(400).json({ message: 'This customer already exits.' });
    }
    const customerId = uuidv4();
    Customer.create({
        name, 
        email, 
        mobile, 
        projectName, 
        projectLocation, 
        customerId
    })
    res.status(201).json({
        name, 
        email, 
        mobile, 
        projectName, 
        projectLocation, 
        customerId
    })
});


export const getCustomers = asyncHandler(async (req, res) => {
    const customers = await Customer.find();
    res.status(200).json(customers);
});


export const getCustomerById = asyncHandler(async (req, res) => {
    const registeredCustomer = await Customer.find({"customerId" : req.params.id});
    if (!registeredCustomer) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json(registeredCustomer);
});


export const updateCustomer = asyncHandler(async (req, res) => {
    const { name, email, mobile } = req.body;
    const customer = await Customer.findByIdAndUpdate(req.params.id, { name, email, mobile }, { new: true, runValidators: true });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json(customer);
});


export const deleteCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json({ message: 'Customer deleted' });
});
