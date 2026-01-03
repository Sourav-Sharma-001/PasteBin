import { useState } from "react";
import "./Create.css"

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setLink("https://your-app.vercel.app/p/abc123");
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
            placeholder="TTL (seconds)"
            value={ttl}
            onChange={(e) => setTtl(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Views"
            value={maxViews}
            onChange={(e) => setMaxViews(e.target.value)}
          />
        </div>

        <button>Create Paste</button>
      </form>

      {link && (
        <div className="result">
          <p>Share this link:</p>
          <a href={link}>{link}</a>
        </div>
      )}
    </div>
  );
}
