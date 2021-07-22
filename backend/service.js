const startServer = require("./src/server");

// To do add healthz probes
async function main() {
  startServer();
}

main();
