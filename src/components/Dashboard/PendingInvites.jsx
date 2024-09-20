import { useState } from "react";
import { Avatar } from "@mui/material";
import avatar from "../../assets/images/userimg.png";

const members = [
  {
    name: "Pranit Gaikar",
    img: "",
    email: "Pranit@growhut.in",
    facility: "Jaipur",
    userType: "Can Edit",
    lastActive: "2024-05-05",
  },
  {
    name: "John Doe",
    img: "",
    email: "john@growhut.in",
    facility: "Delhi",
    userType: "Read Only",
    lastActive: "2024-04-03",
  },
  {
    name: "Jane Smith",
    img: "",
    email: "jane@growhut.in",
    facility: "Mumbai",
    userType: "Can Edit",
    lastActive: "2024-02-10",
  },
  {
    name: "Jane Smith",
    img: "",
    email: "jane@growhut.in",
    facility: "Mumbai",
    userType: "Can Edit",
    lastActive: "2024-02-10",
  },
];

const PendingInvites = ({ searchQuery }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedMembers = [...members].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredMembers = sortedMembers?.filter(
    (member) =>
      member.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      member.facility?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <div className="table-container">
      <table className="member-table">
        <thead>
          <tr>
            <th className="member-table-head">
              Email
              <button
                onClick={() => handleSort("name")}
                className="sort-button"
              >
                <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                  <g id="Icon/CaretDoubleVertical">
                    <path
                      id="Vector"
                      d="M8.25 4.25L6 2L3.75 4.25"
                      stroke="#717171"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_2"
                      d="M8.25 8.75L6 11L3.75 8.75"
                      stroke="#717171"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </button>
            </th>
            <th className="member-table-head">
              Access Type
              <button
                onClick={() => handleSort("email")}
                className="sort-button"
              >
                <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                  <g id="Icon/CaretDoubleVertical">
                    <path
                      id="Vector"
                      d="M8.25 4.25L6 2L3.75 4.25"
                      stroke="#717171"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_2"
                      d="M8.25 8.75L6 11L3.75 8.75"
                      stroke="#717171"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </button>
            </th>

            <th className="member-table-head">
              Invite Date
              <button
                onClick={() => handleSort("lastActive")}
                className="sort-button"
              >
                <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                  <g id="Icon/CaretDoubleVertical">
                    <path
                      id="Vector"
                      d="M8.25 4.25L6 2L3.75 4.25"
                      stroke="#717171"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_2"
                      d="M8.25 8.75L6 11L3.75 8.75"
                      stroke="#717171"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </button>
            </th>
            <th className="member-table-head">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member, index) => (
            <tr key={index}>
              <td>{member.email}</td>
              <td>{member.userType}</td>
              <td>{member.lastActive}</td>
              <td style={{ background: "" }}>
                <div className="team_members_actions_cta">
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.3526 20.2491H9.10258L3.90039 15.0469"
                      stroke="url(#paint0_linear_1214_52876)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.4766 8.625L6.47656 17.625"
                      stroke="url(#paint1_linear_1214_52876)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.10156 20.2501H4.60156C4.40265 20.2501 4.21188 20.1711 4.07123 20.0305C3.93058 19.8898 3.85156 19.699 3.85156 19.5001V15.3104C3.85165 15.1118 3.93055 14.9213 4.07094 14.7807L15.6322 3.2195C15.7728 3.07895 15.9635 3 16.1623 3C16.3612 3 16.5519 3.07895 16.6925 3.2195L20.8822 7.40637C21.0227 7.54701 21.1017 7.7377 21.1017 7.93653C21.1017 8.13535 21.0227 8.32605 20.8822 8.46668L9.10156 20.2501Z"
                      stroke="url(#paint2_linear_1214_52876)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.8516 6L18.1016 11.25"
                      stroke="url(#paint3_linear_1214_52876)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1214_52876"
                        x1="3.90039"
                        y1="15.0469"
                        x2="17.7793"
                        y2="24.1656"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#369D9C" />
                        <stop offset="1" stopColor="#28814D" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_1214_52876"
                        x1="6.47656"
                        y1="8.625"
                        x2="16.8966"
                        y2="10.7898"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#369D9C" />
                        <stop offset="1" stopColor="#28814D" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_1214_52876"
                        x1="3.85156"
                        y1="3"
                        x2="23.8234"
                        y2="7.14914"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#369D9C" />
                        <stop offset="1" stopColor="#28814D" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_1214_52876"
                        x1="12.8516"
                        y1="6"
                        x2="18.9299"
                        y2="7.26277"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#369D9C" />
                        <stop offset="1" stopColor="#28814D" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <svg
                    width="22"
                    height="26"
                    viewBox="0 0 22 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.6749 8.38672H5.32045C4.69366 8.38672 4.18555 8.96036 4.18555 9.66798V19.9227C4.18555 22.0464 5.71049 23.768 7.59161 23.768H14.4037C15.3071 23.768 16.1734 23.3628 16.8122 22.6417C17.451 21.9206 17.8098 20.9425 17.8098 19.9227V9.66798C17.8098 8.96036 17.3017 8.38672 16.6749 8.38672Z"
                      stroke="#FF9A9A"
                      strokeWidth="1.55706"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.0847 5.31063L14.0983 3.08496C13.8677 2.56395 13.3962 2.23469 12.8803 2.23438H9.11456C8.59866 2.23469 8.12716 2.56395 7.89655 3.08496L6.91016 5.31063H15.0847Z"
                      stroke="#FF9A9A"
                      strokeWidth="1.55706"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.50466 13.5146C9.50466 13.0847 9.1561 12.7361 8.72613 12.7361C8.29616 12.7361 7.94761 13.0847 7.94761 13.5146H9.50466ZM7.94761 18.6412C7.94761 19.0712 8.29616 19.4197 8.72613 19.4197C9.1561 19.4197 9.50466 19.0712 9.50466 18.6412H7.94761ZM14.0476 13.5146C14.0476 13.0847 13.6991 12.7361 13.2691 12.7361C12.8391 12.7361 12.4906 13.0847 12.4906 13.5146H14.0476ZM12.4906 18.6412C12.4906 19.0712 12.8391 19.4197 13.2691 19.4197C13.6991 19.4197 14.0476 19.0712 14.0476 18.6412H12.4906ZM15.0859 4.53202C14.656 4.53202 14.3074 4.88058 14.3074 5.31055C14.3074 5.74052 14.656 6.08908 15.0859 6.08908V4.53202ZM17.8108 6.08908C18.2408 6.08908 18.5893 5.74052 18.5893 5.31055C18.5893 4.88058 18.2408 4.53202 17.8108 4.53202V6.08908ZM6.9104 6.08908C7.34037 6.08908 7.68893 5.74052 7.68893 5.31055C7.68893 4.88058 7.34037 4.53202 6.9104 4.53202V6.08908ZM4.18555 4.53202C3.75558 4.53202 3.40702 4.88058 3.40702 5.31055C3.40702 5.74052 3.75558 6.08908 4.18555 6.08908V4.53202ZM7.94761 13.5146V18.6412H9.50466V13.5146H7.94761ZM12.4906 13.5146V18.6412H14.0476V13.5146H12.4906ZM15.0859 6.08908H17.8108V4.53202H15.0859V6.08908ZM6.9104 4.53202H4.18555V6.08908H6.9104V4.53202Z"
                      fill="#FF9A9A"
                    />
                  </svg>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingInvites;
