import React, { Component } from 'react';

import { StatusBar,
        StyleSheet,
        View,
        FlatList,
        TouchableHighlight,
        TouchableOpacity,
        Text,
        Modal } from 'react-native';

import api from '../../services/api';

import {
    Container,
} from './styles';
import ModalAShow from '../../component/ModalAShow';
import BoxAShow from '../../component/BoxAShow';

export default class AShowsFiled extends Component {

    static navigationOptions = {
        title: "AShows Arquivadas",
        headerStyle: {
            backgroundColor: "#4F4F4F"
        },
        headerTintColor: "#FFF",

    };

    state = {
        ashows: [],
        modalVisible: false,
        ashowSelected: {},
        campusSelected: [],
        placeSelected: {},
        groupSelected: {},
        objectsSelected: {},
        page: 1,
        last_page: 1
    };

    componentDidMount() {
        this.loadAShows();
    }

    loadAShows = async (page = 1) => {
        try {
            const response = await api.get(`/occurrences/searchUserFiled?page=${page}`)
                .catch(function (error) {
                    console.log('error ', erro);
                });

            this.setState({
                ashows: [...this.state.ashows, ...response.data.data],
                last_page: response.data.last_page,
                page
            });

        } catch (_err) {
            console.log(_err);
            this.setState({ ashows: [] });
            //alert('Houve um problema ao carregar as AShows!');
        }
    }

    setModalVisible(visible, ashow) {
        this.setState({modalVisible: visible});
        if(ashow){
            var obj = ashow.objects;
            this.setState({
                ashowSelected: ashow,
                campusSelected:  ashow.campus,
                objectsSelected:  ashow.objects,
                placeSelected: obj.places,
                groupSelected: ashow.group_occurrences,
            });
        }
    }

    renderItem = ({ item }) => (
        <View style={styles.ashowContainer}>
            <BoxAShow
                campusName={item.campus.namee}
                groupName={item.group_occurrences.name}
                placeName={item.objects.places.name}
                objectName={item.objects.name}
                ashow={item}
                toView={this.setModalVisible.bind(this)}/>

            <ModalAShow
                campusName={this.state.campusSelected.name}
                groupName={this.state.groupSelected.name}
                placeName={this.state.placeSelected.name}
                objectName={this.state.objectsSelected.name}

                modalVisible={this.state.modalVisible}
                ashow={this.state.ashowSelected}
                onClose={this.setModalVisible.bind(this)}/>
        </View>
    );

    loadMore = () => {
        const {page, last_page } = this.state;

        if (page === last_page ) return ;

        const pageNumber = page + 1;

        this.loadAShows(pageNumber);

    }

    render() {

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.ashows}
                    keyExtractor={(item, index) => item.id.toString() }
                    renderItem={this.renderItem}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.1}
                    />
            </View>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa"
    },
    list: {
        padding: 20
    },
    ashowContainer: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },
    ashowContainerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
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
        fontWeight: 'bold'
    },
    ashowDescriptionSmall: {
        fontSize: 12,
        color: "#999",
        marginTop: 5,
        lineHeight: 24
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
    //MODAL
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
    }


});
