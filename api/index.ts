import * as db from 'zapatos/db';

export default async (req: Request, ctx: any) => {
  const query = db.select('employees', { emp_no: db.sql`${db.self} < 10` }).compile();
  // ^ works fine with `vercel deploy` but causes 500 error with `vercel dev`:
  /*
  > Ready! Available at http://localhost:3000
  > [debug] [2023-06-27T12:27:51.297Z] GET /api/
  > [debug] [2023-06-27T12:27:51.297Z] Reading `package.json` file
  > [debug] [2023-06-27T12:27:51.297Z] Reading `vercel.json` file
  > [debug] [2023-06-27T12:27:51.298Z] No `vercel.json` file present
  > [debug] [2023-06-27T12:27:51.299Z] Locating files /Users/george/Development/neon/serverless-examples/neon-vercel-zapatos-minimal-crash
  > [debug] [2023-06-27T12:27:51.299Z] Ignoring /Users/george/Development/neon/serverless-examples/neon-vercel-zapatos-minimal-crash/.git
  > [debug] [2023-06-27T12:27:51.299Z] Ignoring /Users/george/Development/neon/serverless-examples/neon-vercel-zapatos-minimal-crash/.gitignore
  > [debug] [2023-06-27T12:27:51.299Z] Ignoring /Users/george/Development/neon/serverless-examples/neon-vercel-zapatos-minimal-crash/.vercel
  > [debug] [2023-06-27T12:27:51.299Z] Ignoring /Users/george/Development/neon/serverless-examples/neon-vercel-zapatos-minimal-crash/node_modules
  > [debug] [2023-06-27T12:27:51.301Z] Locating files /Users/george/Development/neon/serverless-examples/neon-vercel-zapatos-minimal-crash [2ms]
  > [debug] [2023-06-27T12:27:51.307Z] Imported Builder "@vercel/node" from "/Users/george/.nvm/versions/node/v18.10.0/lib/node_modules/vercel/node_modules/@vercel/node"
  Failed to instantiate edge runtime.
  Error: Cannot read properties of undefined (reading 'fetch')
  [builder] self.__listeners.fetch) {
                                                      ^

  TypeError: Cannot read properties of undefined (reading 'fetch')
      at addEventListener (evalmachine.<anonymous>:19:53)
      at registerFetchListener (evalmachine.<anonymous>:7064:3)
      at evalmachine.<anonymous>:7105:7
      at Script.runInContext (node:vm:141:12)
      at runInContext (node:vm:297:6)
      at EdgeVM.evaluate (/Users/george/.nvm/versions/node/v18.10.0/lib/node_modules/vercel/node_modules/edge-runtime/node_modules/@edge-runtime/vm/src/vm.ts:44:24)
      at new EdgeVM (/Users/george/.nvm/versions/node/v18.10.0/lib/node_modules/vercel/node_modules/edge-runtime/node_modules/@edge-runtime/vm/src/edge-vm.ts:75:12)
      at createEdgeRuntimeServer (file:///Users/george/.nvm/versions/node/v18.10.0/lib/node_modules/vercel/node_modules/@vercel/node/dist/edge-functions/edge-handler.mjs:94:25)
      at processTicksAndRejections (node:internal/process/task_queues:95:5)
      at async createEdgeEventHandler (file:///Users/george/.nvm/versions/node/v18.10.0/lib/node_modules/vercel/node_modules/@vercel/node/dist/edge-functions/edge-handler.mjs:128:20)
  > [debug] [2023-06-27T12:27:52.779Z] Proxying to "@vercel/node" dev server (port=64678, pid=18793)
  > [debug] [2023-06-27T12:27:52.806Z] Failed to complete request to /api/: Error: socket hang up
  > [debug] [2023-06-27T12:27:52.809Z] Killing builder dev server with PID 18793
  > [debug] [2023-06-27T12:27:52.912Z] Killed builder dev server with PID 18793
  */

  return new Response(JSON.stringify(query, null, 2));
}

export const config = {
  runtime: 'edge',
  regions: ['fra1'],  // fra1 = Frankfurt: pick the Vercel region nearest your Neon DB
};
