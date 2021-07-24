import React, { ChangeEvent, useState } from "react";

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


type Props = {
  onDone: () => void;
};

function UploadFiles({ onDone }: Props) {

  const classes = useStyles();
  const [progress, setProgress] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<FileList | null>(null);
  const [message, setMessage] = useState<string>("");

  const selectFile = (event : ChangeEvent<HTMLInputElement>) : void => {

    if (!event.target.files?.length) {
        return;
    }

    const files = event.target.files;
    setSelectedFile(files);
  };

  const upload = () => {
    let currentFile = selectedFile && selectedFile[0];

    setProgress(0);

    uploadFileService(currentFile, (event : ProgressEvent) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        setProgress(0);
        setSelectedFile(null);
        onDone()
      })

      .catch(() => {
        setProgress(0);
        setMessage("Could not upload the file!");
        setSelectedFile(null);
        onDone()

      });

  };

  const currentFile = selectedFile && selectedFile[0];
  return (
    <div style={{ padding: 50 }}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Please select file
          </Typography>
          {currentFile && (
            <LinearWithValueLabel value={progress} />
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
          <Button size="small" disabled={!currentFile} onClick={upload} >Upload</Button>
        </CardActions>
      </Card>

    </div>
  );

}

export default UploadFiles;