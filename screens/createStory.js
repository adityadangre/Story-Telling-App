import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, Image, ScrollView, TextInput, Dimensions } from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize'
import DropDownPicker from 'react-native-dropdown-picker';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font'

let customFonts = {'Bubblegum-Sans' : require('../assets/fonts/BubblegumSans-Regular.ttf')}

export default class createStory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fontsLoaded: false,
            previewImage: 'image_1',
            dropdownHeight: 40
        }
    }

    componentDidMount () {
        this._loadFontsAsync();
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts)
        this.setState({fontsLoaded: true})
    }

    render() {
        if(!this.state.fontsLoaded){
            return (
                <AppLoading />
            )
        }
        else {
            let preview_Images = {
                'image_1' : require('../assets/story_image_1.png'),
                'image_2' : require('../assets/story_image_2.png'),
                'image_3' : require('../assets/story_image_3.png'),
                'image_4' : require('../assets/story_image_4.png'),
                'image_5' : require('../assets/story_image_5.png')
            }
            return (
                <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />

                <View style={styles.appTitle}>

                    <View style={styles.appIcon}>
                        <Image 
                            style={{width: 60, height: 60, resizeMode: 'contain', marginLeft: 10}}
                            source={require('../assets/logo.png')} />
                    </View>

                    <View style={styles.appTitleTextContainer}>
                        <Text style={styles.appTitleText}>New Story</Text>
                    </View>

                </View>

                <ScrollView style={styles.fieldContainer}>
                    <View style={styles.imageContainer}>
                        <View style={styles.previewContainer}>
                            <Image
                                source={preview_Images[this.state.previewImage]}
                                style={{resizeMode: 'contain', width: Dimensions.get('window').width - 40, height: 250, borderRadius: 10, marginBottom: 10}} />
                        </View>

                        <View style={styles.chooseImage}>
                            <DropDownPicker 
                                items={[
                                    {label:'Image 1', value:'image_1'},
                                    {label:'Image 2', value:'image_2'},
                                    {label:'Image 3', value:'image_3'},
                                    {label:'Image 4', value:'image_4'},
                                    {label:'Image 5', value:'image_5'},
                                ]}                                
                                defaultValue={this.state.preview_Images}
                                containerStyle={{height: 40, borderRadius: 20, marginBotton: 10}}
                                style={{backgroundColor: 'transparent'}}
                                itemStyle={{justifyContent: 'flex-start'}}
                                dropDownStyle={{backgroundColor: 'lightblue'}}
                                labelStyle={{color: 'white', fontFamily: 'Bubblegum-Sans'}}
                                arrowStyle={{color: 'white', fontFamily: 'Bubblegum-Sans'}}
                                onChangeItem={item => {
                                    this.setState({previewImage: item.value})
                                }}
                                onOpen={() => {
                                    this.setState({dropdownHeight: 170})
                                }}
                                onClose={() => {
                                    this.setState({dropdownHeight:40})
                                }}
                          />

                          <View style={styles.fieldContainer}>
                            <TextInput 
                              style={styles.inputFont} 
                              onChangeText={(title) => {this.setState({title})}}
                              placeholder={'Title'}
                              placeholderTextColor={'white'}
                            />
                          </View>

                          <View style={styles.fieldContainer}>
                            <TextInput 
                              style={[styles.inputFont, styles.inputFontExtra, styles.inputTextBig]} 
                              onChangeText={(description) => {this.setState({description})}}
                              placeholder={'Description'}
                              placeholderTextColor={'white'}
                              multiline={true}
                              numberOfLines={4}
                            />
                          </View>
                          
                          <View style={styles.fieldContainer}>
                            <TextInput 
                              style={[styles.inputFont, styles.inputFontExtra, styles.inputTextBig]} 
                              onChangeText={(story) => {this.setState({story})}}
                              placeholder={'Story'}
                              placeholderTextColor={'white'}
                              multiline={true}
                              numberOfLines={20}
                            />
                          </View>

                          <View style={styles.fieldContainer}>
                            <TextInput 
                              style={[styles.inputFont, styles.inputFontExtra, styles.inputTextBig]} 
                              onChangeText={(moral) => {this.setState({moral})}}
                              placeholder={'Moral of the Story'}
                              placeholderTextColor={'white'}
                              multiline={true}
                              numberOfLines={4}
                            />
                          </View>
                          
                        </View>
                    </View>
                </ScrollView>
                    
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#15193c"
    },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
      flex: 0.07,
      flexDirection: "row"
    },
    appIcon: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    iconImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain"
    },
    appTitleTextContainer: {
      flex: 0.7,
      justifyContent: "center"
    },
    appTitleText: {
      color: "white",
      fontSize: RFValue(28),
      fontFamily: "Bubblegum-Sans"
    },
    fieldsContainer: {
      flex: 0.85
    },
    previewImage: {
      width: "93%",
      height: RFValue(250),
      alignSelf: "center",
      borderRadius: RFValue(10),
      marginVertical: RFValue(10),
      resizeMode: "contain"
    },
    inputFont: {
      height: RFValue(40),
      borderColor: "white",
      borderWidth: RFValue(1),
      borderRadius: RFValue(10),
      paddingLeft: RFValue(10),
      color: "white",
      fontFamily: "Bubblegum-Sans"
    },
    inputFontExtra: {
      marginTop: RFValue(15)
    },
    inputTextBig: {
      textAlignVertical: "top",
      padding: RFValue(5)
    }
  });