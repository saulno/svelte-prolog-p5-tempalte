# Tau Prolog + Scelte + P5.js

This project is a simple example of the integration of Svelte, Tau Prolog and P5.js

Tau Prolog is used to implement a simple Rectangular frame Learning algorithm. From a set of labeled points, it's able to learn an approximation to the original model.

P5.js is used to visualize the original model, the generated points and the learnt model.

Sevlete serves as a glue, to kkep all technologies together and present a nice looking website.

## Get started

Install the dependencies...

```bash
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:8080](http://localhost:8080). You should see your app running. 

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).
