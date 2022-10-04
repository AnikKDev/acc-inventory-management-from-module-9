const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

// category schema
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        lowercase: true,
        unique: [true, "Category must be unique"]
    },
    description: String,
    imgUrl: {
        type: String,
        validate: [validator.isURL, "Please provide a valid URL"]
    }
},
    {
        timestamps: true
    }
);

// model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
