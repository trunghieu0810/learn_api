import dbConnect from '../../../utils/mongodb.js';
import User from '../../../models/users.js';
import Cart from '../../../models/cart.js';
import Product from '../../../models/product';

dbConnect();
const AddNewProduct = async (req, res) => {
    const { method } = req;
    // Refresh
    switch (method) {
        case 'GET':
            const user = await User.findById('62493f1db70196cd8b5a1c63')
            const cart = await Cart.findOne({ user: '62493f1db70196cd8b5a1c63' }).populate('listProduct').exec()
            const product = await Product.find()
            
            cart.listProduct.push({
                product: product[2],
                quantity: 1,
            })
            cart.save()
            res.status(200).send(JSON.stringify({
                message: 'Thành công',
                user,
                cart,
                product,
            }))

            break;

        default:
            res.status(400).send(JSON.stringify({ success: false }));
    }
}


export default AddNewProduct