import express from 'express';
import morgan from 'morgan';

const server = express();
const PORT = 5111;

server.use(morgan('dev'));

server.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: `Health check successful, worker: ${process.pid}`
  })
})

server.get("/user-details", (req, res) => {
  res.status(200).json({
    success: true,
    message: "user fetched successfully",
    id: 101,
    name: "Swapnil Dutta",
    email: "swapnildutta2002@gmail.com",
    mobile: "7999600540"
  })
})

server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);

})