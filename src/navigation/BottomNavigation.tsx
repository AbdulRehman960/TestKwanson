import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AllListScreen from '../screens/AllListScreen';
import CreateList from '../screens/CreateList';
import ViewListScreen from '../screens/ViewListScreen';
import { useTheme } from "@react-navigation/native";
import '../I18n';
import { useTranslation } from 'react-i18next';
const Tab = createBottomTabNavigator();
const Home = createStackNavigator();
const BottomNavigation = () => {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const HomeNavigatorStack=()=>{
    return (
      <Home.Navigator  screenOptions={{
        headerShown: false
      }}>
        <Home.Screen
          name="HomScreen"
          component={HomeScreen}
        />
         <Home.Screen
          name="CreateList"
          component={CreateList}
        />
      </Home.Navigator>
    );
  }
  const AllListNavigatorStack=()=>{
    return (
      <Home.Navigator screenOptions={{headerShown: false}}>
        <Home.Screen
          name="AllListScreen"
          component={AllListScreen}
        />
         <Home.Screen
          name="ViewListScreen"
          component={ViewListScreen}
        />
      
      </Home.Navigator>
    );
  }
  return (
    <Tab.Navigator   
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        return null;
      },
      tabBarLabelStyle: {
        fontSize: 20,
        marginBottom:10
      },
      headerShown:false
  
    })} >
    <Tab.Screen name="GroceryList" component={HomeNavigatorStack} options={{ tabBarLabel: t("text_Home") }}   />
    <Tab.Screen name="AllList" component={AllListNavigatorStack}  options={{ tabBarLabel:  t("text_AllList") }}/>
  </Tab.Navigator>
  )
}

export default BottomNavigation

const styles = StyleSheet.create({})
