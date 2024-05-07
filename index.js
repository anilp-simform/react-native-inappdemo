/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {withIAPContext} from 'react-native-iap';
const IAPAppHoc = withIAPContext(App);

AppRegistry.registerComponent(appName, () => IAPAppHoc);
