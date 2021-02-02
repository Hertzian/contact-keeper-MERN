const mongoose = require('mongoose')

// with promise
// const connectDB = () => {
//     mongoose
//         .connect(db, {
//             useNewUrlParser: true,
//             useCreateIndex: true,
//             useFindAndModify: false,
//             useUnifiedTopology: true
//         })
//         .then(() => console.log(`MongoDB Connected!`))
//         .catch(err => {
//             console.error(err.message);
//             process.exit(1);
//         });
// }

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB Connected!`)
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectDB
