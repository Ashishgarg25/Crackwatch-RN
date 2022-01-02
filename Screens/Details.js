import React from 'react'
import { View, Text, Image, StyleSheet, Linking,TouchableOpacity } from 'react-native'

export default class Details extends React.Component{

    linkToWebsite = async(url) => {
        const supported = await Linking.canOpenURL(url);
        if(supported){
            await Linking.openURL(url);
        }else{
            console.log("Error: Incorrect URL"+ url)
        }
    }

    render(){

        const {name, status, days, releaseDate, crackDate, protection, sceneGroup, image, price, followersCount, commentsCount, url } = this.props.route.params;
        
        const statusTitle = status === "CRACKED" ? "AFTER "+Math.abs(days)+" DAYS" : status === "UNCRACKED" ? Math.abs(days)+" DAYS AND COUNTING" : "RELEASING IN "+Math.abs(days)+" DAYS"; 

        

        return(
            <View style={styles.container}>
                <Image source={{uri: image}} style={styles.mainImg} />
                <View style={{marginBottom:32}}>
                    <Text style={styles.name}>{name}</Text>
                    <View>
                        <Text style={[styles.status, { color: status === "CRACKED" ? "#4DF053" : status === "UNCRACKED" ? "#ED1C24" : "#9B0EFE" }]}>{status}</Text>
                        <Text style={[styles.label, { textAlign:"center", paddingTop:0, color: status === "CRACKED" ? "#4DF053" : status === "UNCRACKED" ? "#ED1C24" : "#9B0EFE" }]}>{statusTitle}</Text>
                    </View>

                    <View>

                        <View style={styles.card}>
                            <View>
                                <Text style={styles.label}>RELEASE DATE</Text>
                                <Text style={styles.title}>{releaseDate}</Text>
                            </View>
                            <View>
                                <Text style={styles.label}>CRACK DATE</Text>
                                <Text style={styles.title}>{crackDate}</Text>
                            </View>
                        </View>

                        <View style={styles.card}>
                            <View>
                                <Text style={styles.label}>DRM PROTECTION</Text>
                                <Text style={styles.title}>{protection}</Text>
                            </View>
                            <View>
                                <Text style={styles.label}>SCENE GROUP</Text>
                                <Text style={styles.title}>{sceneGroup !== undefined ? sceneGroup : "TBD"}</Text>
                            </View>
                        </View>

                        <View style={{alignSelf:"center", marginVertical:6}}>
                            <Text style={styles.label}>STEAM PRICE</Text>
                            <Text style={[styles.price, { color: status === "CRACKED" ? "#4DF053" : status === "UNCRACKED" ? "#ED1C24" : "#9B0EFE" }]}>$ {price !== undefined ? price : "TBD"}</Text>
                        </View>

                        <View style={styles.card}>
                            <View>
                                <Text style={styles.label}>COMMENTS</Text>
                                <Text style={styles.title}>{commentsCount}</Text>
                            </View>
                            <View>
                                <Text style={styles.label}>FOLLOWINGS</Text>
                                <Text style={styles.title}>{followersCount}</Text>
                            </View>
                        </View>

                    </View>

                </View>

                <TouchableOpacity style={[styles.btn, { backgroundColor: status === "CRACKED" ? "#4DF053" : status === "UNCRACKED" ? "#ED1C24" : "#9B0EFE" }]} onPress={() => this.linkToWebsite(url)}>
                    <Text style={styles.btnText}>MORE ON CRACKWATCH</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"flex-start",
        backgroundColor:"#27282E"
    },
    mainImg: {
        alignSelf:"stretch",
        height:240,
    },
    name: {
        fontFamily:"Montserrat_SemiBold",
        fontSize:18,
        paddingLeft:16,
        paddingTop:16,
        color:"#fff"
    },
    status: {
        fontFamily:"Futura",
        fontSize:48,
        alignSelf:"center",
        paddingTop:16
    },
    label: {
        fontFamily:"Montserrat_Regular",
        fontSize:16,
        paddingLeft:16,
        paddingTop:20,
        color:"#aaaaaa",
        
    },
    title: {
        fontFamily:"Montserrat_Medium",
        fontSize:16,
        paddingLeft:16,
        color:"#fff",
        textAlign:"center"
    },
    price:{
        fontFamily:"Montserrat_SemiBold",
        fontSize:32,
        paddingLeft:16,
        textAlign:"center"
    },
    card:{
        flexDirection:"row", 
        justifyContent:"space-around",
        marginRight:16
    },
    btn:{
        margin:16,
        paddingVertical:16,
        paddingHorizontal:32,
        elevation:6,
        opacity:0.6,
        borderRadius:30,
        marginTop:32,
        marginHorizontal:32
    },
    btnText:{
        fontFamily:"Montserrat_SemiBold",
        fontSize:16,
        textAlign:"center",
        color:"#fff"
    }
})