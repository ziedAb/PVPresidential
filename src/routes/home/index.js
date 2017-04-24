/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';
import Auth from '../../core/Auth';

export default {

  path: '/',

  action() {
    if (Auth.isUserAuthenticated()){
      return {
        title: 'React Starter Kit',
        component: <Layout><Home /></Layout>,
      };
    }
    else {
      return { redirect: '/login' };
    }

  },

};
