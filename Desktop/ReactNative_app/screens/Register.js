import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  View
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import { AntDesign } from '@expo/vector-icons';
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import { Formik } from 'formik';
import auth from '../MyApi/Auth';
import { set } from "react-native-reanimated";
import { Snackbar,Modal, ActivityIndicator } from 'react-native-paper';

const { width, height } = Dimensions.get("screen");

const Register =()=> {

    const [visible, setVisible] = React.useState(false);

    const [ErrorMSG, setErrorMSG] = React.useState();

    const snackBarError = (errorMsg)=> {
      setErrorMSG(errorMsg)
      setVisible(!visible);
    }

    const onDismissSnackBar = () => setVisible(false);
    const [visibleModal, setVisibleModal] = React.useState(false);

  const Submit = ({name,email,password})=>
  {
  
   if(name === '' && email === '' && password === '')
      snackBarError("Remplir tout les champs");
   else if(name === '')
      snackBarError("Entrer Votre nom");
   
   else if(email === '')
      snackBarError("Entrer Votre email");
    
   else if(password === '')
      snackBarError("Entrer Votre mot de passe");
   else
   {
      setVisibleModal(true);
      auth.register(name,email,password).then(res=>console.log("==>",res));
   }
      
  }

    return (
      <Formik
      initialValues={{ name:'',email: '' ,password:''}}
      onSubmit={Submit}
    >
      {({ handleChange,handleSubmit}) => (
      <>
      <Snackbar duration={7000} style={{position: 'absolute',bottom:0}}
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Error',
            onPress: () => {
          
            },
          }}>
          {ErrorMSG}
      </Snackbar>

      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex={0.29} style={styles.socialConnect}>
      
                  <View style={{alignItems:"center"}}>
             
                    <AntDesign name="car"  size={50} color="black" />
                      <Text style={styles.socialTextButtons}>Covoiturage</Text>
                 
                  </View>
              
              </Block>
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={15}>
                    Register
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        onChangeText={handleChange('name')}
                        borderless
                        placeholder="Name"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                      onChangeText={handleChange('email')}
                        borderless
                        placeholder="Email"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                         onChangeText={handleChange('password')}
                        password
                        borderless
                        placeholder="Password"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                      {/* <Block row style={styles.passwordCheck}>
                        <Text size={12} color={argonTheme.COLORS.MUTED}>
                          password strength:
                        </Text>
                        <Text bold size={12} color={argonTheme.COLORS.SUCCESS}>
                          {" "}
                          strong
                        </Text>
                      </Block> */}
                    </Block>
                    {/* <Block row width={width * 0.75}>
                      <Checkbox
                        checkboxStyle={{
                          borderWidth: 3
                        }}
                        color={argonTheme.COLORS.PRIMARY}
                        label="I agree with the"
                      />
                      <Button
                        style={{ width: 100 }}
                        color="transparent"
                        textStyle={{
                          color: argonTheme.COLORS.PRIMARY,
                          fontSize: 14
                        }}
                      >
                        Privacy Policy
                      </Button>
                    </Block> */}
                    <Block middle>
                      <Button onPress={handleSubmit}
                       color="primary" style={styles.createButton}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          CREATE ACCOUNT
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
              <Modal  visible={visibleModal} >
                <ActivityIndicator size={50} animating={true} />
              </Modal>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
      </>)}
      </Formik>
    );
  
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.57,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems:"center",
    justifyContent:"center",
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 24
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});

export default Register;
