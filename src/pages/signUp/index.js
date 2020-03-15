import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar, View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';

import api from '../../services/api';
import { StackActions, NavigationActions } from 'react-navigation';
import RNPickerDialog from "../../component/RNModalPicker";


import {
    Container,
    Logo,
    SuccessMessage,
    Input,
    ErrorMessage,
    Button,
    ButtonText,
    SignInLink,
    SignInLinkText,
    Label
} from './styles';

export default class SignUp extends Component {

    constructor(props){
        super(props);
    }

    static navigationOptions = {
        header: null,
    };

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            dispatch: PropTypes.func,
            goBack: PropTypes.func,
        }).isRequired,
    };

    state = {
        name: '',
        cpf: '',
        email: '',
        password: '',
        error: '',
        success: '',
        response: '',
        listCampus: '',
        dataSourceCampus: [],
        campus: 0,
        selectedText: '',
    };

    componentDidMount() {
        this.loadCampus();
    }

    loadCampus = async (page = 1) => {
        try {
            const response = await api.get(`campus`);
            console.log(response.data);
            

            this.setState({ listCampus:response.data });
            let i;
            for (i = 0; i < this.state.listCampus.length; i++) {
                var campus = {};
                campus.name = this.state.listCampus[i].name;
                campus.id= this.state.listCampus[i].id;
                this.state.dataSourceCampus.push(campus);
            }
        } catch (_err) {
            this.setState({ error: 'Houve um problema com a listagem de campi!' });
        }
    }

    handleNameChange = (name) => {
        this.setState({ name });
    };

    handleCpfChange = (cpf) => {
        this.setState({ cpf });
    };

    handleEmailChange = (email) => {
        this.setState({ email });
    };

    handlePasswordChange = (password) => {
        this.setState({ password });
    };

    handleCampusChange = (campus) => {
        this.setState({ campus });
    };

    handleBackToLoginPress = () => {
        this.props.navigation.goBack();
    };

    handleSignUpPress = async () => {
        if (this.state.name.length === 0 || this.state.cpf.length === 0 ||
             this.state.email.length === 0 || this.state.password.length === 0
            || this.state.campus.length === 0 || this.state.campus == 0) {
            this.setState({ error: 'Preencha todos os campos para continuar!' }, () => false);
        } else if(this.state.name.length < 8){
            this.setState({ error: 'O campo nome deve ter no mínimo 8 caracteres!' }, () => false);
        } else if(this.state.password.length < 6 || this.state.password.length > 10){
            this.setState({ error: 'O campo senha deve ter no mínimo 6 e no máximo 10 caracteres!' }, () => false);
        }else {
            try {
                this.setState({response: ''});

                await api.post('api/register', {
                    name: this.state.name,
                    cpf: this.state.cpf,
                    email: this.state.email,
                    password: this.state.password,
                    fk_campus_id: this.state.campus,
                }).then(response => {
                    this.setState({response: response.data});
                });
                console.log('Mensagem ', this.state.response);

                if(this.state.response){
                    if(this.state.response.errors){
                        if(this.state.response.errors.message){
                            this.setState({ success: '', error: this.state.response.errors.message });
                        } else if(this.state.response.errors[0].cpf){
                            this.setState({ success: '', error: this.state.response.errors[0].cpf });
                        } else if(this.state.response.errors[0].email){
                            this.setState({ success: '', error: this.state.response.errors[0].email });
                        }


                        //alert(this.state.response.errors.message);
                        //this.setState({ success: '', error: this.state.response.errors.message });
                    } else {
                        this.setState({ success: 'Conta criada com sucesso! Redirecionando para o login', error: '' });
                        setTimeout(this.goToLogin, 300);
                    }
                } else {
                    this.setState({ error: 'Houve um problema com o cadastro, verifique os dados preenchidos!' });
                }

            } catch (_err) {
                this.setState({ error: 'Houve um problema com o cadastro, verifique os dados preenchidos!' });
            }
        }
    };

    goToLogin = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'SignIn' }),
            ],
        });
        this.props.navigation.dispatch(resetAction);
    }

    _selectedValue(id, name) {
        this.setState({ selectedText: name });
        this.setState({ campus: id });
    }

    render() {

        return (
            <Container>
                <StatusBar hidden />
                <Logo source={require('../../images/ashow_logo.png')} resizeMode="contain" />
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        {this.state.success.length !== 0 && <SuccessMessage>{this.state.success}</SuccessMessage>}
                        <View style={styles.viewInput}>
                            <Label>Nome do usuário:</Label>
                            <Input
                                placeholder=""
                                value={this.state.name}
                                onChangeText={this.handleNameChange}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
                        <View style={styles.viewInput}>
                            <Label>CPF do usuário:</Label>
                            <Input
                                placeholder=""
                                value={this.state.cpf}
                                onChangeText={this.handleCpfChange}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
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
                        <View style={styles.viewInput}>
                            <Label>Campus:</Label>
                            <RNPickerDialog
                                dataSource={this.state.dataSourceCampus}
                                dummyDataSource={this.state.dataSourceCampus}
                                defaultValue={false}
                                pickerTitle={"Escolha o Campus"}
                                showSearchBar={true}
                                disablePicker={false}
                                changeAnimation={"none"}
                                searchBarPlaceHolder={"Pesquisa....."}
                                showPickerTitle={true}
                                searchBarContainerStyle={this.props.searchBarContainerStyle}
                                pickerStyle={styles.pickerStyle}
                                pickerItemTextStyle={styles.listTextViewStyle}
                                selectedLabel={this.state.selectedText}
                                placeHolderLabel=' - Selecione o Campus - '
                                selectLabelTextStyle={styles.selectLabelTextStyle}
                                placeHolderTextStyle={styles.placeHolderTextStyle}
                                dropDownImageStyle={styles.dropDownImageStyle}
                                selectedValue={(id, name) => this._selectedValue(id, name)}
                                />
                        </View>

                        {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
                        <Button onPress={this.handleSignUpPress}>
                            <ButtonText>Criar conta</ButtonText>
                        </Button>
                        <SignInLink onPress={this.handleBackToLoginPress}>
                            <SignInLinkText>Voltar ao login</SignInLinkText>
                        </SignInLink>
                    </ScrollView>
                </SafeAreaView>
            </Container>
        );
    }
}

