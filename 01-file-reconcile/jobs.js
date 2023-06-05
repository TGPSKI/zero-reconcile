import { readFile, writeFile } from "node:fs/promises";
import yaml from "js-yaml";

export const parseYAMLFileAsync = async (path) => {
  const file = await readFile(path);
  return yaml.load(file);
}

export const writeYAMLFileAsync = async (path, obj) => {
  const raw = yaml.dump(obj);
  const success = await writeFile(path, raw);
  return success;
}

export const modifyJob = (state, logger) => {
  const newState = Object.assign({}, state);
  if (newState.counter) newState.counter++;
  if (newState.visited) newState.visited = false;
  return newState;
}