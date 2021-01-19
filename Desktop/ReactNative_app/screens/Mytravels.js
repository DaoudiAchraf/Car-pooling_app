import React,{useState,useEffect,useContext} from 'react';
import { StyleSheet, Dimensions, ScrollView, ImageBackground } from 'react-native';
import { Block, theme } from 'galio-framework';
import { Card } from '../components';
import  EventService  from "../MyApi/Events";
const { width,height } = Dimensions.get('screen');

import AuthContext from "../Context/Context";

  Mytravels = ()=> 
  {
    const { user } =useContext(AuthContext)
    
    const [events, setEvents] = useState([]);

    let eventsG=[];

    useEffect(() => {

      EventService.getMyEvents(user.userId).then(res=>{

        setEvents(res.data)
      })


    },[])



    renderArticles = () => {

        for(let i=0;i<events.length;i++)
          eventsG.push(<Card  key={i} item={events[i]} remove={true} update={true}  setEvents={setEvents} horizontal />)
      
      return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
        
           {eventsG}
        
        </Block>
      </ScrollView>
    )
    }

    return (
      <ImageBackground
      source={require("../assets/splash.png")}
      style={{ width, height, zIndex: 1 }}
    >
      <Block flex center style={styles.home}>
        {renderArticles()}
      </Block>
      </ImageBackground>
    );
  }

  const styles = StyleSheet.create({
    home: {
      width: width,    
    },
    articles: {
      width: width - theme.SIZES.BASE * 2,
      paddingVertical: theme.SIZES.BASE,
    },
  });

export default Mytravels;
