import { Mongo } from "../database/mongo.js"
import { ObjectId } from 'mongodb'


const collectionName = 'orders'

export default class OrdersDataAccess {
    async getOrders() {
        const result = await Mongo.db
            .collection(collectionName)
            .find({})
            .toArray()
        return result
    }

    async addOrder(orderData){
        const { items, ...orderDataRest} = orderData

        orderDataRest.createdAt = new Date()
        orderDataRest.pickupStatus = 'Pending'
        orderDataRest.userId = new ObjectId(orderDataRest.userId)

        const newOrder = await Mongo.db
        .collection(collectionName)
        .insertOne(orderDataRest)

        if(!newOrder.insertedId){
            throw new Error("Order cannot be inserted");
            
        }

        items.map((item) => {
            item.plateId = new ObjectId(item.plateId)
            item.orderId = new ObjectId(newOrder.insertedId)
        })

        const result = await Mongo.db
        .collection(collectionName)
        .insertMany(orderData)

        return result
    }

    async deleteOrder(orderId) {
        const result = await Mongo.db
            .collection("orderItems")
            .findOneAndDelete({ _id: new ObjectId(orderId) })
        return result
    }

    async updateOrder(orderId, orderData) {
                const result = await Mongo.db
                .collection(collectionName)
                .findOneAndUpdate(
                    { _id: new ObjectId(orderId) },
                    { $set: orderData }
                )
            return result
        }
}