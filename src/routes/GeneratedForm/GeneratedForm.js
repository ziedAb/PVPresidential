/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import s from './GeneratedForm.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import NumberInput from '../numberInput';
import CheckboxInput from '../CheckboxInput';
import TextInput from '../TextInput';
import SelectOffice from '../SelectOffice';
import Parties from '../Parties'

class GeneratedForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(target) {
    event.preventDefault();
    console.log(target);
  }


  render() {
    const isShown = this.props.showForm;
    if (isShown){
      return (
        <form id="GeneratedForm" onSubmit={this.handleFormSubmit}>
          <div className={s.container}>
            <div className={s.row}>
              <h2 className={`${ s.col } ${ s.school }`}>
                <span className={s.circonscription}>{this.props.circonscription}</span>
                {this.props.station_name}
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
            <Parties list={this.props.circonscriptionObject.parties}/>
          </div>
          <div className={s.row}>
            <input type="submit" className={s.submit} value="Validate" />
          </div>
        </form>
      );
    }
    else return null;
  }
}

export default withStyles(s)(GeneratedForm);
