import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";


import { FarmRow , PurchaseRow} from "../../types";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const alignCells = (i: number, c=0) => i==c ? "left" : "right";



type PurchaseProps = {
  data: PurchaseRow[];
};


function Purchases(props: PurchaseProps) {
  const {data}  = props;
  const tableRow = (row : PurchaseRow) => {
  
    return (
      <TableRow key={row.id}>
        {["type", "amount", "unit", "kgCO2e"].map((key, i) => (
          <TableCell align={alignCells(i)} key={key}>{row[key]}</TableCell>
        ))}
      </TableRow>
    );
  };

  const headers = ["Type", "Amount", "Unit", "kgCO2e"].map((header, i) => {
    return (
      <TableCell key={`${header}`} align={alignCells(i)}>
        {header}
      </TableCell>
    );
  });

  return (
    <Box margin={1}>
      <Typography variant="h6" gutterBottom component="div">
        Purchases
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>{headers}</TableRow>
        </TableHead>
        <TableBody>{data.map(tableRow)}</TableBody>
      </Table>
    </Box>
  );
}



type FarmRowProps = {
  row : FarmRow
}

function Row(props : FarmRowProps) : JSX.Element {
  const { row } = props;

  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  //console.log("row", row);

  const cells = [
    "name",
    "acres",
    "cows",
    "tractors",
    "tractors_usage",
    "milk_machines",
    "milk_machines_kwh",
    "milk_produced",
    "totalkgCO2e",
    "kgCO2eperlmilk",
  ].map((key, i) => (
    <TableCell key={`${key}_${row.id}`} align={alignCells(i)}>
      {row[key]}
    </TableCell>
  ));

  return (
    <>
      <TableRow key={row.id} className={classes.root}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell size="small">
          { row.name
            .match(/\b(\w)/g) || []
            .join("")
            .toUpperCase()}
        </TableCell>
        {cells}
      </TableRow>
      <TableRow key={`collapse_${row.id}`}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Purchases data={row.purchases} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const useTableStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface MainTableProps {
  data: FarmRow[];
}

function MainTable({ data } : MainTableProps) {
  const classes = useTableStyles();
  const headers = [
    "",
    "",
    "Farm name",
    "Acres",
    "Cows",
    "Tractors",
    "l/100mile",
    "Milk Machines",
    "Usage KWH",
    "Milk produced",
    "Total kgCO2e",
    "kgCO2e/l",
  ].map((header, i) => (
    <TableCell align={alignCells(i, 2)} key={`${header + Math.random()}`}>{header}</TableCell>
  ));

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>{headers}</TableRow>
      </TableHead>
      <TableBody>
        {data.map((row : FarmRow) => (
          <Row key={row.id} row={row} />
        ))}
      </TableBody>
    </Table>
  );
}

export default MainTable;
