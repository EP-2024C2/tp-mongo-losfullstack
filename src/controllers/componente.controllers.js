const Componente = require('../models/componente.model')

const obtenerComponentes = async (req, res) => 
    {
    try 
        {
        const componentes = await Componente.find().select('-__v')
        res.status(200).json(componentes)
        } 
    catch (error) 
        {
        res.status(500).json({
            error: 'Error al obtener los componentes.',
            detalles: error.message
            })
        }
    }

const obtenerComponente = async (req, res) => 
    {
    const id = req.params.id
    try 
        {
        const componente = await Componente.findById(id).select('-__v')
        if (!componente) 
            {
            return res.status(404).json({ error: `El ID ${id} no corresponde a ningún componente.`})
            }
        res.status(200).json(componente)
        } 
    catch (error) 
        {
        res.status(500).json({
            error: 'Error al obtener el componente.',
            detalles: error.message
            })
        }
    }

const agregarComponente = async (req, res) => 
    {
    const datosComponente = req.body
    try 
        {
        const nuevoComponente = await new Componente(datosComponente).save()
        res.status(200).json(nuevoComponente)
        } 
    catch (error) 
        {
        res.status(500).json({
            error: 'Error al crear el componente.',
            detalles: error.message
        })
        }
    }

const actualizarComponente = async (req, res) => 
    {
    const id = req.params.id
    const datosActualizados = req.body
    try 
        {
        const componenteActualizado = await Componente.findByIdAndUpdate(
            id,
            datosActualizados,
            { new: true, runValidators: true }
        )
        if (!componenteActualizado) 
            {
            return res.status(404).json({ error: `El ID ${id} no corresponde a ningún componente.`})
            }
        res.status(202).json(componenteActualizado)
        } 
    catch (error) 
        {
        res.status(500).json({
            error: 'Error al modificar el componente.',
            detalles: error.message
            })
        }
    }

const borrarComponente = async (req, res) => 
    {
    const id = req.params.id
    try {
        const componenteEliminado = await Componente.findByIdAndDelete(id)
        if (!componenteEliminado) 
            {
            return res.status(404).json({ error: `El ID ${id} no corresponde a ningún componente.`})
            }
        res.status(200).json({ message: `Componente eliminado con éxito.`})
        }
    catch (error) 
        {
        res.status(500).json({
            error: 'Error al eliminar el componente.',
            detalles: error.message
            })
        } 
    }

const obtenerProductosDeComponente = async (req, res) => 
    {
    const id = req.params.id
    try 
        {
        const componente = await Componente
            .findById(id)
            .populate('productos')

        if (!componente) 
            {
            return res.status(404).json({ error: `El ID ${id} no corresponde a ningún componente.`})
            }
        res.status(200).json(componente)
        }
    catch (error) 
        {
        res.status(500).json({
            error: 'Error al obtener los productos del componente.',
            detalles: error.message
            })
        }
    }

const componenteController = 
    {
    obtenerComponentes,
    obtenerComponente,
    agregarComponente,
    actualizarComponente,
    borrarComponente,
    obtenerProductosDeComponente
    }

module.exports = componenteController