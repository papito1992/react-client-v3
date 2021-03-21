import React, {useCallback, useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {
    Avatar,
    Box,
    IconButton,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
    Tooltip,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EnhancedTableHead from "../../../shared/EnhancedTableHead";
import getSorting from "../../../shared/functions/getSorting";
import stableSort from "../../../shared/functions/stableSort";
import classNames from "classnames";
import {useSnackbar} from 'notistack';
import ConfirmationDialog from "../../../shared/ConfirmationDialog";
import HighlightedInformation from "../../../shared/HighlightedInformation";
import {useHttpClient} from "../../../../hooks/http-hook";
import {AuthContext} from "../../../../context/auth-context";
import {Edit} from "@material-ui/icons";
import {Link as RouterLink} from "react-router-dom";
// import stableSort from "../../../shared/functions/stableSort";
// import getSorting from "../../../shared/functions/getSorting";
// import HighlightedInformation from "../../../shared/components/HighlightedInformation";
// import ConfirmationDialog from "../../../shared/components/ConfirmationDialog";

const styles = makeStyles((theme) => ({
    backCol: {
        backgroundColor: theme.palette.common.darkBlack
    },
    lightBackCol: {
        backgroundColor: theme.palette.common.lightBlack,
    },
    backAndTextCol: {
        backgroundColor: theme.palette.common.lightBlack,
        color: theme.palette.primary.main
    },
    tableWrapper: {
        overflowX: "auto",
    },
    alignRight: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        paddingLeft: theme.spacing(2),
    },
    blackIcon: {
        color: theme.palette.common.darkBlack,
    },
    avatar: {
        width: 28,
        height: 28,
    },
    firstData: {
        paddingLeft: theme.spacing(3),
    },
    iconButton: {
        padding: theme.spacing(1),
    },
    dBlock: {
        display: "block",
    },
    dNone: {
        display: "none",
    },
}));

const rows = [
    {
        id: "icon",
        numeric: true,
        label: "",
    },
    {
        id: "name",
        numeric: false,
        label: "Name",
    },
    {id: "number1", numeric: false, label: "Email"},
    {id: "number2", numeric: false, label: "Representative Id"},
    {id: "number3", numeric: false, label: "Has representative"},
    {id: "number4", numeric: false, label: "Created"},
    {id: "number5", numeric: false, label: "Updated"},
    {
        id: "actions",
        numeric: false,
        label: "Actions",
    },
];

const rowsPerPage = 10;

function CustomTable(props) {
    const classes = styles(props.theme);
    const {loadedCustomers, setLoadedCustomers, theme} = props;
    const {enqueueSnackbar} = useSnackbar();
    const [order, setOrder] = useState("asc");
    const [variant, setVariant] = useState("error");
    const [orderBy, setOrderBy] = useState(null);
    const [page, setPage] = useState(0);
    const [reqError, setReqError] = useState();
    const [isDeleteTargetDialogOpen, setIsDeleteTargetDialogOpen] = useState(
        false
    );
    const [deleteTargetDialogRow, setDeleteTargetDialogRow] = useState(null);
    const [isDeleteTargetLoading, setIsDeleteTargetLoading] = useState(false);
    const {isLoading, error, sendRequest, clearError, requestStatus} = useHttpClient();
    const auth = useContext(AuthContext);


    useEffect(() => {
            setLoadedCustomers(props.loadedCustomers);
        },
        [setLoadedCustomers]
    );

    const deleteCustomer = async (props) => {
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+`customers/${props.customerId}`, 'DELETE',
                null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            enqueueSnackbar(responseData.message, {variant})
        } catch (err) {
            enqueueSnackbar(err.toString(), {variant})
        }
    };

    const handleRequestSort = useCallback(
        (__, property) => {
            const _orderBy = property;
            let _order = "desc";
            if (orderBy === property && order === "desc") {
                _order = "asc";
            }
            setOrder(_order);
            setOrderBy(_orderBy);
        },
        [setOrder, setOrderBy, order, orderBy]
    );

    const deleteTarget = useCallback(() => {
        setIsDeleteTargetLoading(true);

        setIsDeleteTargetDialogOpen(false);
        setIsDeleteTargetLoading(false);
        try {
            deleteCustomer(deleteTargetDialogRow)
            setReqError(false)
        } catch (err) {
            setReqError(true)
        }
        if (!reqError) {
            const _loadedCustomers = [...loadedCustomers];
            const index = _loadedCustomers.findIndex(
                (element) => element.id === deleteTargetDialogRow.id
            );
            _loadedCustomers.splice(index, 1);
            setLoadedCustomers(_loadedCustomers);

        }

    }, [
        setIsDeleteTargetDialogOpen,
        setIsDeleteTargetLoading,
        setLoadedCustomers,
        deleteTargetDialogRow,
        loadedCustomers,
    ]);

    const handleChangePage = useCallback(
        (_, page) => {
            setPage(page);
        },
        [setPage]
    );

    const handleDeleteTargetDialogClose = useCallback(() => {
        setIsDeleteTargetDialogOpen(false);
    }, [setIsDeleteTargetDialogOpen]);

    const handleDeleteTargetDialogOpen = useCallback(
        (row) => {
            setIsDeleteTargetDialogOpen(true);
            setDeleteTargetDialogRow(row);
        },
        [setIsDeleteTargetDialogOpen, setDeleteTargetDialogRow]
    );

    return (
        <React.Fragment>
            <ConfirmationDialog
                open={isDeleteTargetDialogOpen}
                title="Confirmation"
                content={
                    deleteTargetDialogRow ? (
                        <span>
              {"Do you really want to remove the customer "}
                            <b>{deleteTargetDialogRow.name}</b>
                            {" from your list?"}
            </span>
                    ) : null
                }
                onClose={handleDeleteTargetDialogClose}
                onConfirm={deleteTarget}
                loading={isDeleteTargetLoading}
            />
            <Box>
                <div>
                    {loadedCustomers.length > 0 ? (
                        <Table aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={loadedCustomers.length}
                                rows={rows}
                            />
                            <TableBody>
                                {stableSort(loadedCustomers, getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => (
                                        <TableRow hover tabIndex={-1} key={index} className={classes.backAndTextCol}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                className={classNames(classes.backAndTextCol)}
                                            >
                                                <Avatar
                                                    className={classes.avatar}
                                                    src={row.profilePicUrl}
                                                />
                                            </TableCell>
                                            <TableCell component="th" scope="row" className={classes.backAndTextCol}>
                                                {row.username}
                                            </TableCell>
                                            <TableCell component="th" scope="row" className={classes.backAndTextCol}>
                                                {row.email}
                                            </TableCell>
                                            <TableCell component="th" scope="row" className={classes.backAndTextCol}>
                                                {row.representativeIsbn}
                                            </TableCell>
                                            <TableCell component="th" scope="row" className={classes.backAndTextCol}>
                                                {row.hasRepresentation.toString()}
                                            </TableCell>
                                            <TableCell component="th" scope="row" className={classes.backAndTextCol}>
                                                {row.created}
                                            </TableCell>
                                            <TableCell component="th" scope="row" className={classes.backAndTextCol}>
                                                {row.updated}
                                            </TableCell>
                                            <TableCell component="th" scope="row" className={classes.backAndTextCol}>
                                                <Box display="flex" justifyContent="flex-end">
                                                    <Tooltip title="Edit customer details!">
                                                        <IconButton
                                                            className={classes.iconButton}
                                                            component={RouterLink}
                                                            to={`/admin/customers/${row.customerId}`}
                                                            aria-label="Details"
                                                        >
                                                            <Edit className={classes.blackIcon}/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete customer!">
                                                        <IconButton
                                                            className={classes.iconButton}
                                                            onClick={() => {
                                                                handleDeleteTargetDialogOpen(row);
                                                            }}
                                                            aria-label="Delete"
                                                        >
                                                            <DeleteIcon className={classes.blackIcon}/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>

                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <Box m={2}>
                            <HighlightedInformation>
                                No friends added yet.
                            </HighlightedInformation>
                        </Box>
                    )}
                </div>
                {loadedCustomers.length > 0 ? (
                    <div className={classes.alignRight}>
                        <TablePagination
                            component="div"
                            count={loadedCustomers.length}
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
                    </div>) : (
                    <div/>
                )
                }
            </Box>
        </React.Fragment>
    );
}

CustomTable.propTypes = {
    loadedCustomers: PropTypes.arrayOf(PropTypes.object).isRequired,
    setLoadedCustomers: PropTypes.func.isRequired,
};

export default CustomTable;
