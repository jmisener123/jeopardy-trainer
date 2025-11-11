import { useState, useEffect, useMemo } from "react";

// Map specific buckets to main categories
function normalizeBucket(bucket) {
  if (!bucket) return "Miscellaneous";
  
  const lowerBucket = bucket.toLowerCase();
  
  // Wordplay & Puzzles (check early for exact matches)
  if (lowerBucket.includes("wordplay") || (lowerBucket.includes("puzzle") && !lowerBucket.includes("games")) || 
      lowerBucket.includes("rhyme") || lowerBucket.includes("anagram") || 
      lowerBucket.includes("homophone") || lowerBucket.includes("pun") ||
      lowerBucket.includes("before & after") || lowerBucket.includes("hodgepodge") ||
      lowerBucket.includes("potpourri")) {
    return "Wordplay & Puzzles";
  }
  
  // Religion & Mythology (check early to catch Bible-related content)
  if (lowerBucket.includes("bible") || lowerBucket.includes("biblical") || 
      lowerBucket.includes("religion") || lowerBucket.includes("mythology") || 
      lowerBucket.includes("myth") || lowerBucket.includes("testament") ||
      lowerBucket.includes("scripture")) {
    return "Religion & Mythology";
  }
  
  // American History
  if (lowerBucket.includes("american") && (lowerBucket.includes("history") || lowerBucket.includes("president") || 
      lowerBucket.includes("civil war") || lowerBucket.includes("revolution"))) {
    return "American History";
  }
  if (lowerBucket.includes("presidents") || lowerBucket.includes("first ladies") || 
      lowerBucket.includes("founding fathers") || lowerBucket.includes("american indian")) {
    return "American History";
  }
  
  // World History
  if (lowerBucket.includes("history") && !lowerBucket.includes("american")) {
    return "World History";
  }
  if (lowerBucket.includes("ancient") || lowerBucket.includes("medieval") || 
      lowerBucket.includes("explorer") || lowerBucket.includes("war") || 
      lowerBucket.includes("royalty") || lowerBucket.includes("monarch")) {
    return "World History";
  }
  
  // Geography & Places
  if (lowerBucket.includes("geography") || lowerBucket.includes("place") || 
      lowerBucket.includes("countries") || lowerBucket.includes("cities") || 
      lowerBucket.includes("capital") || lowerBucket.includes("state") || 
      lowerBucket.includes("travel") || lowerBucket.includes("landmark")) {
    return "Geography & Places";
  }
  
  // Life Sciences
  if (lowerBucket.includes("biology") || lowerBucket.includes("animal") || 
      lowerBucket.includes("bird") || lowerBucket.includes("insect") || 
      lowerBucket.includes("plant") || lowerBucket.includes("botanical") || 
      lowerBucket.includes("zoology") || lowerBucket.includes("ecology") || 
      lowerBucket.includes("evolution") || lowerBucket.includes("genetics") ||
      lowerBucket.includes("mammal") || lowerBucket.includes("creature") ||
      lowerBucket.includes("wildlife")) {
    return "Life Sciences";
  }
  
  // Physical Sciences
  if (lowerBucket.includes("chemistry") || lowerBucket.includes("physics") || 
      lowerBucket.includes("astronomy") || lowerBucket.includes("space") || 
      lowerBucket.includes("planet") || lowerBucket.includes("star") || 
      lowerBucket.includes("element") || lowerBucket.includes("atom") || 
      (lowerBucket.includes("science") && !lowerBucket.includes("life"))) {
    return "Physical Sciences";
  }
  
  // Medicine & Health
  if (lowerBucket.includes("medicine") || lowerBucket.includes("medical") || 
      lowerBucket.includes("health") || lowerBucket.includes("anatomy") || 
      lowerBucket.includes("disease") || lowerBucket.includes("doctor") ||
      (lowerBucket.includes("body") && lowerBucket.includes("human"))) {
    return "Medicine & Health";
  }
  
  // Visual Arts
  if ((lowerBucket.includes("art") && !lowerBucket.includes("martial"))) {
    return "Visual Arts";
  }
  if (lowerBucket.includes("painting") || lowerBucket.includes("sculpture") || 
      lowerBucket.includes("artist") || lowerBucket.includes("museum") || 
      lowerBucket.includes("architecture") || lowerBucket.includes("design") ||
      lowerBucket.includes("photograph")) {
    return "Visual Arts";
  }
  
  // Classical Music & Opera
  if (lowerBucket.includes("classical") || lowerBucket.includes("opera") || 
      lowerBucket.includes("ballet") || lowerBucket.includes("orchestra") || 
      lowerBucket.includes("symphony") || (lowerBucket.includes("composer") && 
      !lowerBucket.includes("pop") && !lowerBucket.includes("rock"))) {
    return "Classical Music & Opera";
  }
  
  // Popular Music
  if (lowerBucket.includes("music") || lowerBucket.includes("rock") || 
      lowerBucket.includes("pop") || lowerBucket.includes("jazz") || 
      lowerBucket.includes("country") || lowerBucket.includes("hip-hop") || 
      lowerBucket.includes("band") || lowerBucket.includes("singer") || 
      lowerBucket.includes("song")) {
    return "Popular Music";
  }
  
  // Movies & Film
  if (lowerBucket.includes("movie") || lowerBucket.includes("film") || 
      lowerBucket.includes("cinema") || lowerBucket.includes("director") || 
      lowerBucket.includes("actor") || lowerBucket.includes("actress") ||
      lowerBucket.includes("animation") || (lowerBucket.includes("cartoon") && !lowerBucket.includes("tv"))) {
    return "Movies & Film";
  }
  
  // Television
  if (lowerBucket.includes("television") || lowerBucket.includes("tv") || 
      lowerBucket.includes("sitcom") || (lowerBucket.includes("show") && 
      (lowerBucket.includes("tv") || lowerBucket.includes("series")))) {
    return "Television";
  }
  
  // Books & Authors
  if (lowerBucket.includes("book") || lowerBucket.includes("author") || 
      lowerBucket.includes("literature") || lowerBucket.includes("novel") || 
      lowerBucket.includes("fiction") || lowerBucket.includes("poet") || 
      lowerBucket.includes("literary") || lowerBucket.includes("writer") ||
      lowerBucket.includes("shakespeare")) {
    return "Books & Authors";
  }
  
  // Language & Words
  if (lowerBucket.includes("language") || lowerBucket.includes("word") || 
      lowerBucket.includes("vocabulary") || lowerBucket.includes("grammar") || 
      lowerBucket.includes("linguistic") || lowerBucket.includes("etymology") || 
      lowerBucket.includes("spelling") || lowerBucket.includes("letter") ||
      lowerBucket.includes("acronym") || lowerBucket.includes("abbreviation") ||
      lowerBucket.includes("name") || lowerBucket.includes("baby names")) {
    return "Language & Words";
  }
  
  // Famous People
  if (lowerBucket.includes("famous") || lowerBucket.includes("celebrity") || 
      lowerBucket.includes("people") || lowerBucket.includes("biographical") ||
      lowerBucket.includes("notable")) {
    return "Famous People";
  }
  
  // Sports & Games
  if (lowerBucket.includes("sport") || lowerBucket.includes("olympic") || 
      lowerBucket.includes("athlete") || lowerBucket.includes("game") || 
      lowerBucket.includes("baseball") || lowerBucket.includes("football") || 
      lowerBucket.includes("basketball") || lowerBucket.includes("soccer") ||
      lowerBucket.includes("tennis") || lowerBucket.includes("golf") ||
      lowerBucket.includes("hockey") || lowerBucket.includes("toy")) {
    return "Sports & Games";
  }
  
  // Food & Drink
  if (lowerBucket.includes("food") || lowerBucket.includes("drink") || 
      lowerBucket.includes("cuisine") || lowerBucket.includes("cooking") || 
      lowerBucket.includes("restaurant") || lowerBucket.includes("beverage") || 
      lowerBucket.includes("wine") || lowerBucket.includes("beer") ||
      lowerBucket.includes("recipe") || lowerBucket.includes("ingredient")) {
    return "Food & Drink";
  }
  
  // Business & Politics
  if (lowerBucket.includes("business") || lowerBucket.includes("economic") || 
      lowerBucket.includes("finance") || lowerBucket.includes("politics") || 
      lowerBucket.includes("political") || lowerBucket.includes("industry") ||
      lowerBucket.includes("commerce") || lowerBucket.includes("brand") ||
      lowerBucket.includes("advertising") || lowerBucket.includes("marketing")) {
    return "Business & Politics";
  }
  
  // Transportation & Technology
  if (lowerBucket.includes("transportation") || lowerBucket.includes("car") || 
      lowerBucket.includes("vehicle") || lowerBucket.includes("train") || 
      lowerBucket.includes("airplane") || lowerBucket.includes("ship") ||
      lowerBucket.includes("technology") || lowerBucket.includes("computer") ||
      lowerBucket.includes("invention")) {
    return "Transportation & Technology";
  }
  
  // Theater & Performance
  if (lowerBucket.includes("theater") || lowerBucket.includes("theatre") || 
      lowerBucket.includes("broadway") || (lowerBucket.includes("musical") && 
      lowerBucket.includes("theater")) || (lowerBucket.includes("play") && 
      !lowerBucket.includes("word"))) {
    return "Theater & Performance";
  }
  
  // Fashion & Lifestyle
  if (lowerBucket.includes("fashion") || lowerBucket.includes("clothing") || 
      lowerBucket.includes("style") || lowerBucket.includes("holiday") || 
      lowerBucket.includes("celebration")) {
    return "Fashion & Lifestyle";
  }
  
  // Return Miscellaneous for anything that doesn't match
  return "Miscellaneous";
}

