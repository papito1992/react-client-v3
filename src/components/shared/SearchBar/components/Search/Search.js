import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {Button, Input, Paper} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center'
    },
    search: {
        flexGrow: 1,
        height: 42,
        padding: theme.spacing(0, 2),
        display: 'flex',
        alignItems: 'center'
    },
    searchIcon: {
        marginRight: theme.spacing(2),
        color: theme.palette.icon
    },
    searchInput: {
        flexGrow: 1
    },
    searchButton: {
        marginLeft: theme.spacing(2)
    }
}));

const Search = props => {
    const {onSearch, className, ...rest} = props;
    const [input, setInput] = useState('')
    const loginPassword = useRef('');

    const classes = useStyles();

    const handleSearchCall = () => {
        onSearch[0]()
    };
    return (
        <div
            {...rest}
            className={clsx(classes.root, className)}
        >
            <Paper
                className={classes.search}
                elevation={1}
            >
                <SearchIcon className={classes.searchIcon}/>
                <Input
                    className={classes.searchInput}
                    disableUnderline
                    placeholder="Search by ID"
                    inputRef={loginPassword}
                    value={input} onInput={e => {
                    setInput(e.target.value)
                    onSearch[1](loginPassword.current.value)
                }}
                />
            </Paper>
            <Button
                className={classes.searchButton}
                onClick={handleSearchCall}
                size="large"
                variant="contained"
            >
                Search
            </Button>
        </div>
    );
};

Search.propTypes = {
    className: PropTypes.string,
    onSearch: PropTypes.array
};

export default Search;
