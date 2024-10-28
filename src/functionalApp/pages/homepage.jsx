import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoTags, setVideoTags] = useState("");
  const [videoCategory, setVideoCategory] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/videos");
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleVideoUpload = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", videoTitle);
    formData.append("description", videoDescription);
    formData.append("tags", videoTags);
    formData.append("category", videoCategory);
    formData.append("video", videoFile);

    try {
      const response = await axios.post(
        "http://localhost:3001/videos",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Video uploaded:", response.data);
      fetchVideos(); // Refresh the video list
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="homepage-container">
      <div className="upload-form">
        <h2>Upload Video</h2>
        <form onSubmit={handleVideoUpload}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Tags:</label>
            <input
              type="text"
              value={videoTags}
              onChange={(e) => setVideoTags(e.target.value)}
            />
          </div>
          <div>
            <label>Category:</label>
            <input
              type="text"
              value={videoCategory}
              onChange={(e) => setVideoCategory(e.target.value)}
            />
          </div>
          <div>
            <label>Video File:</label>
            <input
              type="file"
              onChange={(e) => setVideoFile(e.target.files[0])}
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Uploading..." : "Upload Video"}
          </button>
        </form>
      </div>
      <div className="video-list">
        <h2>Uploaded Videos</h2>
        <ul>
          {videos.map((video) => (
            <li key={video.id}>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <p>Tags: {video.tags}</p>
              <p>Category: {video.category}</p>
              <video width="320" height="240" controls>
                <source
                  src={`http://localhost:3001/${video.url}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
