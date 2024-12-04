import { Category, SearchMeals } from "../types";
import { Heading, Link, SkeletonText, VStack } from "@chakra-ui/react";

type Props = {
  categories: Category[];
  loading: boolean;
  selectedCateogory: Category;
  setSelectedCateogory: (selectedCateogory: Category) => void;
  changeCategory: (data: SearchMeals) => void;
};

const selectedProps = {
  bgColor: "blue.400",
  color: "white",
  fontWeight: "bold",
};
function SideNav({
  loading,
  categories,
  selectedCateogory,
  setSelectedCateogory,
  changeCategory,
}: Props) {
  return loading ? (
    <SkeletonText mt="1" noOfLines={8} spacing="6" skeletonHeight="2" />
  ) : (
    <>
      <Heading color="blue.400" fontSize={12} fontWeight="bold" mb={4}>
        CATEGORÍAS
      </Heading>
      <VStack align="stretch">
        {categories.map((c: Category) => (
          <Link
            onClick={() => {
              setSelectedCateogory(c);
              changeCategory({ search: c.strCategory });
            }}
            px={2}
            py={1}
            borderRadius={5}
            key={c.strCategory}
            _hover={{ textDecoration: "none" }}
            {...(selectedCateogory.strCategory == c.strCategory &&
              selectedProps)}
          >
            {c.strCategory}
          </Link>
        ))}
      </VStack>
    </>
  );
}

export default SideNav;
