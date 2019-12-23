import React, { Component } from 'react';
import { ScrollView, View, Text, Alert, TextInput, TouchableOpacity } from 'react-native';
import { Card, CardItem } from 'native-base';
import 'whatwg-fetch';


class StationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            userid: this.props.id,
            passwordStation1: '',
            passwordStation2: '',
            passwordStation3: '',
            passwordStation4: '',
            passwordStation5: '',

            station1CorrectPassword: 'elektrofans1',
            station2CorrectPassword: 'elektrofans2',
            station3CorrectPassword: 'elektrofans3',
            station4CorrectPassword: 'elektrofans4',
            station5CorrectPassword: 'elektrofans5',

            fetchedStations: [],
            button1Text: 'Bestätigen',
            button2Text: 'Bestätigen',
            button3Text: 'Bestätigen',
            button4Text: 'Bestätigen',
            button5Text: 'Bestätigen',
            button1Disabled: false,
            button2Disabled: false,
            button3Disabled: false,
            button4Disabled: false,
            button5Disabled: false,
            refreshit: true
        };
    }

    componentWillMount() {
        // stationsdaten holen
        // fetchedStations
        fetch('http://triangle.bulme.at/~pi/Bulme/fetchmystations.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: this.state.userid
            })
        }).then((response) => response.json())
            .then((responseData) => {
                this.setState({ fetchedStations: responseData });       // id rausholen nachdem username eintrag erstellt
        }).then(() => this.checkForCompletedStations());
    }

    onSubmitButton1() {
        if (this.state.passwordStation1 === this.state.station1CorrectPassword) {
            fetch('http://triangle.bulme.at/~pi/Bulme/insertstation1.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: this.state.userid
                })
            });

            this.setState({ button1Disabled: true, button1Text: 'Super!' });
            this.textInput1.clear();
        } else {
            Alert.alert('Falsches Passwort');
        }
    }

    onSubmitButton2() {
        if (this.state.passwordStation2 === this.state.station2CorrectPassword) {
            fetch('http://triangle.bulme.at/~pi/Bulme/insertstation2.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: this.state.userid
                })
            });

            this.setState({ button2Disabled: true, button2Text: 'Weiter so!' });
            this.textInput2.clear();
        } else {
            Alert.alert('Falsches Passwort');
        }
    }

    onSubmitButton3() {
        if (this.state.passwordStation3 === this.state.station3CorrectPassword) {
            fetch('http://triangle.bulme.at/~pi/Bulme/insertstation3.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: this.state.userid
                })
            });

            this.setState({ button3Disabled: true, button3Text: 'Gut!' });
            this.textInput3.clear();
        } else {
            Alert.alert('Falsches Passwort');
        }
    }

    onSubmitButton4() {
        if (this.state.passwordStation4 === this.state.station4CorrectPassword) {
            fetch('http://triangle.bulme.at/~pi/Bulme/insertstation4.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: this.state.userid
                })
            });

            this.setState({ button4Disabled: true, button4Text: 'Sehr gut!' });
            this.textInput4.clear();
        } else {
            Alert.alert('Falsches Passwort');
        }
    }

    onSubmitButton5() {
        if (this.state.passwordStation5 === this.state.station5CorrectPassword) {
            fetch('http://triangle.bulme.at/~pi/Bulme/insertstation5.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: this.state.userid
                })
            });

            this.setState({ button5Disabled: true, button5Text: 'Geschafft!' });
            this.textInput5.clear();
        } else {
            Alert.alert('Falsches Passwort');
        }
    }

    checkForCompletedStations() {
        console.log(this.state.fetchedStations);
        const fetchedStations = this.state.fetchedStations;

        if (fetchedStations[0].station1 === '1') {
            this.setState({ button1Disabled: true, button1Text: 'Super!' });
        }
        if (fetchedStations[0].station2 === '1') {
            this.setState({ button2Disabled: true, button2Text: 'Weiter so!' });
        }
        if (fetchedStations[0].station3 === '1') {
            this.setState({ button3Disabled: true, button3Text: 'Gut!' });
        }
        if (fetchedStations[0].station4 === '1') {
            this.setState({ button4Disabled: true, button4Text: 'Sehr gut!' });
        }
        if (fetchedStations[0].station5 === '1') {
            this.setState({ button5Disabled: true, button5Text: 'Geschafft!' });
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.containerStyle}>
                    <Card>
                        <CardItem style={styles.cardItemStyle}>
                            <Text style={styles.inputTextStyle}>IT & Vernetzung</Text>
                            <TextInput
                                value={this.state.passwordStation1}
                                editable={!this.state.button1Disabled}
                                onChangeText={passwordStation1 => this.setState({ passwordStation1 })}
                                style={styles.inputStyle}
                                maxLength={15}
                                placeholder="Passwort"
                                ref={input => { this.textInput1 = input }}
                            />
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                onPress={() => this.onSubmitButton1()}
                                disabled={this.state.button1Disabled}
                            >
                                <Text style={[styles.buttonTextStyle, this.state.button1Disabled && styles.buttonTextDisabledStyle]}>{this.state.button1Text}</Text>
                            </TouchableOpacity>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem style={styles.cardItemStyle}>
                            <Text style={styles.inputTextStyle}>Robotik</Text>
                            <TextInput
                                value={this.state.passwordStation2}
                                editable={!this.state.button2Disabled}
                                onChangeText={passwordStation2 => this.setState({ passwordStation2 })}
                                style={styles.inputStyle}
                                maxLength={15}
                                placeholder="Passwort"
                                ref={input => { this.textInput2 = input }}
                            />
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                onPress={() => this.onSubmitButton2()}
                                disabled={this.state.button2Disabled}
                            >
                                <Text style={[styles.buttonTextStyle, this.state.button2Disabled && styles.buttonTextDisabledStyle]}>{this.state.button2Text}</Text>
                            </TouchableOpacity>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem style={styles.cardItemStyle}>
                            <Text style={styles.inputTextStyle}>Labor</Text>
                            <TextInput
                                value={this.state.passwordStation3}
                                editable={!this.state.button3Disabled}
                                onChangeText={passwordStation3 => this.setState({ passwordStation3 })}
                                style={styles.inputStyle}
                                maxLength={15}
                                placeholder="Passwort"
                                ref={input => { this.textInput3 = input }}
                            />
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                onPress={() => this.onSubmitButton3()}
                                disabled={this.state.button3Disabled}
                            >
                                <Text style={[styles.buttonTextStyle, this.state.button3Disabled && styles.buttonTextDisabledStyle]}>{this.state.button3Text}</Text>
                            </TouchableOpacity>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem style={styles.cardItemStyle}>
                            <Text style={styles.inputTextStyle}>B&R Workshop</Text>
                            <TextInput
                                value={this.state.passwordStation4}
                                editable={!this.state.button4Disabled}
                                onChangeText={passwordStation4 => this.setState({ passwordStation4 })}
                                style={styles.inputStyle}
                                maxLength={15}
                                placeholder="Passwort"
                                ref={input => { this.textInput4 = input }}
                            />
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                onPress={() => this.onSubmitButton4()}
                                disabled={this.state.button4Disabled}
                            >
                                <Text style={[styles.buttonTextStyle, this.state.button4Disabled && styles.buttonTextDisabledStyle]}>{this.state.button4Text}</Text>
                            </TouchableOpacity>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem style={styles.cardItemStyle}>
                            <Text style={styles.inputTextStyle}>Pick&Place</Text>
                            <TextInput
                                value={this.state.passwordStation5}
                                editable={!this.state.button5Disabled}
                                onChangeText={passwordStation5 => this.setState({ passwordStation5 })}
                                style={styles.inputStyle}
                                maxLength={15}
                                placeholder="Passwort"
                                ref={input => { this.textInput5 = input }}
                            />
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                onPress={() => this.onSubmitButton5()}
                                disabled={this.state.button5Disabled}
                            >
                                <Text style={[styles.buttonTextStyle, this.state.button5Disabled && styles.buttonTextDisabledStyle]}>{this.state.button5Text}</Text>
                            </TouchableOpacity>
                        </CardItem>
                    </Card>
                </View>
            </ScrollView>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputStyle: {
        width: 300,
        marginBottom: 10,
        fontSize: 16
    },
    inputTextStyle: {
        fontSize: 18,
        color: 'rgba(0,0,0,0.8)'
    },
    buttonStyle: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        width: 100
    },
    buttonTextStyle: {
        textAlign: 'center',
        fontSize: 18,
        color: 'rgba(0,0,0,0.8)'
    },
    cardItemStyle: {
        flexDirection: 'column'
    },
    buttonTextDisabledStyle: {
        textAlign: 'center',
        fontSize: 18,
        //color: 'rgba(0,255,0,0.8)'
        color: '#2ecc71'
    }
};

export default StationScreen;
