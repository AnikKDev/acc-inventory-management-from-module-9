const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;
// creating brand schema
const brandSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 100,
        required: [true, "Please provide brand name"],
        unique: true,
        trim: true,
        lowercase: true
    },
    description: String,
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email"],
        lowercase: true
    },
    website: {
        type: String,
        validate: [validator.isURL, "Please provide a valid URL"]
    },
    location: String,
    products: [
        {
            type: ObjectId,
            ref: "Product"
        }
    ],
    supplier: [{
        name: String,
        contactNumber: String,
        id: {
            type: ObjectId,
            ref: "Supplier"
        }
    }],
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, {
    timestamps: true
});


// model

const Brand = new mongoose.model("Brand", brandSchema);


module.exports = Brand;