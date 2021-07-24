import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import TableContainer from "@material-ui/core/TableContainer";

import Paper from "@material-ui/core/Paper";

import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

import UpladFiles from "../../components/upload";
import AddFarm from "./addFarm";
import BarChart from "./chart";
import MainTable from "./table";

import { useQuery } from "@apollo/client";

import { LIST_FARM_QUERY } from "../../services/graphql/queries/index"

const useHomeStyles = makeStyles({
  addFarmWrapper: {
    marginLeft: "auto",
  },
});

export default function Home() {
  const classes = useHomeStyles();

  const { loading, error, data, refetch } = useQuery(LIST_FARM_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <TableContainer component={Paper}>
        <Toolbar>
          <Typography variant="h6">Dairy farm emission simulator</Typography>
          <div className={classes.addFarmWrapper}>
            <AddFarm done={() => refetch()} />
          </div>
        </Toolbar>
        {data && data.listFarms.length > 0 ? (
          <>
            <BarChart data={data.listFarms} />
            <MainTable data={data.listFarms} />
          </>
        ) : (
          <UpladFiles onDone={() => refetch()} />
        )}
      </TableContainer>
    </>
  );
}
