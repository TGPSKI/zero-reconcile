// graphql-yoga server
import { createSchema, createYoga } from "graphql-yoga";
import { SchemaComposer } from 'graphql-compose';
import { composeWithJson } from 'graphql-compose-json';

import { createServer } from "node:http"
import { readFile, writeFile } from "node:fs/promises";

const parseJsonFileAsync = async (path) => {
  const raw = await readFile(path);
  return JSON.parse(raw);
}

const exampleData = {
  pods: [
    'hello-custom:latest',
  ],
  jobs: [
    {
      name: 'change-word',
      env: {
        PORT: '3333',
        WORD: 'Governor',
      },
      schedule: 45
    },
    {
      name: 'reset-word',
      env: {
        PORT: '3333',
        WORD: 'World',
      },
      schedule: 15
    }
  ]
};

const schemaComposer = new SchemaComposer();

const ExampleTC = composeWithJson('Example', exampleData, {schemaComposer});

schemaComposer.Query.addFields({
  exampleAll: {
    type: ExampleTC,
    resolve: () => exampleData
  }
});

const schema = schemaComposer.buildSchema();

const out = ExampleTC.toSDL();


const writeFileAsync = async (path, obj) => {
  const raw = JSON.stringify(obj, null, 2);
  const success = await writeFile(path, raw);
  return success  }

  writeFileAsync('./tcDSL', out);


const yoga = createYoga({
  schema: schema
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000/graphql");
});
