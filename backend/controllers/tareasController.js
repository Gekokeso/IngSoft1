const getTareas = (req,res) => {
    res.status(200).json({mesg: "getTareas"})
}

const createTareas = (req,res) => {
    res.status(201).json({mesg: "createTareas"})
}
const updateTarea = (req,res) => {
    res.status(200).json({mesg: `updateTarea${req.params.id}`})
}
const deleteTarea = (req,res) => {
    res.status(200).json({mesg: `deleteTarea${req.params.id}`})
}

module.exports = {getTareas, createTareas, updateTarea, deleteTarea}