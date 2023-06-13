import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Header = ({text,isback=false,navigation}) => {
  return (
    <SafeAreaView>
      {isback&&<TouchableOpacity onPress={()=>{navigation.goBack()}}>
        <Image source={require('../assets/images/back.png')} style={{height:16,width:16,marginLeft:16,marginTop:16}}/>
        </TouchableOpacity>}
      <Text style={{color:'#E2DFD2',fontSize:24}}>{text}</Text>
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({})