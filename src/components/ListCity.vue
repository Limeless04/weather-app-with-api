<template>
  <div class="flex justify-center text-center max-w-3xl mx-auto ">
    <ul
      class="
        grow
        p-4
        align-middleblock
        w-full
        hover:cursor-pointer
        hover:bg-gray-800
        text-sm text-gray-900
        bg-gray-50
        focus:ring-blue-500 focus:border-blue-500
        dark:bg-gray-700
        dark:placeholder-gray-400
        dark:text-white
        dark:focus:ring-blue-500
        dark:focus:border-blue-500

      "
    >
      <li @click="getKeyLocation" class="text-md font-light bg-grey ">
        <a class="bg-blue-700 rounded-lg p-1 mx-3">
            {{ cityName }}
        </a>
        <a class="bg-blue-700 rounded-lg p-1">
            {{ cityKey }}
        </a>
        <a class="bg-blue-700 rounded-lg p-1 mx-3">
            {{ country }}
        </a>
        
    </li>
    </ul>
  </div>

  
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
export default {
  props: [
    "cityName",
    "cityKey",
    "key",
    "cityAdmin",
    "cityLat",
    "cityLong",
    "country",
  ],
  setup(props, context) {
    const cityKey = ref("");
    const cityName = ref("");
    const country = ref("");
    const apiKey = import.meta.env.VITE_API_KEY;

    const weatherStore = reactive({
      currentList: [],
      hourlyList: [],
      oneDayList: [],
      fiveDayList: [],
      twelveHourList: [],
    });

    const getKeyLocation = () => {
      cityKey.value = props.cityKey;
      cityName.value = props.cityName;
      country.value = props.country;
      // // console.log(cityKey)
      // console.log("Click")
      context.emit("keyLocation", {
        key: cityKey.value,
        name: cityName.value,
        country: country.value,
      });
      // console.log(getCurrentWeater(cityKey.value))

      // getOneDailyForecast(cityKey.value)
      // getFiveDailyForecast(cityKey.value)
      // getTwelveHourForecast(cityKey.value)
      // console.log(current.value)
      // console.log(oneDay.value)
      // console.log(fiveDay.value)
      // console.log(twelveHour.value)
    };
    // const getCurrentWeater = async (cityKey) => {
    //     try{
    //         const currentWeather = await fetch('http://dataservice.accuweather.com/currentconditions/v1/' + `${cityKey}`+'?apikey=' + `${apiKey}`).then((res) => res.json())
    //         weatherStore.currentList = currentWeather
    //         // console.log(weatherStore.currentList)
    //     }catch(err){
    //         console.log(err)
    //     }
    // }
    // const getTwelveHourForecast = async (cityKey) => {
    //     try{
    //         const twelveHourWeather = await fetch('http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/' + `${cityKey}`+'?apikey=' + `${apiKey}`).then((res) => res.json())
    //         weatherStore.twelveHourList = twelveHourWeather
    //     }catch(err){
    //         console.log(err)
    //     }
    // }


    // const getFiveDailyForecast = async (cityKey) => {
    //     try{
    //         const fiveDayWeather = await fetch('http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + `${cityKey}`+'?apikey=' + `${apiKey}`+ '&metric=true').then((res) => res.json())
    //         weatherStore.fiveDayList = fiveDayWeather
    //     }catch(err){
    //         console.log(err)
    //     }
    // }
    return {
      getKeyLocation,
    };
  },
};
</script>

<style>
</style>