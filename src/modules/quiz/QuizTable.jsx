import React from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { Button } from "@mui/material";
import { useEffect } from "react";
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.REACT_APP_PB_URL);

// const columns = [
//   { field: "fullName", headerName: "Full Name", width: 200 },
//   {
//     field: "userId",
//     headerName: "userId",
//     width: 300,
//   },
// ];

const QuizTable = () => {
  // const [data, setData] = useState();

  useEffect(() => {
    pb.collection("quiz")
      .getFullList({})
      .then((value) => {
        // setData(value);
      });
  }, []);

  return <div style={{ height: 400, width: "100%" }}></div>;
};

export default QuizTable;
