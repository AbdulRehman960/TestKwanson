import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import { useTheme } from "@react-navigation/native";
import '../I18n';
import { useTranslation } from 'react-i18next';
const ButtonComponet = ({text,onPress}) => {
    const { t, i18n } = useTranslation();
    const { colors } = useTheme();
  return (
    <TouchableOpacity style={[styles.button,{marginTop:20,backgroundColor:colors.secondary}]} onPress={()=>{onPress()}}>
             <Text>{text}</Text>
    </TouchableOpacity>
  )
}

export default ButtonComponet

const styles = StyleSheet.create({
    button:{
        alignSelf:'center',marginTop:60,
        marginHorizontal:18,alignItems:'center',height:46,justifyContent:'center',borderRadius:18,width:140
      }
})