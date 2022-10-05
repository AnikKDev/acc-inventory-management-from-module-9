const Brand = require('../models/Brand')

module.exports.createBrandService = async (data) => {
    const result = await Brand.create(data);
    return result
}

module.exports.getBrandsService = async () => {
    const result = await Brand.find({}).select('-products -suppliers');
    return result
}
module.exports.getBrandByIdService = async (id) => {
    const result = await Brand.findOne({ _id: id });
    return result
}
module.exports.updateBrandService = async (id, data) => {
    const result = await Brand.updateOne({ _id: id }, data, {
        runValidators: true
    })
    return result
}