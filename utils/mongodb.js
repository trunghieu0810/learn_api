import mongoose from "mongoose";
const connection = {};
async function dbConnect() {
    if (connection.isConnected) {
        return;
    }
    const db = await mongoose.connect("mongodb+srv://nguyencongphi:9bBOmN0r0lXYw0xS@sellingbook.oo2ez.mongodb.net/test",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    connection.isConnected = db.connections[0].readyState;
    console.log("Connect OK!");
}

export default dbConnect;