/*import { AppRegistry } from 'react-native';
import ReactNativeYouTubeExample from './ReactNativeYouTubeExample';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => ReactNativeYouTubeExample);
*/
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './Global';

console.disableYellowBox=true
AppRegistry.registerComponent(appName, () => App);
