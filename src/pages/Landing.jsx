import { useLoaderData } from "react-router-dom";

import axios from "axios";

import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";

const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

import { QueryClient, useQueries, useQuery } from "@tanstack/react-query";

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ["search", searchTerm || "all"],
    queryFn: async () => {
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      return response.data.drinks;
    },
  };
};

export const loader =
  (QueryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);

    const searchTerm = url.searchParams.get("search") || "";

    // console.log(response);
    // return { drinks: response.data.drinks, searchTerm };
    await QueryClient.ensureQueryData(searchCocktailsQuery(searchTerm))
    return { searchTerm };
  };

const Landing = () => {
  // const { drinks, searchTerm } = useLoaderData();
  const { searchTerm } = useLoaderData();
  // const {data:drinks, isLoading} = useQuery(searchCocktailsQuery(searchTerm))
  // console.log(drinks);
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));
  // if(isLoading) return <h4>Loading...</h4>
  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};

export default Landing;
