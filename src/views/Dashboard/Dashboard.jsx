import React from 'react';
import PropTypes from 'prop-types';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';
import {
  ContentCopy,
  Store,
  InfoOutline,
  Warning,
  DateRange,
  LocalOffer,
  Update,
  ArrowUpward,
  AccessTime,
  Accessibility,
} from 'material-ui-icons';
import { withStyles, Grid } from 'material-ui';

import {
  StatsCard,
  ChartCard,
  TasksCard,
  RegularCard,
  Table,
  ItemGrid,
} from 'components';

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from 'variables/charts';

import dashboardStyle from 'variables/styles/dashboardStyle';

// test db
import axios from 'axios';
// const { ipcRenderer } = window.require('electron');

class Dashboard extends React.Component {
  state = {
    value: 0,
    inputName: '',
  };

  getProductsHandler = () => {
    // HTTP call to api
    axios.get('http://localhost:3200/todos')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })

    // console.log('getProductsHandler', ipcRenderer);

    // // trigger call to electron
    // ipcRenderer.send('getProductsCall');

    // // listen for callback from electron
    // ipcRenderer.on('getProductsReturn', (event, result) => {
    //   console.log('getProductsReturn', event);
    //   console.log('getProductsReturn', result);
    // });
  }

  getLocationHandler = () => {
    // console.log('getLocationHandler', ipcRenderer);

    // // trigger call to electron
    // ipcRenderer.send('getLocationCall');

    // // listen for callback from electron
    // ipcRenderer.on('getLocationReturn', (event, result) => {
    //   console.log('getLocationReturn', event);
    //   console.log('getLocationReturn', result);
    // });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = (index) => {
    this.setState({ value: index });
  };

  //  event handler test
  addToProductsHandler = (event) => {
    // if (event.key === 'Enter') {
    //   console.log('do validate');
    //   console.log(event.target.value);
    //   this.setState({ inputName: event.target.value });

    //   // trigger call to electron
    //   const price = Math.floor((Math.random() * (1000 - (500 + 1))) + 500);
    //   const name = event.target.value;
    //   const objectToSave = {
    //     name,
    //     price,
    //   };
    //   console.log(objectToSave);
    //   console.log(this.state.inputName);
    //   ipcRenderer.send('addToProductsCall', objectToSave);

    //   // listen for callback from electron
    //   ipcRenderer.on('addToProductsReturn', (ev, result) => {
    //     console.log('addToProductsReturn', ev);
    //     console.log('addToProductsReturn', result);
    //   });

    //   console.log(this.state.inputName);
    // }
  }

  render() {
    return (
      <div>
        <Grid container>

          {/* this is test for DB */}
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              getProducts={this.getProductsHandler}
              icon={ContentCopy}
              iconColor="orange"
              title="SQLite"
              description="GET"
              // small="GB"
              statIcon={Warning}
              statIconColor="danger"
              statLink={{ text: 'Test DB', href: '#pablo' }}
            />
          </ItemGrid>
          {/* this is test for DB */}

          {/* this is test for DB */}
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              addToProducts={this.getLocationHandler}
              icon={ContentCopy}
              iconColor="orange"
              title="HTTP GET"
              description="Google Maps"
              // small="GB"
              statIcon={Warning}
              statIconColor="danger"
              statLink={{ text: 'Test the call', href: '#pablo' }}
            />

            <div>
              POST Item to Products
              <input type="text" onKeyPress={event => this.addToProductsHandler(event)} placeholder="Press 'Enter' to save" />
            </div>
          </ItemGrid>
          {/* this is test for DB */}

          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={ContentCopy}
              iconColor="orange"
              title="Used Space"
              description="49/50"
              small="3"
              statIcon={Warning}
              statIconColor="danger"
              statLink={{ text: 'Get More Space...', href: '#pablo' }}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Store}
              iconColor="green"
              title="Revenue"
              description="$34,245"
              statIcon={DateRange}
              statText="Last 24 Hours"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={InfoOutline}
              iconColor="red"
              title="Fixed Issues"
              description="75"
              statIcon={LocalOffer}
              statText="Tracked from Github"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Accessibility}
              iconColor="blue"
              title="Followers"
              description="+245"
              statIcon={Update}
              statText="Just Updated"
            />
          </ItemGrid>
        </Grid>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={4}>
            <ChartCard
              chart={
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              }
              chartColor="green"
              title="Daily Sales"
              text={
                <span>
                  <span className={this.props.classes.successText}>
                    <ArrowUpward
                      className={this.props.classes.upArrowCardCategory}
                    />{' '}
                    55%
                  </span>{' '}
                  increase in today sales.
                </span>
              }
              statIcon={AccessTime}
              statText="updated 4 minutes ago"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={4}>
            <ChartCard
              chart={
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              }
              chartColor="orange"
              title="Email Subscriptions"
              text="Last Campaign Performance"
              statIcon={AccessTime}
              statText="campaign sent 2 days ago"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={4}>
            <ChartCard
              chart={
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              }
              chartColor="red"
              title="Completed Tasks"
              text="Last Campaign Performance"
              statIcon={AccessTime}
              statText="campaign sent 2 days ago"
            />
          </ItemGrid>
        </Grid>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={6}>
            <TasksCard />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={6}>
            <RegularCard
              headerColor="orange"
              cardTitle="Employees Stats"
              cardSubtitle="New employees on 15th September, 2016"
              content={
                <Table
                  tableHeaderColor="warning"
                  tableHead={['ID', 'Name', 'Salary', 'Country']}
                  tableData={[
                    ['1', 'Dakota Rice', '$36,738', 'Niger'],
                    ['2', 'Minerva Hooper', '$23,789', 'Curaçao'],
                    ['3', 'Sage Rodriguez', '$56,142', 'Netherlands'],
                    ['4', 'Philip Chaney', '$38,735', 'Korea, South'],
                  ]}
                />
              }
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(Dashboard);
