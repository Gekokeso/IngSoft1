const express = require('express')
const router = express.Router()
const {getTareas, createTareas, updateTarea, deleteTarea}=require('../controllers/tareasController')

const protect = require('../middleware/authMiddleware')

router.get('/', getTareas)
router.post('/', createTareas)

router.put('/:id', updateTarea)
router.delete('/:id', deleteTarea)

module.exports = router