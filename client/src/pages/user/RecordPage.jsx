import React from "react";
import Header from "../../components/Header";
import "./recordPage.css";
import MarkedBookIcon from "../../assets/images/marked-book_icon.png";
import MarkedBookWhiteIcon from "../../assets/images/marked-book-white_icon.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../components/UserContext";
import { PieChart, Pie, Cell, Label } from "recharts";

export const RecordPage = () => {
  const [user, setUser] = useState(useUser());
  const token = localStorage.getItem("token");
  //get account by token
  const [account, setAccount] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  useEffect(() => {
    const getAccount = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/account/get-account-by-token/${token}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAccount(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAccount();
  }, [user]);

  const avatarLink =
    "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/hinh-avatar-anh-dai-dien-FB-mac-dinh.jpg?fit\u003d560%2C560\u0026ssl\u003d1";

  const data = [
    { name: "Label 1", value: 30 },
    { name: "Label 2", value: 50 },
    { name: "Label 3", value: 20 },
  ];

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];

  return (
    <div className="recordPage">
      <Header></Header>
      <div className="recordContainer">
        <div className="tasksBar">
          <Link to="/user">
            <button className="task task-1">
              <img alt="book icon" src={MarkedBookIcon}></img>
              <div className="taskText">Information Page</div>
            </button>
          </Link>
          <Link to="/history">
            <button className="task task-2">
              <img alt="book icon" src={MarkedBookWhiteIcon}></img>
              <div className="taskText">Video History Page</div>
            </button>
          </Link>
          <button className="task task-3">
            <img alt="book icon" src={MarkedBookIcon}></img>
            <div className="taskText">Video Favourite Page</div>
          </button>
          <Link to="record">
            <button className="task task-4">
              <img alt="book icon" src={MarkedBookIcon}></img>
              <div className="taskText">Record Page</div>
            </button>
          </Link>
        </div>

        <div className="recordContent ">
          <div className="contentHeader ">
            <h1 className="contentTitle">Record</h1>
          </div>

          <div className="contentBody">
            <div className="contentTop">
              <div className="avatarContainer">
                <img alt="avatar" src={avatarLink} className="avatar"></img>
                <p className="nameUser">
                  {account.first_name} {account.last_name}
                </p>
              </div>
              <div className="recordInfor">
                <div className="record">
                  <div className="recordText">Total Score</div>
                  <div className="recordNumber">10</div>
                </div>
                <div className="record">
                  <div className="recordText">Number of lessons</div>
                  <div className="recordNumber">10</div>
                </div>
              </div>
            </div>

            {/*Pie chart proportion of lesson video with different levels */}
            <div className="contentBottom">
              <div className="pieChartContainer">
                <PieChart width={1000} height={600}>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={200}
                    fill="#8884d8"
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                    {data.map((entry, index) => (
                      <Label
                        key={`label-${index}`}
                        position="insideTop"
                        content={({
                          cx,
                          cy,
                          midAngle,
                          innerRadius,
                          outerRadius,
                          value,
                        }) => {
                          const RADIAN = Math.PI / 180;
                          const radius =
                            innerRadius + (outerRadius - innerRadius) * 0.5;
                          const x = cx + radius * Math.cos(-midAngle * RADIAN);
                          const y = cy + radius * Math.sin(-midAngle * RADIAN);

                          return (
                            <text
                              x={x}
                              y={y}
                              fill="#ffffff"
                              textAnchor="middle"
                              dominantBaseline="central"
                            >
                              {`${value}%`}
                            </text>
                          );
                        }}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              <div className="labels">
                <div className="labelItem">
                  <div className="labelColor labelColor1"></div>
                  <div className="labelText">Easy</div>
                </div>
                <div className="labelItem">
                  <div className="labelColor labelColor2"></div>
                  <div className="labelText">Medium</div>
                </div>
                <div className="labelItem">
                  <div className="labelColor labelColor3"></div>
                  <div className="labelText">Hard</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordPage;
