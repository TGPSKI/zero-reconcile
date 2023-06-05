import { composeWithJson } from 'graphql-compose-json';
import { SchemaComposer } from 'graphql-compose';
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
const ExampleGQLType = ExampleTC.getType()


schemaComposer.Query.addFields({
  exampleAll: {
    type: ExampleTC,
    resolve: source => source.JSON
  }
});

const schema = schemaComposer.buildSchema();
const jsons = schemaComposer.toSDL();
const tc = ExampleTC.toSDL();
// output object to a local file
const writeObjectToLocalFIle = async (path, obj) => {
  const raw = JSON.stringify(obj, null, 2);
  const success = await writeFile(path, raw);
  return success;
}
writeObjectToLocalFIle('./exampleTC', ExampleTC);
writeObjectToLocalFIle('./exampleGQLType', ExampleGQLType);
writeObjectToLocalFIle('./schema', schema);
writeObjectToLocalFIle('./jsons', jsons);
writeObjectToLocalFIle('./tc', tc); 

// const foo = 'bar';
// if (foo === 'bar') { console.log('bar'); }