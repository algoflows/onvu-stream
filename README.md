

# OPSAP

- [Google Cloud Platform](https://cloud.google.com/) - Firebase, Pubsub, Firestore, workflows
- [Terraform](https://www.terraform.io/) to provision everything (Prisma, Contentful, GCP, Stripe and Cockroach)
- [Prisma](https://www.prisma.io/) Typescript ORM
- [CockroachDB](https://www.cockroachlabs.com/) - ACID consistency for payments, inventory and signing.
- [Capacitor](https://capacitorjs.com/) - Native Mobile compilation
- [Appflow](https://ionic.io/appflow) - Deployment of Capictor apps
- [Brainstree](https://graphql.braintreepayments.com/) - Payments processing has grapqhl endpointas
- [Vitejs](https://vitejs.dev/) for React, Cypress, Vitest, Storybook
- [Nextjs](https://nextjs.org/) - Web client 
- [Jotai](https://jotai.org/) Atomic state management
- [React Query](https://react-query-v3.tanstack.com/) (with jotai integration)
- [Tailwind](https://tailwindcss.com/) shared UI library
- [NX.dev](https://nx.dev/) monorepo workspace
- [Vitest](https://vitest.dev/) Super fast javascript testing lib 
- [Cypress](https://www.cypress.io/) Visual testing framework
- [Framer Motion](https://www.framer.com/motion/) Animation library for react

### NX Links

- [Nrwl-Tailwind setting up tailwind the easy way](https://nx.dev/recipe/using-tailwind-css-in-react)
- [Nrwl-Storybook](https://nx.dev/packages/storybook)
- [Nrwl-Capacitor](https://nxtend.dev/docs/capacitor/overview)
- [Use storybook and tailwind in an Nx Workspace](https://blog.nrwl.io/use-storybook-with-tailwind-in-an-nx-workspace-5ceb08edad71)
- [Speed up Storybook with Vite and SWC — with the help of Nx](https://blog.nrwl.io/speed-up-storybook-with-vite-and-swc-with-the-help-of-nx-b1e4c488e0fd)
- [Storybook Vite](https://storybook.js.org/blog/storybook-for-vite/)
- [Storybook Vitest](https://storybook.js.org/addons/storybook_vitest_addon)


This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Fast and Extensible Build System**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@opsap/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.



## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
