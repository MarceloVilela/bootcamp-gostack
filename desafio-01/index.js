const express = require('express')
const app = express()

app.use(express.json())

const projects = []

app.post('/projects', (req, res) => {
  const {id, title} = req.body
  projects.push({id, title, tasks: []})
  res.json(projects)
})

app.get('/projects', (req, res) => {
  res.json(projects)
})

app.put('/projects/:id', (req, res) => {
  const {id} = req.params
  const {title} = req.body
  const chave = projects.map(item => item.id).indexOf(id);
  projects[chave]['title'] = title
  res.json(projects)
})

app.delete('/projects/:id', (req, res) => {
  const {id} = req.params
  const chave = projects.map(item => item.id).indexOf(id);
  projects.splice(chave, 1)
  res.send()
})

app.post('/projects/:id/tasks', (req, res) => {
  const {id} = req.params
  const {title} = req.body
  const chave = projects.map(item => item.id).indexOf(id);
  projects[chave]['tasks'].push(title)
  res.json(projects)
})

app.listen(3000)
