import "./App.css";
import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import Header from "./components/Header.tsx";
import SideNav from "./components/SideNav.tsx";
import MainContent from "./components/MainContent.tsx";
import { useState } from "react";
import { Category, Meal, MealDetails, SearchMeals } from "./types";
import useHttpData from "./hooks/useHttpData.ts";
import axios from "axios";
import RecipeModal from "./components/RecipeModal.tsx";
import useFetch from "./hooks/useFetch.ts";

const baseUrl = "https://www.themealdb.com/api/json/v1/1/";
const url = `${baseUrl}list.php?c=list`;

const makeMealUrl = (category: Category) =>
  `${baseUrl}filter.php?c=${category.strCategory}`;

const defaultCategory = {
  strCategory: "Beef",
};

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedCateogory, setSelectedCateogory] = useState<Category>({
    strCategory: "Beef",
  });

  const { loading, data } = useHttpData<Category>(url);

  const {
    loading: loadingMeal,
    data: dataMeal,
    setData: setMeals,
    setLoading: setLoadingMeal,
  } = useHttpData<Meal>(makeMealUrl(defaultCategory));

  const searchApi = (searchMeal: SearchMeals) => {
    console.log(searchMeal);
    const url = `${baseUrl}search.php?s=${searchMeal.search}`;
    setLoadingMeal(true);
    axios
      .get<{ meals: Meal[] }>(url)
      .then(({ data }) => {
        setMeals(data.meals);
      })
      .finally(() => setLoadingMeal(false));
  };

  const {
    fetch,
    loading: loadingMealDetails,
    data: mealDetailData,
  } = useFetch<MealDetails>();
  const searchMealDetails = (meal: Meal) => {
    onOpen();
    fetch(`${baseUrl}lookup.php?i=${meal.idMeal}`);
  };

  return (
    <>
      <Grid
        templateAreas={`"header header"
                  "nav main"`}
        gridTemplateRows={"60px 1fr"}
        gridTemplateColumns={{ sm: `0 1fr`, md: `250px 1fr` }}
        fontSize={14}
      >
        <GridItem
          zIndex={1}
          pos={"sticky"}
          top={0}
          pt="7px"
          boxShadow={"lg"}
          bg="white"
          area={"header"}
        >
          <Header onSubmit={searchApi} />
        </GridItem>
        <GridItem
          pos="sticky"
          top="60px"
          left={0}
          p="5"
          bg=""
          area={"nav"}
          height="calc(100vh - 60px)"
          overflowY={"auto"}
        >
          <SideNav
            categories={data}
            loading={loading}
            selectedCateogory={selectedCateogory}
            setSelectedCateogory={setSelectedCateogory}
            changeCategory={searchApi}
          />
        </GridItem>
        <GridItem p="4" bg="gray.100" area={"main"}>
          <MainContent
            openRecipe={searchMealDetails}
            loading={loadingMeal}
            meals={dataMeal}
          />
        </GridItem>
      </Grid>
      <RecipeModal
        data={mealDetailData}
        loading={loadingMealDetails}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export default App;
