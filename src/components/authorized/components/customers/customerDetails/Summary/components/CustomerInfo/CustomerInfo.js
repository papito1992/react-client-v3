import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    colors,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableRow
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import PersonIcon from '@material-ui/icons/PersonOutline';

import {CustomerEdit} from './components';
import Label from "../../../../../../../shared/Label";
import {useHttpClient} from "../../../../../../../../hooks/http-hook";
import {AuthContext} from "../../../../../../../../context/auth-context";


const useStyles = makeStyles(theme => ({
    root: {},
    content: {
        padding: 0
    },
    actions: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        '': {
            marginLeft: 0
        }
    },
    buttonIcon: {
        marginRight: theme.spacing(1)
    }
}));

const CustomerInfo = (props) => {
    const {customer} = props;
    const {sendRequest, clearError} = useHttpClient();
    const [representativeList, setRepresentativeList] = useState([])
    const [currentRep, setCurrentRep] = useState('')
    const auth = useContext(AuthContext);
    const classes = useStyles();

    const [openEdit, setOpenEdit] = useState(false);

    const handleEditOpen = () => {
        setOpenEdit(true);
        if (representativeList.length === 0) {
            getRepresentativeListHandler()
        }


    };

    const handleEditClose = () => {
        setOpenEdit(false);
    };

    const getRepresentativeListHandler = async event => {
        try {
            const responseData = await sendRequest(
                "http://localhost:8080/representatives",
                'GET',
                null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            )
            setRepresentativeList(responseData)
            setCurrentRep(customer.representativeIsbn)
        } catch (err) {
        }
    };
    return (
        <Card
        >
            <CardHeader title="Customer info"/>
            <Divider/>
            <CardContent className={classes.content}>

                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>
                                {customer.email}
                                <div>
                                    <Label
                                        color={
                                            customer ? colors.green[600] : colors.orange[600]
                                        }
                                    >
                                        {customer
                                            ? 'Email verified'
                                            : 'Email not verified'}
                                    </Label>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow selected>
                            <TableCell>Phone</TableCell>
                            <TableCell>{customer.phone}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>{customer.username}</TableCell>
                        </TableRow>
                        <TableRow selected>
                            <TableCell>Country</TableCell>
                            <TableCell>{customer.country}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Representative</TableCell>
                            <TableCell>
                                {customer.representativeIsbn}
                                <div>
                                    <Label
                                        color={
                                            customer.representativeIsbn !== "defaultRep" ? colors.green[600] : colors.orange[600]
                                        }
                                    >
                                        {customer.representativeIsbn !== "defaultRep"
                                            ? 'Rep assigned'
                                            : 'Rep not assigned'}
                                    </Label>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow selected>
                            <TableCell>Representation Status</TableCell>
                            <TableCell>{customer.hasRepresentation === undefined ? "" : customer.hasRepresentation.toString()}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
            <CardActions>
                <div className={classes.mainActions}>
                    <Button onClick={handleEditOpen}>
                        <EditIcon className={classes.buttonIcon}/>
                        Edit
                    </Button>
                    <Button disabled>
                        <LockOpenIcon className={classes.buttonIcon}/>
                        Reset &amp; Send Password
                    </Button>
                    <Button disabled>
                        <PersonIcon className={classes.buttonIcon}/>
                        Login as Customer
                    </Button>
                </div>
            </CardActions>
            <CustomerEdit
                onChangeDetails={[props.onChangeDetails[0], props.onChangeDetails[1]]}
                props={props}
                customer={customer}
                representativeList={representativeList}
                currentRep={customer.representativeIsbn}
                onClose={handleEditClose}
                open={openEdit}
            />
        </Card>
    );
};

CustomerInfo.propTypes = {
    className: PropTypes.string,
    customer: PropTypes.object.isRequired,
    onChangeDetails: PropTypes.array
};

export default CustomerInfo;
