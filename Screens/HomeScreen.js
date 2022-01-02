import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class HomeScreen extends React.Component{

    state = {
        cracked: [],
        uncracked:[],
        upcomming:[],
        indie:[],
    }

    componentDidMount(){
        fetch("https://api.crackwatch.com/api/games?page=0&is_cracked=true&sort_by=crack_date&is_aaa=true")
        .then(response => response.json())
        .then(responseJson => {

            let cracked = []
            responseJson.map(item => {
                cracked.push({
                    id: item._id,
                    image: item.image,
                })
            })
            this.setState({ cracked })
        })

        fetch("https://api.crackwatch.com/api/games?page=0&is_cracked=false&is_released=true&sort_by=release_date&is_aaa=true")
        .then(response => response.json())
        .then(responseJson => {

            let uncracked = []
            responseJson.map(item => {
                uncracked.push({
                    id: item._id,
                    image: item.image,
                })
            })
            this.setState({ uncracked })
        })

        fetch("https://api.crackwatch.com/api/games?page=0&is_released=false&sort_by=release_date&is_aaa=true")
        .then(response => response.json())
        .then(responseJson => {

            let upcomming = []
            responseJson.map(item => {
                upcomming.push({
                    id: item._id,
                    image: item.image,
                })
            })
            this.setState({ upcomming })
        })

        fetch("https://api.crackwatch.com/api/games?page=0&sort_by=release_date&is_aaa=false")
        .then(response => response.json())
        .then(responseJson => {

            let indie = []
            responseJson.map(item => {
                indie.push({
                    id: item._id,
                    image: item.image,
                })
            })
            this.setState({ indie })
        })

    }

    renderCrackedGames = (item) => {
        return(
            <TouchableOpacity onPress={ () => this.gameDetails(item) }>
                <Image source={{uri: item.image}} style={styles.subImg} />
            </TouchableOpacity>
        )
    }

    renderUncrackedGames = (item) => {
        return(
            <TouchableOpacity onPress={ () => this.gameDetails(item) }>
                <Image source={{uri: item.image}} style={styles.subImg} />
            </TouchableOpacity>
        )
    }

    renderUpcommingGames = (item) => {
        return(
            <TouchableOpacity onPress={ () => this.gameDetails(item) }>
                <Image source={{uri: item.image}} style={styles.subImg} />
            </TouchableOpacity>
        )
    }

    renderIndieGames = (item) => {
        return(
            <TouchableOpacity onPress={ () => this.gameDetails(item) }>
                <Image source={{uri: item.image}} style={styles.subImg} />
            </TouchableOpacity>
        )
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
            <ScrollView contentContainerStyle={styles.container}>
                <View>
                    <Text>CrackGame - CrackWatcher</Text>
                </View>
                <View style={styles.m24}>

                    <Text style={[styles.heading, {color:"#4DF053"}]}>CRACKED GAMES</Text>

                    <TouchableOpacity onPress={ () => this.gameDetails(item) }>
                        <Image source={{uri: this.state.cracked[0] !== undefined ? this.state.cracked[0].image : null}} style={styles.mainImg} />
                    </TouchableOpacity>

                    <View style={{ height:120, flexDirection:"row", justifyContent:"center", alignItems:"center", marginTop:16}}>
                        <FlatList 
                            horizontal={true}
                            data={this.state.cracked.slice(1,5)}
                            maxToRenderPerBatch={4}
                            keyExtractor={item => item.id}
                            renderItem={({item, index}) => this.renderCrackedGames(item, index)}
                        />
                    </View>

                </View>
                <View style={styles.m24}>

                    <Text style={[styles.heading, {color:"#ED1C24"}]}>UNCRACKED GAMES</Text>

                    <View style={{ height:120, flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                        <FlatList 
                            horizontal={true}
                            data={this.state.uncracked.slice(1,5)}
                            maxToRenderPerBatch={4}
                            keyExtractor={item => item.id}
                            renderItem={({item, index}) => this.renderUncrackedGames(item, index)}
                        />
                    </View>
                </View>
                <View style={styles.m24}>

                    <Text style={[styles.heading, {color:"#9B0EFE"}]}>UPCOMMING GAMES</Text>

                    <View style={{ height:120, flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                        <FlatList 
                            horizontal={true}
                            data={this.state.upcomming.slice(1,5)}
                            maxToRenderPerBatch={4}
                            keyExtractor={item => item.id}
                            renderItem={({item, index}) => this.renderUpcommingGames(item, index)}
                        />
                    </View>
                </View>
                <View style={[styles.m24, {paddingBottom:24}]}>

                    <Text style={[styles.heading, {color:"#315afd"}]}>INDIE GAMES</Text>

                    <View style={{ height:120, flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                        <FlatList 
                            horizontal={true}
                            data={this.state.indie.slice(1,5)}
                            maxToRenderPerBatch={4}
                            keyExtractor={item => item.id}
                            renderItem={({item, index}) => this.renderIndieGames(item, index)}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#27282E"
    },
    heading:{
        fontFamily:"Futura",
        fontSize:18,
        paddingLeft:16,
        marginVertical:16
    },
    m24:{
        marginTop:24,
    },
    mainImg: {
        width:360,
        height:240,
        borderRadius:10,
        marginHorizontal:16
    },
    subImg: {
        width:240,
        height:120,
        borderRadius:8,
        marginLeft:16
    }
})