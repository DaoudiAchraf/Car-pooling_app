import React ,{useState,useEffect}from 'react';
import MapView,{Polygon, Polyline} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions,PermissionsAndroid,Image } from 'react-native';
import { Button,Surface,Badge,Avatar} from 'react-native-paper';
import { AntDesign,FontAwesome5,FontAwesome,Entypo,MaterialIcons } from '@expo/vector-icons';
import EventService  from '../MyApi/Events';
import Modal from 'react-native-modal';

const { width } = Dimensions.get("screen");

const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};

export default function Map({navigation,route}) {


    const { covoiturageInfo } = route.params;
    const { update } = route.params;
    const { id } = route.params;
    const { item } = route.params;
    const{operation}=route.params;
    const [depart , setDepart] = useState(true);
    const [btnDisabled,setBtnDisabled] = useState(true);
    const [btnColor,setBtnColor] = useState("#2F4B97");

    const [loading,setLoading] = useState(false);

    const onChange = ()=>{
        setLoading(false);
        setDepart(false);
        setBtnDisabled(true);   
    }


    const addEvent = ()=>
    {

      const event = {
        ...covoiturageInfo,
        depart:{
          name:covoiturageInfo.depart,
          ...state.departMarker[0],
        },
        arrive:{
          name:covoiturageInfo.arrive,
          ...state.arriveMarker[0],
        },
        id
      }

      if(update)
        EventService.updateEvent(event).then(()=>alert("your event has been updated "));
      else{
      EventService.AddEvent(event).then(()=>console.log('skrjiya'));
      setModalVisible(true);
    }
      setTimeout(function(){ 
        setModalVisible(false);
        navigation.replace('My travels') 
      }, 2000);

    }

    const [state,setState] = useState({
        region: {
          latitude: 34.6113892, 
          longitude: 8.7590835,
          latitudeDelta: 8,
          longitudeDelta: 2
        },
        departMarker: [],
        arriveMarker: []
      });


    if(item)
      useEffect(() => {
        setState({...state,departMarker: [{ latlng:item.depart.latlng}],arriveMarker: [{ latlng:item.arrive.latlng}]})
      },[item]);


      // onMapReady={() => {
      //   PermissionsAndroid.request(
      //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      //   ).then(granted => {
      //     alert(granted) // just to ensure that permissions were granted
      //   });
      // }}



   
      const [modalVisible,setModalVisible] = useState(false)
  return (
    
    <View style={styles.container}>
      
 <Modal style={{alignItems:"center"}} isVisible={modalVisible}>
      <View style={styles.modal}>
        <View>
          <Badge style={styles.badge} size={80}>
            <MaterialIcons name="done" size={50} color="white" />
          </Badge>
        </View>
     
          <Text style={{...styles.text,fontSize:18}} >Your Travel is added Successfully ! </Text>

      </View>
      </Modal>
      <MapView region={state.region} 
    //    rotateEnabled={false}
    //    showsUserLocation={true}
    //    showsMyLocationButton={true}
      style={styles.map}
      onPress={(e) => {
          if(depart && operation==="edit")
           {
             setState({...state, departMarker: [{ latlng: e.nativeEvent.coordinate}] })
             //console.log('depart',depart);
           }
            
          else if(operation==="edit")
          {
            setState({...state, arriveMarker: [{ latlng: e.nativeEvent.coordinate}] })
            //console.log('depart',depart);
          }
     
          setBtnDisabled(false);

        }}>
           {/* <Polyline    strokeWidth={2}
                strokeColor="red" coordinates={[{latitude:35.637168562991455,longitude: 9.514671117067337},
          {latitude:32.514761824077375,longitude: 7.282373495399952}]}/> */}
    {
     state.departMarker.map((marker, i) => (
        <MapView.Marker key={i} coordinate={marker.latlng} >
          
          <View style={{alignItems:"center",justifyContent:"center"}}>
            <Image source={require('../assets/car_arrow_right.png')} style={{height: 35, width:35 }} />
            <Text style={styles.text}>Depart</Text>
          </View>
        </MapView.Marker>  
    ))    
    }

    {
     state.arriveMarker.map((marker, i) => (
        <MapView.Marker key={i} coordinate={marker.latlng} >
            <View style={{alignItems:"center",justifyContent:"center"}}>
            <Image source={require('../assets/car_arrow_left.png')} style={{height: 35, width:35 }}/>
            <Text style={{...styles.text,color:"#9B50DE"}}>Arrivé</Text>
          </View>
        </MapView.Marker>  
    ))    
    }

    </MapView>


    {operation==="edit"?
    <Surface style={styles.surface}>
    <Surface style={styles.carDirection}> 

     <FontAwesome5 name="car-side" size={35} style={{marginRight:20}} color="black" />
     {
         depart ?  <FontAwesome name="long-arrow-right" size={60} color="#7B8ADE" />
         :<FontAwesome name="long-arrow-left" size={60} color="#C670DF" />
     }
    
     </Surface >
  
  
    <Button disabled={btnDisabled} mode="contained" color={btnColor} loading={loading} onPress={() =>
        {
          if(!depart  )
              addEvent()

          setLoading(true)
         setTimeout(()=>onChange(), 1500)
        }}>
             
            <Entypo name="location-pin" size={20} color="#7B8ADE" />
            <Text>{depart ? "Confimrer le depart": "Confirmer l'arrivé" }</Text>
  </Button>
  </Surface>:null}
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  
  },
  map: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  
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
    position:"absolute",
    bottom:0,
    backgroundColor: 'transparent'
  },
  text:{
    color:"#7B8ADE",
    fontSize:16,
    fontWeight:"bold",
    textAlign:"center"
  },
  modal: {
    padding:10,
    height: 180,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:20,
    
    backgroundColor:"white"
  },
  badge:{
    alignItems:"center",
    justifyContent:"center",
    marginBottom:10
  }
});