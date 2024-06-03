import { useEffect, useState } from 'react';

interface Option {
  text: string;
  points: string[];
}

interface Question {
  question: string;
  options: {
    option1: Option;
    option2: Option;
  };
}

const questions: Question[] = [
  {
    question: "¿Cree que la religión debería influir en las decisiones políticas de Honduras?",
    options: {
      option1: { text: "No", points: ["Karl Marx", "Herbert Spencer"] },
      option2: { text: "Sí", points: ["Max Weber", "Émile Durkheim"] }
    }
  },
  {
    question: "¿Qué es más importante para el desarrollo de Honduras?",
    options: {
      option1: { text: "Tradiciones familiares", points: ["Émile Durkheim", "Max Weber"] },
      option2: { text: "Innovación tecnológica", points: ["August Comte", "Herbert Spencer"] }
    }
  },
  // Añade el resto de las preguntas aquí
];

const Questionnaire = () => {
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [showStatistics, setShowStatistics] = useState(false);
  const [scores, setScores] = useState({
    "Max Weber": 0,
    "Karl Marx": 0,
    "Émile Durkheim": 0,
    "Herbert Spencer": 0,
    "August Comte": 0
  });

  useEffect(() => {
    // Seleccionar preguntas aleatorias
    const randomQuestions: Question[] = [];
    while (randomQuestions.length < 6) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      if (!randomQuestions.includes(questions[randomIndex])) {
        randomQuestions.push(questions[randomIndex]);
      }
    }
    setSelectedQuestions(randomQuestions);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleAnswer('no-answer');
    }
    const timerId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => (prevTimeLeft > 0 ? prevTimeLeft - 1 : 0));
    }, 1000);
    setTimer(timerId);
    return () => clearInterval(timerId);
  }, [currentQuestionIndex]);

  const handleAnswer = (response: string) => {
    if (timer) clearInterval(timer);
    setAnswers([...answers, response]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setTimeLeft(10);
    if (currentQuestionIndex + 1 >= selectedQuestions.length) {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const newScores = { ...scores };
    answers.forEach((answer, index) => {
      if (answer !== 'no-answer') {
        const points = selectedQuestions[index].options[answer as 'option1' | 'option2'].points;
        points.forEach(sociologist => {
          newScores[sociologist]++;
        });
      }
    });
    setScores(newScores);
    setShowStatistics(true);
  };

  if (showStatistics) {
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <h2 className="text-2xl font-bold">Estadísticas</h2>
        <p className="mt-2">El puntaje refleja cuántas respuestas alinearon con las ideas de cada sociólogo.</p>
        <ul className="mt-4">
          {sortedScores.map(([sociologist, score]) => (
            <li key={sociologist} className="text-lg">{sociologist}: {score} puntos</li>
          ))}
        </ul>
      </div>
    );
  }

  const currentQuestion = selectedQuestions[currentQuestionIndex];
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {currentQuestion && (
        <>
          <div className="question-container mb-8 text-white text-center">
            <div id="question-container" className="text-2xl">{currentQuestion.question}</div>
            <div id="timer" className="text-xl mt-2">Tiempo restante: {timeLeft} segundos</div>
          </div>
          <div className="option-container red flex-1 w-full flex items-center justify-center cursor-pointer" onClick={() => handleAnswer('option1')}>
            <div className="option-text text-white text-2xl" id="option1-text">{currentQuestion.options.option1.text}</div>
          </div>
          <div className="line w-full h-0.5 bg-black"></div>
          <div className="option-container blue flex-1 w-full flex items-center justify-center cursor-pointer" onClick={() => handleAnswer('option2')}>
            <div className="option-text text-white text-2xl" id="option2-text">{currentQuestion.options.option2.text}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Questionnaire;
