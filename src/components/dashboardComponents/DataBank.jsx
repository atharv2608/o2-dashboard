import React, { useEffect, useState } from "react";
import Table from "../mui/Table";
import { useDispatch } from "react-redux";
import fetchVolunteers from "../../utils/fetch/volunteerList";
import { ClipLoader } from "react-spinners";
import { ButtonGroup, Button } from "@mui/material";
function DataBank() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState("pending");
  console.log("Value: ", filterValue);

  const setFilter = (value) => {
    setFilterValue(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchVolunteers(dispatch);
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="">
      <div className="text-4xl mb-4 text-white font-bold">Data Bank</div>
      <div className="flex flex-wrap">
        <ButtonGroup
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
      <div>{loading ? <ClipLoader color="red" /> : <Table />}</div>
    </div>
  );
}

export default DataBank;
