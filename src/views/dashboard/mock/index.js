var Mock = require('mockjs')
var express = require('express')
var app = express()
var data = Mock.mock({
  'nodes|1-10': [{
    'uuid|+1': 1,
    'text': new Date()
  }]
})

app.get('/', function(req, res) {
  res.header('Access-Control-Allow-Origin', '*')
  res.send(data)
})

app.options('', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
})

app.listen(3000, function() {
  console.log(data)
})
