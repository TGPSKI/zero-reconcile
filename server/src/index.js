// graphql-yoga server
import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http"
import { readFile } from "node:fs/promises";

const parseJsonFileAsync = async (path) => {
  const raw = await readFile(path);
  return JSON.parse(raw);
}

let out = await parseJsonFileAsync("./foo.json")
console.log(out);

const yoga = createYoga({
  schema: createSchema({
    typeDefs: `
      type Query {
        hello: String!
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello World!"
      }
    }
  })
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000/graphql");
});
