import useSWR from 'swr'
import axios from 'axios'

const fetcher = (url) => axios.get(url).then((res) => res.data)

export default function useUser() {
  const { data, error } = useSWR('/api/my/profile', fetcher)

  return {
    user: data?.user || null,
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message
  }
}
