import React, {useCallback, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {
    colors,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@material-ui/core';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {useHttpClient} from "../../../../hooks/http-hook";
import {AuthContext} from "../../../../context/auth-context";
import Label from "../../../shared/Label";
import SearchBar from "../../../shared/SearchBar";

const useStyles = makeStyles(() => ({}));
const rowsPerPage = 10;
const Logs = () => {

    const classes = useStyles();

    const [logs, setLogs] = useState();
    const [page, setPage] = useState(0);
    const [totalLogsCount, setTotalLogsCount] = useState(0);
    const [input, setInput] = useState('')

    const {sendRequest} = useHttpClient();
    const auth = useContext(AuthContext);
    const fetchLogs = async () => {
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + `logs/customer/${input}`,
                'GET',
                null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                },
                {
                    "page": page,
                    "size": rowsPerPage
                }
            ).then(resp => {
                setTotalLogsCount(resp.totalCustomerLogListSize)
                setLogs(resp.responseData)
            });
        } catch (err) {
        }
    };
    useEffect(() => {
        fetchLogs();
    }, [page]);


    const handleChangePage = useCallback(
        (_, page) => {
            setPage(page);
        },
        [setPage]
    );
    const handleSearch = () => {
        fetchLogs(input)
    };

    const handleSearchInput = (event) => {
        setInput(event)
    };
    return (
        <React.Fragment>
            <Typography
                variant="h6"
            >
                Can only view your own logs, since only one user is active. Can create another user walk arround and
                view his though too, since all users are created as admins now this is not restricted, otherwise it
                would be.
                YOUR id is the number on the right top corner before "logged in" text
            </Typography>
            <PerfectScrollbar>
                <Paper>
                    <SearchBar
                        onSearch={[handleSearch, handleSearchInput]}
                    />
                    <TableContainer>
                        {logs &&
                        <div>
                            <Divider/>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><Typography variant="h8">Request Method</Typography></TableCell>
                                        <TableCell><Typography variant="h8">Response Status</Typography></TableCell>
                                        <TableCell><Typography variant="h8">Ip Address</Typography></TableCell>
                                        <TableCell><Typography variant="h8">Visited
                                            Endpoint</Typography></TableCell>
                                        <TableCell><Typography variant="h8">Request Time</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {logs.map(log => (
                                        <TableRow>
                                            <TableCell className={classes.methodCell}>
                                                <Typography variant="h6">{log.actionName}</Typography>
                                            </TableCell>
                                            <TableCell className={classes.statusCell}>
                                                <Label
                                                    color={
                                                        log.responseStatus === 200 || 201
                                                            ? colors.green[600]
                                                            : colors.red[600]
                                                    }
                                                >
                                                    {log.responseStatus}
                                                </Label>
                                            </TableCell>
                                            <TableCell className={classes.ipCell}>{log.ipAddress}</TableCell>
                                            <TableCell
                                                className={classes.linkCell}>{log.visitedEndpoint}</TableCell>
                                            <TableCell className={classes.dateCell}>
                                                {moment(log.created).format('YYYY/MM/DD | hh:mm:ss')}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className={classes.alignRight}>
                                <TablePagination
                                    component="div"
                                    count={totalLogsCount}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    backIconButtonProps={{
                                        "aria-label": "Previous Page",
                                    }}
                                    nextIconButtonProps={{
                                        "aria-label": "Next Page",
                                    }}
                                    onChangePage={handleChangePage}
                                    className={classes.backAndTextCol}
                                    labelRowsPerPage=""
                                />
                            </div>
                        </div>
                        }
                    </TableContainer>
                </Paper>
            </PerfectScrollbar>
        </React.Fragment>
    );
};

Logs.propTypes = {
    className: PropTypes.string
};

export default Logs;
