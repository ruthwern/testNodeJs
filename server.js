require('dotenv').config();
const http = require('http');
const cluster = require('cluster');
const os = require('os');

const app = require('./app');

// Port from environment variable or default to 4002
const port = process.env.PORT || 4002;

// Number of CPUs available
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);
    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    // Listen for worker exit and restart a new worker
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} exited. Spawning a new worker...`);
        cluster.fork();
    });

} else {
    // Worker processes handle HTTP requests
    const server = http.createServer(app);
    server.listen(port, () => {
        console.log(`Worker ${process.pid} is listening on port ${port}`);
    });
}
