import React from "react";
import { DataGrid } from "@mui/x-data-grid";


function Table({ columns, rows }) {

  
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        disableColumnFilter
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(ids)=>{
          const selectedIDs = new Set(ids);
          const selectedRowData = rows.filter((row)=> selectedIDs.has(row.id.toString()))
          console.log(selectedRowData)
        }}
       
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
