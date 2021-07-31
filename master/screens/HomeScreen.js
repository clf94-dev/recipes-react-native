import  React, {useState, useEffect,useRef} from 'react';
import {ScrollView,View, Text, Button, Image, FlatList, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
export default function HomeScreen ({navigation}){
  const {flatlistRef, categoriesListRef, areasListRef }= useRef();
  const [info, setInfo] = useState([])
  const [categoriesList, setCategoriesList] = useState([])
  const [areasList, setAreasList] = useState([])
  const [areasImagesList, setAreasImagesList] = useState([])
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
      categoriesArray = response.data.meals
    })
    .catch (error =>{
      console.log('error categories', error)
    })
    setCategoriesList(categoriesArray)
  }
  async function getAreas(){
    let areasArray = []
    let areasImagesArray =[]
    await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then (response =>{
      areasArray = response.data.meals
    })
    .catch (error =>{
      console.log('error areas', error)
    })

    for(i=0; i<areasArray.length; i+=1){
      const params ={
        a: areasArray[i].strArea
      }
      console.log('params', params)
      await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php', {params})
      .then (response =>{
console.log('response', response.data)
        areasImagesArray.push(response.data.meals[0].strMealThumb)
      })
      .catch (error =>{
        console.log('error areas', error)
      })
    }
    console.log('areasImagesArray', areasImagesArray)
    setAreasList(areasArray)
    setAreasImagesList(areasImagesArray)
  }
  useEffect(() =>{
    
    let index = 0;
    console.log('useEffect')
    
     getRecipes(index)
    getCategories()
    getAreas()
 
  },[true])
    return(
        <SafeAreaView edges={['right', 'bottom', 'left']}>
        <ScrollView>
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
<FlatList ref={categoriesListRef} horizontal showsHorizontalScrollIndicator='false' style={{maxHeight:150, marginLeft: 10}} data={categoriesList} keyExtractor={item =>item.strCategory} renderItem={({item}) =>(
  <TouchableOpacity onPress={() => navigation.navigate('Categories', {data:item.strCategory})}>
  <View >
          
          <Text style={{margin: 10,fontWeight:'bold', fontSize: 25, color: 'gray'}}>{item.strCategory}</Text>
     </View>
    </TouchableOpacity>
 )} />   

<Text style={{fontSize: 35, margin: 15, color: 'orange'}}>
    Areas
</Text>
<FlatList ref={areasListRef} horizontal showsHorizontalScrollIndicator='false' style={{maxHeight:200, width: 400, marginLeft: 10}} data={areasList} keyExtractor={item =>item.strArea} renderItem={({item, index}) =>(
  <TouchableOpacity onPress={() => navigation.navigate('Area', {data:item.strArea})}>
  <View style={{ marginBottom:20, marginLeft:20}} >
  <Text style={{position: 'absolute', top: 150, left:25,zIndex:2, fontSize: 20, fontWeight:'bold', color: 'white'}}>{areasList[index].strArea}</Text>

  <Image style={{width: 250, height: 200, borderRadius:30}}  source={{uri: areasImagesList[index]}} />
            
              </View>
    </TouchableOpacity>
 )} />   


        </ScrollView>
           </SafeAreaView>
    )
}