import express from "express";
import cluster from "node:cluster";
import os from "node:os";

const server = express();
const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary cluster is running on PORT no: ${process.pid}`);

  //! Fork workers i.e. 
  //* the no of cores i have on my system, that many node instance will be available to handle incoming request
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  //! signal when cluster is dead/closed
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died/closed`);

  })

} else {
  server.get("/", (req, res) => {
    console.log(`Handled by worker: ${process.pid}`);

    res.json({
      success: true,
      message: `Server health check successful, Greetings from express server, processId: ${process.pid}`
    })
  })
  server.listen(5110, () => {
    console.log("Server is up and running on PORT: 5110");

  })
}
