
<div align="center">  
  <img src="https://user-images.githubusercontent.com/65465380/204162512-739f028b-24a4-4ec5-b40e-afe7608d8f0e.png" width="750">
</div>

# Stack

- [Amazon Web Services CDK](https://aws.amazon.com/cdk/) - Lambda, S3, Step Functions, Kenises and Dynamodb
- [Nextjs](https://nextjs.org/) - Web client 
- [Jotai](https://jotai.org/) Atomic state management
- [React Query](https://react-query-v3.tanstack.com/) (with jotai integration)
- [Tailwind](https://tailwindcss.com/) shared UI library
- [NX.dev](https://nx.dev/) monorepo workspace
- [Cypress](https://www.cypress.io/) Visual testing framework
- [Framer Motion](https://www.framer.com/motion/) Animation library for react
- [CloudCraft](https://www.cloudcraft.co/) Visualise your AWS cloud environment
- [Dashjs](http://reference.dashif.org/dash.js/v4.5.1/samples/dash-if-reference-player/index.html) Media playing client
- [Google Shaka Player](https://github.com/shaka-project/shaka-player) MPEG-DASH player by Google
- [Shaka Player React](https://github.com/matvp91/shaka-player-react)

# Breif

A requirement has been issued from the product team to improve the quality of the on demand video playback service from our cloud platform on low bandwidth links. It has been proposed that we can use MPEG Dash.

# Reqs

Design a simple web application that plays a video delivered by MPEG-Dash. It should store metadata about the video in the backend which is exposed by an API. Support your design with sample code and documentation.

# Architecture
![onvu-upload-flow](https://user-images.githubusercontent.com/65465380/205446658-0a495777-5978-49cf-a389-f9602ae6e2a8.png)

### Platform
- [ ] Provision S3 storage bucket for video storage
- [ ] Provision dynamodb table to store video metadata
- [ ] Create S3 event trigger on new item upload to S3 bucket
- [ ] Start Step function flow for upload email confirmation, compression and metadata extract

### Frontend
- [ ] Nextjs frontend deployed to vercel
- [ ] Tailwind ui lib for basic navigation and site components
- [ ] Top navigation with upload page and video lists page
- [ ] Search box for video listings filtering
- [ ] Dash video player client

### Stretch Goals
- [ ] Create lambda to returned signed url for for video upload
- [ ] Provision S3 storage bucket for thumbnails
- [ ] Video upload component
- [ ] Authentication using Cognito
- [ ] AWS transcription service (extract keywords automatically and ability to see video transcription next to streaming client)

### Data design

| PK (videoId)|  SK              | length | type    | inputBucket| outputBucketMpd | coverImg | transcription |
| :-----:     | :--------------: | :-----:| :-----: | :-------:  | :------------:  | :-------:| :---------:   |
| 208439      | userId#createdAt | 4:20   | mpeg    | http://... | http://...      | http//...| fjlkajdjljfl  |

### CICD

- Github Actions deployemnt
- NX Cloud build caching

### QA Testing

- Cypress
- Jest
- Sonar Lint

### Research, docs and resources
- [AWS Kinesis streaming mpeg-dash](https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/dash-playback.html)
- [Streaming video from S3, CloudFront and React](https://www.youtube.com/watch?v=WP7Dpvrl8Ic)
- [KVS ingestion from RTSP cameras a Kinesis Video Streams tutorial](https://www.youtube.com/watch?v=nVxwX7Q9nPU)
- [Build a Real Time Data Streaming System with AWS Kinesis, Lambda Functions and a S3 Bucket](https://www.youtube.com/watch?v=We5Jr4GGLL0)
- [How to Build a File Upload System on AWS with React and a Serverless API | Lambda, S3, API Gateway](https://www.youtube.com/watch?v=IgAE-ycnb94)

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
