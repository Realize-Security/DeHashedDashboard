# Vue 3 + TypeScript + Vite + Express

> Note: This is a very basic PoC, is not production ready and does NOT include authentication.

An example Vue.js PoC for integrating with the Dehashed API. The project uses an Express server backend to route API requests from the Vue.js UI to query Dehashed without exposing the Dehashed API key to the client. Both server and client use a shared TypeScript repo which includes common types for API requests and responses.

To run the app:

1. Ensure that the Dehashed API key is set as the value of `DEHASHED_API_KEY` within `./.env`.
2. Within `./client`, `./server` and `./shares`, run `npm install`.
3. Navigate to the root directory and run. 

```shell
npm run dev
```