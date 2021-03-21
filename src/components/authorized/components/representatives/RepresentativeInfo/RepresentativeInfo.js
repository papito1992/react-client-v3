import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableRow
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import RepresentativeEdit from "./components/RepresentativeEdit/RepresentativeEdit";
import {Block} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {},
    content: {
        padding: 0
    },
    actions: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        '& > * + *': {
            marginLeft: 0
        }
    },
    mainActions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    buttonIcon: {
        marginRight: theme.spacing(1)
    }
}));

const RepresentativeInfo = (props) => {
    const {representative, className} = props;

    const classes = useStyles();

    const [openEdit, setOpenEdit] = useState(false);

    const handleEditClose = () => {
        setOpenEdit(false);
    };

    return (
        <Card
            className={clsx(classes.root, className)}
        >
            <CardHeader title="Representative Info"/>
            <Divider/>
            <CardContent className={classes.content}>
                {representative !== undefined ?
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell>{representative.username}</TableCell>
                            </TableRow>
                            <TableRow selected>
                                <TableCell>Email</TableCell>
                                <TableCell>{representative.email}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Representative Unique Id</TableCell>
                                <TableCell>{representative.isbn}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table> : ""}
            </CardContent>
            <CardActions>
                <Button disabled>
                    <EditIcon className={classes.buttonIcon}/>
                    Edit
                </Button>
                <Button disabled>
                    <Block className={classes.buttonIcon}/>
                    Block
                </Button>
            </CardActions>
            <RepresentativeEdit
                props={props}
                representative={representative}
                currentRep={representative.username}
                onClose={handleEditClose}
                open={openEdit}
            />
        </Card>
    );
};

RepresentativeInfo.propTypes = {
    className: PropTypes.string,
};

export default RepresentativeInfo;
