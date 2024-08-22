const express = require('express')
const resourcesRouter = require('./resource/router')
const projectRouter = require('./project/router')
const taskRouter = require('./task/router')

const server = express()

server.use(express.json())

server.use('/api/resources', resourcesRouter)

server.use('/api/projects', projectRouter)

server.use('/api/tasks', taskRouter)

server.use('*', (req, res) => {
    res.json({ api: 'up'})
})

module.exports = server
