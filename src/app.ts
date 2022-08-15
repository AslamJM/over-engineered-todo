import { createServer } from "./utils/createServer";
import { logger } from "./utils/logger";
import { config } from "./utils/config";
import { connectDB, disconnectDB } from "./utils/db";

const signals = ["SIGINT", "SIGTERM", "SIGHUP"] as const;

async function gracefulShutdown({
  signal,
  server,
}: {
  signal: typeof signals[number];
  server: Awaited<ReturnType<typeof createServer>>;
}) {
  logger.info(`got signal ${signal} exitting`);
  await server.close();
  await disconnectDB();
  process.exit(0);
}

async function startServer() {
  const server = await createServer();

  server.listen({
    port: config.PORT,
    host: config.HOST,
  });
  logger.info("server is listening");
  await connectDB();

  for (let i = 0; i < signals.length; i++) {
    process.on(signals[i], () =>
      gracefulShutdown({
        signal: signals[i],
        server,
      })
    );
  }
}

startServer();
