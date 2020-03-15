import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import {
    Container,
    Logo,
    Input,
    ErrorMessage,
    Button,
    ButtonText,
    SignUpLink,
    SignUpLinkText,
    Label
} from './styles';

export default class SignIn extends Component {
    static navigationOptions = {
        header: null,
    };

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            dispatch: PropTypes.func,
        }).isRequired,
    };

    state = {
        email: '',
        password: '',
        error: '',
        response: ''
    };

    handleEmailChange = (email) => {
        this.setState({ email });
    };

    handlePasswordChange = (password) => {
        this.setState({ password });
    };

    handleCreateAccountPress = () => {
        this.props.navigation.navigate('SignUp');
    };

    handleSignInPress = async () => {

            if (this.state.email.length === 0 || this.state.password.length === 0) {
                this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
                return ;
            }
            let response = [];
            try {
                const data = new FormData();
                data.append('password', this.state.password);
                data.append('username', this.state.email);

                response = await api.post('/login', {
                    email: this.state.email,
                    password: this.state.password,
                }).then(
                    // This stuff all seems to work great
                     console.log("OK")
                    ).catch(
                    function (err) {
                        // Run into big problems when I get an error
                        console.log("Got an error logging in, here's the message: ", err);
                    }
                );

            } catch (_err) {
                console.tron.log(_err);
                this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
            }
        console.log(response);

            if(response.data.access_token){
                const token = response.data.access_token;
                await AsyncStorage.setItem('@AShowMoura:token', token);

                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'drawerStack' }),
                    ],
                });
                this.props.navigation.dispatch(resetAction);
            } else {
                this.setState({error: 'Houve um problema com o login, verifique suas credenciais!'});
            }
    }

    render() {
        return (
            <Container>
                <Logo source={require('../../images/ashow_logo.png')} resizeMode="contain" />
                <SafeAreaView style={styles.container}>
                    <ScrollView style={styles.scroll}>
                        <View style={styles.viewInput}>
                            <Label>Endereço de e-mail:</Label>
                            <Input
                                placeholder=""
                                value={this.state.email}
                                onChangeText={this.handleEmailChange}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
                        <View style={styles.viewInput}>
                            <Label>Senha:</Label>
                            <Input
                                placeholder=""
                                value={this.state.password}
                                onChangeText={this.handlePasswordChange}
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry
                            />
                        </View>
                        {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
                        <Button onPress={this.handleSignInPress}>
                            <ButtonText>Entrar</ButtonText>
                        </Button>
                        <SignUpLink onPress={this.handleCreateAccountPress}>
                            <SignUpLinkText>Criar conta</SignUpLinkText>
                        </SignUpLink>
                        </ScrollView>
                </SafeAreaView>
            </Container>
        );
    }
}

const styles= StyleSheet.create({
    viewInput: {
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
    },
    container: {
        width: '100%',
        justifyContent: 'center',
    }
});
