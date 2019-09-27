const express = require('express')
const { generate } = require('../utils/generate')
const uuidv4 = require('uuid/v4')
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/upload.js', async (req, res) => {
  const { title, body } = req.body
  if (!title || !body) {
    res.status(400)
    return res.json({error:'plz specify title & body params'})
  }
  if (title.length > 40 || body.length > 400) {
    res.status(400)
    return res.json({error:'plz send valid params title.length is lte 40 and body length is lte 400'})
  }
  const imageUrl = await generate(title, body, `/tmp/${Date.now()}_${uuidv4()}.png`)
  res.json({imageUrl})
})

app.listen(3000)
