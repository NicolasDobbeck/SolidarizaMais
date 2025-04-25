import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "../screens/Home";
import Projects from "../screens/Projects";
import Search from "../screens/Search";
import Form from "../screens/Form";
import About from "../screens/About";

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName = "";

            switch (route.name) {
              case "Home":
                iconName = "home-outline";
                break;
              case "Projetos":
                iconName = "folder-outline";
                break;
              case "Buscar":
                iconName = "magnify";
                break;
              case "Sugestão":
                iconName = "form-select";
                break;
              case "Integrantes":
                iconName = "information-outline";
                break;
            }

            return <Icon name={iconName} size={24} color={color} />;
          },
          tabBarActiveTintColor: "#7ca982",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: { fontWeight: "bold", fontSize: 12 },
          tabBarStyle: {
            backgroundColor: "#fff",
            paddingBottom: 4,
            height: 60,
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Projetos" component={Projects} />
        <Tab.Screen name="Buscar" component={Search} />
        <Tab.Screen name="Sugestão" component={Form} />
        <Tab.Screen name="Integrantes" component={About} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
