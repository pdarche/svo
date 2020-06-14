## SVO Slider App
A self-contained web application for administering the [Social Value Orientation Slider Measure](http://ryanomurphy.com/resources/Murphy-Ackermann-Handgraaf-2011.pdf) focused on ease-of-use, scalability, information richness. Preview the app at https://svo.pdarche.vercel.app.

### Features
 - Full, configurable implementation of [Murphy et al. 2011's](http://ryanomurphy.com/resources/Murphy-Ackermann-Handgraaf-2011.pdf) semi-continuous web-based Social Value Orientation Slider Measure
 - Optional, configurable pre-survey using [survey.js](https://surveyjs.io/)
 - Detailed event tracking providing information about the response process
 - Uses [Vercel](https://vercel.com/) and [Firebase](https://firebase.google.com/) for easy deployment and data persistence without servers and at any scale

### Quickstart 
(Assumes you have [git](https://git-scm.com/), [node](https://nodejs.org/en/), and [npm](https://www.npmjs.com/get-npm) installed, and that you've created a Firebase database.)

1. Clone the repository and `npm install`
2. Copy the `config.example.js` to `config.js`
3. Update the `FIREBASE_URL` variable with the url for your Firebase instance
4. Change the `INCLUDE_SURVEY` variable to `true` to include a pre-survey and update questions in the `SURVEY_JSON`
5. Install the Vercel cli `npm i -g vercel` and configure your account
6. Deploy with `now`

Your instance of the app should be available at `https://svo.{your_vercel_username}.now.sh` and all responses will be sent to your Firebase database. You can export the data through the firebase console or through their api. If you'd like to update the app, make changes locally and redeploy with `now`.

### Configuration
Configuration is handled in `config.js` 
| Variable | Type | Description |
| -------- | ---- |----- |
| `RESEARCHER_NAME` | `String` | The name of the researcher responsible for the survey. Used in the `About` page to give respondents information about the survey|
| `RESEARCHER_EMAIL` | `String` | Email address for use if respondents have questions or concers |
| `FIREBASE_URL` | `String` | URL of the firebase instances used by the application where data will be persisted |
| `RANDOMIZE_QUESTIONS` | `Boolean` | Whether to randomize question ordering or present them in the order described in Murphy 2011. Defaults to `true` |
| `INCLUDE_SECONDARY` | `Boolean` | Whether to include secondary measure questions for `prosocial` types. Defaults to `true` |
| `INCLUDE_SURVEY` | `Boolean` | Whether to include a pre-survey. If `true` will default to the `SURVEY_JSON` bundled with the application. Defaults to `false` | 
| `SURVEY_JSON` | `Object` | The json object with survey.js-style data for use in the pre-survey. See the [survey.js docs](https://surveyjs.io/Documentation/Library) for information about question types and configuration|

### Output
Each response yields a single json `Response` object with the following properties:

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `_id` | `String` | Unique identifier of the response / session |
| `answers` | `[Answer]` | Array of `Answer` objects containing data about individual item responses |
| `browser` | `Object` | Object with information about the repondent's browser |
| `completedAt` | `DateTime` | DateTime of when the survey was completed |
| `events` | `[Event]` | Array of `Event` objects containing data about slide and instruction events generated during the survey |
| `ip` | `String` | Respondent's IP address |
| `isConsistent` | `Boolean` | Computed measure of whether the respondent's answers were consistent given their SVO type. See Murphy 2011 for more details |
| `otherTotal` | Number | The sum of the allocation to Other |
| `preSurvey` | `Object` | Answers to the pre-survey, if implemented |
| `secondaryMeasures` | `Object` | Object with secondary measures computed for prosocial responses (if configured) |
| `selfTotal` | `Number` | The sum of allocations to Self |
| `startedAt` | `DateTime` | DateTime of when the first question began. Only applies to SVO items, not pre-survey items |
| `svo` | `Number` | The computed SVO angle for the response |
| `type` | `String` | The type corresponding to the computed SVO angle |

`Answer` objects have the following structure:
| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `_id` | `String` | Unique identifier of the answer | 
| `other` | `Number` | The allocation to Other for the item | 
| `ranges` | `Object` | Object with information about the ranges used for the item. Also contains the item number |
| `responseTime` | `Number` | Time in milliseconds taken to respond to the item |
| `self` | `Number` | The allocation to Self for the item |
| `sessionId` | `String` | ID of the session the answer belongs to | 
| `startedAt` | `DateTime` | DateTime of when the question was initially presented to the respondent |
| `submittedAt` | `DateTime` | DateTime of when the response was submitted |
