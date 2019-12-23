import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size, color }) => {
    const { viewStyle } = styles;
    return (
        <View style={viewStyle}>
            <ActivityIndicator color={color} size={size || 'large'} />
        </View>
    );
};

const styles = {
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export { Spinner };
