const express = require('express')
const connectDB = require('./config/db')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

// Connect Database
connectDB()

// Init middleware
app.use(express.json({ extended: false }))

// this needs to be commented for production
// app.get('/', (req,res, next) => res.json({msg: 'Welcome to contact keeper API'}));

// Define Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res, next) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
