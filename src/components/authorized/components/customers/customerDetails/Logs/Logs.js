import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  colors
} from '@material-ui/core';


const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1100
  },
  methodCell: {
    width: 75
  },
  statusCell: {
    width: 64
  }
}));

const Logs = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchLogs = () => {
    };

    fetchLogs();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Card>
        <CardHeader title="Customer logs" />
        <Divider />
        <CardContent className={classes.content}>
            <div className={classes.inner}>
              <Table>
                <TableBody>
                  {logs.map(log => (
                    <TableRow key={log.id}>
                      <TableCell className={classes.methodCell}>
                        <Typography variant="h6">{log.method}</Typography>
                      </TableCell>
                      <TableCell className={classes.statusCell}>

                      </TableCell>
                      <TableCell>{log.route}</TableCell>
                      <TableCell>{log.desc}</TableCell>
                      <TableCell align="right">{log.IP}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

Logs.propTypes = {
  className: PropTypes.string
};

export default Logs;
