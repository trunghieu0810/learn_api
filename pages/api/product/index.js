import dbConnect from '../../../utils/mongodb.js';
import mongoose from 'mongoose'
import User from '../../../models/users.js';
import { JWTAuthToken, AuthMiddleware } from '../../../helper/JWT.js';
import Receipt from '../../../models/receipt.js';
import Cart from '../../../models/cart.js';
import Category from '../../../models/category.js';
import Product from '../../../models/product.js';
dbConnect();

function toSlug(title) { 
    //Đổi chữ hoa thành chữ thường
    let slug = title.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    slug += "-" + new mongoose.Types.ObjectId();
    return slug;
}

const getProduct = async(req, res) => {
    // console.log("req.body", req.body);
    var productList = [];
    await Product.find().exec()
        .then((data)=> {
            productList = data;
        })
        .catch((error) => {
            return res.status(200).send({
                success: false,
                message: error
            })
        })
    res.status(200).send({
        success: true,
        product: productList
    })
}



const addProduct = async(req, res) => {
    console.log("req.body", req.body);
    const product = new Product({
        author: req.body.author,
        title: req.body.title,
        introduction: req.body.introduction,
        price: req.body.sellPrice,
        historyPrice: [
            req.body.importPrice,
            req.body.sellPrice
        ],
        imgList: req.body.imgList,
        categoryID: req.body.categoryID,
        tagID: [],
        importDate: req.body.importDate,
        quantity: req.body.quantity,
        publisher: req.body.publisher,
        format: req.body.format,
        publishYear: req.body.publishYear,
        detailInfomation: req.body.detailInformation,
        pageAmount: req.body.pageAmount,
        size: req.body.size,
        slug: toSlug(req.body.title),
        tagID: req.body.tagIDList
    })
    if (product) {
        product.save()
            .then(result => {
                return res.status(200).json({
                    success: true,
                    product: result,
                    message: "create product ok"
                })
            })
            .catch(err => {
                throw new Error("Create product fail");
            })
    } else {
        return res.status(401).json({
            success: false,
            status: 401,
            refresh: 'Create product fail'
        })
    }
}



const productController = async (req, res, data) => {
    const { method } = req;
    // Refresh
    switch (method) {
        case 'GET':
            await getProduct(req, res);
            break;
        case 'POST':
            await addProduct(req, res);
            break;
        case 'DELETE':
            res.status(200).send({
                run: true,
                ok: true
            })
            break;
        case 'PUT':
            res.status(200).send({
                run: true,
                ok: true
            })
            break;
        default:
            return res.status(400).json({ success: false });
    }
}

export default productController