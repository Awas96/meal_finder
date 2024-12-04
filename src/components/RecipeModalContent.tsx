import { MealDetails } from "../types";
import {
  Heading,
  Image,
  ListItem,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  OrderedList,
  Text,
} from "@chakra-ui/react";

type Props = {
  data: MealDetails;
};
const joinIngredients = (data: MealDetails) => {
  const ingredients = [];
  for (let i = 1; i < 20; i++) {
    const ingredient = data[`strIngredient${i}`];
    const measure = data[`strMeasure${i}`];
    if (ingredient !== "") {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }
  return ingredients;
};
function RecipeModalContent({ data }: Props) {
  const ingredients = joinIngredients(data);
  return (
    <>
      <ModalHeader>{data.strMeal}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Image
          width={"100%"}
          borderRadius={"lg"}
          src={data.strMealThumb}
        ></Image>
        <Heading mt={"4"} mb="4" size={"md"}>
          Ingredientes
        </Heading>
        <OrderedList mb={"4"}>
          {ingredients.map((ingredient) => (
            <ListItem key={`ingredient${ingredient}`}>{ingredient}</ListItem>
          ))}
        </OrderedList>

        <Text whiteSpace={"pre-line"}>{data.strInstructions}</Text>
      </ModalBody>
    </>
  );
}

export default RecipeModalContent;
