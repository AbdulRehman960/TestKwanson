import { StyleSheet, Text, View,FlatList, TouchableOpacity } from 'react-native'
import React,{useCallback, useEffect,useState} from 'react'
import Header from '../components/Header'
import {insertData} from '../db/database';
import { useTheme } from "@react-navigation/native";
import '../I18n';
import { useTranslation } from 'react-i18next';
import ButtonComponet from '../components/ButtonComponet';
const ViewListScreen = (props) => {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [allowUpdate,setAllowUpdate]=useState(false)
  const Item = useCallback(({title}) => {
    return (
      <Text style={styles.title}>{title?.name}</Text>
    );
  },
  [props?.route?.params?.DATA],
);
  return (
    <View style={{flex:1,backgroundColor:colors.primary}}>
      <Header isback={true} navigation={props?.navigation}/>
      <FlatList
          data={props?.route?.params?.DATA?.data}
          renderItem={({item}) => (<Item title={item} />)}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <>
            <ButtonComponet text={t("text_Duplicate")} onPress={()=>{insertData(props?.route?.params?.DATA?.data,()=>{setAllowUpdate(true), setDATA([])})}}/>
            {
              allowUpdate&&
              <ButtonComponet text={t("text_update")} onPress={()=>{props?.navigation.navigate('CreateList',{DATA:props?.route?.params?.DATA})}}/>
            }
            </>
          }
        />
    </View>
  )
}

export default ViewListScreen

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    marginLeft:20,color:'black',
  },

})