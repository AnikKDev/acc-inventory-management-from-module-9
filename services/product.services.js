const Brand = require("../models/Brand");
const Product = require("../models/Product");

exports.getProductsService = async (filters, queries) => {

  const products = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy)

  const total = await Product.countDocuments(filters)
  const page = Math.ceil(totalProducts / queries.limit)
  return { total, page, products };
};

exports.createProductService = async (data) => {
  const product = await Product.create(data);

  // step 1 -> _id (get the brand name and id from the created product)
  const { _id: productId, brand } = product;
  // update brand schema to add this product id and name to that reference
  const updatedProductDatainBrand = await Brand.updateOne({ _id: brand.id }, { $push: { products: productId } })
  console.log(updatedProductDatainBrand);
  return product;
};

exports.updateProductByIdService = async (productId, data) => {
  const result = await Product.updateOne(
    { _id: productId },
    { $inc: data },
    {
      runValidators: true,
    }
  );

  // const product = await Product.findById(productId);
  // const result = await product.set(data).save();
  return result;
};

exports.bulkUpdateProductService = async (data) => {
  // console.log(data.ids,data.data)
  // const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //     runValidators: true
  // });

  const products = [];

  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });

  const result = await Promise.all(products);
  console.log(result);

  return result;
};

exports.deleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

exports.bulkDeleteProductService = async (ids) => {
  const result = await Product.deleteMany({});

  return result;
};
