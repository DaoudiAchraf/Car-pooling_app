import React, {useEffect, useState} from "react";
import { Image, LogBox } from "react-native";
import { AppLoading } from "expo";
import { useFonts } from '@use-expo/font';
import { Asset } from "expo-asset";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import Map from './components/Map';


// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();

import Screens from "./navigation/Screens";
import { Images, articles, argonTheme } from "./constants";
import Register from "./screens/Register";
import AuthContext from "./Context/Context";
import Event from "./screens/Event";
import authStorage from  './Context/Storage';
import jwtDecode from 'jwt-decode';
import OnboardingStack from "./navigation/Screens";

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.Pro,
  Images.ArgonLogo,
  Images.iOSLogo,
  Images.androidLogo
];






// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
LogBox.ignoreAllLogs();

export default props => {
  
  const [user,setUser] = useState();
 
  const restoreToken = async () => {
    const token = await authStorage.getToken();
    if(!token) return;
    setUser(jwtDecode(token))
    //console.log("current User",);
  }

  useEffect(()=>{
    restoreToken().then()
    },[]);
  
  const [isLoadingComplete, setLoading] = useState(false);
  let [fontsLoaded] = useFonts({
    'ArgonExtra': require('./assets/font/argon.ttf'),
  });

  function _loadResourcesAsync() {
    return Promise.all([...cacheImages(assetImages)]);
  }

  function _handleLoadingError(error) {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

 function _handleFinishLoading() {
    setLoading(true);
  };



  if(!fontsLoaded && !isLoadingComplete) {
    return (
      <AppLoading
        startAsync={_loadResourcesAsync}
        onError={_handleLoadingError}
        onFinish={_handleFinishLoading}
      />
    );
  } else if(fontsLoaded) {
    return (
      <AuthContext.Provider value={{user,setUser}}>
          <NavigationContainer>
            <GalioProvider theme={argonTheme}>
              <Block flex>
                  <Screens/>
              </Block>
            </GalioProvider>
          </NavigationContainer>
      </AuthContext.Provider>
    );
  } else {
    return null
  }
}