export default function App() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [selectedBucket, setSelectedBucket] = useState("random");
  const [selectedDifficulty, setSelectedDifficulty] = useState("random");
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
  const jsonPath = process.env.PUBLIC_URL + "/jeopardy_rebucketed.json";
  console.log("📂 Trying to load JSON from:", jsonPath);

  fetch(jsonPath)
    .then((res) => {
      console.log("✅ Fetch response:", res.status, res.statusText);
      if (!res.ok) {
        throw new Error(`Failed to load questions: ${res.status}`);
      }
      return res.text(); // get raw text first
    })
    .then((text) => {
      console.log("📝 Raw JSON text length:", text.length);
      try {
        const data = JSON.parse(text);
        console.log("✅ Parsed JSON successfully. # of questions:", data.length);
        const normalizedData = data.map(q => ({
          ...q,
          originalBucket: q.study_bucket,
          study_bucket: normalizeBucket(q.study_bucket)
        }));
        setAllQuestions(normalizedData);
      } catch (parseErr) {
        console.error("❌ JSON parse error:", parseErr);
        console.log("👀 Sample of file content:", text.slice(0, 300));
      }
    })
    .catch(err => console.error("🚨 Error loading questions:", err));
}, []);



  // Get unique study buckets from all questions
  const studyBuckets = useMemo(() => {
    if (!allQuestions.length) return [];
    const buckets = [...new Set(allQuestions.map(q => q.study_bucket))].filter(Boolean);
    return buckets.sort();
  }, [allQuestions]);

  // Filter questions based on selected bucket and difficulty
  const questions = useMemo(() => {
    if (!allQuestions.length) return [];
    
    let filtered = allQuestions;
    
    // Filter by bucket
    if (selectedBucket !== "random") {
      filtered = filtered.filter(q => q.study_bucket === selectedBucket);
    }
    
    // Filter by difficulty
    if (selectedDifficulty !== "random") {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }
    
    return filtered;
  }, [allQuestions, selectedBucket, selectedDifficulty]);

  // Reset to random index when bucket or difficulty changes
  useEffect(() => {
    if (questions.length > 0) {
      setIndex(Math.floor(Math.random() * questions.length));
      setShowAnswer(false);
    } else {
      setIndex(0);
    }
  }, [selectedBucket, selectedDifficulty, questions.length]);

  if (!allQuestions.length) {
    return (
      <div style={{ 
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        padding: "2rem",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          background: "white",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          textAlign: "center"
        }}>
          <p style={{ fontSize: "1.2rem", color: "#333" }}>Loading questions...</p>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div style={{ 
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        padding: "2rem",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          background: "white",
          padding: "3rem",
          borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          textAlign: "center",
          maxWidth: "500px"
        }}>
          <h2 style={{ color: "#1e3c72", marginBottom: "1rem" }}>No Questions Found</h2>
          <p style={{ fontSize: "1.1rem", color: "#666", marginBottom: "2rem" }}>
            No questions match your current filters.
            {selectedBucket !== "random" && <><br/>Bucket: <strong>{selectedBucket}</strong></>}
            {selectedDifficulty !== "random" && <><br/>Difficulty: <strong>{selectedDifficulty}</strong></>}
          </p>
          <button
            onClick={() => {
              setSelectedBucket("random");
              setSelectedDifficulty("random");
            }}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.1rem",
              background: "linear-gradient(135deg, #1e3c72, #2a5298)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
              boxShadow: "0 4px 15px rgba(30, 60, 114, 0.4)"
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>
    );
  }

  const q = questions[index];
  
  // Safety check - if index is out of bounds, reset it
  if (!q) {
    if (questions.length > 0) {
      setIndex(0);
    }
    return (
      <div style={{ 
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        padding: "2rem",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          background: "white",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          textAlign: "center"
        }}>
          <p style={{ fontSize: "1.2rem", color: "#333" }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
      padding: "2rem",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif"
    }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ 
            fontSize: "3rem", 
            color: "white", 
            marginBottom: "0.5rem",
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)"
          }}>
            🎯 Jeo<span style={{ color: "#ffd700" }}>parody</span> Trainer
          </h1>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.1rem" }}>
            Master your trivia skills with {questions.length.toLocaleString()} questions
          </p>
        </div>

        {/* Filter Controls */}
        <div style={{ 
          background: "white",
          borderRadius: "16px",
          padding: "1.5rem",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          marginBottom: "1.5rem"
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {/* Study Bucket Selector */}
            <div>
              <label htmlFor="bucket-select" style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                fontWeight: "600",
                color: "#333",
                fontSize: "0.9rem",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                Study Bucket
              </label>
              <select
                id="bucket-select"
                value={selectedBucket}
                onChange={(e) => setSelectedBucket(e.target.value)}
                style={{
                  padding: "0.75rem 1rem",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  border: "2px solid #e0e0e0",
                  width: "100%",
                  backgroundColor: "#fafafa",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  outline: "none"
                }}
                onMouseOver={(e) => e.target.style.borderColor = "#1e3c72"}
                onMouseOut={(e) => e.target.style.borderColor = "#e0e0e0"}
              >
                <option value="random">🎲 Random Categories</option>
                {studyBuckets.map(bucket => (
                  <option key={bucket} value={bucket}>{bucket}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Selector */}
            <div>
              <label htmlFor="difficulty-select" style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                fontWeight: "600",
                color: "#333",
                fontSize: "0.9rem",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                Difficulty
              </label>
              <select
                id="difficulty-select"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                style={{
                  padding: "0.75rem 1rem",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  border: "2px solid #e0e0e0",
                  width: "100%",
                  backgroundColor: "#fafafa",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  outline: "none"
                }}
                onMouseOver={(e) => e.target.style.borderColor = "#2a5298"}
                onMouseOut={(e) => e.target.style.borderColor = "#e0e0e0"}
              >
                <option value="random">🎲 All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Question Count */}
          <div style={{ 
            marginTop: "1rem", 
            padding: "0.75rem",
            background: "linear-gradient(135deg, #1e3c7215, #2a529815)",
            borderRadius: "8px",
            textAlign: "center"
          }}>
            <span style={{ fontSize: "0.9rem", color: "#555", fontWeight: "500" }}>
              📊 {questions.length.toLocaleString()} question{questions.length !== 1 ? 's' : ''} available
              {selectedBucket !== "random" && <span style={{ color: "#1e3c72" }}> • {selectedBucket}</span>}
              {selectedDifficulty !== "random" && <span style={{ color: "#2a5298" }}> • {selectedDifficulty}</span>}
            </span>
          </div>
        </div>

        {/* Question Card */}
        <div style={{ 
          background: "white",
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          marginBottom: "1.5rem",
          minHeight: "250px"
        }}>
          {/* Category Badge */}
          <div style={{ marginBottom: "1.5rem", display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{
              background: "linear-gradient(135deg, #1e3c72, #2a5298)",
              color: "white",
              padding: "0.4rem 0.9rem",
              borderRadius: "20px",
              fontSize: "0.85rem",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              {q.study_bucket}
            </span>
            <span style={{
              background: q.difficulty === "Easy" ? "#4caf50" : q.difficulty === "Medium" ? "#ff9800" : "#f44336",
              color: "white",
              padding: "0.4rem 0.9rem",
              borderRadius: "20px",
              fontSize: "0.85rem",
              fontWeight: "600"
            }}>
              {q.difficulty}
            </span>
          </div>

          {/* Clue */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ 
              color: "#1e3c72", 
              fontSize: "1.1rem", 
              marginBottom: "0.75rem",
              fontWeight: "600"
            }}>
              Clue:
            </h3>
            <p style={{ 
              fontSize: "1.3rem", 
              lineHeight: "1.6",
              color: "#333",
              margin: 0
            }}>
              {q.clue_text}
            </p>
          </div>

          {/* Answer Section */}
          {showAnswer ? (
            <div>
              <div style={{
                background: "linear-gradient(135deg, #4caf5015, #66bb6a15)",
                padding: "1.5rem",
                borderRadius: "12px",
                borderLeft: "4px solid #4caf50",
                marginBottom: "1rem"
              }}>
                <h3 style={{ 
                  color: "#4caf50", 
                  fontSize: "1.1rem", 
                  marginBottom: "0.75rem",
                  fontWeight: "600"
                }}>
                  Correct Response:
                </h3>
                <p style={{ 
                  fontSize: "1.3rem", 
                  color: "#2e7d32",
                  margin: 0,
                  fontWeight: "500"
                }}>
                  {q.correct_response}
                </p>
              </div>
              <button
                onClick={() => {
                  setIndex((i) => (i + 1) % questions.length);
                  setShowAnswer(false);
                }}
                style={{
                  padding: "1rem 2rem",
                  fontSize: "1.1rem",
                  background: "linear-gradient(135deg, #1e3c72, #2a5298)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600",
                  boxShadow: "0 4px 15px rgba(30, 60, 114, 0.4)",
                  transition: "all 0.3s ease",
                  width: "100%"
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 20px rgba(30, 60, 114, 0.5)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 15px rgba(30, 60, 114, 0.4)";
                }}
              >
                Next Question ➡️
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowAnswer(true)}
              style={{
                padding: "1rem 2rem",
                fontSize: "1.1rem",
                background: "linear-gradient(135deg, #1e3c72, #2a5298)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600",
                boxShadow: "0 4px 15px rgba(30, 60, 114, 0.4)",
                transition: "all 0.3s ease",
                width: "100%"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(30, 60, 114, 0.5)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(30, 60, 114, 0.4)";
              }}
            >
              🔍 Reveal Answer
            </button>
          )}
        </div>

        {/* Previous Button Only */}
        <div style={{ display: "flex", marginTop: "1.5rem" }}>
          <button
            onClick={() => {
              setIndex((i) => (i > 0 ? i - 1 : questions.length - 1));
              setShowAnswer(false);
            }}
            style={{
              padding: "1rem",
              fontSize: "1.1rem",
              background: "white",
              color: "#1e3c72",
              border: "2px solid white",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              width: "100%"
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#1e3c72";
              e.target.style.color = "white";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "white";
              e.target.style.color = "#1e3c72";
              e.target.style.transform = "translateY(0)";
            }}
          >
            ⬅️ Previous Question
          </button>
        </div>
      </div>
    </div>
  );
}
