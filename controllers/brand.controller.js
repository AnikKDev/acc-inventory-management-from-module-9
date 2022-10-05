const { createBrandService, getBrandsService, getBrandByIdService, updateBrandService } = require("../services/brand.service")

module.exports.createBrand = async (req, res, next) => {
    try {
        const result = await createBrandService(req.body)
        res.status(200).send({
            success: true,
            message: "Brand added successfully",
            data: result
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Couldn't create brand"
        })
    }
}
module.exports.getBrands = async (req, res, next) => {
    try {
        const result = await getBrandsService(req.body)
        res.status(200).send({
            success: true,
            message: "Brand shown successfully",
            data: result
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Couldn't get the brand"
        })
    }
}
module.exports.getBrandById = async (req, res, next) => {
    try {
        const result = await getBrandByIdService(req.params.id);
        if (!result) {
            res.status(400).json({
                success: false,
                message: "Couldn't get the brand"
            })
        }
        res.status(200).send({
            success: true,
            message: "Brand shown successfully",
            data: result
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Couldn't get the brand"
        })
    }
}
module.exports.updateBrand = async (req, res, next) => {
    try {
        const result = await updateBrandService(req.params.id, req.body);
        if (!result.nModified) {
            res.status(400).json({
                success: false,
                message: "Couldn't update the brand"
            })
        }
        res.status(200).send({
            success: true,
            message: "Brand update successfully",
            data: result
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Couldn't update the brand"
        })
    }
}