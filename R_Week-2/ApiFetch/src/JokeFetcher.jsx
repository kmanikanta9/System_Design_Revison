import React, { useState, useEffect, useRef } from "react";

const JokeFetcher = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [count, setCount] = useState(1); // number of jokes to fetch
  const abortControllerRef = useRef(null);

  // Fetch a single joke
  const fetchSingleJoke = async () => {
    const res = await fetch("https://official-joke-api.appspot.com/random_joke");
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  };

  // Fetch multiple jokes (1–5)
  const fetchMultipleJokes = async (num) => {
    const jokes = await Promise.all(
      Array.from({ length: num }, () => fetchSingleJoke())
    );
    return jokes;
  };

  const getJoke = async () => {
    // Cancel any ongoing request before starting a new one
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError("");
    try {
      const jokes = await fetchMultipleJokes(count);

      // If the fetch was aborted, exit silently
      if (controller.signal.aborted) return;

      const latestJoke = jokes[jokes.length - 1];
      setJoke(latestJoke);

      // Add to history (only keep 5 latest)
      setHistory((prev) => {
        const updated = [...jokes, ...prev];
        return updated.slice(0, 5);
      });
    } catch (err) {
      if (err.name !== "AbortError") setError("Failed to fetch joke.");
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        textAlign: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2>🎭 Random Joke Generator</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="number"
          min="1"
          max="5"
          value={count}
          onChange={(e) => setCount(Math.min(5, Math.max(1, +e.target.value)))}
          style={{
            width: "80px",
            padding: "6px",
            borderRadius: "6px",
            border: "1px solid #ede8e8ff",
            marginRight: "10px",
          }}
        />
        <button
          onClick={getJoke}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            background: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          Get Random Joke
        </button>
      </div>

      {loading && <p>Loading joke...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {joke && !loading && !error && (
        <div
          style={{
            background: "#c27474ff",
            padding: "12px 20px",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}
        >
          <p>
            <strong>Setup:</strong> {joke.setup}
          </p>
          <p>
            <strong>Punchline:</strong> {joke.punchline}
          </p>
        </div>
      )}

      {history.length > 0 && (
        <>
          <h3>🕒 Joke History (Last {history.length})</h3>
          <ul style={{ textAlign: "left", padding: "0 1rem" }}>
            {history.map((item, idx) => (
              <li key={idx} style={{ marginBottom: "10px" }}>
                <strong>{item.setup}</strong> — {item.punchline}
              </li>
            ))}
          </ul>

          <button
            onClick={clearHistory}
            style={{
              padding: "6px 12px",
              background: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Clear History
          </button>
        </>
      )}
    </div>
  );
};

export default JokeFetcher;
