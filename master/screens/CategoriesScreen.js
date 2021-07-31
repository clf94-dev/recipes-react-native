import axios from 'axios';
import  React , {useState, useEffect, useRef} from 'react';
import {View, Text, Button, Image, FlatList, TouchableOpacity} from 'react-native'
//import { FlatList , TouchableOpacity} from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function categoriesScreen ({navigation,route}){
    const categoryName = route.params.data;
    const [categoryList, setCategoryList] = useState([])

    async function getRecipesCategory(categoryName){
        console.log('categoryName', categoryName)
        const params = {
c: categoryName,
        }
        await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php',  {params})
        .then(response =>{
            console.log('response', response)
            setCategoryList(response.data.meals)})
        .catch(error => console.log('error get category recipes', error))
       
    }
    useEffect(()=>{
        getRecipesCategory(categoryName)
    }, [true])

    useEffect(()=>{
        console.log('categoryList', categoryList)
    }, [categoryList])
    const flatlistRef = useRef();
    return(
        <SafeAreaView edges={['right', 'bottom', 'left', 'top']}>
        <View>
<Text style={{fontSize: 35, margin: 15, color: 'orange'}}>
    {categoryName}
</Text>
<FlatList ref={flatlistRef} vertical showsVerticalScrollIndicator='false' /* style={{maxHeight:370}} */ data={categoryList} keyExtractor={item => item.idMeal} renderItem={({item}) => (
             <TouchableOpacity onPress={() => navigation.navigate('Recipe', {data:item})}>
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