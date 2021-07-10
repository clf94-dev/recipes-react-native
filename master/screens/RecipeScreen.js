import  React, {useRef} from 'react';
import {View, Text, Button, Image, FlatList, ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RecipeScreen ({route}){
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
 
     
        </ScrollView>
        </SafeAreaView>
    )
}