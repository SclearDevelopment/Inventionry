const express=require('express')
const app=express()
const mongoose=require('mongoose')
const post=require('./schema/Post.js')
const port=3000
const node_rsa=require('rsa-encrypt').default;
const rsa= new node_rsa()
const username = `admin_0`
const password = `reoihrgleghipoergh`
const uri = `mongodb+srv://${username}:${password}@atlascluster.qrt2z5s.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`;
// register view engine
app.set('view engine', 'ejs')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(uri)
.then((result) => {console.log('mongoose.connected to db'); app.listen(port, ()=>{console.log(`listening to port ${port}`)})})
.catch((err) => {console.log(`error: ${err}`)})

function random(length) {
    result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i=0; i < length; i++) {
      result += characters[Math.trunc(Math.random() * characters.length)];
    }
    return result;
}

app.get('/',(req, res)=>{
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const id = random(10)
    res.render('apply', {ip, id})
})

app.get('/apply.css', (req, res) => {
  res.sendFile('./views/apply.css', {root: __dirname})
})

app.post('/submit', (req, res) => {
  // Access submitted data from the request body
  const message = new post
  message.idea = req.body.idea
  message.country = req.body.country
  message.phone = req.body.phone
  message.ip = req.body.ip
  console.log({privateKey, publicKey})
  console.log(rsa.createPrivateAndPublicKeys())
  console.log(message)
  message.save()
  .then((result) => {res.send(`${result}`)})
  .catch((err) => {console.log(err)})

console.log(req.body)

  // You can process or store the message data here (e.g., save it to a database)
});