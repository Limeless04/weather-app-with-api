<script setup>
import Navbar from "./components/Navbar.vue";
import { reactive, ref, computed } from "@vue/reactivity";
import CityList from "./components/ListCity.vue";
import Sunny from '../src/assets/animated/day.svg'
import Rainy from '../src/assets/animated/rainy-6.svg'
import Cloudy from '../src/assets/animated/cloudy.svg'
import Snow from '../src/assets/animated/snowy-4.svg'
import Storm from '../src/assets/animated/thunder.svg'

const apiKey = import.meta.env.VITE_API_KEY;
const searchValue = ref("");
const cityLocation = ref(null);
const cityName = ref("");
const cityCountry = ref("");
const isEmpty = ref(false);
const weatherIcon = ref()
const dayWeatherIcon = ref()
const nightWeatherIcon = ref()

const clodyNum = [6,7 ,8,11 ,20 ,23,35 ,38]
const rainyNum = [12, 13, 14, 39, 40,18, 19 , 20, 21, 43]
const sunnyNum = [1, 2, 3,14, 17, 21]
const snowNum = [22, 23, 29, 44]
const stormNum = [15, 16, 17, 41, 42]
// console.log(apiKey)
const cityStore = reactive({
  list: [],
});


const weatherStore = reactive({
  currentList: [],
  hourlyList: [],
  oneDayList: [],
  fiveDayList: [],
  twelveHourList: [],
});

const dateNow = computed(() => {
  return new Date( weatherStore.oneDayList.Date)
})
const fetchCityData = async () => {
  const cityData = await fetch(
    "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=" +
      `${apiKey}` +
      "&q=" +
      `${searchValue.value}`
  ).then((res) => res.json());
  cityStore.list = cityData;
};

const logLocation = ({ key, name, country }) => {
  // console.log(key)
  // console.log(name)
  getCurrentWeather(key);
  getOneDailyForecast(key);
  cityName.value = name;
  cityCountry.value = country;
  cityStore.list = "";
  searchValue.value = "";
  isEmpty.value = true;
  // weatherStore.cityDetail.cityName = name
  // weatherStore.cityDetail.country = country
};

const getDayForecastIcon = async (e) => {
  if(sunnyNum.includes(e)){
    dayWeatherIcon.value = Sunny
  }
  if(clodyNum.includes(e)){
    dayWeatherIcon.value = Cloudy
  }
  if(rainyNum.includes(e)){
    dayWeatherIcon.value = Rainy
  }
  if(snowNum.includes(e)){
    dayWeatherIcon.value = Snow
  }
  if(stormNum.includes(e)){
    dayWeatherIcon.value = Storm
  }  
}
const getNightForecastIcon = async (e) => {
  if(sunnyNum.includes(e)){
    nightWeatherIcon.value = Sunny
  }
  if(clodyNum.includes(e)){
    nightWeatherIcon.value = Cloudy
  }
  if(rainyNum.includes(e)){
    nightWeatherIcon.value = Rainy
  }
  if(snowNum.includes(e)){
    nightWeatherIcon.value = Snow
  }
  if(stormNum.includes(e)){
    nightWeatherIcon.value = Storm
  }  
}

const getWeatherIcon = async (e) => {
  if(sunnyNum.includes(e)){
    weatherIcon.value = Sunny
  }
  if(clodyNum.includes(e)){
    weatherIcon.value = Cloudy
  }
  if(rainyNum.includes(e)){
    weatherIcon.value = Rainy
  }
  if(snowNum.includes(e)){
    weatherIcon.value = Snow
  }
  if(stormNum.includes(e)){
    weatherIcon.value = Storm
  }
}

