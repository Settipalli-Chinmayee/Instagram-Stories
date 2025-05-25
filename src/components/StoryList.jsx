import React from "react";
import "./StoryList.css";

const StoryList = ({ stories, onStoryClick }) => {
  return (
    <div className="story-list">
      {stories.map((story, index) => (
        <div key={story.id} className="story-thumbnail" onClick={() => onStoryClick(index)}>
          <img src={story.image} alt={`Story ${story.id}`} />
        </div>
      ))}
    </div>
  );
};

export default StoryList;
