import  React, {useState, useEffect,useRef} from 'react';
import {View, Text, Button, Image, FlatList, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
export default function HomeScreen ({navigation}){
  const flatlistRef = useRef();
  const [info, setInfo] = useState([])
  useEffect(() =>{
    async function getRecipes(index){
      let array= [];
      while(index<10){
      await axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(response=> {
        array[index] = response.data.meals[0]
        index++;
      })
      .catch(error=>{
        console.log('error', error)
      })
    }
    setInfo(array)
    }
    let index = 0;
    console.log('useEffect')
    
     getRecipes(index)
    
 
  },[true])
    return(
        <SafeAreaView edges={['right', 'bottom', 'left']}>
        <View>
        <FlatList ref={flatlistRef} horizontal showsHorizontalScrollIndicator='false' horizontal style={{maxHeight:370}} data={info} keyExtractor={item => item.idMeal} renderItem={({item}) => (
             <TouchableOpacity onPress={() => navigation.navigate('Recipe', {data:item})}>
             <View >
                     <Image style={{width: 400, height: 400}}  source={{uri:`${item.strMealThumb}`}} />
                     <Text style={{position: 'absolute', top: 315, left:25, fontSize: 20, color: 'white'}}>{item.strMeal}</Text>
                </View>
               </TouchableOpacity>
            )} />   
          <Text>
    Home
</Text>

        </View>
           </SafeAreaView>
    )
}