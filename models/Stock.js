const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
// schema design
const stockSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        required: true,
        ref: "Product"
    },
    name: {
        type: String,
        required: [true, "Please provide a name for this product."],
        trim: true,
        lowercase: true,
        unique: [true, "Name must be unique"],
        minLength: [3, "Name must be at least 3 characters."],
        maxLenght: [100, "Name is too large"],
    },
    description: {
        type: String,
        required: true
    },

    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pcs", "bag"],
            message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag"
        }
    },
    // image url array of string. onekgulo image url thakbe. amra prottekta image url er upor map chalabo. chalaye validate kore nibo.
    imageURLs: [{
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                if (!Array.isArray(value)) {
                    return false
                }
                let isValid = true;
                value.forEach(url => {
                    if (!validator.isURL(url)) {
                        isValid = false
                    }
                    return isValid;
                })
            },
            message: "Please provide valid image url"
        }
    }],
    price: {
        type: Number,
        rquired: true,
        min: [0, "Price can't be negative"],
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "quantity cant be negative"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true
                } else {
                    return false
                }
            }
        },
        message: "Qunatity must be an integer"
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "status can't be {VALUE}"
        }
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true,
        id: {
            type: ObjectId,
            ref: "Brand",
            required: true
        }
    },
    store: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        enum: {
            values: ["dhaka", "chattogram", "rajshahi", "khulna", "barishal", "rangpur"],
            message: "{VALUE} is not a valid name"
        },
        id: {
            type: ObjectId,
            ref: "Store",
            required: true
        }
    },
    suppliedBy: {
        name: {
            type: String,
            trim: true,
            required: [true, "Name required"],
            id: {
                type: ObjectId,
                ref: "Supplier",

            }
        }
    }

}, {
    timestamps: true,
})



// mongoose middlewares for saving data: pre / post 

productSchema.pre('save', function (next) {

    //this -> 
    console.log(' Before saving data');
    if (this.quantity == 0) {
        this.status = 'out-of-stock'
    }

    next()
})


//  productSchema.post('save',function(doc,next){
//   console.log('After saving data');

//   next()
// })

stockSchema.methods.logger = function () {
    console.log(` Data saved for ${this.name}`);
}


// SCHEMA -> MODEL -> QUERY

const Stock = mongoose.model('Stock', stockSchema)

module.exports = Product;