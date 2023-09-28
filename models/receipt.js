const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const receiptSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
        district: { type: String },
        province: { type: String },
        commune: { type: String },
        phone: { type: String },
        name: { type: String },
        address: { type: String },
        note: { type: String },
        paymentMethod: { type: String },
        listProduct: [],
        total: { type: Number },
        totalFinal: { type: Number },
        deliveryMoney: { type: Number },
        discount: { type: Number },
        coupon: {},
        deliveryStatus: { type: String, default: 'Chờ xác nhận' },
    },
    {
        timestamps: true,
    }
);

const Receipt = mongoose.models.receipts || mongoose.model('receipts', receiptSchema);
module.exports = Receipt;