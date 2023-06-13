import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'

const AddButton = (props:any) => {
  return (

    <TouchableOpacity  style={styles.touchableOpacityStyling} onPress={props.onPress}>
    <Text style={{color:'#E2DFD2'}}>+</Text>
    </TouchableOpacity>
  )
}

export default AddButton

const styles = StyleSheet.create({

  touchableOpacityStyling:{
      width:45,
      height:45,
      borderWidth:1,
      borderRadius:23,
      justifyContent:"center",
      alignItems:"center",backgroundColor:'#818589',borderColor:'#818589'
  
  }
})