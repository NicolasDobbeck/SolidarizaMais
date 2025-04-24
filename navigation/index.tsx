import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import Home from "../screens/Home";
import Projects from "../screens/Projects";
import Search from "../screens/Search";
import Form from "../screens/Form";
import About from "../screens/About";

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Projetos" component={Projects} />
        <Tab.Screen name="Buscar" component={Search} />
        <Tab.Screen name="Cadastro" component={Form} />
        <Tab.Screen name="Sobre" component={About} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}