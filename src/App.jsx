import React, { useEffect, useState } from "react";
import StoryList from "./components/StoryList";
import StoryViewer from "./components/StoryViewer";
import "./App.css";

function App() {
  const [stories, setStories] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(null);

  useEffect(() => {
    fetch("/data/stories.json")
      .then((res) => res.json())
      .then((data) => setStories(data));
  }, []);

  const openStory = (index) => setCurrentStoryIndex(index);
  const closeViewer = () => setCurrentStoryIndex(null);

  const goToNext = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
    } else {
      closeViewer();
    }
  };

  const goToPrev = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="App">
      <h2>Instagram Stories (Mobile)</h2>
      <StoryList stories={stories} onStoryClick={openStory} />
      {currentStoryIndex !== null && (
        <StoryViewer
          story={stories[currentStoryIndex]}
          onNext={goToNext}
          onPrev={goToPrev}
          onClose={closeViewer}
        />
      )}
    </div>
  );
}

export default App;
