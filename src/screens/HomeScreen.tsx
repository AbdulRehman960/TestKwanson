import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TouchableOpacity,Alert } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import AddButton from '../components/AddButton';
import Header from '../components/Header';
import Swipeout from 'react-native-swipeout';
import { ExecuteQuery, markComplete,deleteData } from '../db/database';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTheme } from "@react-navigation/native";
import '../I18n';
import { useTranslation } from 'react-i18next';
const AllListScreen = ({ navigation }: any) => {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [DATA, setDATA] = useState([])
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [laodmore, setLoadmore] = useState(true);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      readData()
    });
    return unsubscribe;
  }, [navigation])

  const readData = async () => {
    let oldArrayData = [...DATA]
    if (!laodmore) {
      return;
    }
    setIsLoading(true);
    const limit = 15;
    const offset = (page - 1) * limit;
    let results = await ExecuteQuery(`SELECT * FROM tbl_kwanso WHERE isCompleted = ? ORDER BY time LIMIT ${limit}  OFFSET ${offset}`, [0])
    let data = []
    var len = results.rows.length;
    for (let i = 0; i < len; i++) {
      let row = results.rows.item(i);
      data.push({ id: row?.id, isCompleted: row.isCompleted, data: JSON.parse(row?.items) })
    }
    if (data.length === 0) {
      if (DATA?.length == 0) {
        setDATA([]);
      }
      setLoadmore(false)
      setIsLoading(false);
    } else {
      let finalDataForFlatList = [...oldArrayData, ...data]
      const seen = new Set();
      const filteredArr = finalDataForFlatList.filter(el => {
        const duplicate = seen.has(el?.id);
        seen.add(el?.id);
        return !duplicate;
      });
      setDATA(filteredArr);
      setPage(prevPage => prevPage + 1);
      setIsLoading(false);
    }

  }
  const handleComplete = (isChecked, item) => {
    setTimeout(()=>{
      if (isChecked) {
        let clonedData = [...DATA]
        let index = DATA.findIndex(a => a.id == item?.id)
        clonedData.splice(index, 1)
        setDATA(clonedData)
        markComplete(1, item?.id, () => {readData()})
      }
    },500)
  }
  const Item = useCallback(({ title }) => {
    return (
      <TouchableOpacity style={[styles.item,{backgroundColor:colors?.alpha}]} onPress={() => { }}>
        <BouncyCheckbox
          size={25}
          fillColor="red"
          unfillColor="#FFFFFF"
          text="List Item"
          iconStyle={{ borderColor: "red" }}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={{ fontFamily: "JosefinSans-Regular" }}
          onPress={(isChecked: boolean) => { handleComplete(isChecked, title) }}
        />
      </TouchableOpacity>
    );
  },
    [DATA],
  );
const handleDeletion=(item)=>{
  let clonedData = [...DATA]
  let index = DATA.findIndex(a => a.id == item?.id)
  clonedData.splice(index, 1)
  setDATA(clonedData)
  deleteData(item?.id,()=>{readData()})
}
  return (
    <View style={{ flex: 1, backgroundColor:colors.primary }}>
      <Header text={t('text_Grocery_List')} />
      <View style={{ flex: 1 }}>
        <FlatList
          data={DATA}
          scrollEventThrottle={250}
          onEndReached={info => { readData() }}
          onEndReachedThreshold={0.01}
          renderItem={({ item,index }) => (
          
            <Swipeout
            right={[
              {
                text: 'Delete',
                onPress: () => handleDeletion(item),
                type: 'delete',
              },
            ]}
            autoClose={true}
            backgroundColor='transparent'
          >
            <Item title={item} />
          </Swipeout>
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <View style={{}}>
              {isLoading &&
                <ActivityIndicator size={'large'} color={'red'} />
              }
            </View>
          }
        />
      </View>
      <View style={{ position: 'absolute', bottom: 20, right: 10 }}>
        <AddButton onPress={() => navigation.navigate('CreateList')} />
      </View>


    </View>



  )
}

export default AllListScreen

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    marginLeft: 10, color: 'black'
  },
})