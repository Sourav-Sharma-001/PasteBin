import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./View.css";

export default function ViewPaste() {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/pastes/${id}`)
      .then((res) => setPaste(res.data))
      .catch((err) =>
        setError(err.response?.data?.error || "Something went wrong")
      );
  }, [id]);

  if (error) return <div className="view-container">{error}</div>;
  if (!paste) return <div className="view-container">Loading...</div>;

  return (
    <div className="view-container">
      <pre className="paste-box">{paste.text}</pre>

      <div className="meta">
        <span>Views used: {paste.views}</span>
        <span>Max views: {paste.maxViews}</span>
      </div>
    </div>
  );
}
