import React, { useEffect, useState } from "react";
import Table from "../mui/Table";
import { useDispatch, useSelector } from "react-redux";
import fetchVolunteers from "../../utils/fetch/volunteerList";
import { ClipLoader } from "react-spinners";
import { ButtonGroup, Button } from "@mui/material";
function DataBank() {
  //==========================Hooks===============================
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.data.volunteersData);
  const [loading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState("pending");
  const [rows, setRows] = useState([]);

  const setFilter = (value) => {
    setFilterValue(value);
  };
  //=================================Use Effects===========================================
  useEffect(() => {
    const fetchData = async () => {
      await fetchVolunteers(dispatch);
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchVolunteers = () => {
      try {
        const rowData = data.map((volunteer) => ({
          id: volunteer._id,
          name: `${volunteer.firstName} ${volunteer.lastName}`,
          std: volunteer.year,
          course: volunteer.course,
          firstPreference: volunteer.preferredDept[0], // assuming you want the first preference
          phone: volunteer.phone,
        }));
        setRows(rowData);
      } catch (error) {
        console.error("Error fetching volunteer data:", error);
      }
    };

    fetchVolunteers();
  }, []);
  //====================================================================================================
  const columns = [
    { field: "id", headerName: "ID", width: 50, hide: true },
    { field: "name", headerName: "Name", width: 150 },
    { field: "std", headerName: "STD", width: 100 },
    { field: "course", headerName: "Course", width: 100 },
    { field: "firstPreference", headerName: "First Preference", width: 130 },
    { field: "phone", headerName: "Phone ", width: 100, sortable: false },
    {
      field: "shortlist",
      headerName: "Shortlist",
      width: 120,
      sortable: false,
      hideable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#1C4EFF" }}
          size="small"
        >
          Shortlist
        </Button>
      ),
    },
    {
      field: "approve",
      headerName: "Approve",
      width: 120,
      sortable: false,
      hideable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          style={{ backgroundColor: "#DE3636" }}
          size="small"
        >
          Approve
        </Button>
      ),
    },
  ];

  return (
    <div className="">
      <div className="text-4xl mb-4 text-white font-bold">Data Bank</div>
      <div>
        <ButtonGroup
          className="flex flex-wrap"
          sx={{ color: "white" }}
          variant="text"
          aria-label="Basic button group"
        >
          <Button
            sx={{
              color: filterValue === "pending" ? "red" : "white",
              marginRight: "5px ",
            }}
            onClick={() => setFilter("pending")}
          >
            Pending
          </Button>
          <Button
            sx={{
              color: filterValue === "shortlisted" ? "red" : "white",
              marginRight: "5px ",
            }}
            onClick={() => setFilter("shortlisted")}
          >
            Shortlisted
          </Button>
          <Button
            sx={{
              color: filterValue === "approved" ? "red" : "white",
              marginRight: "5px ",
            }}
            onClick={() => setFilter("approved")}
          >
            Approved
          </Button>
          <Button
            sx={{
              color: filterValue === "core" ? "red" : "white",
              marginRight: "5px ",
            }}
            onClick={() => setFilter("core")}
          >
            Core Team
          </Button>
          <Button
            sx={{
              color: filterValue === "rejected" ? "red" : "white",
              marginRight: "5px ",
            }}
            onClick={() => setFilter("rejected")}
          >
            Rejected
          </Button>
        </ButtonGroup>
      </div>
      <div>
        {loading ? (
          <ClipLoader color="red" />
        ) : (
          <Table columns={columns} rows={rows} />
        )}
      </div>
    </div>
  );
}

export default DataBank;
