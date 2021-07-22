import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { makeStyles } from "@material-ui/core/styles";

import { useMutation } from "@apollo/client";

import { ADD_FARM_MUTATION } from "../../services/graphql/mutations";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function FormDialog({ done }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [acres, setAcres] = useState(0);
  const [tractors, setTractors] = useState(0);
  const [tractors_usage, setTractorsUsage] = useState(0);
  const [milk_machines, setMilkMachines] = useState(0);
  const [milk_machines_kwh, setMilkMachinesKwh] = useState(0);
  const [cows, setCows] = useState(0);
  const [milk_produced, setMilkProduced] = useState(0);

  const [addFarm, { data }] = useMutation(ADD_FARM_MUTATION);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addFarm({
      variables: {
        name,
        acres,
        tractors,
        tractors_usage,
        milk_machines,
        milk_machines_kwh,
        cows,
        milk_produced,
      },
    });
    done();
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add farm
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title"> Create new farm</DialogTitle>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField
                margin="dense"
                id="name"
                label="Farm Name"
                type="text"
                value={name}
                onInput={(e) => setName(e.target.value)}
                fullWidth
              />
              <TextField
                margin="dense"
                id="acres"
                label="Farm size (Azres)"
                type="number"
                value={acres}
                onInput={(e) => setAcres(parseInt(e.target.value))}
                fullWidth
              />
            </div>

            <div>
              <TextField
                margin="dense"
                id="tractors"
                label="Number of Tractors"
                type="number"
                value={tractors}
                onInput={(e) => setTractors(parseInt(e.target.value))}
                fullWidth
              />
              <TextField
                margin="dense"
                id="tractors_usage"
                label="Usage (l/100mile)"
                type="number"
                value={tractors_usage}
                onInput={(e) => setTractorsUsage(parseFloat(e.target.value))}
                fullWidth
              />
            </div>
            <div>
              <TextField
                margin="dense"
                id="milk_machines"
                label="Number of Milk machines"
                type="number"
                value={milk_machines}
                onInput={(e) => setMilkMachines(parseInt(e.target.value))}
                fullWidth
              />
              <TextField
                margin="dense"
                id="milk_machines_kwh"
                label="Usage (kWh)"
                type="number"
                value={milk_machines_kwh}
                onInput={(e) => setMilkMachinesKwh(parseFloat(e.target.value))}
                fullWidth
              />
            </div>
            <div>
              <TextField
                margin="dense"
                id="cows"
                label="Number of Cows"
                type="number"
                value={cows}
                onInput={(e) => setCows(parseInt(e.target.value))}
                fullWidth
              />
              <TextField
                margin="dense"
                id="milk_produced"
                label="Liters  of milk produced"
                type="number"
                value={milk_produced}
                onInput={(e) => setMilkProduced(parseInt(e.target.value))}
                fullWidth
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
