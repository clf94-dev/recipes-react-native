import axios from 'axios';
import  React , {useState, useEffect, useRef} from 'react';
import {View, Text, Button, Image, FlatList, TouchableOpacity, SliderComponent} from 'react-native'
//import { FlatList , TouchableOpacity} from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function areaScreen ({navigation,route}){
    const {data, area} = route.params;
    const [searchInfo, setSearchInfo] = useState({})
   
    const flatlistRef = useRef();
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
                if(searchInfo.idMeal)
                 navigation.navigate('Recipe', {data:searchInfo}) 
             },[searchInfo])
    return(
        <SafeAreaView edges={['right', 'bottom', 'left', 'top']}>
        <View>
<Text style={{fontSize: 35, margin: 15, color: 'orange'}}>
    {area}
</Text>
<FlatList  ref={flatlistRef} vertical showsVerticalScrollIndicator='false' /* style={{maxHeight:370}} */ data={data} keyExtractor={item => item.idMeal} renderItem={({item}) => (
             <TouchableOpacity onPress={async () => {
                await getInfoRecipe(item.strMeal)
            
         
                }}>
             <View style={{maxWidth: 250, flexWrap: 'wrap'}}>
                     <Image style={{width: 350, height: 400, borderRadius:30, marginBottom:20, marginLeft:20}}  source={{uri:`${item.strMealThumb}`}} />
                     <Text style={{position: 'absolute', top: 315, left:35,fontWeight:'bold' ,numberOfLines:2,fontSize: 20, color: 'white'}}>{item.strMeal}</Text>
                </View>
               </TouchableOpacity>
            )} /> 

        </View>
        </SafeAreaView>
    )
}