import React, { Component } from 'react';

import {
    StatusBar,
    StyleSheet,
    View,
    ScrollView,
    SafeAreaView,
    Modal,
    Image,
    TouchableOpacity,
    Text
} from 'react-native';

import api from '../../services/api';
import { StackActions, NavigationActions } from 'react-navigation';
import RNPickerDialog from "../../component/RNModalPicker";

import { RNCamera } from 'react-native-camera';

import {
    Container,
    Label,
    Input,
    Button,
    ButtonText,
    ErrorMessage,
    SuccessMessage,
    ModalContainer,
    TakePictureButtonContainer,
    TakePictureButtonLabel,
    ModalButtons,
    CameraButtonContainer,
    CancelButtonText,
    ContinueButtonText,
    ModalImagesListContainer,
    ModalImagesList,
    ModalImageItem
} from './styles';

export default class CreateAShow extends Component {

    static navigationOptions = {
        title: "Nova AShow",
        headerStyle: {
            backgroundColor: "#008000"
        },
        headerTintColor: "#FFF"
    };

    state = {
        dataSourcePlaces: [],
        selectedTextPlaces: '',
        place: 0,
        dataSourceGroup: [],
        groupOccurrence: 0,
        selectedTextGroup: '',
        dataSourceObject: [],
        object: 0,
        selectedTextObject: '',
        error: '',
        success: '',
        dataSourceCampus: [],
        campus: 0,
        selectedTextCampus: '',
        description: '',
        response: '',
        realtyData: {
            location: {
                latitude: null,
                longitude: null,
            },
            name: '',
            price: '',
            address: '',
            images: [],
        },
        cameraModalOpened: false,
        photo: '',
        saudacao: ''
    };

    componentDidMount() {
        this.loadCampus();
        this.loadGroups();
        this.saudacao();
    }

    loadCampus = async () => {
        try {
            const response = await api.get(`/campus`);

            const listCampus = response.data ;
            let i;
            for (i = 0; i < listCampus.length; i++) {
                var campus = {};
                campus.name = listCampus[i].name;
                campus.id  = listCampus[i].id;
                this.state.dataSourceCampus.push(campus);
            }
        } catch (_err) {
            this.setState({ error: 'Houve um problema com a listagem de campi!' });
        }
    }

    loadGroups = async () => {
        try {
            /*const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXNob3dtb3VyYS5pZmNlLmVkdS5iclwvYXBpXC9sb2dpbiIsImlhdCI6MTU3MzQ3NzMzNywiZXhwIjoxNTczNTg1MzM3LCJuYmYiOjE1NzM0NzczMzcsImp0aSI6IklOOVN2UlhGSGxtMGtlOGIiLCJzdWIiOjEsInBydiI6ImVmOGJkMjU0MTk5YTRkZjgxMWJlNmM4ZGQ4M2U1MTViMWJlYzYzZGMiLCJyb2xlIjoiIiwibmFtZSI6IiJ9.qgtP0Bb12xMOytcQusfIcXNqDLX2vA1zP_g6Jq9pVpk";
            var config = {
                headers: {'Authorization': "bearer " + token}
            };*/

            const response = await api.get('/groupoccurrences');

            const listGroups = response.data;

            let i;
            for (i = 0; i < listGroups.length; i++) {
                var group = {};
                group.name = listGroups[i].name;
                group.id  = listGroups[i].id;
                this.state.dataSourceGroup.push(group);
            }
        } catch (_err) {
            this.setState({ error: 'Houve um problema com a listagem de grupos!' });
        }
    }

    loadPlaces = async (campus) => {
        try {
            const response = await api.get(`/places/${campus}`);

            const listPlaces = response.data;

            if(listPlaces.length == 0){
                this.state.dataSourcePlaces = [];
                this.state.selectedTextPlaces = '';
                this.state.place = 0;

                this.state.dataSourceObject = [];
                this.state.selectedTextObject = '';
                this.state.object = 0;

                return ;
            }

            let i;
            for (i = 0; i < listPlaces.length; i++) {
                var place = {};
                place.name = listPlaces[i].name;
                place.id  = listPlaces[i].id;
                this.state.dataSourcePlaces.push(place);
            }
        } catch (_err) {
            this.setState({ error: 'Houve um problema com a listagem de lugares!' });
        }

    }

    loadObjects = async (place) => {
        try {
            const response = await api.get(`/objects/${place}`);

            const listObjects = response.data;

            if(listObjects.length == 0){
                this.state.dataSourceObject = [];
                this.state.selectedTextObject= '';
                this.state.object = 0;

                return ;
            }

            let i;
            for (i = 0; i < listObjects.length; i++) {
                var object = {};
                object.name = listObjects[i].name;
                object.id  = listObjects[i].id;
                this.state.dataSourceObject.push(object);
            }
        } catch (_err) {
            this.setState({ error: 'Houve um problema com a listagem de grupos!' });
        }
    }

    handleDescriptionChange = (description) => {
        this.setState({ description });
    };

    _selectedValueCampus(index, item) {
        this.setState({ selectedTextCampus: item });
        this.setState({ campus: index });

        this.loadPlaces(index);
    }

