import axios from 'axios';
import  React, {useEffect, useRef, useState} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import {View, Text, Button, Image, FlatList, ScrollView, Animated, Dimensions} from 'react-native'
import { set } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import SlidingUpPanel from "rn-sliding-up-panel";
const { height } = Dimensions.get("window");


export default function RecipeScreen ({route}){
   
       /*  const draggableRange={ top: height   +180 - 64 , bottom: 180 }
       */
    
     /*  _draggedValue = new Animated.Value(180); */
    const data = route.params;
    let instructArray = [];
    let index = 0;
    let ingredientsArray= []
    
    if(data) {
   while(index<20){
    ingredient = 'strIngredient' + parseInt(index+1 )
    amount = 'strMeasure' + parseInt(index+1)
if(data.data[ingredient] && data.data[amount]){ingredientsArray[index] = {ingredient: data.data[ingredient], amount:data.data[amount]}
  index++;}
else index=20;


}
instructArray = data.data.strInstructions.split('.')
}

/* const { top, bottom } = draggableRange;

const backgoundOpacity = this._draggedValue.interpolate({
  inputRange: [height - 48, height],
  outputRange: [1, 0],
  extrapolate: "clamp"
});

const iconTranslateY = this._draggedValue.interpolate({
  inputRange: [height - 56, height, top],
  outputRange: [0, 56, 180 - 32],
  extrapolate: "clamp"
});

const textTranslateY = this._draggedValue.interpolate({
  inputRange: [bottom, top],
  outputRange: [0, 8],
  extrapolate: "clamp"
});

const textTranslateX = this._draggedValue.interpolate({
  inputRange: [bottom, top],
  outputRange: [0, -112],
  extrapolate: "clamp"
});

const textScale = this._draggedValue.interpolate({
  inputRange: [bottom, top],
  outputRange: [1, 0.7],
  extrapolate: "clamp"
}); */
    //const flatlistRef = useRef();
    console.log('data.data.strYoutube', data.data.strYoutube)
const urlYoutubeArray =data.data.strYoutube.split('=') 
    return(
        <SafeAreaView edges={['right', 'bottom', 'left']} >
          <View>
        <ScrollView>
          <Image style={{width: 400, height: 500}}  source={{uri:`${data.data.strMealThumb}`}} />
                     <Text  style={{ fontSize: 30,paddingTop: 20, paddingLeft:10, color: 'orange'}} >{data.data.strMeal} ({data.data.strArea})</Text>
                    <Text style={{ fontSize: 25,paddingTop: 20, paddingLeft:10, color: 'gray', textDecorationLine:'underline'}}>Ingredients:</Text>

      
           { ingredientsArray.map(item => 
            <Text style={{ fontSize: 18,paddingTop: 20, paddingLeft:10, color: 'gray'}}>{item.amount} of <Text style={{color:'orange'}}>{item.ingredient}</Text> </Text>
)}

<Text style={{fontSize: 25, color: 'gray',marginTop:15, marginLeft:5,marginBottom:10, textDecorationLine:'underline'}}> Steps</Text>

<YoutubePlayer

        height={220}
        play={false}
        videoId={urlYoutubeArray[1]}
      />
{ instructArray.map(item => 
            <Text style={{ fontSize: 18,paddingTop: 20, paddingLeft:15, color: 'gray'}}>{item} </Text>
)}
{/* <Text onPress={() => this._panel.show(360)}>Steps</Text>
  <SlidingUpPanel
          ref={c => (this._panel = c)}
          draggableRange={draggableRange}
          animatedValue={this._draggedValue}
          snappingPoints={[360]}
          height={height + 180 }
          friction={0.5}
        >
          <View  style={styles.panel} >
            <Animated.View
              style={[
               // styles.iconBg,
                {
                  opacity: backgoundOpacity,
                  transform: [{ translateY: iconTranslateY }]
                }
              ]}
            />
            <View /* style={styles.panelHeader} >
              <Animated.View
                style={{
                  transform: [
                    { translateY: textTranslateY },
                    { translateX: textTranslateX },
                    { scale: textScale }
                  ]
                }}
              >
                <Text /* style={styles.textHeader} >Steps</Text>
              </Animated.View>
            </View>
            <View /* style={styles.container} >
              <Text>1</Text>
              <Text>1</Text>
            </View>
          </View>
        </SlidingUpPanel> */}
   
        </ScrollView>
        </View>
        </SafeAreaView>
    )
}