import { useState, useEffect } from "react";

import api from "../Api/axios";

function Notes({ leadId }) {
  const [notes, setNotes] = useState([]);

  const [content, setContent] = useState("");

  const load = async () => {
    const res = await api.get(`/leads/${leadId}/notes`);

    setNotes(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    await api.post(`/leads/${leadId}/notes`, {
      content,
    });

    setContent("");

    load();
  };

  return (
    <div>
      <h3>Notes</h3>

      <input value={content} onChange={(e) => setContent(e.target.value)} />

      <button onClick={add}>Add</button>

      {notes.map((note) => (
        <p key={note.id}>{note.content}</p>
      ))}
    </div>
  );
}

export default Notes;
