import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {Grid, Button} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

import {Search, Filter} from './components';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: theme.spacing(0),
        marginTop: theme.spacing(9),
        paddingTop: theme.spacing(0),
    },
    search: {
        flexGrow: 1,
        maxWidth: 480,
        marginLeft: theme.spacing(1)

    },
    filterButton: {
        marginLeft: 'auto',
        marginRight: theme.spacing(1)
    },
    filterIcon: {
        marginRight: theme.spacing(1)
    },
    searchInput: {
        marginRight: theme.spacing(1)
    },

}));

const SearchBar = props => {
    const {onFilter, onSearch, className, ...rest} = props;
    const classes = useStyles();

    const [openFilter, setOpenFilter] = useState(false);

    const handleFilterOpen = () => {
        setOpenFilter(true);
    };

    const handleFilterClose = () => {
        setOpenFilter(false);
    };

    return (
        <Grid
            {...rest}
            className={clsx(classes.root, className)}
            container
            spacing={3}
        >
            <Grid item>
                <Search
                    className={classes.search}
                    onSearch={onSearch}
                />
            </Grid>
            <Grid item>
                <Button
                    className={classes.filterButton}
                    onClick={handleFilterOpen}
                    size="small"
                    variant="outlined"
                >
                    <FilterListIcon className={classes.filterIcon}/> Show filters
                </Button>
            </Grid>
            <Filter
                onClose={handleFilterClose}
                onFilter={onFilter}
                open={openFilter}
            />
        </Grid>
    );
};

SearchBar.propTypes = {
    className: PropTypes.string,
    onFilter: PropTypes.func,
    onSearch: PropTypes.array,
};

export default SearchBar;
