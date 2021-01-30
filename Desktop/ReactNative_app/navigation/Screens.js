import React, { useContext, useEffect } from "react";
import { Easing, Animated, Dimensions } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Block } from "galio-framework";

// screens
import Home from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import Pro from "../screens/Pro";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import Elements from "../screens/Elements";
import Articles from "../screens/Articles";
import Event from "../screens/Event";
import Mytravels from "../screens/Mytravels";
import UpdateEvent from "../screens/UpdateEvent"; 
import Map from "../components/Map";
// drawer
import CustomDrawerContent from "./Menu";   

// header for screens
import { Icon, Header } from "../components";
import { argonTheme, tabs } from "../constants";
import Login from "../screens/Login";
import AuthContext from "../Context/Context";
import authStorage from  '../Context/Storage';


const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function ElementsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Elements"
        component={Elements}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Elements" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
            <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Articles" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
            <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
      
        
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true
        }}
      />
            <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

//------------------------------
function EventStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Event"
        component={Event}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Make travel"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />

      {/* <Stack.Screen 
       options={{headerShown: false}}
       name="myTravels" component={AppStack2} /> */}
    </Stack.Navigator>
  );
}
//------------------------------
function RegisterStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        route={route}
        option={{
          headerTransparent: true
        }}
      />
      {/* <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} /> */}
    </Stack.Navigator>
  );
}

function MytravelsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Mytravels"
        component={Mytravels}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="My travels"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
    </Stack.Navigator>
  );
}



function UpdateEventStack(props) {
  
  return(
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen  name="Update" component={UpdateEvent}/>
    </Stack.Navigator>
  );
}



function MapStack(props) {
  return(
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen  name="Map" component={Map}/>
      <Stack.Screen  name="My travels" component={MytravelsStack}/>
    </Stack.Navigator>
  );
}





export default function OnboardingStack(props) {
  const {user} = useContext(AuthContext);
  
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={user ? AppStack : Onboarding}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="Login" component={LoginStack} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

export function LoginStack(props) {
  const { user } = useContext(AuthContext);
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Login"
        component={Login}
        option={{
          headerTransparent: true
        }}
      />
      {/* <Stack.Screen name="profile" component={Profile} /> */}
      
      {user? <Stack.Screen name="Home" component={AppStack} />
      : <Stack.Screen name="Home" component={OnboardingStack} />}
     

      
    </Stack.Navigator>
  );
}



function Logout(){
  authStorage.removeToken();
  const { setUser } = useContext(AuthContext);
  setUser(null);
  return (
    <OnboardingStack/>)
 
}

function AppStack(props) {  
  return (
 
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8,

      }}
      drawerContentOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Account" component={Register} />
      <Drawer.Screen name="Make travel" component={EventStack} />
      <Drawer.Screen name="Articles" component={ArticlesStack} />
      <Drawer.Screen name="My travels" component={MytravelsStack} />
      <Drawer.Screen name="Map" component={MapStack} />
      <Drawer.Screen name="UpdateEvent" component={UpdateEventStack} />
      <Drawer.Screen name="Logout" component={Logout}  />
    </Drawer.Navigator>
  
  )

}

