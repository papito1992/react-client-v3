import React from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Tabs, Tab, Divider } from '@material-ui/core';

import { Header, Summary, Invoices, Logs } from './index';

const useStyles = makeStyles(theme => ({

}));

const CustomerManagementDetails = (props) => {
  const { match, history } = props;
  const classes = useStyles();
  const { customerId, tab } = match.params;

  const handleTabsChange = (event, value) => {
    history.push(value);
  };

  const tabs = [
    { value: 'summary', label: 'Summary' },
    { value: 'invoices', label: 'Invoices' },
    { value: 'logs', label: 'Logs' }
  ];

  if (!tab) {
    return <Redirect to={`/admin/customers/${customerId}/summary`} />;
  }
  return (

      <React.Fragment>
      <Header />
      <Tabs
        className={classes.tabs}
        onChange={handleTabsChange}
        scrollButtons="auto"
        value={tab}
        variant="scrollable"
      >
        {tabs.map(tab => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Divider/>
      <div >
        {tab === 'summary' && <Summary props={props} customerId={customerId}/>}
        {tab === 'invoices' && <Invoices />}
        {tab === 'logs' && <Logs />}
      </div>
</React.Fragment>
  );
};

CustomerManagementDetails.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default CustomerManagementDetails;
