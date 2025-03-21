import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DraftCard.css";
import trash from "../../assets/images/TrashS.svg";
import { timeAgo } from "../../util/timeAgo";

const DraftCard = ({ report, handleDelete }) => {
  const [showDelete, setShowDelete] = useState(false);
  const navigate = useNavigate();

  let percentage = Math.floor(report?.completionPercentage) || 0;
  percentage = isNaN(percentage) ? 0 : percentage;
  const conicEnd = `${percentage}%`;
  const conicGradient = `conic-gradient(#368B9D 0%, #368B9D ${conicEnd}, #c8ecfb ${conicEnd})`;

  const handleCardClick = (e) => {
    // Only navigate if we're not clicking the delete button or three dots
    if (!e.target.closest('.delete-button') && !e.target.closest('.three-dots-icon')) {
      navigate(`/editreport/${report?._id}`);
    }
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation(); // Prevent any parent click events
    await handleDelete(report?._id);
    setShowDelete(false); // Hide the delete button after deletion
  };

  return (
    <div className="draft_card" onClick={handleCardClick} onMouseLeave={() => setShowDelete(false)} >
      <div className="draft_header" style={{ position: "relative" }}>
        <label>{report?.name}</label>
          <svg
            className="three-dots-icon"
            style={{ cursor: "pointer" }}
            width="20"
            height="20"
            viewBox="0 0 25 24"
            fill="none"
            onClick={(e) => {
              e.stopPropagation();
              setShowDelete(!showDelete);
            }}
          >
            <g clipPath="url(#clip0_2914_73884)">
              <path
                d="M12.666 6.875C13.3564 6.875 13.916 6.31536 13.916 5.625C13.916 4.93464 13.3564 4.375 12.666 4.375C11.9757 4.375 11.416 4.93464 11.416 5.625C11.416 6.31536 11.9757 6.875 12.666 6.875Z"
                fill="black"
                stroke="black"
              />
              <path
                d="M12.666 13.25C13.3564 13.25 13.916 12.6904 13.916 12C13.916 11.3096 13.3564 10.75 12.666 10.75C11.9757 10.75 11.416 11.3096 11.416 12C11.416 12.6904 11.9757 13.25 12.666 13.25Z"
                fill="black"
                stroke="black"
              />
              <path
                d="M12.666 19.625C13.3564 19.625 13.916 19.0654 13.916 18.375C13.916 17.6846 13.3564 17.125 12.666 17.125C11.9757 17.125 11.416 17.6846 11.416 18.375C11.416 19.0654 11.9757 19.625 12.666 19.625Z"
                fill="black"
                stroke="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_2914_73884">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.666016)"
                />
              </clipPath>
            </defs>
          </svg>

        {showDelete && (
          <button
            className="delete-button"
            style={{
              position: "absolute",
              top: "-5px",
              right: "-70px",
              background: "white",
              color: "#FF9A9A",
              border: "none",
              borderRadius: "6px",
              padding: "8px 12px",
              zIndex: "10",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onClick={handleDeleteClick}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "white";
            }}
          >
            <img
              src={trash}
              alt="Delete"
              style={{
                width: "20px",
                height: "20px",
                marginRight: "8px",
                cursor: "pointer",
              }}
            />
            Delete
          </button>
        )}
      </div>

      <div className="report_card-progress-container">
        <div
          className="progress-bar"
          style={{
            width: `42px`,
            height: `42px`,
            background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), ${conicGradient}`,
          }}
        >
          <div className="progress-text">{isNaN(percentage) ? 0 : percentage}%</div>
        </div>
        <div className="report_card-status">
          {percentage === "100" ? "Completed" : "In Progress"}
        </div>
      </div>
      <div className="report_card-edit_container">
        <span className="edited-status">{timeAgo(report?.updatedAt)}</span>
      </div>
    </div>
  );
};

export default DraftCard;
