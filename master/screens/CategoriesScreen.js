import axios from 'axios';
import  React , {useState, useEffect, useRef} from 'react';
import {View, Text, Button, Image, FlatList, TouchableOpacity, SliderComponent} from 'react-native'
//import { FlatList , TouchableOpacity} from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function categoriesScreen ({navigation,route}){
    const categoryName = route.params.data;
    const [categoryList, setCategoryList] = useState([])
    const [searchInfo, setSearchInfo] = useState({})

    async function getRecipesCategory(categoryName){
        const params = {
c: categoryName,
        }
        await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php',  {params})
        .then(response =>{
            setCategoryList(response.data.meals)})
        .catch(error => console.log('error get category recipes', error))
       
    }
    async function getInfoRecipe(name) {
        let res=[]
        const params={
          s: name
        }
           await axios.get('https://www.themealdb.com/api/json/v1/1/search.php', {params})
            .then(response =>
             ( res = response.data.meals[0]))
 
            .catch(error => console.log('error searchRecipeInfo', error))
            setSearchInfo(res)

            }

    useEffect(()=>{
        getRecipesCategory(categoryName)
        setSearchInfo({})
    }, [true])

    useEffect(()=>{
      
    }, [categoryList, searchInfo])
    useEffect(()=>{
       if(searchInfo)
        navigation.navigate('Recipe', {data:searchInfo}) 
    },[searchInfo])
    const flatlistRef = useRef();
    return(
        <SafeAreaView edges={['right', 'bottom', 'left', 'top']}>
        <View>
<Text style={{fontSize: 35, margin: 15, color: 'orange'}}>
    {categoryName}
</Text>
<FlatList ref={flatlistRef} vertical showsVerticalScrollIndicator='false' /* style={{maxHeight:370}} */ data={categoryList} keyExtractor={item => item.idMeal} renderItem={({item}) => (
             <TouchableOpacity onPress={async () => {
                await getInfoRecipe(item.strMeal)
            
         
                }}>
             <View >
                     <Image style={{width: 400, height: 400}}  source={{uri:`${item.strMealThumb}`}} />
                     <Text style={{position: 'absolute', top: 315, left:25, fontSize: 20, color: 'white'}}>{item.strMeal}</Text>
                </View>
               </TouchableOpacity>
            )} /> 

        </View>
        </SafeAreaView>
    )
}