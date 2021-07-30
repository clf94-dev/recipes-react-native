import  React, {useRef} from 'react';
import {View, Text, Button, Image, FlatList, ScrollView, Animated, Dimensions} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

import SlidingUpPanel from "rn-sliding-up-panel";
const { height } = Dimensions.get("window");


export default function RecipeScreen ({route}){
    
        const draggableRange={ top: height /*  +180 - 64 */, bottom: 180 }
      
    
      _draggedValue = new Animated.Value(180);
    data = route.params;
    let index = 0;
    let ingredientsArray= []
    while(index<20){
        ingredient = 'strIngredient' + parseInt(index+1 )
        console.log('ingredient', ingredient)
        amount = 'strMeasure' + parseInt(index+1)
if(data.data[ingredient] && data.data[amount]){ingredientsArray[index] = {ingredient: data.data[ingredient], amount:data.data[amount]}
    index++;}else index=20;

}

const { top, bottom } = draggableRange;

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
});
    //const flatlistRef = useRef();
    return(
        <SafeAreaView edges={['right', 'bottom', 'left']} >
        <ScrollView>
        <Image style={{width: 400, height: 500}}  source={{uri:`${data.data.strMealThumb}`}} />
                     <Text  style={{ fontSize: 30,paddingTop: 20, paddingLeft:10, color: 'orange'}} >{data.data.strMeal} ({data.data.strArea})</Text>
              <Text style={{ fontSize: 20,paddingTop: 20, paddingLeft:10, color: 'gray'}}>Ingredients:</Text>
        
           { ingredientsArray.map(item => 
            <Text style={{ fontSize: 18,paddingTop: 20, paddingLeft:10, color: 'gray'}}>{item.amount} of <Text style={{color:'orange'}}>{item.ingredient}</Text> </Text>
)} 
 <Text onPress={() => this._panel.show(360)}>Steps</Text>
 <SlidingUpPanel
          ref={c => (this._panel = c)}
          draggableRange={draggableRange}
          animatedValue={this._draggedValue}
          snappingPoints={[360]}
          height={height /* + 180 */}
          friction={0.5}
        >
          <View /* style={styles.panel} */>
            <Animated.View
              style={[
               // styles.iconBg,
                {
                  opacity: backgoundOpacity,
                  transform: [{ translateY: iconTranslateY }]
                }
              ]}
            />
            <View /* style={styles.panelHeader} */>
              <Animated.View
                style={{
                  transform: [
                    { translateY: textTranslateY },
                    { translateX: textTranslateX },
                    { scale: textScale }
                  ]
                }}
              >
                <Text /* style={styles.textHeader} */>Steps</Text>
              </Animated.View>
            </View>
            <View /* style={styles.container} */>
              <Text>1</Text>
              <Text>1</Text>
            </View>
          </View>
        </SlidingUpPanel>
     
        </ScrollView>
        </SafeAreaView>
    )
}