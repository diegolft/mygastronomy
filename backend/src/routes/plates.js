import express from 'express'
import PlatesControllers from '../controllers/plates.js'

const platesRouter = express.Router()
const platesControllers = new PlatesControllers()

platesRouter.get('/', async (req, res) => {
    const { body, success, statusCode } = await PlatesControllers.getPlates()

    res.status(statusCode).send({ body, success, statusCode })
})

platesRouter.get('/availables', async (req, res) => {
    const { body, success, statusCode } = await PlatesControllers.getAvailablePlates()

    res.status(statusCode).send({ body, success, statusCode })
})

platesRouter.post('/', async (req, res) => {
    const { body, success, statusCode } = await PlatesControllers.addPlate(req.body)

    res.status(statusCode).send({ body, success, statusCode })
})

platesRouter.put('/:id', async (req, res) => {
    const { body, success, statusCode } = await PlatesControllers.updatePlate(req.params.id, req.body)

    res.status(statusCode).send({ body, success, statusCode })
})

platesRouter.delete('/:id', async (req, res) => {
    const { body, success, statusCode } = await PlatesControllers.deletePlate(req.params.id)

    res.status(statusCode).send({ body, success, statusCode })
})



export default platesRouter