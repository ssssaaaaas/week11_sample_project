import { useState } from 'react';

export default function CourseItem({ course, onDelete, onToggle, onEdit }) {
  // 수정 모드
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(course.name);

  function handleSave() {
    const name = editName.trim();
    if (name === '') return;
    onEdit(course.id, name);
    setIsEditing(false);
  }

  function handleCancel() {
    setEditName(course.name);
    setIsEditing(false);
  }

  return (
    <div className="course-row">
      <div className="course-main">
        <input
          className="check"
          type="checkbox"
          checked={course.completed}
          onChange={() => onToggle(course.id)}
          aria-label={`${course.name} 완료 여부`}
        />
        <div>
          {isEditing ? (
            <input
              className="input edit-input"
              value={editName}
              onChange={event => setEditName(event.target.value)}
              aria-label="과목명 수정"
            />
          ) : (
            <div className={`course-title ${course.completed ? "done" : ""}`}>
              {course.name}
            </div>
          )}
          <div className="course-id">Course #{course.id}</div>
        </div>
      </div>
      <div className="category-cell">
        <span className="category">{course.category}</span>
      </div>
      <div className="actions">
        {isEditing ? (
          <>
            <button className="btn primary tiny" type="button" onClick={handleSave}>Save</button>
            <button className="btn secondary tiny" type="button" onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <>
            <button className="btn secondary tiny" type="button" onClick={() => setIsEditing(true)}>Edit</button>
            <button
              className="btn danger"
              type="button"
              onClick={() => onDelete(course.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}