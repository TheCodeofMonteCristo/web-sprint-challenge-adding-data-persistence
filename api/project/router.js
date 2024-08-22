const router = require('express').Router()
const Project = require('./model')

router.get('/', (req, res, next) => {
    Project.getProject()
        .then(resource => {
            res.status(200).json(resource)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    const newProj = req.body
    console.log(newProj)
    Project.add(newProj)
    .then(resource => {
        const project = {...resource, project_completed: resource.project_completed === 1 ? true : false}
        
        res.status(201).json(project)
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        customMessage: 'something went wrong in the project router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router
