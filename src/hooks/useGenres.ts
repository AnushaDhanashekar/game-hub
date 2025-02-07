import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Game } from "./useGames";
import { CanceledError } from "axios";

interface Genre{
    id:number;
    name:string;
}

interface FetchGenresResponse{
    count: number;
    results: Genre[];
}

const useGeneres = () => {

const [genres, setGanres] = useState<Genre[]>([]);
const [error, setError] = useState("");
const [isLoading, setLoading] = useState(false);

useEffect(() => {
  const controller = new AbortController();
  setLoading(true);
  apiClient
    .get<FetchGenresResponse>("/genres", {signal:controller.signal})
    .then((res) => {
      setLoading(false);
      setGanres(res.data.results)
    })
    .catch((err) => {
      setLoading(false);
      if(err instanceof CanceledError)return;
      setError(err.message);
    });

    return () => controller.abort();
}, []);
return {genres, error, isLoading};
};

export default useGeneres;