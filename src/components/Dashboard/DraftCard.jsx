import { useNavigate } from "react-router-dom";
import "./DraftCard.css";
import { timeAgo } from "../../util/timeAgo";
const DraftCard = ({ report }) => {
  const navigate = useNavigate();
  let percentage = Math.floor(report?.completionPercentage) || 0;
  percentage = isNaN(percentage) ? 0 : percentage;
  const conicEnd = `${percentage}%`;
  const conicGradient = `conic-gradient(#368B9D 0%, #368B9D ${conicEnd}, #c8ecfb ${conicEnd})`;

  return (
    <div
      className="draft_card"
      onClick={() => navigate(`/editreport/${report?._id}`)}
    >
      <div className="draft_header">
        <label>{report?.name}</label>
        <svg
          style={{ cursor: "pointer" }}
          width="20"
          height="20"
          viewBox="0 0 25 24"
          fill="none"
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
      </div>

      <div className="report_card-progress-container">
        <div
          className="progress-bar"
          style={{
            width: `42px`,
            height: `42px`,
            background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), ${conicGradient}`,
            // boxShadow: "0px 3.94px 3.94px 0px #228d8c54",
          }}
        >
          <div className="progress-text">
            {isNaN(percentage) ? 0 : percentage}%
          </div>
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
