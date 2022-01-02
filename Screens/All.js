import React from 'react'
import { View, Text, StyleSheet, Image, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
import moment from "moment";

export default class All extends React.Component{

    state = {
        all: [],
        pageNo:0,
        scrollPos: 1600,
    }

    componentDidMount(){
        this.getAllGames(this.state.pageNo);
    }

    getAllGames = (pageNo) => {
        fetch("https://api.crackwatch.com/api/games?page="+pageNo+"&sort_by=release_date")
        .then(response => response.json())
        .then(responseJson => {

            let all = []
            responseJson.map(item => {
                all.push({
                    id: item._id,
                    image: item.image,
                    title: item.title,
                    diffInDays: moment(item.crackDate).diff(moment(item.releaseDate), 'days'),
                    crackDate: item.crackDate,
                    releaseDate: item.releaseDate,
                    commentsCount: item.commentsCount,
                    followersCount: item.followersCount,
                    url: item.url,
                    protections: item.protections,
                    groups: item.groups
                })
            })
            this.setState({ all })
        })
    }

    _onScroll = (e) => {
        var contentOffset = e.nativeEvent.contentOffset.y;

        if(contentOffset > this.state.scrollPos){
            const pageNo = this.state.pageNo + 1;
            this.getAllGames(pageNo);
            this.setState({ pageNo: pageNo + 1, scrollPos: this.state.scrollPos + 1600 })
        }
    }

    searchGames = (text) => {
        const searchText = text.toLowerCase();
        let games = this.state.all;

        if( searchText !== "" && searchText.length > 1){
            this.setState({
                all: games.filter(item => item.title && item.title.toLowerCase().match(searchText)),
            })
        }else{
            this.getAllGames(this.state.pageNo)
        }
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
                <Text style={styles.heading}>ALL GAMES</Text>
                <TextInput placeholder="Search Games..." style={styles.txtIpt} onChangeText={(text) => this.searchGames(text)} />
                <Feather name="search" size={24} color="#000" style={{position:"absolute", top:100, right:40}} />

                <ScrollView onScroll={this._onScroll} contentContainerStyle={{ flexDirection:"row", justifyContent:"space-evenly", alignItems:"center", flexWrap:"wrap"}}>
                    {this.state.all.map((item, index) => (
                        <TouchableOpacity key={item.id} style={{marginHorizontal:6, marginTop:32}} onPress={ () => this.gameDetails(item) }>
                            <Image source={{uri: item.image}} style={styles.subImg} />
                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>{item.title}</Text>
                            <Text style={[styles.title, { display : item.diffInDays < 0 ? "flex" : "none", color:"#9B0EFE" }]}>UNRELEASED D{item.diffInDays}</Text>
                            <Text style={[styles.title, { display : item.diffInDays >= 0 ? "flex" : "none", color: item.diffInDays >=0 && item.crackDate ? "#4DF053" : "#ED1C24" }]}>{ item.diffInDays >=0 && item.crackDate ? "CRACKED" : "UNCRACKED" } D+{item.diffInDays}</Text>
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
        color:"#fff",
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
        color:"#aaaaaa"
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