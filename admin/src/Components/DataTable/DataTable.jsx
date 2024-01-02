import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./datatable.scss";

function DataTable() {
  const [learners, setLearners] = useState([]);

  useEffect(() => {
    const getLearners = async () => {
      try {
        const res = await fetch("http://localhost:8000/learner");
        const learnerData = await res.json();

        // Add a unique 'id' property based on 'account_id'
        const learnersWithId = learnerData.map((learner) => ({
          username: learner.username,
          dob: new Date(learner.dob).getUTCDay() + "/" + new Date(learner.dob).getUTCMonth() + "/" + new Date(learner.dob).getUTCFullYear(),
          occupation: learner.occupation,
          total_score: learner.total_score,
          full_name: learner.first_name + " " + learner.last_name,
          id: learner.learner_id,
        }));

        setLearners(learnersWithId);
      } catch (err) {
        console.error("Error fetching learner data:", err);
      }
    };

    getLearners();
  }, []);

  const handleDelete = (id) => {
    setLearners(learners.filter((item) => item.account_id !== id));
  };

  const columns = [
      { field: "id", headerName: "Learner ID", width: 160 },
    { field: "username", headerName: "Username", width: 180 },
    { field: "full_name", headerName: "Full Name", width: 200 },
    { field: "dob", headerName: "Date of Birth", width: 200 },
    { field: "occupation", headerName: "Occupation", width: 150 },
    { field: "total_score", headerName: "Total Score", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 170,
      renderCell: (params) => (
        <div className="actionn">
          <Link to={`/users/${params.row.id}`}>
            <button type="button" className="view_btn">
              View
            </button>
          </Link>
          <button
            type="button"
            className="delete_btn"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="data_table">
      <DataGrid
        className="data_grid"
        rows={learners}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}

export default DataTable;
