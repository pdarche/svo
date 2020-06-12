## SVO Slider App
A web application for easily and scalably administering the [Social Value Orientation Slider Measure](http://ryanomurphy.com/resources/Murphy-Ackermann-Handgraaf-2011.pdf). 

### Features
 - A full implementation of the Social Value Orientation Slider Measure
 - An optional, easy-to-configure pre-survey using [survey.js](https://surveyjs.io/)
 - Robust event tracking providing detailed information about the response process 
 - Uses [Vercel](https://vercel.com/) and [Firebase](https://firebase.google.com/), so it's easy to deploy and persist data without servers and at any scale

### Getting Started
(Assumes you have [git](https://git-scm.com/), [node](https://nodejs.org/en/), and [npm](https://www.npmjs.com/get-npm) installed, and that you've created a Firebase database.)

1. Clone the repository and `npm install`
2. Copy the `config.example.js` to `config.js`
3. Update the `FIREBASE_URL` variable with the url for your Firebase instance
4. Change the `INCLUDE_SURVEY` variable to `true` if you'd like to include a pre-survey and update the questions 
5. Install the Vercel cli `npm i -g vercel` and configure your account
6. Deploy with `now`

Your instance of the app should be available at `https://svo.{your_vercel_username}.now.sh` and all responses will be sent to your Firebase database. You can export the data through the firebase console or through their api. If you'd like to update the app, make changes locally and redeploy with `now`.
