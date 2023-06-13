import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import '../I18n';
import { useTranslation } from 'react-i18next';
import {insertData,updateData } from '../db/database';
import Header from '../components/Header';
import { useTheme } from "@react-navigation/native";
import ButtonComponet from '../components/ButtonComponet';
const CreateList = (props) => {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [DATA, setDATA] = useState([])
  const [value, setValue] = useState('')
  const txtref = useRef(null)
 

  useEffect(() => {

    if (props?.route?.params?.DATA) {
      setDATA(props?.route?.params?.DATA?.data)
    }
    
  }, [])
  


  const addDataToLocalArray = () => {
    let localData = [...DATA]
    localData.push({ name: value, iscomplete:0})
    setDATA(localData)
    setValue('')

  }
  const Item = ({ title }) => (
    <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => {
      txtref?.current?.focus()
      setValue(title?.name)
    }}>
      <Text style={{ color: '#E2DFD2', }}>{title?.name}</Text>
    </TouchableOpacity>
  )
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
      <Header text={t('text_Create_List')} />
      <View style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Item title={item} />)}
          keyExtractor={item => item?.name.toString()}
          ListFooterComponent={
            <TextInput ref={txtref} returnKeyType='done' value={value} onSubmitEditing={() => { addDataToLocalArray() }} onChangeText={(txt) => { setValue(txt) }} placeholder='Type here...' placeholderTextColor='#E2DFD2' style={{ color: '#E2DFD2', borderWidth: 0.2,height:45,borderRadius:5 }} />
          }
        />
      </View>
      <View style={{ flex: 0.14, alignItems: 'flex-end',}}>
        <View style={{ flexDirection: 'row',marginBottom:20 }}>
         {
          props?.route?.params?.DATA&&
          <ButtonComponet text={t("text_update")} onPress={()=>{updateData(DATA,props?.route?.params?.DATA?.id,()=>{setDATA([])})}}/>
         }
         <ButtonComponet text={t("text_Insert")} onPress={()=>{insertData(DATA,()=>{setDATA([])})}}/>
        </View>
      </View>

    </SafeAreaView>
  )
}

export default CreateList

const styles = StyleSheet.create({
  container:{ flex: 1, paddingHorizontal: 16, marginTop: 15 },
  button: {
    alignSelf: 'center', marginTop: 0,
     marginHorizontal: 18, alignItems: 'center', height: 46, justifyContent: 'center', borderRadius: 18, width: 140
  }
})