    _selectedValueGroup(index, item) {
        this.setState({ selectedTextGroup: item });
        this.setState({ groupOccurrence: index });
    }

    _selectedValuePlace(index, item) {
        this.setState({ selectedTextPlaces: item });
        this.setState({ place: index });

        this.loadObjects(index);
    }

    _selectedValueObject(index, item) {
        this.setState({ selectedTextObject: item });
        this.setState({ object: index });
    }

    goToMain = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'drawerStack' }),
            ],
        });
        this.props.navigation.dispatch(resetAction);
    }

    handleCreateAShow = async () => {
        try {
            console.log(this.state.description);
            if (this.state.description.length === 0 || this.state.campus === 0 ||
                this.state.groupOccurrence === 0 || this.state.place === 0
                || this.state.object === 0) {

                this.setState({ error: 'Preencha todos os campos para continuar!' }, () => false);
                return ;
            } else if(this.state.description.length < 10){

                this.setState({ error: 'O campo descrição deve ter no mínimo 10 caracteres!' }, () => false);
                return ;
            }

            const data = new FormData();
            data.append('description', this.state.description);
            data.append('fk_group_occurrence_id', this.state.groupOccurrence);
            data.append('fk_campus_id', this.state.campus);
            data.append('fk_objects_id', this.state.object);
            console.log('name ',this.state.photo.uri);
            if(this.state.photo.uri) {
                data.append('photo', {
                    uri: Platform.OS === "android" ? this.state.photo.uri : this.state.photo.uri.replace("file://", ""),
                    type: 'image/jpg', // or photo.type
                    name: this.state.photo.uri

                });
            }
            console.log(data);

            const response = await api.post('/occurrences',
                data).catch(
                () => this.setState({error: 'Houve um problema com o cadastro da AShow!'})
            ).catch(
                function (err) {
                    // Run into big problems when I get an error
                    console.log("ERROR: ", err);
                }
            );
            console.log(response.status);

            if(response.data.id){
                this.setState({ success: 'AShow criada com sucesso!', error: '' });
                setTimeout(this.goToMain, 300);
            }

        } catch (_err) {

            this.setState({ error: 'Houve um problema com o cadastro da AShow!' });
        }

    };

     saudacao() {
         var data = new Date();
         var hora = data.getHours();
         console.log('hora ', hora);

         if(hora >= 0 && hora < 12){
            this.setState({ saudacao: "Bom dia"});
         }
         if(hora => 12 && hora < 18){
             this.setState({ saudacao: "Boa Tarde"});
         }
         if(hora => 18 && hora <= 24){
             this.setState({ saudacao: "Boa Noite"});
         }
     }

    //funções da câmera
    renderCameraModal = () => (
        <Modal
            visible={this.state.cameraModalOpened}
            transparent={false}
            animationType="slide"
            onRequestClose={this.handleCameraModalClose}>
            <ModalContainer>
                <ModalContainer>
                    <RNCamera
                        ref={camera => {
                            this.camera = camera;
                        }}
                        style={{ flex: 1 }}
                        type={RNCamera.Constants.Type.back}
                        autoFocus={RNCamera.Constants.AutoFocus.on}
                        flashMode={RNCamera.Constants.FlashMode.off}
                        androidCameraPermissionOptions={{
                            title: 'Permissão para usar a câmera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }
                        }/>
                    <TakePictureButtonContainer onPress={this.handleTakePicture.bind(this)}>
                        <TakePictureButtonLabel />
                    </TakePictureButtonContainer>
                </ModalContainer>
                { this.renderImagesList() }
                <ModalButtons>
                    <CameraButtonContainer onPress={this.handleCameraModalClose}>
                        <CancelButtonText>Cancelar</CancelButtonText>
                    </CameraButtonContainer>
                </ModalButtons>
            </ModalContainer>
        </Modal>
    );

    handleTakePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.2, base64: true, forceUpOrientation: true, fixOrientation: true};
            const data = await this.camera.takePictureAsync(options);
            this.setState({ photo: data });

            this.handleCameraModalClose();
        }
    }

    renderImagesList = () => (
        this.state.realtyData.images.length !== 0 ? (
            <ModalImagesListContainer>
                <ModalImagesList horizontal>
                    { this.state.realtyData.images.map(image => (
                        <ModalImageItem source={{ uri: image.uri }} resizeMode="stretch" />
                    ))}
                </ModalImagesList>
            </ModalImagesListContainer>
        ) : null
    );

    handleCameraModalClose = () => this.setState({ cameraModalOpened: !this.state.cameraModalOpened })

    handleDataModalClose = () => this.setState({
        dataModalOpened: !this.state.dataModalOpened,
        cameraModalOpened: false,
    });

    openModal = () => this.setState({ cameraModalOpened: true });

    render() {

        return (

            <Container>
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <StatusBar barStyle="light-content" />
                        {this.state.success.length !== 0 && <SuccessMessage>{this.state.success}</SuccessMessage>}
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                            <Text style={styles.textInitial}>{ this.state.saudacao }, o que você </Text>
                            <Text style={styles.textInitialRed}>AShow</Text>
                            <Text style={styles.textInitial}> hoje?</Text>
                        </View>
                        <View style={styles.viewInput}>
                            <Label>Descrição: </Label>
                            <Input
                                multiline
                                numberOfLines={4}
                                onChangeText={this.handleDescriptionChange}/>
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
                                selectedLabel={this.state.selectedTextCampus}
                                placeHolderLabel=' - Selecione o Campus - '
                                selectLabelTextStyle={styles.selectLabelTextStyle}
                                placeHolderTextStyle={styles.placeHolderTextStyle}
                                dropDownImageStyle={styles.dropDownImageStyle}
                                selectedValue={(index, item) => this._selectedValueCampus(index, item)}
                                />
                        </View>
                        <View style={styles.viewInput}>
                            <Label>Grupo de Ocorrência:</Label>
                            <RNPickerDialog
                                dataSource={this.state.dataSourceGroup}
                                dummyDataSource={this.state.dataSourceGroup}
                                defaultValue={false}
                                pickerTitle={"Escolha o Grupo"}
                                showSearchBar={true}
                                disablePicker={false}
                                changeAnimation={"none"}
                                searchBarPlaceHolder={"Pesquisa....."}
                                showPickerTitle={true}
                                searchBarContainerStyle={this.props.searchBarContainerStyle}
                                pickerStyle={styles.pickerStyle}
                                pickerItemTextStyle={styles.listTextViewStyle}
                                selectedLabel={this.state.selectedTextGroup}
                                placeHolderLabel=' - Selecione o Grupo - '
                                selectLabelTextStyle={styles.selectLabelTextStyle}
                                placeHolderTextStyle={styles.placeHolderTextStyle}
                                dropDownImageStyle={styles.dropDownImageStyle}
                                selectedValue={(index, item) => this._selectedValueGroup(index, item)}
                                />
                        </View>
                        <View style={styles.viewInput}>
                            <Label>Lugar:</Label>
                            <RNPickerDialog
                                dataSource={this.state.dataSourcePlaces}
                                dummyDataSource={this.state.dataSourcePlaces}
                                defaultValue={false}
                                pickerTitle={"Escolha o Lugar"}
                                showSearchBar={true}
                                disablePicker={false}
                                changeAnimation={"none"}
                                searchBarPlaceHolder={"Pesquisa....."}
                                showPickerTitle={true}
                                searchBarContainerStyle={this.props.searchBarContainerStyle}
                                pickerStyle={styles.pickerStyle}
                                pickerItemTextStyle={styles.listTextViewStyle}
                                selectedLabel={this.state.selectedTextPlaces}
                                placeHolderLabel=' - Selecione o Lugar - '
                                selectLabelTextStyle={styles.selectLabelTextStyle}
                                placeHolderTextStyle={styles.placeHolderTextStyle}
                                dropDownImageStyle={styles.dropDownImageStyle}
                                selectedValue={(index, item) => this._selectedValuePlace(index, item)}
                                />
                        </View>
                        <View style={styles.viewInput}>
                            <Label>Objeto:</Label>
                            <RNPickerDialog
                                dataSource={this.state.dataSourceObject}
                                dummyDataSource={this.state.dataSourceObject}
                                defaultValue={false}
                                pickerTitle={"Escolha o Objeto"}
                                showSearchBar={true}
                                disablePicker={false}
                                changeAnimation={"none"}
                                searchBarPlaceHolder={"Pesquisa....."}
                                showPickerTitle={true}
                                searchBarContainerStyle={this.props.searchBarContainerStyle}
                                pickerStyle={styles.pickerStyle}
                                pickerItemTextStyle={styles.listTextViewStyle}
                                selectedLabel={this.state.selectedTextObject}
                                placeHolderLabel=' - Selecione o Objeto - '
                                selectLabelTextStyle={styles.selectLabelTextStyle}
                                placeHolderTextStyle={styles.placeHolderTextStyle}
                                dropDownImageStyle={styles.dropDownImageStyle}
                                selectedValue={(index, item) => this._selectedValueObject(index, item)}
                                />
                        </View>
                        {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => { this.openModal() }}>
                                { this.state.photo.uri
                                    ?
                                    <View>
                                    <Label>Imagem: </Label>
                                    <Image
                                        style={{width: 200, height: 200, marginLeft: 20}}
                                        source={{ uri: this.state.photo.uri }}/>
                                    </View>
                                        :
                                    <Image source={require('../../images/camera.png')}
                                           style={{height: 70, width: 70, alignSelf: 'flex-start',
                                               marginVertical: 20, marginLeft: 20}}/>
                                }

                            </TouchableOpacity>


                        </View>

                        <Button onPress={ this.handleCreateAShow }>
                            <ButtonText>Criar AShow</ButtonText>
                        </Button>
                    </ScrollView>
                </SafeAreaView>
                { this.renderCameraModal() }
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
    },
    textInitial: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '900',
        marginBottom: 20,
    },
    textInitialRed: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '900',
        marginBottom: 20,
        color: '#A81E19'
    }

});