const styles= StyleSheet.create({
    txtCampus: {
      fontSize: 16,
      fontWeight: 'bold',
      padding: 10
    },
    dropdown: {
      width: '100%',
      paddingHorizontal: 25,

    },
    viewInput: {
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',

    },
    selectLabelTextStyle: {
        color: "#000",
        textAlign: "left",
        width: "99%",
        padding: 10,
        flexDirection: "row"
    },
    placeHolderTextStyle: {
        color: "#000",
        padding: 10,
        textAlign: "left",
        width: "99%",
        flexDirection: "row"
    },
    dropDownImageStyle: {
        marginLeft: 10,
        width: 10,
        height: 10,
        alignSelf: "center"
    },
    listTextViewStyle: {
        color: "#000",
        marginVertical: 10,
        flex: 0.9,
        marginLeft: 20,
        marginHorizontal: 10,
        textAlign: "left"
    },
    pickerStyle: {
        width: '90%',
        height: 45,
        marginLeft: 18,
        elevation:3,
        paddingRight: 25,
        marginRight: 6,
        marginBottom: 2,
        shadowOpacity: 1.0,
        shadowOffset: {
            width: 1,
            height: 1
        },
        borderWidth:1,
        shadowRadius: 10,
        backgroundColor: "rgba(255,255,255,1)",
        shadowColor: "#fff",
        borderRadius: 5,
        flexDirection: "row"
    },
    container: {
        width: '100%',
        justifyContent: 'center',
    }
});
