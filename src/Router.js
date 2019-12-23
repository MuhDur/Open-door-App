import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import EnterScreen from './components/screens/EnterScreen';
import StationScreen from './components/screens/StationScreen';

const RouterComponent = () => (
        <Router
            navigationBarStyle={{ backgroundColor: '#eb4551' }}     // #00695C      // #eb4551
            titleStyle={{ color: 'rgba(255, 255, 255, 0.9)' }}
            sceneStyle={{ paddingTop: 2, backgroundColor: '#3498db' }}      //#17a085      // #fe4a56
            barButtonIconStyle={{ tintColor: 'rgba(255, 255, 255, 0.9)' }}
        >
            <Scene
                key="enterscreen"
                component={EnterScreen}
                hideNavBar
                initial
            />
            <Scene
                key="stationscreen"
                component={StationScreen}
                onBack
                title="Stationen"
                hideNavBar
            />
        </Router>
    );

export default RouterComponent;