const getCurrentWeather = async (cityKey) => {
  try {
    const currentWeather = await fetch(
      "http://dataservice.accuweather.com/currentconditions/v1/" +
        `${cityKey}` +
        "?apikey=" +
        `${apiKey}`
    ).then((res) => res.json());
    weatherStore.currentList = currentWeather[0];
    // console.log(weatherStore.currentList)
    getWeatherIcon(weatherStore.currentList.WeatherIcon)
  } catch (err) {
    console.log(err);
  }
};
    const getOneDailyForecast = async (cityKey) => {
        try{
            const oneDayWeather = await fetch('http://dataservice.accuweather.com/forecasts/v1/daily/1day/' + `${cityKey}`+'?apikey=' + `${apiKey}`+ '&metric=true').then((res) => res.json())
            weatherStore.oneDayList = oneDayWeather.DailyForecasts[0]
            console.log(weatherStore.oneDayList)
            getDayForecastIcon(weatherStore.oneDayList.Day.Icon)
            getNightForecastIcon(weatherStore.oneDayList.Night.Icon)
        }catch(err){
            console.log(err)
        }
    }

</script>

<template>
  <Navbar />

  <div class="max-w-3xl mx-auto mt-5">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div
          class="
            absolute
            inset-y-0
            left-0
            flex
            items-center
            pl-3
            pointer-events-none
          "
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class="
            block
            w-full
            p-4
            pl-10
            text-sm text-gray-900
            border border-gray-300
            rounded-lg
            bg-gray-50
            focus:ring-blue-500 focus:border-blue-500
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          "
          placeholder="Search Mockups, Logos..."
          required
          v-model="searchValue"
        />
        <button
          type="submit"
          class="
            text-white
            absolute
            right-2.5
            bottom-2.5
            bg-blue-700
            hover:bg-blue-800
            focus:ring-4 focus:outline-none focus:ring-blue-300
            font-medium
            rounded-lg
            text-sm
            px-4
            py-2
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
          "
          @click="fetchCityData"
        >
          Search
        </button>
      </div>


   
  </div>
  <div v-for="city in cityStore.list"
      :key="city.Key">
    <CityList
      :cityName="city.LocalizedName"
      :cityKey="city.Key"
      :country="city.Country.LocalizedName"
      @keyLocation="logLocation"
    />
  </div>

    

  <div class="max-w-3xl mx-auto mt-5">
    <!-- {{ weatherStore.currentList}}  -->
    <div
      v-if="weatherStore"
      class="flex justify-between rounded-lg p-6"
      :class="{ 'bg-slate-400': isEmpty }"
    >
      <div class="flex flex-col">
        <div class="text-6xl font-bold">
          {{ cityName }}
        </div>
        <div class="text-3xl font-normal">
          {{ cityCountry }}
        </div>
        <div class="text-xl font-light">
          {{dateNow.toDateString()}}

        </div>
      </div>

      <div class="flex flex-col">
        <img :src="weatherIcon">
        <div v-if="weatherStore.currentList.Temperature">
          {{ weatherStore.currentList.WeatherText }}
          {{ weatherStore.currentList.Temperature.Metric.Value }}{{weatherStore.currentList.Temperature.Metric.Unit }}°
        </div>
      </div>
    </div>
    <!-- {{ weatherStore.currentList[0].WeatherText}}   -->
  </div>

  <div class="max-w-3xl mx-auto mt-5" v-if="weatherStore.oneDayList.Day">
    <div
      class="flex justify-between rounded-lg p-5"
      :class="{ 'bg-slate-400': isEmpty }">
      <div class="flex flex-col items-center w-1/4">
        <p  class="text-2xl font-semibold">Day</p>
        <img :src="dayWeatherIcon" class="w-full">
        <div class="text-2xl font-semibold">
          {{weatherStore.oneDayList.Day.PrecipitationType
          }}
        </div>
      </div>
      <div class="flex flex-col items-center w-1/4">
        <p  class="text-2xl font-semibold">Night</p>
        <img :src="nightWeatherIcon" class="w-full">
        <div class="text-2xl font-semibold">
          {{ weatherStore.oneDayList.Night.IconPhrase }}
        </div>
      </div>
    </div>
    <div class="flex justify-center ">
      <p class="text-xl font-semibold">

      </p>
    </div>
  </div>
</template>
