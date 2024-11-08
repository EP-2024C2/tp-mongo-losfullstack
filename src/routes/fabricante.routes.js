const { Router } = require('express')
const routes = Router()
const empresaValidate = require('../middlewares/empresa.middleware')
const fabricanteController = require('../controllers/fabricante.controllers')
const fabricanteSchema = require('../schemas/fabricante.schema')

routes.get('/',
    fabricanteController.obtenerFabricantes)

routes.get('/:id',
    empresaValidate.validateId,
    fabricanteController.obtenerFabricante)

routes.post('/',
    empresaValidate.schemasValidator(fabricanteSchema.creationSchema),
    fabricanteController.agregarFabricante)

routes.put('/:id', 
    empresaValidate.validateId,
    empresaValidate.schemasValidator(fabricanteSchema.updateSchema),
    fabricanteController.actualizarFabricante)

routes.delete('/:id',
    empresaValidate.validateId,
    fabricanteController.borrarFabricante)

routes.get('/:id/productos', 
    empresaValidate.validateId,
    fabricanteController.obtenerProductosDeFabricante)

module.exports = routes
