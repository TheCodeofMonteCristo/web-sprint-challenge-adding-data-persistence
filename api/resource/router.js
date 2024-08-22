const router = require('express').Router()
const Resource = require('./model')

router.get('/', (req, res, next) => {
    Resource.getResource()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    const newRes = req.body
    Resource.add(newRes)
    .then( source => {
        res.status(201).json(source)
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        customMessage: 'something went wrong in the resources router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router
