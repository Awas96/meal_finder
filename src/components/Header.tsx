import {
  Button,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { IoMdSearch } from "react-icons/io";
import { useForm } from "react-hook-form";
import { SearchMeals } from "../types";

type Props = {
  onSubmit: (data: SearchMeals) => void;
};

function Header({ onSubmit }: Props) {
  const { register, formState, handleSubmit } = useForm<SearchMeals>();
  return (
    <Container mt={"1"} maxW="3xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <IoMdSearch color={"gray"} />
          </InputLeftElement>
          <Input
            mr={2}
            focusBorderColor={
              !!formState.errors.search ? "crimson" : "blue.400"
            }
            isInvalid={!!formState.errors.search}
            {...register("search", { required: true })}
            type="text"
            placeholder="Intenta con 'chicken' o 'beans'..."
          />
          <Button type={"submit"} bgColor={"blue.400"} color={"white"}>
            Buscar
          </Button>
        </InputGroup>
      </form>
    </Container>
  );
}

export default Header;
