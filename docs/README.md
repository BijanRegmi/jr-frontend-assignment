# sangeet

Web app to browse musics

## Installation

-   Clone the repo

```
git clone https://github.com/BijanRegmi/frontend-assignment.git
cd frontend-assignment
```

-   Install Dependencies and run

```
npm i && npm run dev
```

## Environment Setup

env file format can be found in the .env.example file

-   Required:

    -   RAPIDAPI_HOST: "shazam.p.rapidapi.com"
    -   RAPIDAPI_KEY: Subscribe [this](https://rapidapi.com/apidojo/api/shazam) api and get the key

-   Optional:
    -   DEMO: 'true' | string. If 'true' no api calls will be made and instead a local copy from the file system will be serverd as response. Only used during development process. Data might not be relevant in this mode.

## Tools Used

-   NextJs with Server Side Rendering and Client Side Rendering
-   tRPC(wrapper around tanstack react query) for data fetching
-   Recoil for state management
-   Tailwind css for styling
-   Zod for validation

## Features/Tasks completed

-   [x] Home Page
-   [x] Search Page
-   [x] Album Details Page
-   [x] Song Details Page
-   [x] Client side caching provided by next
-   [x] Enhanced UI with loading skeletons between page transitions
-   [x] Infinite scrolling on home page
-   [x] Infinite scrolling on search page
-   [ ] Unit Test and Integration Testing
