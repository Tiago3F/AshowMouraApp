import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableHighlight,
    Modal,
    Image,
    ScrollView, SafeAreaView, StyleSheet, TouchableOpacity,
} from 'react-native';

export default class BoxAShow extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View>
                <View style={styles.containerSituation}>
                    {this.props.ashow.situation === 0 ?
                        <Text style={styles.ashowSituationOpen}>Aberta</Text> : <Text></Text>}
                    {this.props.ashow.situation === 1 ?
                        <Text style={styles.ashowSituationClose}>Finalizada</Text> : <Text></Text>}
                    {this.props.ashow.situation === 2 ?
                        <Text style={styles.ashowSituationFiled}>Arquivada</Text> : <Text></Text>}
                </View>

                <Text style={styles.ashowTitle}>{this.props.groupName}</Text>
                <Text style={styles.ashowDescriptionSmall}>Descrição: {this.props.ashow.description}</Text>
                <Text style={styles.ashowDescription}>{this.props.placeName} - {this.props.objectName}</Text>
                <Text style={styles.ashowDescription}>Campus {this.props.campusName}</Text>
                <Text style={styles.ashowDescriptionSmall}>Criado em {this.props.ashow.created_at}</Text>
                <View style={{  flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end'}}>

                    <TouchableOpacity
                        style={styles.ashowButton}
                        onPress={() => {
                            this.props.toView(true, this.props.ashow);
                        }}>
                        <Text style={styles.ashowButtonText}>Visualizar</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    containerSituation: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 20,
        borderRadius:50
    },
    ashowSituationOpen: {
        fontSize: 9,
        alignSelf: 'flex-start',
        backgroundColor: '#228B22',
        color: '#FFF',
        padding: 3,
        fontWeight: "bold"
    },
    ashowSituationClose: {
        fontSize: 9,
        alignSelf: 'flex-start',
        backgroundColor: '#8B0000',
        color: '#FFF',
        padding: 3,
        fontWeight: "bold"
    },
    ashowSituationFiled: {
        fontSize: 9,
        alignSelf: 'flex-start',
        backgroundColor: '#4F4F4F',
        color: '#FFF',
        padding: 3,
        fontWeight: "bold"
    },
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
    ashowDescriptionSmall: {
        fontSize: 12,
        color: "#999",
        marginTop: 5,
        lineHeight: 24,
        textAlign: 'justify'
    },
    ashowButton: {
        height: 40,
        width: 120,
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
