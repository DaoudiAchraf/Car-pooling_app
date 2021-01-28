import React, { useState } from 'react'
import { ScrollView,StyleSheet } from 'react-native';
import {Text} from "galio-framework";
import { NONE } from 'apisauce';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';




AutoComplete = ()=>{

    const [States, setStates] = useState(["Ariana", 
                                          "Beja", 
                                          "Ben Arous", 
                                          "Bizerte", 
                                          "Gabes", 
                                          "Gafsa", 
                                          "Jendouba", 
                                          "Kairouan", 
                                          "Kasserine", 
                                          "Kebili", 
                                          "Kef", 
                                          "Mahdia", 
                                          "Manouba", 
                                          "Medenine", 
                                          "Monastir", 
                                          "Nabeul", 
                                          "Sfax", 
                                          "Sidi Bou Zid",
                                          "Siliana", 
                                          "Sousse", 
                                          "Tataouine", 
                                          "Tozeur", 
                                          "Tunis", 
                                          "Zaghouan"]);
    var statesG=[];
    for (const s of States) 
        statesG.push(
            <TouchableWithoutFeedback onPress={()=>{alert(s)}}>
                    <Text onPress={()=>{alert("ok")}} style={{fontSize:18,marginLeft:10,marginBottom:3}}>{s}</Text>
            </TouchableWithoutFeedback>);
   
   return(
            <ScrollView style={style.auto}>
                {statesG}
            </ScrollView>
    )
}



const style=StyleSheet.create(
{
        auto:{
            backgroundColor:"rgb(240,240,240)",
            position:'absolute',
            zIndex:2,
            width:322,
            height:125,
            top:129,
            left:30,
            

        }
})



export default AutoComplete;




