import { useParams } from "react-router-dom";
import "./View.css";

export default function ViewPaste() {
  const { id } = useParams();

  const paste = {
    content: "This is a sample paste content.\nRead-only view.",
    remaining_views: 3,
    expires_at: "2026-01-01T00:00:00Z",
  };

  return (
    <div className="view-container">
      <pre className="paste-box">{paste.content}</pre>

      <div className="meta">
        <span>Remaining views: {paste.remaining_views}</span>
        <span>Expires at: {paste.expires_at}</span>
      </div>
    </div>
  );
}
