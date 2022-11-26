import { useState } from "react";
import { ResponseJson } from "../../shared/api";


export default function useRequestManager() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchResult, setSearchResult] = useState({ images: null, add: false })

  const preRequest = () => {
    if (isLoading) return
    setIsLoading(true)
  }

  const postRequest = (json: ResponseJson, add: boolean) => {
    if (json.images) {
      setSearchResult({ images: json.images, add: add })
    }
    setIsLoading(false)
  }

  return {
    isLoading,
    setIsLoading,
    searchResult,
    setSearchResult,
    preRequest,
    postRequest,
  }
}