const createError = require('http-errors');
const Service = require('../models/service.model');

const formatService = (service) => ({
    id: service._id,
    title: service.title,
    description: service.description
});

exports.addService = async (req,res, next) => {
    try {
        const service = await Service.create(req.body);

        res.status(201).json({
            success: true,
            message: "Service added, Great work!",
            data: formatService(service)
        });
    } catch (error) {
        next(error);
    }
    
};

exports.getAllServices = async (req,res,next) => {
    try {
const services = await Service.find();

        res.status(200).json({
            success: true,
            message: "Services list retrieved!",
            data: services.map(formatService)
            
        });
    } catch (error) {
        next(error);
    }
};
exports.getServiceById = async (req,res,next) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return next(createError(404, "Service not found"));
        }
        res.status(200).json({
            success: true,
            message: "Service retrieved!",
            data: formatService(service)
        });
    } catch (error) {
        next(error);
    }
};
exports.updateService = async (req,res,next) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        
        if (!service) {
            return next(createError(404, "Service not found"));
        }

        res.status(200).json({
        success: true,
        message: "Service has been updated boss!" 
    
    });
    
    } catch (error) {
        next(error);
    }
};

exports.deleteService = async (req, res, next) => {
    try{
        const service = await Service.findByIdAndDelete(req.params.id);

        if (!service) {
            return next(createError(404, "Service not found"));
        }

        res.status(200).json({
            success: true,
            message: "Service has been destroyed, RIP!"
        });
        
    } catch (error) {
        next(error);

    }
};
