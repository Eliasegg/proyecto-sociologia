"use client";

import { useState, useEffect, useRef } from "react";
import { questions, Question, Point } from "./questions";

interface Scores {
  [key: string]: number;
}

const Quiz = () => {
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [showingResult, setShowingResult] = useState<boolean>(false);
  const [scores, setScores] = useState<Scores>({
    "Max Weber": 0,
    "Karl Marx": 0,
    "Émile Durkheim": 0,
    "Herbert Spencer": 0,
    "August Comte": 0,
  });
  const [universityCode, setUniversityCode] = useState<string>("");
  const [isCodeEntered, setIsCodeEntered] = useState<boolean>(false);

  const shimRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (questions.length > 0) {
      const shuffledQuestions = questions
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);
      setSelectedQuestions(shuffledQuestions);
    }
  }, []);

  useEffect(() => {
    if (selectedQuestions.length > 0) startTimer();

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [currentQuestionIndex, selectedQuestions]);

  useEffect(() => {
    if (shimRef.current) {
      shimRef.current.classList.remove("shim");
      void shimRef.current.offsetWidth; // Trigger reflow
      shimRef.current.classList.add("shim");
    }
  }, [currentQuestionIndex]);

  const startTimer = () => {
    if (timer) {
      clearInterval(timer);
    }
    setTimeLeft(10);
    const newTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(newTimer);
          answer("no-answer");
          return 0;
        }
      });
    }, 1000);
    setTimer(newTimer);
  };

  const answer = (response: string) => {
    if (timer) {
      clearInterval(timer);
    }
    setAnswers((prevAnswers) => [...prevAnswers, response]);
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < selectedQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      showResult();
    }
  };

  const showResult = async () => {
    const newScores: Scores = {
      "Max Weber": 0,
      "Karl Marx": 0,
      "Émile Durkheim": 0,
      "Herbert Spencer": 0,
      "August Comte": 0,
    };

    answers.forEach((answer, index) => {
      if (answer !== "no-answer" && selectedQuestions[index]) {
        const points =
          selectedQuestions[index].options[answer as "option1" | "option2"]
            .points;
        points.forEach((point: Point) => {
          newScores[point.sociologist]++;
        });
      }
    });

    setScores(newScores);
    setShowingResult(true);

    console.log("code: " + universityCode);

    // Send the results to the API
    const response = await fetch("/api/saveResponse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        universityCode,
        responses: selectedQuestions.map((question, index) => ({
          questionId: question.id,
          answer: answers[index],
        })),
      }),
    });

    if (!response.ok) {
      console.error("Failed to save responses");
    }
  };

  const handleCodeSubmit = () => {
    if (universityCode.trim() !== "") {
      setIsCodeEntered(true);
    }
  };

  const getResultText = (results: string[]) => {
    if (results.length >= 3) {
      return "Tienes un poco de cada uno de los personajes.";
    } else {
      return results
        .map((result) => {
          switch (result) {
            case "Max Weber":
              return "Max Weber, quien valora la influencia de la cultura y la religión en la sociedad.";
            case "Karl Marx":
              return "Karl Marx, quien critica la influencia de las instituciones tradicionales en la sociedad.";
            case "Émile Durkheim":
              return "Émile Durkheim, quien cree en la importancia de la cohesión social y la solidaridad.";
            case "Herbert Spencer":
              return "Herbert Spencer, quien defiende la teoría de la evolución social y la adaptación.";
            case "August Comte":
              return "August Comte, quien valora la importancia del conocimiento científico y la evolución de la sociedad.";
            default:
              return "";
          }
        })
        .join(" También se parece al de ");
    }
  };

  const getResultImages = (results: string[]) => {
    return results.map((result) => {
      switch (result) {
        case "Max Weber":
          return "/images/max_weber.jpg";
        case "Karl Marx":
          return "/images/karl_marx.PNG";
        case "Émile Durkheim":
          return "/images/emile_durkheim.PNG";
        case "Herbert Spencer":
          return "/images/herbert_spencer.PNG";
        case "August Comte":
          return "/images/august_comte.PNG";
        default:
          return "";
      }
    });
  };

  if (!isCodeEntered) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <div className="text-2xl mb-4">Ingresa el código de la universidad</div>
        <input
          type="text"
          value={universityCode}
          onChange={(e) => setUniversityCode(e.target.value)}
          className="p-2 mb-4 border border-gray-300 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCodeSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Empezar
        </button>
      </div>
    );
  }

  if (showingResult) {
    const maxScore = Math.max(...Object.values(scores));
    const results = Object.keys(scores).filter(
      (sociologist) => scores[sociologist] === maxScore
    );
    const resultText = `Tu pensamiento se parece más a ${getResultText(
      results
    )}`;
    const resultImages = getResultImages(results);

    const sortedScores = Object.entries(scores).sort(([, a], [, b]) => b - a);

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-6">
        <h1 className="text-4xl mb-4">Resultados del Quiz</h1>
        <p className="text-2xl mb-6">{resultText}</p>
        <div className="flex flex-wrap justify-center mb-6">
          {resultImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="Sociologist"
              className="w-32 h-32 m-2 rounded-full"
            />
          ))}
        </div>
        <div className="w-full max-w-lg">
          <h1 className="text-4xl mb-4 justify-center">Puntajes individuales</h1>
          <hr />
          {sortedScores.map(([sociologist, score]) => (
            <>
              <div
                key={sociologist}
                className="flex justify-between items-center mb-2"
              >
                <span>{sociologist}</span>
                <span>{score}</span>
              </div>
            </>
          ))}
        </div>
        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => window.location.reload()}
        >
          Reiniciar Quiz
        </button>
      </div>
    );
  }

  if (
    selectedQuestions.length === 0 ||
    currentQuestionIndex >= selectedQuestions.length
  ) {
    return <div className="text-center text-white mt-10">Cargando...</div>;
  }

  const currentQuestion = selectedQuestions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <div className="relative w-full bg-gray-200">
        <div ref={shimRef} className="w-full absolute top-0 h-4 shim"></div>
      </div>
      <div className="text-center mb-4 mt-2">
        <div className="text-2xl mb-2">{currentQuestion.question}</div>
      </div>
      <div
        className="w-full flex flex-col items-center justify-center mb-2 cursor-pointer bg-red-500 h-1/2"
        onClick={() => answer("option1")}
      >
        <div className="text-2xl">{currentQuestion.options.option1.text}</div>
      </div>
      <div className="w-full h-1 bg-black"></div>
      <div
        className="w-full flex flex-col items-center justify-center cursor-pointer bg-blue-500 h-1/2"
        onClick={() => answer("option2")}
      >
        <div className="text-2xl">{currentQuestion.options.option2.text}</div>
      </div>
    </div>
  );
};

export default Quiz;
