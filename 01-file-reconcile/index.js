import winston from "winston";
import { modifyJob, parseYAMLFileAsync, writeYAMLFileAsync } from "./jobs.js";

const expectedStateFilePath = "./expected.state.yml";
const currentStateFilePath = "./current.state.yml";

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

logger.info("Welcome to file-reconcile");
logger.info(`expectedStateFilePath: ${expectedStateFilePath}`);
logger.info(`currentStateFilePath: ${currentStateFilePath}`);

let currentState = await parseYAMLFileAsync(expectedStateFilePath);
logger.info(JSON.stringify(currentState,  null, 2));

const runFunctionDelayLoop = async (fn, delay, logger, jobName) => {
  logger.info(`Running ${jobName} every ${delay}ms`);
  while (true) {
    await new Promise(r => setTimeout(r, delay));
    logger.info(`Running ${jobName} now...`); 
    await fn(logger);
  }
}

const reconcile = async (logger) => {
  let newState = await parseYAMLFileAsync(expectedStateFilePath);
  return await writeYAMLFileAsync(currentStateFilePath, newState);
}

const modify = async (logger) => {
  currentState = await parseYAMLFileAsync(currentStateFilePath);
  let newState = await modifyJob(currentState, logger);
  return await writeYAMLFileAsync(currentStateFilePath, newState);
}

runFunctionDelayLoop(reconcile, 20000, logger, "reconcile");
runFunctionDelayLoop(modify, 3000, logger, "modify");

process.on("SIGTERM", () => {
  logger.info("SIGTERM signal received: closing file-reconciler");
  process.exit();
});
process.on("SIGINT", () => {
  logger.info("SIGINT signal received: closing file-reconciler");
  process.exit();
});

while (true) {
  currentState = await parseYAMLFileAsync(currentStateFilePath);
  logger.info(JSON.stringify(currentState, null, 2))
  // sleep
  await new Promise(r => setTimeout(r, 1000));
}