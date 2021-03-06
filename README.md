# FE-exercise-contractor

**Instructions**
 - Install all node modules `npm i`
 - Run tests `npm t`
 - Start application `npm start`
 - I implemented a single endpoint API that serves the client side the JSON file. This starts up when the application starts (It is written with native node modules. Thought it'll be fun to not use express, hapi or koa)
 - To mimic network latency, Do ... http://localhost:3000?latency=3000. Increase or decrease the latency query string value.

JavaScript Front-end Developer Test - Contractor

Using the provided boilerplate and the data in `data/ldb.json`, create an application that displays the train service from Farringdon to West Hampstead Thameslink as shown in the following mockup:

![mockup](Farringdon_to_West_Hampstead_Thameslink___Live_Departures___Arrivals.png)

**Requirements:**
 - ~~Unit tests~~

**Nice to have:**
 - ~~Network latency simulation (async code)~~
 - ~~Responsive layout~~
 - ~~CSS-only solution (no images)~~

**We will pay attention to:**
 - Code quality and consistency
 - Naming conventions
 - Styling
 - Test quality
 - Commit history

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode (uses Jest).
