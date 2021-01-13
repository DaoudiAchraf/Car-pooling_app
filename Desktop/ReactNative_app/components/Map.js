import React ,{useState,useEffect}from 'react';
import MapView,{Polygon, Polyline} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions,PermissionsAndroid, Image } from 'react-native';
import { Button,Surface,Avatar} from 'react-native-paper';
import { AntDesign,FontAwesome5,FontAwesome,Entypo,MaterialCommunityIcons } from '@expo/vector-icons';
import Images from "../constants/Images";
import MapViewDirections from 'react-native-maps-directions';


const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};

export default function App({navigation,route}) {

    const { covoiturageInfo } = route.params;
    console.log(covoiturageInfo);

    const [depart , setDepart] = useState(true);
    const [btnDisabled,setBtnDisabled] = useState(true);
    const [btnColor,setBtnColor] = useState("#2F4B97");
    
    const onChange = ()=>{
        setLoading(false);
        setDepart(false);
        setBtnDisabled(true);
    }

    const [loading,setLoading] = useState(false);

    const [state,setState] = useState({
        region: {
          latitude: 34.6113892, 
          longitude: 8.7590835,
          latitudeDelta: 8,
          longitudeDelta: 2
        },
        markers: []        // Here it is
      });

      // onMapReady={() => {
      //   PermissionsAndroid.request(
      //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      //   ).then(granted => {
      //     alert(granted) // just to ensure that permissions were granted
      //   });
      // }}
   
  return (
    <View style={styles.container}>
 
      <MapView region={state.region} 
    //    rotateEnabled={false}
    //    showsUserLocation={true}
    //    showsMyLocationButton={true}
      style={styles.map}
      onPress={(e) => {
          ((depart && state.markers.length == 0)||(!depart && state.markers.length < 2))&&
            setState({ markers: [...state.markers, { latlng: e.nativeEvent.coordinate,depart:depart }] }) 
            setBtnDisabled(false);

          
          console.log(state.markers); 
        }}>
           {/* <Polyline    strokeWidth={2}
                strokeColor="red" coordinates={[{latitude:35.637168562991455,longitude: 9.514671117067337},
          {latitude:32.514761824077375,longitude: 7.282373495399952}]}/> */}
    {
     state.markers.map((marker, i) => (
      marker.depart &&
        <MapView.Marker key={i} coordinate={marker.latlng} >
          <Image source={require('../assets/carDep.png')} style={{height: 35, width:35 }} />
       
        </MapView.Marker>  
    ))    
    }

    {
     state.markers.map((marker, i) => (
      !marker.depart &&
        <MapView.Marker key={i} coordinate={marker.latlng} >
          <Image source={require('../assets/carArr.png')} style={{height: 34, width:34 }}/>
        
   
        </MapView.Marker>  
    ))    
    }



    </MapView>
    <Surface style={styles.surface}>
    <Surface style={styles.carDirection}> 

     <FontAwesome5 name="car-side" size={35} style={{marginRight:20}} color="black" />
     {
         depart ?  <FontAwesome name="long-arrow-right" size={60} color="#7B8ADE" />
         :<FontAwesome name="long-arrow-left" size={60} color="#C670DF" />
     }
    
     </Surface >
     


  
    <Button disabled={btnDisabled} mode="contained" color={btnColor} loading={loading} onPress={() =>
        {setLoading(true)
         setTimeout(()=>onChange(), 3000)} }>
             
            <Entypo name="location-pin" size={20} color="#7B8ADE" />
            <Text>{depart ? "Confimrer le depart": "Confirmer l'arrivé" }</Text>
  </Button>
  </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop:40
    
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  
  },
  carDirection:
  {
      flexDirection:"row",
      alignItems:"center",
      backgroundColor:"white",
      elevation:8,
      paddingLeft:20,
      paddingRight:20,
      marginBottom:"5%",
      opacity:0.95
    
      
  },
  surface: {
    paddingBottom:20,
    marginTop:"3%",
    width: Dimensions.get('window').width*0.8,
    alignItems: 'center',
    justifyContent: 'center',
   
    top:-150,backgroundColor: 'transparent'
    
  },
});