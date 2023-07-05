import { useRoute } from "vue-router";
import {onBeforeRouteUpdate} from 'vue-router'
import { onMounted, ref } from "vue";
import { getCategoryAPI } from "@/apis/category";
export function useCategory(){
    const categoryData = ref({});
const route = useRoute();

const getCategoryData = async (id=route.params.id) => {
  const res = await getCategoryAPI(id);
  categoryData.value = res.result;
};
onMounted(() => {
  getCategoryData();
});
onBeforeRouteUpdate((to)=>{
    getCategoryData(to.params.id)
})
 return {
    categoryData
 }

}