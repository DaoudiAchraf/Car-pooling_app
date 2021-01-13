import React,{useState} from "react";
import { ScrollView, StyleSheet, Dimensions,View,Platform, ImageBackground} from "react-native";
// Galio components
import { Block, Text, theme } from "galio-framework";
// Argon themed components
import { argonTheme, tabs } from "../constants/";
import { Button as Btn, Select, Icon, Input, Header, } from "../components/";
import { TextInput,Chip,Snackbar,Button } from 'react-native-paper';
import { MaterialCommunityIcons,MaterialIcons,FontAwesome5,Octicons} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Formik } from 'formik';

//const { width } = Dimensions.get("screen");


const { width, height } = Dimensions.get('window')

  const Elements = ({navigation}) => {
   
    const [AbsColor,setAbsColor] = React.useState('black');
    const [temp,setTemp] = React.useState('black');
    const [visible, setVisible] = React.useState(true);

    const onDismissSnackBar = () => setVisible(false);

    var option ;

    const [ErrorMSG, setErrorMSG] = React.useState("Veillez remplir tout les champs")
   
    const Submit = ({phone,depart,arrive})=>
    {
      //console.log(date);

     

      const formData = {
        phone,
        depart,
        arrive,
        option,
        date
      }
      navigation.navigate("Map",{covoiturageInfo:formData });
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
       showMode('date');
     };
   
     const showTimepicker = () => {
       showMode('time');
     };


  

    return (
  
      <View style={styles.container}>
           
           <ImageBackground
      style={{ height: height,width: width, position: 'absolute', resizeMode: 'cover' }} 
      source={require("../assets/splash.png")}/>

        <View style={{alignItems:"center",marginBottom:20}}>
             
        <FontAwesome5 name="car" size={100} color="white" />
             <Text
                h5
                color={"white"}
              >
              Organisez votre couvoiturage
            </Text>
          
           </View>
     
        <Formik
      initialValues={{ phone:'',depart:'',arrive: ''}}
      onSubmit={Submit}
    >
       {({ handleChange,handleSubmit}) => (
      <>
      <View style={{padding:30}}>
         <TextInput
            dense={true}
            underlineColor="#FFFFFF"
            numberOfLines={50}
            theme={{ colors: { color:"white",background: 'white'  } }}
            label="Numero de Telephone" 
            onChangeText={handleChange('phone')}
           />

         <TextInput style={styles.inputStyle}
          dense={true}
          underlineColor="#FFFFFF"
          numberOfLines={50}
          theme={{ colors: { underlineColor: '#FFFFFF', background: 'white'  } }}
          label="Depart"  onChangeText={handleChange('depart')}/>

         <TextInput 
         dense={true}
         underlineColor="#FFFFFF"
         numberOfLines={50}
         theme={{ colors: {  background: 'white'  } }}
          label="Arrivée" onChangeText={handleChange('arrive')}/>
         <View style={styles.nbPlaceContainer}>

         <Chip style={{marginTop:10,width:'100%'}} >
           <View style={{flexDirection:"row",alignItems:"center"}}>
              <Text style={{fontSize:15,paddingRight:47}}>
                nombre de place :
              </Text>

            <View style={styles.nbPlace} >
              <ScrollView showsVerticalScrollIndicator={false} >
                <Block>
                    <Select onSelect={(e)=> option = e } defaultIndex={1} options={["01", "02", "03", "04"]}/>
                </Block>
              </ScrollView>
              
            </View>
            </View>
         </Chip>
         
           
         
         </View>

         <View style={styles.carOptions}>
          <Chip  onPress={showDatepicker}>
            <View style={styles.dateTimePuce}>
                <Octicons name="calendar" size={24} color="black" style={{marginLeft:5,marginRight:10}} />
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
           
            <Button mode="contained" style={{width:'100%',marginTop:'12%'}}
            onPress={handleSubmit}>
              Valider
            </Button>

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
    marginBottom:10
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

export default Elements;