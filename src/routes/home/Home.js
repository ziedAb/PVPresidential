/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import GeneratedForm from '../GeneratedForm';
import SelectOffice from '../SelectOffice';
import history from '../../core/history';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      station_name: "",
      circonscription: "",
      circonscriptionObject:{},
      officeObject: {},
      circonscriptionOffice: '01',
      delegation: '4',
      subDelegation: '',
      center: '',
      station: ''
    }

    this.toggleFormShow = this.toggleFormShow.bind(this);
    this.handleOfficeChange = this.handleOfficeChange.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleJob = this.handleJob.bind(this);
  }

  handleJob(){
      this.setState({
        center: '99'
      })
  }

  handleSearchInput(value, name){
    this.setState({ [name]: value });
  }

  toggleFormShow(show){
    this.setState({
      showForm: show
    });
  }

  handleOfficeChange(office){
    fetch('/api/Circonscription/' + office.circonscription , {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .then((json) => {
      this.setState({
        showForm: true,
        station_name:office.station_name,
        circonscription: office.circonscription,
        circonscriptionObject: json,
        officeObject: office,
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.sectionTitle}>مركز الاقتراع</h1>
          <button onClick={this.handleJob}> test </button>
          <SelectOffice officeChange={this.handleOfficeChange}
            handleSearchInput = {this.handleSearchInput}
            circonscriptionOffice =  {this.state.circonscriptionOffice}
            delegation = {this.state.delegation}
            subDelegation = {this.state.subDelegation}
            center = {this.state.center}
            station = {this.state.station}/>
        </div>

        <GeneratedForm station_name={this.state.station_name}
        circonscription={this.state.circonscription}
        circonscriptionObject={this.state.circonscriptionObject}
        showForm={this.state.showForm}
        toggleFormShow = {this.toggleFormShow}
        office = {this.state.officeObject} />
      </div>
    );
  }
}

export default withStyles(s)(Home);
