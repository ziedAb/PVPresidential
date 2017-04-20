/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SelectOffice.css';
import h from '../home/Home.css';
import NumberInput from '../numberInput';
import Message from '../../Components/Message';


class SelectOffice extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      circonscription: '04',
      delegation: '01',
      subDelegation: '01',
      center: '001',
      station: '01',
      filled: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const officeID = Number.parseInt(this.state.circonscription.slice(1)+this.state.delegation+this.state.subDelegation+this.state.center+this.state.station,10);

    fetch('/api/Office/'+officeID, {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .then((json) => {
      if(json.filled != undefined && json.filled < 2){
        this.setState({filled: false});
        this.props.officeChange(json);
      }
      else this.setState({filled: true});

    })
    .catch((err) => {
      console.error(err);
    });
  }

  handleChange(value, name){
    this.setState({ [name]: value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={s.row}>
          <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} value={this.state.station} maxLength="2" id="station" name="station" label="مكتب الاقتراع"/>
          <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} value={this.state.center} maxLength="3" id="center" name="center" label="مركز الاقتراع"/>
          <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} value={this.state.subDelegation} maxLength="2" id="subDelegation" name="subDelegation" label="العمادة"/>
          <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} value={this.state.delegation} maxLength="2" id="delegation" name="delegation" label="المعتمدية"/>
          <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} value={this.state.circonscription} maxLength="2" id="circonscription" name="circonscription" label="الدائرة الانتخابية"/>
        </div>
        <div className={s.row}>
          <input type="submit" className={s.submit} value="search" />
        </div>
        <div className={s.row}>
          <Message show={this.state.filled} text="Ce PV a déja été saisi 2 fois"/>
        </div>
      </form>
    );
  }
}

export default withStyles(s)(SelectOffice);
