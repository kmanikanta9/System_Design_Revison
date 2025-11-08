import React, { useEffect, useRef, useState } from "react";
const QUESTIONS = [
  {
    id: 1,
    text: "What does CSS stand for?",
    options: [
      "Computer Styled Sections",
      "Cascading Style Sheets",
      "Creative Style Syntax",
      "Central Style System",
    ],
    correctIndex: 1,
  },
  {
    id: 2,
    text: "Which method is used to add a new element at the end of an array in JavaScript?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctIndex: 0,
  },
  {
    id: 3,
    text: "Which HTML tag is used to create a button?",
    options: ["<a>", "<button>", "<input>", "<form>"],
    correctIndex: 1,
  },
  {
    id: 4,
    text: "Which hook is used to manage state in a functional React component?",
    options: ["useEffect", "useState", "useMemo", "useRef"],
    correctIndex: 1,
  },
  {
    id: 5,
    text: "What is the output of: typeof [] in JavaScript?",
    options: ["array", "object", "list", "undefined"],
    correctIndex: 1,
  },
  {
    id: 6,
    text: "In Git, which command creates a new branch and switches to it?",
    options: ["git branch new && git checkout new", "git branch -m new", "git checkout -b new", "git switch -c new"],
    correctIndex: 2,
  }
];

const QUESTION_TIME = 15; 
const AUTO_NEXT_DELAY = 2000; 
const HISTORY_MAX = 7; 

