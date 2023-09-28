import dbConnect from '../../../utils/mongodb.js';
import mongoose from 'mongoose'
import { AuthMiddleware } from '../../../helper/JWT.js';
import Tag from '../../../models/tag.js';

dbConnect();

const getTag = async(req, res) => {
    // console.log("req.body", req.body);
    var tagList = [];
    await Tag.find().exec()
        .then((data)=> {
            tagList = data;
        })
        .catch((error) => {
            return res.status(200).send({
                success: false,
                message: error
            })
        })
    res.status(200).send({
        success: true,
        tags: tagList
    })
}

const addTag = async(req, res) => {
    console.log("req.body", req.body);
    const tag = new Tag({
        tag: req.body.tag
    })
    if(tag){
        await tag.save()
            .then((data) => {

            })
            .catch(err => {
                throw new Error("Create tag fail");
            })
    }
    else {
        return res.status(401).json({
            success: false,
            status: 401,
            refresh: 'Create tag failed'
        })
    }
    getTag(req, res);
}

const tagController = async (req, res, data) => {
    const { method } = req;
    // Refresh
    switch (method) {
        case 'GET':
            await getTag(req, res);
            break;
        case 'POST':
            await addTag(req, res);
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

export default AuthMiddleware(tagController)