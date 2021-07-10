import * as React from 'react';
import {View, Text, Button, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RecipeScreen ({route}){
    data = route.params;
console.log('data', data)
    return(
        <SafeAreaView edges={['right', 'bottom', 'left']}>
        <View>
        <Image style={{width: 400, height: 500}}  source={{uri:`${data.data.strMealThumb}`}} />
                     <Text  style={{ fontSize: 30,paddingTop: 20, paddingLeft:10, color: 'orange'}} >{data.data.strMeal} ({data.data.strArea})</Text>
              <Text style={{ fontSize: 20,paddingTop: 20, paddingLeft:10, color: 'gray'}}>Ingredients:</Text>

        </View>
        </SafeAreaView>
    )
}