export default function QuizApp() {
  const [qIndex, setQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [attemptedCount, setAttemptedCount] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const [longestTime, setLongestTime] = useState(0);


  const intervalRef = useRef(null);
  const autoNextRef = useRef(null);
  const questionStartRef = useRef(null);

  const startQuiz = () => {
    resetAll();
    setIsRunning(true);
    setQuizOver(false);
    questionStartRef.current = Date.now();
    setTimeLeft(QUESTION_TIME);
  };


  const resetAll = () => {
    clearAllTimers();
    setQIndex(0);
    setTimeLeft(QUESTION_TIME);
    setIsRunning(false);
    setSelectedIndex(null);
    setFeedback(null);
    setScore(0);
    setHistory([]);
    setAttemptedCount(0);
    setQuizOver(false);
    setLongestTime(0);
    questionStartRef.current = null;
  };

 
  const clearAllTimers = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (autoNextRef.current) {
      clearTimeout(autoNextRef.current);
      autoNextRef.current = null;
    }
  };


  useEffect(() => {
    if (!isRunning || quizOver) return;


    clearAllTimers();

    
    questionStartRef.current = Date.now();
    setTimeLeft(QUESTION_TIME);
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          
          clearAllTimers();
          handleTimeout();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      clearAllTimers();
    };
    
  }, [qIndex, isRunning, quizOver]);

  const handleSelect = (optIndex) => {
    if (!isRunning || feedback) return; 

   
    clearAllTimers();

    const question = QUESTIONS[qIndex];
    const correct = optIndex === question.correctIndex;
    const now = Date.now();
    const timeTaken = questionStartRef.current ? (now - questionStartRef.current) / 1000 : QUESTION_TIME;
    setSelectedIndex(optIndex);
    setFeedback(correct ? "correct" : "wrong");

    
    setScore((s) => s + (correct ? 1 : 0)); // wrong -> +0

    setLongestTime((prev) => Math.max(prev, timeTaken));


    const histEntry = {
      questionId: question.id,
      text: question.text,
      selected: question.options[optIndex],
      correctAnswer: question.options[question.correctIndex],
      result: correct ? "correct" : "wrong",
      timeTaken,
    };
    setHistory((h) => [histEntry, ...h].slice(0, HISTORY_MAX));
    setAttemptedCount((c) => c + 1);


    autoNextRef.current = setTimeout(() => {
      goToNextQuestion();
    }, AUTO_NEXT_DELAY);
  };


  const handleSkip = () => {
    if (!isRunning || feedback) return;

    clearAllTimers();
    const question = QUESTIONS[qIndex];
    const now = Date.now();
    const timeTaken = questionStartRef.current ? (now - questionStartRef.current) / 1000 : QUESTION_TIME;

    setSelectedIndex(null);
    setFeedback("skipped");
    setScore((s) => s - 1); 
    setLongestTime((prev) => Math.max(prev, timeTaken));

    const histEntry = {
      questionId: question.id,
      text: question.text,
      selected: null,
      correctAnswer: question.options[question.correctIndex],
      result: "skipped",
      timeTaken,
    };
    setHistory((h) => [histEntry, ...h].slice(0, HISTORY_MAX));
    setAttemptedCount((c) => c + 1);

    autoNextRef.current = setTimeout(() => {
      goToNextQuestion();
    }, 600);
  };


  const handleTimeout = () => {
    if (!isRunning || feedback) return;

    const question = QUESTIONS[qIndex];
    const now = Date.now();
    const timeTaken = QUESTION_TIME;

    setSelectedIndex(null);
    setFeedback("skipped"); 
    setScore((s) => s - 1); 
    setLongestTime((prev) => Math.max(prev, timeTaken));

    const histEntry = {
      questionId: question.id,
      text: question.text,
      selected: null,
      correctAnswer: question.options[question.correctIndex],
      result: "skipped (timeout)",
      timeTaken,
    };
    setHistory((h) => [histEntry, ...h].slice(0, HISTORY_MAX));
    setAttemptedCount((c) => c + 1);

 
    autoNextRef.current = setTimeout(() => {
      goToNextQuestion();
    }, 700);
  };

  
  const goToNextQuestion = () => {
    clearAllTimers();
    setSelectedIndex(null);
    setFeedback(null);

    if (qIndex + 1 >= QUESTIONS.length) {
      
      setIsRunning(false);
      setQuizOver(true);
      questionStartRef.current = null;
      
    } else {
      setQIndex((i) => i + 1);
      setTimeLeft(QUESTION_TIME);
      questionStartRef.current = Date.now();
    }
  };

  const summary = {
    totalScore: score,
    correct: history.filter((h) => h.result === "correct").length,
    wrong: history.filter((h) => h.result === "wrong").length,
    skipped: history.filter((h) => h.result === "skipped" || h.result === "skipped (timeout)").length,
    longestTime,
  };


  useEffect(() => {
    return () => clearAllTimers();
  }, []);
  const optionClass = (idx) => {
    if (!feedback) return "option";
    const question = QUESTIONS[qIndex];
    if (feedback === "correct") {
      return idx === question.correctIndex ? "option correct" : "option disabled";
    }
    if (feedback === "wrong") {

      if (idx === question.correctIndex) return "option correct";
      if (selectedIndex === idx) return "option wrong";
      return "option disabled";
    }
    if (feedback === "skipped") {
      return idx === question.correctIndex ? "option correct" : "option disabled";
    }
    return "option";
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Interactive Quiz</h1>

      {!isRunning && !quizOver && (
        <div style={styles.center}>
          <p style={{ marginBottom: 12 }}>Press start to begin the quiz.</p>
          <button style={styles.primaryBtn} onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      )}

      {isRunning && !quizOver && (
        <div style={styles.quizCard} role="region" aria-live="polite">
          <div style={styles.topRow}>
            <div style={{ fontWeight: 600 }}>
              Question {qIndex + 1} / {QUESTIONS.length}
            </div>
            <div>Time left: <strong>{timeLeft}s</strong></div>
          </div>

          <div style={styles.progressBarOuter} aria-hidden>
            <div
              style={{
                ...styles.progressBarInner,
                width: `${((attemptedCount + (feedback ? 1 : 0)) / QUESTIONS.length) * 100}%`,
              }}
            />
          </div>

          <div style={styles.questionText}>{QUESTIONS[qIndex].text}</div>

          <div style={styles.optionsContainer}>
            {QUESTIONS[qIndex].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={optionClass(i)}
                disabled={!!feedback}
                style={buttonStyles(optionClass(i))}
                aria-pressed={selectedIndex === i}
              >
                {opt}
              </button>
            ))}
          </div>

          <div style={styles.actionsRow}>
            <button style={styles.ghostBtn} onClick={handleSkip} disabled={!!feedback}>
              Skip Question (-1)
            </button>
            <div>
              <small>Score: </small>
              <strong>{score}</strong>
            </div>
          </div>

          {feedback && (
            <div style={styles.feedbackBox} aria-live="polite">
              {feedback === "correct" && <span style={{ color: "green" }}>Correct! ✅</span>}
              {feedback === "wrong" && (
                <span style={{ color: "crimson" }}>
                  Wrong ❌ — correct: {QUESTIONS[qIndex].options[QUESTIONS[qIndex].correctIndex]}
                </span>
              )}
              {feedback === "skipped" && (
                <span style={{ color: "#ff8c00" }}>
                  Skipped / timed out — correct: {QUESTIONS[qIndex].options[QUESTIONS[qIndex].correctIndex]}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {quizOver && (
        <div style={styles.summaryCard}>
          <h2>Quiz Summary</h2>
          <p><strong>Total score:</strong> {summary.totalScore}</p>
          <p>
            <strong>Correct:</strong> {summary.correct} &nbsp; | &nbsp;
            <strong>Wrong:</strong> {summary.wrong} &nbsp; | &nbsp;
            <strong>Skipped:</strong> {summary.skipped}
          </p>
          <p><strong>Longest time taken for a question:</strong> {summary.longestTime}s</p>

          <div style={{ marginTop: 16 }}>
            <button style={styles.primaryBtn} onClick={resetAll}>Restart Quiz</button>
            <button style={{ ...styles.ghostBtn, marginLeft: 12 }} onClick={() => { resetAll(); startQuiz(); }}>
              Restart & Play
            </button>
          </div>
        </div>
      )}


      <div style={styles.history}>
        <h3>History (most recent first)</h3>
        {history.length === 0 ? (
          <p style={{ opacity: 0.8 }}>No questions attempted yet.</p>
        ) : (
          <ol>
            {history.map((h, idx) => (
              <li key={`${h.questionId}-${idx}`} style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 600 }}>{h.text}</div>
                <div>
                  <small>Selected: </small>
                  <strong>{h.selected ?? <em>— no answer</em>}</strong>
                  &nbsp; | &nbsp;
                  <small>Result: </small>
                  <strong style={{ color: h.result.startsWith("correct") ? "green" : h.result.startsWith("skipped") ? "#ff8c00" : "crimson" }}>
                    {h.result}
                  </strong>
                  &nbsp; | &nbsp;
                  <small>Time: </small>
                  <strong>{h.timeTaken}s</strong>
                </div>
                <div style={{ fontSize: 12, color: "#666" }}><em>Correct answer: {h.correctAnswer}</em></div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
