### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  - You can use the _await_ keyword to pause the execution of they async function.
  - Using try/catch statements can handle errors
- What is a Promise?
  - A one-time guarantee of future values.
- What are the differences between an async function and a regular function?
  - Async functions always return promises. These functions will wait to obtain data and then return the value to finish out the function.
  - Regular functions will continue to run. They can even run before a preveious async function finishes.
- What is the difference between Node.js and Express.js?
  - Node: A JavaScript environment that runs server-side. It do frontend and backend in JavaScript.
  - Express: A minimalist framework. Similar to Flask. Can run a server with a few lines.
- What is the error-first callback pattern?
  - In Node.js. The callback function's first parameter should be listed as _error_. Node will supply an error object.
- What is middleware?
  - Code that runs in the middle of the request/response cycle. Middleware gets access to the req and res objects and can also call _next_ function.
- What does the `next` function do?
  - the next function will go to the next route.
- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
  - joel will not run until elie is complete and matt will not run until joel is complete. This method may take a while. Maybe use these in parallell.
  - the returned array doesn't match the order that the variables are called. This matter since they are awaiting responses
  - no error handling. Try/catch functions.

```js
async function getUsers() {
  const elie = await $.getJSON("https://api.github.com/users/elie");
  const joel = await $.getJSON("https://api.github.com/users/joelburton");
  const matt = await $.getJSON("https://api.github.com/users/mmmaaatttttt");

  return [elie, matt, joel];
}
```
