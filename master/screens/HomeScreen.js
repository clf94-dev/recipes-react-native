import  React, {useState, useEffect,useRef} from 'react';
import {View, Text, Button, Image, FlatList, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
export default function HomeScreen ({navigation}){
  const flatlistRef = useRef();
  const [info, setInfo] = useState([])
  const [categoriesList, setCategoriesList] = useState([])

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
  async function getCategories(){
    let categoriesArray = []
    await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then (response =>{
      console.log('response', response)
      categoriesArray = response.data.meals
    })
    .catch (error =>{
      console.log('error categories', error)
    })
    console.log('categoriesArray', categoriesArray)
    setCategoriesList(categoriesArray)
  }
  useEffect(() =>{
    
    let index = 0;
    console.log('useEffect')
    
     getRecipes(index)
    getCategories()
 
  },[true])
    return(
        <SafeAreaView edges={['right', 'bottom', 'left']}>
        <View>
        <FlatList ref={flatlistRef} horizontal showsHorizontalScrollIndicator='false' style={{maxHeight:370}} data={info} keyExtractor={item => item.idMeal} renderItem={({item}) => (
             <TouchableOpacity onPress={() => navigation.navigate('Recipe', {data:item})}>
             <View >
                     <Image style={{width: 400, height: 400}}  source={{uri:`${item.strMealThumb}`}} />
                     <Text style={{position: 'absolute', top: 315, left:25, fontSize: 20, color: 'white'}}>{item.strMeal}</Text>
                </View>
               </TouchableOpacity>
            )} />   
          <Text style={{fontSize: 35, margin: 15, color: 'orange'}}>
    Categories
</Text>
<FlatList ref={flatlistRef} horizontal showsHorizontalScrollIndicator='false' style={{maxHeight:150, marginLeft: 10}} data={categoriesList} keyExtractor={item =>item.strCategory} renderItem={({item}) =>(
  <TouchableOpacity onPress={() => navigation.navigate('Categories', {data:item.strCategory})}>
  <View >
          
          <Text style={{margin: 10,fontWeight:'bold', fontSize: 25, color: 'gray'}}>{item.strCategory}</Text>
     </View>
    </TouchableOpacity>
 )} />   



        </View>
           </SafeAreaView>
    )
}