import React from 'react'
import { View, Text, StyleSheet, Image, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
import moment from "moment";

export default class Upcomming extends React.Component{

    state = {
        upcomming: [],
    }

    componentDidMount(){
        fetch("https://api.crackwatch.com/api/games?page=0&is_cracked=false&sort_by=release_date&is_released=false")
        .then(response => response.json())
        .then(responseJson => {

            let upcomming = []
            responseJson.map(item => {
                upcomming.push({
                    id: item._id,
                    image: item.image,
                    title: item.title,
                    diffInDays: moment(item.crackDate).diff(moment(item.releaseDate), 'days')
                })
            })
            this.setState({ upcomming })
        })
    }

    gameDetails = (item) => {

        const name = item.title;
        const status = item.diffInDays < 0 ? "UNRELEASED" : item.diffInDays >=0 && item.crackDate ? "CRACKED" : "UNCRACKED";
        const days = item.diffInDays;
        const releaseDate = moment(item.releaseDate).format("MMM Do YYYY");
        const crackDate = item.crackDate === undefined ? "TBD" : item.crackDate;
        const protection = item.protections && item.protections[0];
        const sceneGroup = item.groups && item.groups[0];
        const image = item.image;
        const price = item.steamPrice;
        const followersCount = item.followersCount;
        const commentsCount = item.commentsCount;
        const url = item.url;

        console.log(item)

        this.props.navigation.navigate("Details", {name, status, days, releaseDate, crackDate, protection, sceneGroup, image, price, followersCount, commentsCount, url });
    }

    render(){
        
        return(
            <View style={styles.container}>
                <Text style={styles.heading}>UPCOMMING GAMES</Text>
                <TextInput placeholder="Search Games..." style={styles.txtIpt} />
                <Feather name="search" size={24} color="#000" style={{position:"absolute", top:100, right:40}} />

                <ScrollView contentContainerStyle={{ flexDirection:"row", justifyContent:"space-evenly", alignItems:"center", flexWrap:"wrap"}}>
                    {this.state.upcomming.map(item => (
                        <TouchableOpacity style={{marginHorizontal:6, marginTop:32}} key={item.id} onPress={ () => this.gameDetails(item) }>
                            <Image source={{uri: item.image}} style={styles.subImg} />
                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>{item.title}</Text>
                            <Text style={styles.title}>UNRELEASED D-{item.diffInDays}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#27282E"
    },
    heading:{
        fontFamily:"Futura",
        fontSize:18,
        paddingLeft:16,
        alignSelf:"center",
        color:"#9B0EFE",
        marginTop:48
    },
    subImg: {
        width:180,
        height:120,
        borderRadius:10,
        paddingHorizontal:16
    },
    name: {
        fontFamily:"Montserrat_SemiBold",
        fontSize:14,
        paddingLeft:6,
        paddingTop:6,
        width:150,
        color:"#fff"
    },
    title: {
        fontFamily:"Montserrat_Medium",
        fontSize:12,
        paddingLeft:6,
        color:"#9B0EFE"
    },
    txtIpt:{
        backgroundColor:"#fff",
        opacity:.8,
        borderRadius:30,
        alignSelf:"stretch",
        marginHorizontal:16,
        paddingLeft:16,
        fontFamily:"Montserrat_Medium",
        fontSize:16,
        color:"#000",
        height:50,
        marginVertical:16
    }
})