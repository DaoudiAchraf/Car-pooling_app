import React,{useState,useEffect,useContext} from 'react';
import { StyleSheet, Dimensions, ScrollView, ImageBackground } from 'react-native';
import { Block, theme,Text, Button } from 'galio-framework';
import { ProgressBar, Colors } from 'react-native-paper';

import { Card } from '../components';
import articles from '../constants/articles';

import  EventService  from "../MyApi/Events";

import { Images, argonTheme } from "../constants";

import AuthContext from "../Context/Context";

import {Input,Icon} from "../components";


const { width,height } = Dimensions.get('screen');

  Home = ({navigation})=> 
  {


      const { user } =useContext(AuthContext);
      const [events, setEvents] = useState([]);
      const [initEvents, setInitEvents] = useState([]);
      const [depart, setDepart] = useState("");
      const [arrive, setArrive] = useState("");
      let eventsG=[];


      useEffect(() => {


        EventService.getEvent(user.userId).then(res=>{
          setEvents(res.data)     
          setInitEvents(res.data)     
        })
      },[])

      
   const renderFilter = () => 
   {

         return (
        
       <Block row={true} style={{width:width,position:'relative',top:-5,marginBottom:-13}}>
          
           <Input 
             placeholder="From"
             borderless
             iconContent={null}
             style={styles.inp}
             color={"white"}
             onChangeText={(dep)=>{
              setDepart(dep);
              setEvents(initEvents.filter((x)=>x.depart.name.toLocaleLowerCase().includes(dep.toLocaleLowerCase())
                                            && x.arrive.name.toLocaleLowerCase().includes(arrive.toLocaleLowerCase())
                                            ))
             }}
             />

           <Input 
             placeholder="To"
             borderless
             iconContent={null}
             style={styles.inp}
             color={"white"}
             onChangeText={(arr)=>{
              setArrive(arr)
              setEvents(initEvents.filter((x)=> x.arrive.name.toLocaleLowerCase().includes(arr.toLocaleLowerCase())
                                            &&  x.depart.name.toLocaleLowerCase().includes(depart.toLocaleLowerCase())
                                          ))
          }}
             
           />

         </Block>
        )
   }

   renderArticles = () => {

        for(let i=0;i<events.length;i++)
          eventsG.push(<Card  dial={true} subs={true} remove={false}  father="home"  key={i} item={events[i]} events={events} navigation={navigation} setEvents={setEvents} horizontal />)
      
      return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
           {eventsG}
      </ScrollView>
    )
    }


    return (
      <>
      <ProgressBar progress={0.5} indeterminate={true} visible={!events.length} color={Colors.red800} />

      <ImageBackground
      source={require("../assets/splash.png")}
      style={{ width, height, zIndex: 1 }}
      >
       <Block flex center style={styles.home}>

          {renderFilter()}
          {renderArticles()}
        </Block>
      </ImageBackground>
   </>);
  }

const styles = StyleSheet.create({
  home: {
    width: width  
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    position:'relative',

    
  },

  inp:{
    height:55,
    width:Dimensions.get("screen").width*0.5,
    backgroundColor:'rgba(0, 0, 0, 0.05)',
    borderBottomColor:argonTheme.COLORS.PRIMARY,
    borderWidth:1,
    borderRadius:0,
    marginLeft:0,

  }
});

export default Home;
