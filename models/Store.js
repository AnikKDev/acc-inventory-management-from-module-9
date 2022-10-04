const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

// category schema
const storeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        lowercase: true,
        enum: {
            values: ["dhaka", "chattogram", "rajshahi", "khulna", "barishal", "rangpur"],
            message: "{VALUE} is not a valid name"
        }
    },
    description: String,
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    manager: {
        name: String,
        contactNumber: String,
        id: {
            type: ObjectId,
            ref: "User"
        }
    }

},
    {
        timestamps: true
    }
);

// model
const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
