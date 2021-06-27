import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Typography, Tooltip
} from '@material-ui/core';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles(theme => ({
  root: {},
  mainActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  notice: {
    marginTop: theme.spacing(1)
  },
  deleteButton: {
    marginTop: theme.spacing(1),
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));

const OtherActions = () => {

  const classes = useStyles();

  return (
    <Card
    >
      <CardHeader title="Other actions!" />
      <Divider />
      <CardContent>
        <div className={classes.mainActions}>
          <Tooltip title="Only a preview!" enterDelay={200} leaveDelay={500}>
          <Button disabled>
            <NotInterestedIcon className={classes.buttonIcon} />
            Close Customer Account
          </Button>
          </Tooltip>
          <Tooltip title="Only a preview!" enterDelay={200} leaveDelay={500}>
          <Button disabled>
            <GetAppIcon className={classes.buttonIcon} />
            Export client data
          </Button>
          </Tooltip>
        </div>
        <Typography
          className={classes.notice}
          variant="body2"
        >
          Remove this customer’s data if he requested that, if not please
          be aware that what has been deleted can never brough back
        </Typography>
        <Tooltip title="Only a preview!" enterDelay={200} leaveDelay={500}>
        <Button className={classes.deleteButton} disabled>
          <DeleteIcon className={classes.buttonIcon} />
          Delete Customer Account
        </Button>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

OtherActions.propTypes = {
  className: PropTypes.string
};

export default OtherActions;
