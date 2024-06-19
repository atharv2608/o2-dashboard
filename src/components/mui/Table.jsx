import React, { useEffect, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import axios from 'axios';
import { useSelector } from 'react-redux';


function Table() {
  const data = useSelector((state) => state?.data.volunteersData)
//   const [volunteers, setVolunteers] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        // const response = await axios.get("https://o2-api.vercel.app/api/v1/get/volunteers-list");
        // const data = response.data.data;
        const rowData = data.map(volunteer => ({
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

  const columns = [
    { field: "id", headerName: "ID", width: 50, hide: true},
    { field: "name", headerName: "Name", width: 150 },
    { field: "std", headerName: "STD", width: 100 },
    { field: "course", headerName: "Course", width: 100 },
    { field: "firstPreference", headerName: "First Preference", width: 130 },
    { field: "phone", headerName: "Phone Number", width: 130, sortable: false },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      hideable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: "red" }}
        >
          Action
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        disableColumnFilter
        checkboxSelection
        disableRowSelectionOnClick

        

        sx={{
          "& .MuiDataGrid-cell": {
            // changes the text color of the data
            color: "white",
          },
          "& .MuiCheckbox-root svg": {
            // Change the fill color of the checkbox icons
            fill: "red",
          },
          "& .MuiTablePagination-root": {
            // text color of the pagination text
            color: "white",
          },
          "& .MuiTablePagination-select": {
            // text color of select number of rows
            color: "black",
            backgroundColor: "white",
          },
          "& .MuiTablePagination-actions": {
            // color of the arrow action
            color: "red",
            backgroundColor: "white",
          },
          ".MuiDataGrid-columnHeaders": {
            backgroundColor: "",
            color: "red",
          },
          ".MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }}
        className=" bg-black"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        
      />
    </div>
  );
}

export default Table;
