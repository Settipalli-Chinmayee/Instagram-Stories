import React, { useEffect, useRef, useState } from "react";
import "./StoryViewer.css";

const StoryViewer = ({ story, onNext, onPrev, onClose }) => {
    const [loading, setLoading] = useState(true);
    const timerRef = useRef(null);

    //   useEffect(() => {
    //     setLoading(true);
    //     const img = new Image();
    //     img.src = story.image;
    //     img.onload = () => {
    //       setLoading(false);
    //       timerRef.current = setTimeout(onNext, 5000);
    //     };

    //     return () => clearTimeout(timerRef.current);
    //   }, [story, onNext]);


    useEffect(() => {

        clearTimeout(timerRef.current);

        setLoading(true);

        const img = new Image();
        img.src = story.image;

        const handleLoad = () => {
            setLoading(false);

            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                onNext();
            }, 5000);
        };

        img.onload = handleLoad;


        return () => {
            clearTimeout(timerRef.current);
        };
    }, [story, onNext]);



    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);


    const handleTap = (e) => {
        const tapX = e.nativeEvent.clientX;
        const screenWidth = window.innerWidth;
        if (tapX < screenWidth / 2) {
            onPrev();
        } else {
            onNext();
        }
    };

    return (
        <div className="viewer-overlay" onClick={handleTap}>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <img src={story.image} alt="Story" className="story-image" />
            )}
            <button
                className="close-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
            >
                ×
            </button>
        </div>

    );
};

export default StoryViewer;
