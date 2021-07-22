import React, { useState } from "react";

import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import uploadFileService from "../../services/fileUpload"

import LinearWithValueLabel from "./progress"
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function UploadFiles({ onDone }) {

  const classes = useStyles();
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState([]);
  const [message, setMessage] = useState("");

  const selectFile = (event) => {
    setSelectedFile(event.target.files);
  };

  const upload = () => {
    let currentFile = selectedFile[0];

    setProgress(0);

    uploadFileService(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    }).then((files) => {
      setFileInfos(files.data);
    })
      .then((response) => {
        setMessage(response.data.message);
        setProgress(0);
        setSelectedFile([]);
        onDone()
      })

      .catch(() => {
        setProgress(0);
        setMessage("Could not upload the file!");
        setSelectedFile([]);
        onDone()

      });

  };

  return (
    <div style={{ padding: 50 }}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Please select file
          </Typography>
          {selectedFile[0] && (
            <LinearWithValueLabel progress={progress} />
          )}
          <Typography variant="h5" component="h2">
            <label className="btn btn-default">
              <input type="file" onChange={selectFile} />
            </label>
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {message}
          </Typography>

        </CardContent>
        <CardActions>
          <Button size="small" disabled={!selectedFile[0]} onClick={upload} >Upload</Button>
        </CardActions>
      </Card>

    </div>
  );

}

export default UploadFiles;