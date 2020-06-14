module.exports = {
  ANALYTICS_TRACKING_ID: 'YOUR_GA_ID',
  LEAD_RESEARCHER: "NAME OF LEAD RESEARCHER",
  LEAD_RESEARCHER_EMAIL: "EMAIL@ADRESS.COM",
  EQUALITY_POINTS: [81, 95, 81, 93, 85, 92, 75, 93, 92],
  JOINT_GAIN_POINTS: [70, null, 100, 90, null, 100, null, 100, 90],
  OTHER_GAIN: [70, 90, 50, 90, 70, 50, 50, 100, 90],
  OWN_GAIN: [100, 100, 100, 100, 100, 100, 100, 100, 100],
  MAX_DISTANCES: [20, 10, 50, 10, 30, 50, 50, 30, 10],
  PRIMARY_QUESTIONS: [
    {min1: 85, max1: 85.01, min2: 85, max2: 15, question: 0},
    {min1: 85, max1: 100, min2: 15, max2: 50, question: 1},
    {min1: 50, max1: 85, min2: 100, max2: 85, question: 2},
    {min1: 50, max1: 85, min2: 100, max2: 15, question: 3},
    {min1: 100, max1: 50, min2: 50, max2: 100, question: 4},
    {min1: 100, max1: 85, min2: 50, max2: 85, question: 5},
  ],
  SECONDARY_QUESTIONS: [
    {min1: 100, max1: 70, min2: 50, max2: 100, question: 6},
    {min1: 90, max1: 100, min2: 100, max2: 90, question: 7},
    {min1: 100, max1: 50, min2: 70, max2: 100, question: 8},
    {min1: 100, max1: 90, min2: 70, max2: 100, question: 9},
    {min1: 70, max1: 100, min2: 100, max2: 70, question: 10},
    {min1: 50, max1: 100, min2: 100, max2: 90, question: 11},
    {min1: 50, max1: 100, min2: 100, max2: 50, question: 12},
    {min1: 100, max1: 70, min2: 90, max2: 100, question: 13},
    {min1: 90, max1: 100, min2: 100, max2: 50, question: 14},
  ],
  RANDOMIZE_QUESTIONS: true,
  INCLUDE_SECONDARY: true,
  INCLUDE_SURVEY: true,
  SURVEY_JSON: {
    title: "A few quick questions before we begin...",
    showProgressBar: "top",
    pages: [{
      // Demographics
      questions: [
        {type: "dropdown", name: "sex", title: "What is your sex?", choices: ["Female", "Male"], hasOther: true, isRequired: true},
        {type: "dropdown", name: "race", title: "Which race best describes you?",
            choices: ["Black or African American", "American Indian or Alaskan Native", "Asian", "Native Hawiian or other Pacific Islander", "White / Caucasian"], hasOther: true, isRequired: true},
        {type: "text", name: "age", inputType:"number", title: "What year were you born?", isRequired: true}
      ]
    }, {
      // Education, income, marital status
      questions: [
        {name: "education", type: "dropdown", title: "What's the highest degree or level of school you have completed?",
            choices: ["Less than a high school degree", "High school degree or equivalent (e.g. GED)", "Some college but no degree", "Associate degree", "Bachelor degree", "Master's degree", "Ph.D."], isRequired: true},
        {name: "income", type: "dropdown", title: "How much did all members of your household earn last year?",
            choices: ["Less than $10,000", "$10,000 to $19,999", "$20,000 to $29,999", "$30,000 to $39,999", "$40,000 to $49,999", "$50,000 to $59,999", "$60,000 to $69,999", "$70,000 to $79,999", "$80,000 to $89,999", "$90,000 to $99,999", "$100,000 to $149,999", "More than $150,000", "Prefer not to answer"], isRequired: true},
        {name: "maritalStatus", type: "dropdown", title: "What is your marital status?", choices: ["Married", "Widowed", "Devorced", "Separated", "Never married"], isRequired: true}
      ]
    }, {
      // Political leaning, religiosity
      questions: [
        {name: "politics", type: "dropdown", title: "What is your political orientation?",
            choices: ["Very liberal or left-leaning", "Somewhat liberal or left-leaning", "Centrist", "Somewhat conservative or right-leaning", "Very convervative or right-leaning"], isRequired: true},
        {name: "religiosity", type: "dropdown", title: "To what extent do you consider yourself religious or spiritual?",
            choices: ["Not at all religious or spiritual", "Slightly religious or spiritual", "Somewhat religious or spiritual", "Quite religious or spiritual", "Very religious or spiritual"], isRequired: true}

      ]
    }, {
      // Family and early childhood experience, relationships
      questions: [
        {name: "relationshipDevelopment", type: "rating", "title": "How easy is it for you to get close to others?", mininumRateDescription: "Very difficult", maximumRateDescription: "Very easy", isRequired: true},
        {name: "trustDevelopment", type: "rating", "title": "How easy is it for you to trust others?", mininumRateDescription: "Very difficult", maximumRateDescription: "Very easy", isRequired: true},
        {name: "dependenceDevelopment", type: "rating", "title": "How easy is it for you to depend on others?", mininumRateDescription: "Very difficult", maximumRateDescription: "Very easy", isRequired: true}
      ]
    }, {
      questions: [
        {name: "interests", type:"checkbox", title: "Which of the following are you interested in?", isRequired: true, choices: ["Nature (i.e. gardening, hiking)", "Sports", "Arts and crafts (i.e. painting, woodworking)", "Performance arts (i.e. dancing, singing, music)", "Computers & technology", "Outdoor adventures (i.e. fishing, skiing)", "Indoor activities (i.e. movies, reading)", "Health & fitness (i.e. yoga, swimming)", "Life-style activities (i.e. cooking, shopping)" ], hasOther: true}
      ]
    }]
  }
}
// {name: "siblings", type: "dropdown", title: "How many siblings do you have?", choices: ["None", 1, 2, 3, 4, 5], hasOther: true, isRequired: true},
