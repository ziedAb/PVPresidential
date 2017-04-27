/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import _ from 'lodash';
import s from './GeneratedForm.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import NumberInput from '../numberInput';
import CheckboxInput from '../CheckboxInput';
import TextInput from '../TextInput';
import SelectOffice from '../SelectOffice';
import Parties from '../Parties';
import Message from '../../Components/Message';

class GeneratedForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmit : false,
      isPVdifferent : false
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  updateFilledTimes(obj, firstPV){
    const filled = obj.filled === undefined ? 1 : obj.filled + 1;
    let PVerror = false;

    if (filled === 2){
      fetch('/api/PV/' + obj.number, {
        method: 'GET',
        headers: {'Content-Type':'application/json'}
      })
      .then(res => res.json())
      .then((json) => {
        //clean objects
        delete firstPV.filledBy; delete firstPV._id; delete firstPV.__v;
        delete json.filledBy; delete json._id; delete json.__v;
        //compare 2 PVs
        PVerror = _.isEqual(firstPV, json);
        this.updateOffice(obj,filled,!PVerror);
      })
      .catch((err) => {
        console.error(err);
      });
    }
    else{
      this.updateOffice(obj,filled,PVerror);
    }
  }

  updateOffice(obj, filled, error){
    fetch('/api/Office/' + obj._id, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({"filled" : filled, "error" : error})
    })
    .then(res => res.json())
    .then((json) => {
      console.log(json);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let body = {};
    body["office"] = this.props.office.number;
    body["filledBy"] = localStorage.id;

    for (let i of this.refs.form.elements) {
      const validInput = i.type === "text" || i.type === "number" || i.type === "checkbox" ? true : false;

      if (validInput){
        // case parties
        if (i.id === ""){
          body[i.getAttribute("label")] = i.value ;
        }
        // other inputs
        else{
          body[i.id] = i.type === 'checkbox' ? i.checked : i.value;
        }
      }
    }

    fetch('/api/PV/' , {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then((json) => {
      this.props.toggleFormShow(false);
      this.setState({
        isSubmit : true
      });
      this.updateFilledTimes(this.props.office, json);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  handleChange(event){
  }


  render() {
    const isShown = this.props.showForm;
    if (isShown){
      return (
        <form id="GeneratedForm" ref="form" onSubmit={this.handleFormSubmit}>
          <div className={s.container}>
            <div className={s.row}>
              <h2 className={`${ s.col } ${ s.school }`}>
                <span className={s.circonscription}>{this.props.circonscription}</span>
                {this.props.station_name}
              </h2>
            </div>
            <div className={s.row}>
              <CheckboxInput className={`${ s.col } ${ s.oneThird }`} id="tampon" label="يوجد ختم الهيئة؟"/>
              <TextInput className={`${ s.col } ${ s.oneSix }`} id="countingStart" label="توقيت بداية الفرز"/>
              <div className={`${ s.col } ${ s.oneSix }`} > </div>
              <TextInput className={`${ s.col } ${ s.oneSix }`} id="countingEnd" label="توقيت ختم الفرز"/>
              <div className={`${ s.col } ${ s.oneSix }`} > </div>
            </div>

            <h1 className={s.sectionTitle}>معلومات غريبة</h1>

            <div className={s.row}>
              <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} maxLength="3" id="registeredVoters" label="عدد الناخبين المرسمين بمكتب الاقتراع"/>
              <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} maxLength="3" id="aSigningVoters" label="أ- عدد الناخبين الذين امضوا في قائمة الناخبين"/>
              <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} maxLength="3" id="bDeliveredBallots" label="- عدد أوراق التصويت المسلمة لمكتب الاقتراع"/>
              <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} maxLength="3" id="cSpoiledBallots" label="ج- عدد أوراق التصويت التالفة"/>
              <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} maxLength="3" id="dLeftBallots" label="د- عدد أوراق التصويت الباقية"/>
            </div>

            <div className={s.row}>
              <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} maxLength="3" id="eCplusD" label="ه- عدد أوراق التصويت التالفة + عدد أوراق التصويت الباقية"/>
              <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} maxLength="3" id="fExtractedBallots" label="و- عدد أوراق التصويت المستخرجة من الصندوق"/>
              <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} maxLength="3" id="gEplusF" label="ز=ه+و"/>
              <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} maxLength="3" id="hBminusG" label="ح- المطابقة 1 : الفارق العددي بين ب و- ز"/>
              <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} maxLength="3" id="iAminusF" label="ط- المطابقة 2 : الفارق العددي بين أ و و"/>
            </div>

            <h1 className={s.sectionTitle}>القائمات</h1>
            <Parties list={this.props.circonscriptionObject.parties}/>

            <h1 className={s.sectionTitle}>أوذر ستوف</h1>
            <div className={s.row}>
              <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} maxLength="3" id="jListVotes" label="ي- الأصوات المصرح بها لكل القائمات" />
              <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} maxLength="3" id="kCancelledVotes" label="ك- عدد أوراق التصويت الملغاة"/>
              <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} maxLength="3" id="lBlankVotes" label="ل- عدد أوراق التصويت البيضاء"/>
              <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} maxLength="3" id="mJplusKplusL" label="م) المجموع = ي+ ك+ ل"/>
              <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} maxLength="3" id="nFminusM" label="ن- المطابقة 3 : الفارق العددي بين و و م"/>
            </div>

            <div className={s.row}>
              <input type="submit" className={s.submit} value="Validate" />
            </div>
          </div>
        </form>
      );
    }
    else {
      return (
        <div className={s.container}>
          <div className={s.row}>
            <Message show={this.state.isSubmit} text="PV rempli avec succées !"/>
          </div>
        </div>
      );
    }
  }
}

export default withStyles(s)(GeneratedForm);
