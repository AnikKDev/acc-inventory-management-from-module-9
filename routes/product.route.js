const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller');
const upload = require('../middlewares/uploadProductFile.middleware');
const { uploadProductFile } = require('../middlewares/uploadProductFile.middleware');

router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router.route("/bulk-delete").delete(productController.bulkDeleteProduct);

router.route('/')
    .get(productController.getProducts)
    .post(productController.createProduct)

// route for creating file(uploading file)
router.post('/file-upload', upload.single('image'), productController.uploadProductFile)

router.route("/:id")
    .patch(productController.updateProductById)
    .delete(productController.deleteProductById)

module.exports = router