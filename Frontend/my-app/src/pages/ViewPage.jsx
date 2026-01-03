import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./View.css";

export default function ViewPaste() {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const [error, setError] = useState("");
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/pastes/${id}`)
      .then((res) => {
        setPaste(res.data);

        const expiresAt = new Date(res.data.expiresAt).getTime();
        setRemaining(expiresAt - Date.now());
      })
      .catch((err) =>
        setError(err.response?.data?.error || "Something went wrong")
      );
  }, [id]);

  useEffect(() => {
    if (!paste) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          setError("Paste expired");
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [paste]);

  const formatTime = (ms) => {
    if (ms <= 0) return "00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  if (error) return <div className="view-container">{error}</div>;
  if (!paste) return <div className="view-container">Loading...</div>;

  return (
    <div className="view-container">
      <pre className="paste-box">{paste.text}</pre>

      <div className="meta">
        <span>Views used: {paste.views}</span>
        <span>Max views: {paste.maxViews}</span>
        <span>Expires in: {formatTime(remaining)}</span>
      </div>
    </div>
  );
}
