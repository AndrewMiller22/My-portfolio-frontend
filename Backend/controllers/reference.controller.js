const createError = require("http-errors");
const Reference = require('../models/reference.model');

const formatReference = (reference) => ({
    id: reference._id,
    name: reference.name,
    testimonial: reference.testimonial,
    position: reference.position,
    company: reference.company
});

exports.addReference = async (req,res, next) => {
    try {
        const reference = await Reference.create(req.body);

        res.status(201).json({
            success:true,
            message: "Reference added, great work!",
            data: formatReference(reference)
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllReferences = async (req,res,next) => {
    try {
        const references = await Reference.find();
        res.status(200).json({
            success: true,
            message: "References list retrieved!",
            data: references.map(formatReference)
        });
    } catch (error) {
        next(error);
    }
        
    };

    exports.getReferenceById = async (req,res,next) => {
        try {
            const reference = await Reference.findById(req.params.id);
            if (!reference) {
                return next(createError(404, "Reference not found"));
            };
            res.status(200).json({
                success: true,
                message: "Reference retrieved!",
                data: formatReference(reference)
            });
        } catch (error) {
            next(error);
        }
    };

    exports.updateReference = async (req,res,next) => {
        try {
            const reference = await Reference.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });

            if (!reference) {
                return next(createError(404, "Reference not found"));
            }

            res.status(200).json({
                success: true,
                message: "Reference updated!",
                data: formatReference(reference)
            });
        } catch (error) {
            next(error);
        }

    };
    exports.deleteReference = async (req,res,next) => {
        try {
            const reference = await Reference.findByIdAndDelete(req.params.id);

            if (!reference) {
                return next(createError(404, "Reference not found"));
            }

            res.status(200).json({
                success: true,
                message: "Reference has been deleted boss!"
            });
        } catch (error) {
            next(error);
            }


            
        };
