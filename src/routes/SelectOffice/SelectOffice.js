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

class SelectOffice extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log("submit");
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={s.row}>
          <NumberInput className={`${ s.col } ${ s.oneFifth }`} maxLength="2" id="test" name="testname" label="مكتب الاقتراع"/>
          <NumberInput className={`${ s.col } ${ s.oneFifth }`} maxLength="3" id="test1" name="testname1" label="مركز الاقتراع"/>
          <NumberInput className={`${ s.col } ${ s.oneFifth }`} maxLength="2" id="test2" name="testname2" label="العمادة"/>
          <NumberInput className={`${ s.col } ${ s.oneFifth }`} maxLength="2" id="test3" name="testname3" label="المعتمدية"/>
          <NumberInput className={`${ s.col } ${ s.oneFifth }`} maxLength="2" id="test4" name="testname4" label="الدائرة الانتخابية"/>
        </div>
        <div className={s.row}>
          <input type="submit" className={s.submit} value="search" />
        </div>
      </form>
    );
  }
}

export default withStyles(s)(SelectOffice);
