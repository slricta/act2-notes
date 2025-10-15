import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  // Load profile + notes
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    // get user info
    api.get("/auth/me")
      .then((res) => {
        setUsername(res.data.username);
        setMessage( `${res.data.username}` );
      })
      .catch((error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          alert("Session expired, please login again");
        } else {
          alert("Failed to load profile. Please try again.");
        }
        localStorage.removeItem("token");
        navigate("/");
      });

    // get notes
    fetchNotes();
  }, [navigate]);

  // Fetch Notes
  const fetchNotes = () => {
    api.get("/notes")
      .then((res) => setNotes(res.data))
      .catch((err) => console.error(err));
  };

  // Create or Update Note
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      api.put(`/notes/${editingId}`, { title, content })
        .then(() => {
          setTitle("");
          setContent("");
          setEditingId(null);
          fetchNotes();
        });
    } else {
      api.post("/notes", { title, content })
        .then(() => {
          setTitle("");
          setContent("");
          fetchNotes();
        });
    }
  };

  // Edit Note
  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
  };

  // Delete Note
  const handleDelete = (id) => {
    if (window.confirm("Delete this note?")) {
      api.delete(`/notes/${id}`).then(() => fetchNotes());
    }
  };

  // Modal Handlers
  const openModal = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  // Handle Edit and Delete from Modal
  const handleEditFromModal = () => {
    if (!selectedNote) return;
    setTitle(selectedNote.title);
    setContent(selectedNote.content);
    setEditingId(selectedNote.id);
    closeModal();
  };

  const handleDeleteFromModal = () => {
    if (!selectedNote) return;
    if (window.confirm("Delete this note?")) {
      api.delete(`/notes/${selectedNote.id}`).then(() => {
        fetchNotes();
        closeModal();
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", gap: "12px" }}>
        <h2 className="homeName" style={{ marginLeft: "150px" }}>notes</h2>
        <div className="message" style={{ marginLeft: "auto", marginRight: 25 }}><p style={{ margin: 0 }}>{message}</p></div>
        <button onClick={handleLogout} style={{ marginRight: "150px" }}>
          <span>logout</span>
        </button>
      </div>
      <div className="homeContent">
        {/* Create/Edit Form */}
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <h3>{editingId ? "edit note" : "take a note"}</h3>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ display: "block", marginBottom: "10px", width: "100%", marginLeft: "auto", marginRight: "auto" }}
          />
          <textarea
            placeholder="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            style={{ display: "block", marginBottom: "10px", width: "100%", marginLeft: "auto", marginRight: "auto", resize: "none" }}
          />
          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
            <button type="submit">{editingId ? <span>update</span> : <span>add</span>}</button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setTitle("");
                  setContent("");
                }}
              >
                <span>cancel</span>
              </button>
            )}
          </div>
        </form>

        {/* Notes List */}
        {notes.length === 0 ? (
          <p style={{ textAlign: "center" }}>no <span style={{ textDecoration: "underline"}}>notes</span> yet. add one above</p>
        ) : (
          <ul className="notesList">
            {notes.map((note) => (
              <li key={note.id} className="noteCard" onClick={() => openModal(note)}>
                <strong className="noteTitle">{note.title}</strong>
                <p className="notePreview">{note.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Note Modal */}
      {isModalOpen && selectedNote && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>{selectedNote.title}</h3>
            <div className="modalBody">
              <p style={{ whiteSpace: "pre-wrap", marginTop: 0 }}>{selectedNote.content}</p>
            </div>
            <div className="modalActions">
              <button onClick={handleEditFromModal}><span>edit</span></button>
              <button onClick={handleDeleteFromModal}><span>delete</span></button>
              <button onClick={closeModal}><span>close</span></button>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
}

export default Home;
