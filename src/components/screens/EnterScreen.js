import React, { Component } from 'react';
import { View, Text, Alert, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import 'whatwg-fetch';
import { Spinner } from '../common';


class EnterScreen extends Component {
    state = {
        username: '',
        userid: [],
        allUsernames: [],           // if logging true then log him in, else register
        logging: false,
        submitButtonDisabled: false,
        loading: false
    };

    componentWillMount() {
        fetch('http://triangle.bulme.at/~pi/Bulme/fetchallusers.php')
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                this.setState({ allUsernames: responseData });
            }).catch((error) => {
            console.error(error);
        });
    }

    onSubmit() {
        this.setState({ submitButtonDisabled: true, loading: true });
        // check if username exists
        let logHimIn = false;
        let logUserId = '';

        if (this.state.username.length > 3) {
            const allUsernames = this.state.allUsernames;
            for (let i = 0; i < allUsernames.length; i++) {
                if (allUsernames[i].username === this.state.username) {
                    // log him in boolean
                    this.setState({ logging: true });       // username exists
                    // not break, he is most likely the last one
                    logHimIn = true;
                    logUserId = allUsernames[i].id;
                }
            }
            // if taken -> log him in with this username and ID

            if (this.state.logging === true || logHimIn === true) {
                // log in
                this.setState({ userid: logUserId }, () => {
                    const passPropsToScreen = {
                        id: this.state.userid,
                        username: this.state.username
                    };
                    this.passPropsToStationScreen(passPropsToScreen);
                });
                // zur nächsten Seite mit den props
                // props übertragen

            } else {
                // else not taken -> create new user and log him in with username and ID
                // register
                fetch('http://triangle.bulme.at/~pi/Bulme/insertusername.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: this.state.username
                    })
                }).then((response) => response.json())
                    .then((responseData) => {
                        console.log(responseData);
                        this.setState({ userid: responseData });       // id rausholen nachdem username eintrag erstellt
                    }).then(() => {
                    // zur nächsten Seite
                    const passPropsToScreen = {
                        id: this.state.userid[0].id,
                        username: this.state.username
                    };
                    this.passPropsToStationScreen(passPropsToScreen);
                });
            }
        } else {
            // passt nicht
            Alert.alert('Bitte einen gültigen Namen eingeben!');
            this.setState({ submitButtonDisabled: false, loading: false });
        }
    }

    passPropsToStationScreen(passPropsToScreen) {
        this.refresh();
        this.setState({ submitButtonDisabled: false, loading: false });
        Actions.stationscreen(passPropsToScreen);
    }

    refresh() {
        fetch('http://triangle.bulme.at/~pi/Bulme/fetchallusers.php')
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                this.setState({ allUsernames: responseData });
            }).catch((error) => {
            console.error(error);
        });
    }

    renderButton() {
        if (this.state.loading) {
            return (
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => this.onSubmit()}
                    disabled={this.state.submitButtonDisabled}
                >
                    <Spinner size="small" color="white" />
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => this.onSubmit()}
                disabled={this.state.submitButtonDisabled}
            >
                <Text style={styles.buttonTextStyle}>Einsteigen</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.containerStyle}>
                    <View style={styles.formContainerStyle}>
                        <Text style={styles.inputTextStyle}>Vor- und Nachname</Text>
                        <TextInput
                            value={this.state.username}
                            onChangeText={username => this.setState({ username })}
                            style={styles.inputStyle}
                            maxLength={30}
                        />
                        {this.renderButton()}
                    </View>
                </View>

                <View style={styles.copyrightStyle}>
                    <Text style={{ color: 'rgba(255,255,255,0.5)' }}>Durakovic & Gheorghe</Text>
                </View>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3498db'
    },
    formContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputStyle: {
        width: 300,
        color: '#FFF',
        //backgroundColor: 'rgba(254,74,86, 0.9)',
        backgroundColor: '#3498db',
        marginBottom: 10,
        fontSize: 16
    },
    inputTextStyle: {
        color: '#FFF',
        fontSize: 18
    },
    buttonStyle: {
        //backgroundColor: '#eb4551',
        backgroundColor: '#348dcf',
        width: 300,
        height: 55,
        paddingVertical: 15
    },
    buttonTextStyle: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 18
    },
    copyrightStyle: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 5
    }
};

export default EnterScreen;
