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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      station_name: "",
      circonscription: "",
      circonscriptionObject:{}
    }

    this.handleOfficeChange = this.handleOfficeChange.bind(this);
  }

  handleOfficeChange(office){
    fetch('/api/getCirconscription/' + office.circonscription.toUpperCase(), {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .then((json) => {
      this.setState({
        showForm: true,
        station_name:office.station_name,
        circonscription: office.circonscription,
        circonscriptionObject: json
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
          <SelectOffice officeChange={this.handleOfficeChange}/>
        </div>

        <GeneratedForm station_name={this.state.station_name}
        circonscription={this.state.circonscription}
        circonscriptionObject={this.state.circonscriptionObject}
        showForm={this.state.showForm} />
      </div>
    );
  }
}

export default withStyles(s)(Home);
