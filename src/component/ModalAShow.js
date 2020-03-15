import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableHighlight,
    Modal,
    Image,
    ScrollView, SafeAreaView, StyleSheet,
} from 'react-native';

export default class ModalAShow extends Component {

    constructor(props){
        super(props);
    }

    render(){

       return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.modalVisible}
                onRequestClose={() => this.closeModal()}>
                <SafeAreaView>
                    <ScrollView>
                        <View style={{marginTop: 40, marginHorizontal: 15}}>
                            <View style={{marginTop: 30}}>
                                <Text style={styles.ashowTitle}>Decrição:</Text>
                                <Text style={styles.ashowDescription}>{this.props.ashow.description}</Text>

                                <Text style={styles.ashowTitle}>Campus:</Text>
                                <Text style={styles.ashowDescription}>{this.props.campusName}</Text>

                                <Text style={styles.ashowTitle}>Grupo:</Text>
                                <Text style={styles.ashowDescription}>{this.props.groupName}</Text>

                                <Text style={styles.ashowTitle}>Lugar:</Text>
                                <Text style={styles.ashowDescription}>{this.props.placeName}</Text>

                                <Text style={styles.ashowTitle}>Objeto:</Text>
                                <Text style={styles.ashowDescription}>{this.props.objectName}</Text>

                                <Text style={styles.ashowTitle}>Data da Criação:</Text>
                                <Text style={styles.ashowDescription}>{this.props.ashow.created_at}</Text>
                                { this.props.ashow.photo
                                    &&
                                    <View>
                                        <Text style={styles.ashowTitle}>Foto:</Text>
                                        <Image
                                            style={{width: '100%', height: 300}}
                                            source={{uri: 'https://ashowmoura.ifce.edu.br/storage/' + this.props.ashow.photo}}/>
                                    </View>
                                }

                                <View style={styles.viewButtonsModal}>
                                    { this.props.ashow.situation === 0
                                        &&
                                        <TouchableHighlight
                                            style={styles.buttonModal}
                                            onPress={() => {
                                                this.props.onFiled(this.props.ashow)
                                            }}>
                                            <Text style={styles.ashowButtonText}>Arquivar</Text>
                                        </TouchableHighlight>
                                    }

                                    <TouchableHighlight
                                        style={styles.buttonModal}
                                        onPress={() => {
                                            this.props.onClose(false)
                                        }}>
                                        <Text style={styles.ashowButtonText}>Fechar</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Modal>

        );
    }
}

const styles = StyleSheet.create({
    ashowTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333"
    },
    ashowDescription: {
        fontSize: 15,
        color: "#999",
        marginTop: 5,
        lineHeight: 24,
        fontWeight: 'bold',
        textAlign: 'justify'
    },
    viewButtonsModal: {
        flex: 1,
        flexDirection: 'column',

    },
    labelModal: {
        margin: 10,
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        fontSize: 16,
        fontWeight: 'bold'
    },
    buttonModal: {
        height: 40,
        width: '100%',
        marginHorizontal: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#DA552F",
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    ashowButtonText: {
        fontSize: 16,
        color: "#DA552F",
        fontWeight: "bold"
    },
});
