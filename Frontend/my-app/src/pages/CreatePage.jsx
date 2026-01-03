import { useState } from "react";
import axios from "axios";
import "./Create.css";

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const res = await axios.post("http://localhost:5000/pastes", {
      text: content,
      ttl,
      maxViews
    });
  
    const id = res.data.url.split("/").pop();
    setLink(`${window.location.origin}/p/${id}`);
  
    setContent("");
    setTtl("");
    setMaxViews("");
  };  

  return (
    <div className="container">
      <h1>PasteBin</h1>

      <form onSubmit={handleSubmit} className="card">
        <textarea
          placeholder="Paste your text here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <div className="options">
          <input
            type="number"
            placeholder="TTL (minutes)"
            value={ttl}
            onChange={(e) => setTtl(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Max Views"
            value={maxViews}
            onChange={(e) => setMaxViews(e.target.value)}
            required
          />
        </div>

        <button>Create Paste</button>
      </form>

      {link && (
        <div className="result">
          <p>Share this link:</p>
          <a href={link} target="_blank" rel="noreferrer">{link}</a>
        </div>
      )}
    </div>
  );
}
