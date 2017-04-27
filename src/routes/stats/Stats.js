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
import s from './Stats.css';
import history from '../../core/history';

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      circonscriptions : {},
      circSelect : "",
      unfilledNumber : "",
      unfilledObject : {},
      oneTimeFilledNumber : "",
      oneTimeFilledObject : {},
      errorFilledNumber : "",
      errorFilledObject : {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.redirectPV = this.redirectPV.bind(this);
  }

  componentDidMount(){
    fetch('/api/Circonscription', {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .then((json) => {
      this.setState({
        circonscriptions : json
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }

  handleSubmit(e){
    e.preventDefault();
    // get unfilled PVs
    const circSelect = this.state.circSelect;
    fetch('/api/Rout/' + circSelect, {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .then((json) => {
      this.setState({
        unfilledNumber : json.length,
        unfilledObject : json
      });
    })
    .catch((err) => {
      console.error(err);
    });

    // get 1 time filled PVs
    fetch('/api/Stats/' + circSelect + "/1", {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .then((json) => {
      this.setState({
        oneTimeFilledNumber : json.length,
        oneTimeFilledObject : json
      });
    })
    .catch((err) => {
      console.error(err);
    });

    // get erronated PVs
    fetch('/api/OfficeError/' + circSelect, {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .then((json) => {
      this.setState({
        errorFilledNumber : json.length,
        errorFilledObject : json
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }

  handleSelect(e){
    this.setState({
      circSelect : e.target.value
    });
  }

  redirectPV(e){
    e.preventDefault();
    const off = e.target.textContent.replace(/\s/g, ''),
          circonscriptionOffice = "0" + off.substr(0,1),
          delegation = off.substr(1,2),
          subDelegation = off.substr(3,2),
          center = off.substr(5,3),
          station = off.substr(8,2);
    // save in localStorage
    localStorage.setItem('circonscriptionOffice', circonscriptionOffice);
    localStorage.setItem('delegation', delegation);
    localStorage.setItem('subDelegation', subDelegation);
    localStorage.setItem('center', center);
    localStorage.setItem('station', station);

    history.push('/');
  }

  render() {
    // array of circonscriptions
    const arr = this.state.circonscriptions;
    var list = Object.keys(arr).map((key, index) => {
      return <option key={ index + 1 } value={arr[key].name}> {arr[key].name} </option>
    });
    // array of unfilled Objects
    const unfilledObject = this.state.unfilledObject;
    var listUnfilled = Object.keys(unfilledObject).map((key, index) => {
      return <span key={ index + 1 } className={`${ s.col } ${ s.oneTen }`}> {unfilledObject[key].number} </span>
    });
    // array of one time filled objects
    const oneTimeFilledObject = this.state.oneTimeFilledObject;
    var listOneTimeFilled = Object.keys(oneTimeFilledObject).map((key, index) => {
      return <span key={ index + 1 } className={`${ s.col } ${ s.oneTen }`}> {oneTimeFilledObject[key].number} </span>
    });
    // array of objects with errors
    const errorFilledObject = this.state.errorFilledObject;
    var listerrorFilled = Object.keys(errorFilledObject).map((key, index) => {
      return <span onClick={this.redirectPV} key={ index + 1 } className={`${ s.col } ${ s.oneTen } ${ s.tocorrect }`}> {errorFilledObject[key].number} </span>
    });

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <form onSubmit={this.handleSubmit}>
            <div className={`${ s.row } ${ s.ltr }`}>

              <div className={`${ s.col } ${ s.oneThird }`}>
                <select className={`${s.select}`} onChange={this.handleSelect}>
                  <option default>Choisissez la circonscription</option>
                  {list}
                </select>
              </div>

              <span className={`${ s.col } ${ s.oneThird } `}>
                <input type="submit" className={s.submit} value="search" />
              </span>

              <span className={`${ s.col } ${ s.oneThird } `}>
                extraire données
              </span>
            </div>

            <div className={`${ s.row } ${s.ltr}`} >
              <span className={`${ s.col } ${ s.oneThird } ${s.ltr} ${s.head}`}> PVs manquants -  {this.state.unfilledNumber}</span>
            </div>
            <div className={`${ s.row } ${s.ltr}`} >
              {listUnfilled}
            </div>

            <div className={`${ s.row } ${s.ltr}`} >
              <span className={`${ s.col } ${ s.oneThird } ${s.ltr} ${s.head}`}> PVs à resaisir une fois -  {this.state.oneTimeFilledNumber}</span>
            </div>
            <div className={`${ s.row } ${s.ltr}`} >
              {listOneTimeFilled}
            </div>

            <div className={`${ s.row } ${s.ltr}`} >
              <span className={`${ s.col } ${ s.oneThird } ${s.ltr} ${s.head}`}> PVs erronés -  {this.state.errorFilledNumber}</span>
            </div>
            <div className={`${ s.row } ${s.ltr}`} >
              {listerrorFilled}
            </div>

          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Stats);
