import React,{useContext} from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions,Alert, Image, TouchableWithoutFeedback, View } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import Button from './Button'
import { argonTheme } from '../constants';
import convert from "../constants/date";
import { event, set } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons'; 

import  EventService  from "../MyApi/Events";
import AuthContext from "../Context/Context";

import Swipeable from 'react-native-gesture-handler/Swipeable';


 Card=(props)=>{

    const { navigation, item, horizontal, full, style, ctaColor, subs,remove,update , events, setEvents,imageStyle } = props;
    

    const { user } = useContext(AuthContext)


    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];

    const confirmDelete = () =>
    Alert.alert(
      "",
      "Are you sure you want to delete this item",
      [
        {
          text: "No",
          style: "cancel"
        },
        { text: "Yes", onPress: () => handleDelete() }
      ],
      { cancelable: false }
    );



    function handleSubscribe(){         

      let newArr=[];

      events.forEach(event => {
          if(event._id==item._id)
            event.subscribers.push(user.userId);
          
          newArr.push(event);
      });
      setEvents(newArr);
      EventService.subscribeToEvent(user.userId,item._id)
    }

    function handleUnSubscribe(){  
      let newArr=[];

      events.forEach(event => {
          if(event._id==item._id)
            event.subscribers=event.subscribers.filter((event)=>event!=user.userId);
          
          newArr.push(event);
      });
      setEvents(newArr);

      EventService.unSubscribeToEvent(user.userId,item._id)
    }

    function handleDelete() {


        setEvents(prv=>{let newarr =prv.filter(x=> x._id!=item._id);return [...newarr]});
      EventService.deleteEvent(item._id)  
    }

    



    const btn_sub = <Button style={styles.Button} onPress={handleSubscribe}>
                      <Text style={styles.subscribe}>Subscribe</Text>
                    </Button>;



    const btn_unsub = <Button color="success" style={styles.Button} onPress={handleUnSubscribe}>
                    <Text style={styles.subscribe}>Subscribed</Text>
                    </Button>;


    
    const btn_update=<Button color="Success" style={styles.Button,styles.Button_update} onPress={()=>navigation.navigate('UpdateEvent',{screen:"Update",
                                                                                                                                        params:{item}})} >
                            <Block flex={1} row={true} center={true}>
                                  <MaterialIcons name="update" size={25}   color="white" />
                                    <Text style={styles.subscribe}>
                                      Update
                                    </Text>
                            </Block>
                      </Button>;


                      const btn_delete=<Button color="Error" style={styles.Button}
                             onPress={confirmDelete}>

                            <Block flex={1} row={true} center={true}>
                                  <MaterialIcons name="delete" size={25}   color="white" />
                                    <Text style={styles.subscribe}>
                                      Delete
                                    </Text>
                            </Block>
                          </Button>;


    return (
      <Swipeable enabled={remove} renderRightActions={()=><TouchableWithoutFeedback onPress={confirmDelete} >                                  
                                                                <View style={
           {position:'relative',top:16,left:5,width:60,height:150,backgroundColor:argonTheme.COLORS.ERROR,alignItems:'center',justifyContent:'center',borderTopRightRadius:50,borderBottomRightRadius:50}} >
                                                                <MaterialIcons name="delete" size={50}   color="white"   />
                                                                </View>
                                                         </TouchableWithoutFeedback>}>
      <Block row={horizontal} card flex style={cardContainer}>
        
        <TouchableWithoutFeedback >
          <Block flex space="between" style={styles.cardDescription}>
            <Text style={styles.cardTitle}>
              From: <Text style={styles.values}>{item.depart.name}</Text>
            </Text>

            <Text style={styles.cardTitle}>
              To: <Text style={styles.values}>{item.arrive.name}</Text>
            </Text>
            
            <Text style={styles.cardTitle}>
              Date: <Text style={styles.values}>{convert(item.date).date}</Text>
            </Text>
            
            <Text style={styles.cardTitle}>
              Time: <Text style={styles.values}>{convert(item.date).time}</Text>
            </Text>

            <Text style={styles.cardTitle}>
              Price: <Text style={styles.values}>{item.prix}</Text>
            </Text>

            {subs?item.subscribers.indexOf(user.userId)?btn_sub:btn_unsub:null}

            {/* {remove?btn_delete:null} */}
            
            {update?btn_update:null}
          
          </Block>
        </TouchableWithoutFeedback>
      </Block>
      </Swipeable>
    );
  }






Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
}

const styles = StyleSheet.create({

  Button:{
    position:'absolute',
    bottom:0,
    right:0,
    width:Dimensions.get("screen").width * 0.3
  },
  Button_update:{
    position:'absolute',
    bottom:5,
    right:0,
    width:Dimensions.get("screen").width * 0.3
  },
  card: {
    backgroundColor: 'rgba(280,280,255,0.85)',
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16,
    height:150
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
    fontSize:16,
    fontWeight:'bold',
    color:argonTheme.COLORS.PRIMARY
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  subscribe:{
    color:"white",
    fontSize:18
  },
  values:{
    fontSize:15,
    textTransform:'capitalize',
    color:"gray"

  }
});

export default Card;