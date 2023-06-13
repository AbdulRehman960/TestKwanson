import { StyleSheet, Text, View ,StatusBar} from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigation from './src/navigation/BottomNavigation';
import { ExecuteQuery } from './src/db/database';
import { lightTheme } from './src/theme/Theme';
const App = () => {
  useEffect(()=>{
    CreateTable()
  })
  const CreateTable = async () => { await ExecuteQuery("CREATE TABLE IF NOT EXISTS tbl_kwanso (id INTEGER PRIMARY KEY AUTOINCREMENT,items TEXT ,isCompleted INTEGER,time DATETIME DEFAULT (DATETIME('now', 'localtime')))", []) }
  return (
    <NavigationContainer theme={lightTheme}>
    <StatusBar barStyle={'dark-content'} backgroundColor={"transparent"}/>
    <BottomNavigation/>
  </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})