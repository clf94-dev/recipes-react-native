import  React, {useState, useEffect} from 'react';
import {View, Text, Button, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
export default function HomeScreen ({navigation}){

  const [info, setInfo] = useState([])
  useEffect(() =>{
    async function getRecipes(index){
      let array= [];
      while(index<11){
      await axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(response=> {
        console.log('response', response)
array[index] = response.data.meals[0].strMealThumb
        //setInfo([...info, response.data.meals[0].strMealThumb])
        index++;
      })
      .catch(error=>{
        console.log('error', error)
      })
    }
    console.log('array', array)
    setInfo(array)
    }
    let index = 0;
    console.log('useEffect')
    
      console.log('index', index)
     getRecipes(index)
    
 
  },[true])
    return(
        <SafeAreaView edges={['right', 'bottom', 'left']}>
        <View>
            <Image style={{width:'100%', height: 350, borderBottomLeftRadius:50,borderBottomRightRadius:50}} source={info[1]}/>
<Text>
    Home
</Text>

        </View>
           </SafeAreaView>
    )
}