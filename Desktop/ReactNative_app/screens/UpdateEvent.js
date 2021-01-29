import React,{useState,useContext, useEffect} from "react";
import { ScrollView, StyleSheet, Dimensions,View,Platform, ImageBackground} from "react-native";
// Galio components
import { Block, Text, theme } from "galio-framework";
// Argon themed components
import { argonTheme, tabs } from "../constants/";
import { Button as Btn, Select, Icon, Input, Header, } from "../components/";
import { TextInput,Chip,Snackbar,Button } from 'react-native-paper';
import { MaterialCommunityIcons,MaterialIcons,FontAwesome5,Octicons} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AuthContext from "../Context/Context";
import convert from "../constants/date";
import { Formik } from 'formik';
import { useRoute } from "@react-navigation/native";

//const { width } = Dimensions.get("screen");


const { width, height } = Dimensions.get('screen')

  const UpdateEvent = ({navigation,route}) => {


    const [AbsColor,setAbsColor] = React.useState('black');
    const [temp,setTemp] = React.useState('black');
    const [visible, setVisible] = React.useState(true);

    const onDismissSnackBar = () => setVisible(false);

    var option = 0 ;

    const [ErrorMSG, setErrorMSG] = React.useState("Veillez remplir tout les champs")

    const { user } =useContext(AuthContext)

    const { item } = route.params;


    const [phone, setPhone] = useState("")
    const [depart, setDepart] = useState("")
    const [arrive, setarrive] = useState("")
    const [prix, setPrix] = useState("")
    const [places, setPlaces] = useState()



    useEffect(() => {
        setPhone(item.phone.toString());
        setDepart(item.depart.name.toString());
        setarrive(item.arrive.name.toString());
        setPrix(item.prix.toString());
        setPlaces(item.places-1);
    },[item])




    const Submit = ({phone,depart,arrive,prix})=>
    {
    
     const formData = {
        phone,
        depart,
        arrive,
        prix,
        places:++option,
        date,
        user: user.userId
      }
      navigation.navigate("Map",{screen:"Map",params:{item,covoiturageInfo:formData,update:true,id:route.params.item._id,operation:"edit"} });
    }

     const [date, setDate] = useState(new Date());
     const [mode, setMode] = useState('date');
     const [show, setShow] = useState(false);
   
     const onChange = (event, selectedDate) => {
       const currentDate = selectedDate || date;
       setShow(Platform.OS === 'ios');
       setDate(currentDate);
     };
   
     const showMode = (currentMode) => {
       setShow(true);
       setMode(currentMode);
     };
   
     const showDatepicker = () => {
       setDate(new Date(route.params.item.date))
       showMode('date');
     };
   
     const showTimepicker = () => {  
      let date=new Date(route.params.item.date);
      date.setHours(date.getHours()-1);  
      setDate(date);
      showMode('time');
     };


  

    return (
  
      <View style={styles.container}>
           
           <ImageBackground
              style={{ height: height,width: width, position: 'absolute', resizeMode: 'cover' }} 
              source={require("../assets/splash.png")}/>

        <View style={{alignItems:"center",marginBottom:0}}>
             
        <FontAwesome5 name="car" size={90} color="white" />
             <Text
                h5
                color={"white"}
              >
                  Update your travel
            </Text>
          
           </View>
     
        <Formik
        enableReinitialize={true}
        initialValues={{ phone:phone,depart:depart,arrive:arrive,prix:prix}}
        onSubmit={Submit}
    >
       {({ handleChange,handleSubmit,values}) => (
      <>
      <View style={{padding:30}}>
         <TextInput
            dense={true}
            underlineColor="#FFFFFF"
            numberOfLines={50}
            theme={{ colors: { color:"white",background: 'white'  } }}
            label="Numero de Telephone" 
            onChangeText={handleChange('phone')}
            keyboardType="numeric"
            style={{height:47}}
            value={values.phone}

           />

         <TextInput
          dense={true}
          underlineColor="#FFFFFF"
          numberOfLines={50}
          theme={{ colors: { underlineColor: '#FFFFFF', background: 'white'  } }}
          label="Depart"  onChangeText={handleChange('depart')}
          style={styles.inputStyle}
          value={values.depart}
          />

         <TextInput 
         dense={true}
         underlineColor="#FFFFFF"
         numberOfLines={50}
         theme={{ colors: {  background: 'white'  } }}
          label="Arrivée" onChangeText={handleChange('arrive')}
          style={{height:47}}
          value={values.arrive}
          />

        <TextInput 
         dense={true}
         underlineColor="#FFFFFF"
         numberOfLines={50}
         theme={{ colors: {  background: 'white'  } }}
          label="Prix DT" onChangeText={handleChange('prix')}
          style={{height:47,marginTop:10}}
          keyboardType="number-pad"
          value={values.prix}
          />
          
         <View style={styles.nbPlaceContainer}>
         <Chip style={{marginTop:10,width:'100%'}} >
           <View style={{flexDirection:"row",alignItems:"center"}}>
              <Text style={{fontSize:15,paddingRight:47}}>
                nombre de place :
              </Text>

            <View style={styles.nbPlace} >
              <ScrollView showsVerticalScrollIndicator={false} >
                <Block>
                    <Select onSelect={(e)=> option = e }  defaultIndex={places} options={["01", "02", "03", "04"]}/>
                </Block>
              </ScrollView>
              
            </View>
            </View>
         </Chip>
         
           
         
         </View>

         <View style={styles.carOptions}>
          <Chip  onPress={showDatepicker}>
            <View style={styles.dateTimePuce}>
                <Octicons name="calendar" size={24} color="black"  style={{marginLeft:5,marginRight:10}} />
                <Text>Date Depart</Text>
                          {/* <MaterialCommunityIcons name="car-brake-abs" size={24} color={AbsColor}
                            onPress={() =>{
                              if(AbsColor === "black")
                                  setAbsColor('red')
                              else
                                  setAbsColor('black')
                            } }
                          /> */}
                  </View>
          </Chip>
              {/* <Chip  onPress={() => {}}>
              <MaterialCommunityIcons name="car-seat-cooler" size={24} color={temp}
              onPress={() => setTemp('red')}
              />
              </Chip> */}
          <Chip onPress={showTimepicker}>
            <View style={styles.dateTimePuce}>
                <MaterialIcons name="av-timer" size={24} color="black"  />
                  <Text>Temps Depart</Text>
            </View>    
          </Chip>
              
            </View>
           
            <Btn color="success" mode="contained" style={{width:'100%',marginTop:'12%'}}
            onPress={handleSubmit}>
                <Block row={true}>
                        <MaterialIcons name="update" size={25}   color="white" />
                        <Text color="white" size={18}>
                            UPDATE
                        </Text>
                </Block>

            </Btn>

            <View>
      
  
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>

            {/* ........................ */}
            </View>
            </>)}
            
            </Formik>
            
      {/* 
      <Snackbar duration={7000} style={{position: 'absolute',bottom:0}}
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Undo',
            onPress: () => {
              // Do something
            },
          }}>
          Hey there! I'm a Snackbar.
      </Snackbar>
            
      */}

      </View>
   
   
    );
  };

const styles = StyleSheet.create({
  container:{
    paddingTop:"10%",
    // marginTop:30,
    backgroundColor:"#F6F6F6",
    paddingLeft:5,
    paddingRight:5,
    width:width,
    height:height,
  
  },
  nbPlaceContainer:{
    flexDirection:"row",
    
    justifyContent:"space-between",
  
  },
  carOptions:
  {
    flexDirection:"row",
    justifyContent:"space-around",
    marginTop:"8%"
  },
  inputStyle:
  {
    marginTop:10,
    marginBottom:10,
    height:47
  },
  nbPlace:
  {
    flexDirection:"row",
    justifyContent:"flex-end",
  },
  dateTimePuce:
  {
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    flex:2
  }

});

export default UpdateEvent;