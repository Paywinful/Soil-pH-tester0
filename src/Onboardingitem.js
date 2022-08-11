import React from 'react';
import { StyleSheet, Text, View, Image, userWindowDimensions, useWindowDimensions, Button } from 'react-native';


export default OnboardingItem =({item})=> {
  const {width} = useWindowDimensions();  
  
  return (
     <View style={[styles.container, {width}]}>
        <View style={styles.con}>
         <Image source={ item.image} style={styles.image}/>
       </View>
     <View style={{flex:0.3}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
     </View>
     <View style={styles.button1}>
      {/* <Button title='Next' /> */}
     </View>
     </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },

  image:{
    
    width: '100%',
    maxHeight: '80%',
    justifyContent: 'center',
    borderRadius: 30,
  },
  con: {
    width: "80%",
  },

  title: {
    fontWeight: '300',
    fontSize: 28,
    marginTop: -30,
    // marginBottom: 10,
    color: '#493d8a',
    textAlign: 'center',
  },

  description: {
    // fontWeight: '300',
    color: '#62656b',
    justifyContent: 'center',
    textAlign: 'center',
    // paddingHorizontals: 64,
  },
});