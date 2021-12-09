import firestore from '@react-native-firebase/firestore';

export const createQuiz = (currentQuizId, title, description) => {
  return firestore().collection('Quizzes').doc(currentQuizId).set({
    title,
    description,
  });
};

// Create new question for current quiz
export const createQuestion = (currentQuizId, currentQuestionId, question) => {
  return firestore()
    .collection('Quizzes')
    .doc(currentQuizId)
    .collection('QNA')
    .doc(currentQuestionId)
    .set(question);
};

// Get All Quizzes
export const getQuizzes = () => {
  return firestore().collection('Quizzes').get();
};

// Get Quiz Details by id
export const getQuizById = currentQuizId => {
  return firestore().collection('Quizzes').doc(currentQuizId).get();
};

// Get Questions by currentQuizId
export const getQuestionsByQuizId = currentQuizId => {
  return firestore()
    .collection('Quizzes')
    .doc(currentQuizId)
    .collection('QNA')
    .get();
};

////////////////////////////////////////////////

export const createPost = (postId, username, userTitle, description, image) => {
  return firestore().collection('Posts').doc(postId).set({
    username,
    userTitle,
    description,
    image,
  });
};

// Get post Details by id
export const getPostById = postId => {
  return firestore().collection('Posts').doc(postId).get();
};

// Get All posts
export const getAllPosts = () => {
  return firestore().collection('Posts').get();
};
