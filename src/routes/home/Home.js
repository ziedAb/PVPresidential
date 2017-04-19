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
import NumberInput from '../numberInput';
import CheckboxInput from '../CheckboxInput';
import TextInput from '../TextInput';
import SelectOffice from '../SelectOffice';
import Parties from '../Parties'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      station_name: "",
      circonscription: "",
      circonscriptionObject:{}
    }

    this.handleOfficeChange = this.handleOfficeChange.bind(this);
  }

  handleOfficeChange(office){
    var change = {};
    fetch('/api/getCirconscription/' + office.circonscription.toUpperCase(), {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .then((json) => {
      console.log(json);
      change = json;
      this.setState({
        station_name:office.station_name,
        circonscription: office.circonscription,
        circonscriptionObject: json
      });
      console.log(this.state.circonscriptionObject);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  const
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.sectionTitle}>مركز الاقتراع</h1>
          <SelectOffice officeChange={this.handleOfficeChange}/>
        </div>
        <div className={s.container}>
          <div className={s.row}>
            <h2 className={`${ s.col } ${ s.school }`}>
              <span className={s.circonscription}>{this.state.circonscription}</span>
              {this.state.station_name}
            </h2>
          </div>
          <div className={s.row}>
            <CheckboxInput className={`${ s.col } ${ s.oneThird }`} id="testcheck" name="testcheck" label="يوجد ختم الهيئة؟"/>
            <TextInput className={`${ s.col } ${ s.oneSix }`} id="testText" name="testText" label="توقيت بداية الفرز"/>
            <div className={`${ s.col } ${ s.oneSix }`} > </div>
            <TextInput className={`${ s.col } ${ s.oneSix }`} id="testText" name="testText" label="توقيت ختم الفرز"/>
            <div className={`${ s.col } ${ s.oneSix }`} > </div>
          </div>

          <h1 className={s.sectionTitle}>معلومات غريبة</h1>

          <div className={s.row}>
            <NumberInput className={`${ s.col } ${ s.oneFifth }`} maxLength="3" id="test" name="testname" label="عدد الناخبين المرسمين بمكتب الاقتراع"/>
            <NumberInput className={`${ s.col } ${ s.oneFifth }`} maxLength="3" id="test" name="testname" label="أ- عدد الناخبين الذين امضوا في قائمة الناخبين"/>
            <NumberInput className={`${ s.col } ${ s.oneFifth }`} maxLength="3" id="test" name="testname" label="- عدد أوراق التصويت المسلمة لمكتب الاقتراع"/>
            <NumberInput className={`${ s.col } ${ s.oneFifth }`} maxLength="3" id="test" name="testname" label="ج- عدد أوراق التصويت التالفة"/>
            <NumberInput className={`${ s.col } ${ s.oneFifth }`} maxLength="3" id="test" name="testname" label="د- عدد أوراق التصويت الباقية"/>
          </div>

          <div className={s.row}>
            <NumberInput className={`${ s.col } ${ s.oneFifth }`} maxLength="3" id="test" name="testname" label="ه- عدد أوراق التصويت التالفة + عدد أوراق التصويت الباقية"/>
            <NumberInput className={`${ s.col } ${ s.oneFifth }`} maxLength="3" id="test" name="testname" label="و- عدد أوراق التصويت المستخرجة من الصندوق"/>
            <NumberInput className={`${ s.col } ${ s.oneFifth }`} maxLength="3" id="test" name="testname" label="ز=ه+و"/>
            <NumberInput className={`${ s.col } ${ s.oneFifth }`} maxLength="3" id="test" name="testname" label="ح- المطابقة 1 : الفارق العددي بين ب و- ز"/>
            <NumberInput className={`${ s.col } ${ s.oneFifth }`} maxLength="3" id="test" name="testname" label="ط- المطابقة 2 : الفارق العددي بين أ و و"/>
          </div>
        </div>

        <div className={s.container}>
          <h1 className={s.sectionTitle}>القائمات</h1>
          <Parties list={this.state.circonscriptionObject.parties} other={this.state.station_name}/>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
