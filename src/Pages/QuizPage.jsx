import Quiz from "../modules/quiz/Quiz";

const QuizPage = ({ setFirst }) => {
  return (
    <div>
      <Quiz setFirst={setFirst} />
    </div>
  );
};

export default QuizPage;
