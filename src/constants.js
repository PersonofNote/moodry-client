// Todo: Amplify errors aren't consistent. Check docs and set different types
// of errors accordingly, maybe write a style guide for error types
export const errorMessages = {
    UsernameExistsException: "Email is taken, please try another",
    NotAuthorizedException: "You are not authorized to do this; please contact someone if you think this is a mistake"
}

// Todo: map svg icons to mood value
export const moodIconMapping = {
    1: 'SentimentSatisfiedAltIcon',
    2: 'SentimentNeutralIcon',
    3: 'SentimentDissatisfiedIcon'
}

export const moodTextMapping = {
    1: 'Bad',
    2: 'Neutral',
    3: 'Good'
}