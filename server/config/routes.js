console.log('ROUTES FILE')
var path = require("path");
const productController = require('../controllers/productController');

module.exports = function (app) {
    // PROCESSING ROUTES
    app.put('/update/:id', productController.editProduct);
    // app.put('/like/:id', petController.likePet);
    app.get('/get/products', productController.getProducts);
    app.post('/post/new', productController.addProduct);
    app.get('/get/product/:id', productController.findProduct);
    app.delete('/delete/:id', productController.delete);

    // WILD CARD
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
        }); 

}
