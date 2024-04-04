import React, { useState } from 'react';

const Todo = ({ todo, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrCodeImageSrc, setQRCodeImageSrc] = useState(null); // State to store Base64 image src

  const handleDelete = () => {
    onDelete(todo._id);
  };

  const handleToggle = () => {
    onUpdate(todo._id, { title: todo.title, completed: !todo.completed });
  };

  const handleEdit = () => {
    setShowQRCode(false);
    setEditing(true);
  };

  const handleTitleChange = (e) => {
    setUpdatedTitle(e.target.value);
  };

  const handleUpdate = () => {
    onUpdate(todo._id, { title: updatedTitle, completed: todo.completed });
    setEditing(false);
  };

  const handleShowQRCode = () => {
    if (todo.qrCodeImage && todo.qrCodeImage.data) {
      const base64Image = `data:image/png;base64,${btoa(
        new Uint8Array(todo.qrCodeImage.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
      )}`;
      setQRCodeImageSrc(base64Image);
      setShowQRCode(true);
    }
  };

  const handleCloseQRCode = () => {
    setShowQRCode(false);
  };

  return (
    <div className={`todo ${todo.completed ? 'completed' : ''}`}>
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      {editing ? (
        <input type="text" value={updatedTitle} onChange={handleTitleChange} />
      ) : (
        <p>{todo.title}</p>
      )}
      {editing ? (
        <button onClick={handleUpdate}>Update</button>
      ) : (
        <>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleShowQRCode}>Display QR</button>
        </>
      )}
      {showQRCode && (
        <div className="overlay">
          <div className="modal">
            <img src={qrCodeImageSrc} alt="QR Code" />
            <button onClick={handleCloseQRCode}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
