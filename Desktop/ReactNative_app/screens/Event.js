import React,{useState,useContext} from "react";
import { ScrollView, StyleSheet, Dimensions,View,Platform, ImageBackground} from "react-native";
// Galio components
import { Block, Text, theme } from "galio-framework";
// Argon themed components
import { argonTheme, tabs } from "../constants/";
import { Button as Btn, Select, Icon, Input, Header,AutoComplete } from "../components/";
import { TextInput,Chip,Snackbar,Button } from 'react-native-paper';
import { MaterialCommunityIcons,MaterialIcons,FontAwesome5,Octicons} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AuthContext from "../Context/Context";

import { Formik } from 'formik';
import { set } from "react-native-reanimated";

//const { width } = Dimensions.get("screen");

const { width, height } = Dimensions.get('window')

  const Elements = ({navigation}) => {
   
    const [visible, setVisible] = React.useState(true);

    const [showAutoComplete, setShowAutoComplete] = useState(false);

    const onDismissSnackBar = () => setVisible(false);


    var option = 0 ;

    const { user } =useContext(AuthContext)
   
    const[phoneError,setphoneError] = useState(false)
    const[departError,setDepartError] = useState(false)
    const[arriveError,setArriveError] = useState(false)
    const[prixError,setPrixError] = useState(false)




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

        <View style={{alignItems:"center",marginBottom:0}}>
          
             
        <FontAwesome5 name="car" size={90} color="white" />
             <Text
                h4
                color={"white"}
              >
                Make your travel
              </Text>
          
           </View>
     
        <Formik
      initialValues={{ phone:'',depart:'',arrive: '',prix:''}}
      onSubmit={({phone,depart,arrive,prix},{resetForm})=>{

      if(phone === '')
        setphoneError(true)
      if(depart === '')
        setDepartError(true)
      if(arrive === '')
        setArriveError(true)
      if(prix === '')
        setPrixError(true)
      if(phone !=='' && depart!=='' && arrive!=='' && prix!=='')
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
        
        resetForm({values:""})
        navigation.navigate("Map",{screen:"Map",params:{covoiturageInfo:formData,operation:"edit" }});
      }

      }}
    >
       {({ values,handleChange,handleSubmit}) => (
      <>  
      <View style={styles.formStyle}>
        
         <TextInput
            dense={true}
            underlineColor="#FFFFFF"
            numberOfLines={50}
            theme={{ colors: { color:"white",background: 'white'  } }}
            label="Numero de Telephone" 
            onChangeText={handleChange('phone')}
            keyboardType="numeric"
            style={{height:47}}
            error={phoneError}
            value={values.phone}
           />

         <TextInput
          dense={true}
          underlineColor="#FFFFFF"
          numberOfLines={50}
          theme={{ colors: { underlineColor: '#FFFFFF', background: 'white'  } }}
          label="Depart"  
          onChangeText={handleChange('depart')}
          style={styles.inputStyle}
          error={departError}
          value={values.depart}
          onFocus={()=>{setShowAutoComplete(true)}}  
          onBlur={()=>{setShowAutoComplete(false)}}  
          />


         <TextInput 
         dense={true}
         underlineColor="#FFFFFF"
         numberOfLines={50}
         theme={{ colors: {  background: 'white'  } }}
          label="Arrivée" onChangeText={handleChange('arrive')}
          style={{height:47}}
          error={arriveError}
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
         error={prixError}
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
            

    <View>
         <Snackbar duration={7000} style={{position: 'absolute',bottom:0}}
          visible={false}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Error',
        
          }}>
          Veillez remplir les champs
        </Snackbar></View>
  
     </View>
   
   
    );
  };

const styles = StyleSheet.create({

  auto:{

    position:"absolute"



  },
  container:{
    paddingTop:"10%",
    // marginTop:30,
    backgroundColor:"#F6F6F6",
    paddingLeft:5,
    paddingRight:5,
    width:width,
    height:height,
  
  },
  formStyle:{
    paddingTop:27,
    paddingRight:30,
    paddingLeft:30
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

export default Elements;