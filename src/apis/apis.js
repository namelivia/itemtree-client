import axios from 'axios'
export const getItem = async (itemId) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/items/${itemId}`,
  )
  return response.data
}

export const getItems = async (parentId) => {
  const params = parentId ? `?parent=${parentId}` : ''
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/items${params}`,
  )
  return response.data
}

export const putItem = async (itemId, data) => {
  const response = await axios.put(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/items/${itemId}`,
    data,
  )
  return response.data
}

export const postItem = async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/items`,
    data,
  )
  return response.data
}

export const deleteItem = async (itemId) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/items/${itemId}`,
  )
  return response.data
}

export const postImage = async (image) => {
  let formData = new FormData()
  formData.append('media', image)
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/image`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
  return response.data.location
}

export const getComments = async (itemId) => {
  const params = itemId ? `?item=${itemId}` : ''
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/comments${params}`,
  )
  return response.data
}

export const postComment = async (itemId, data) => {
  data.item_id = itemId
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/comments`,
    data,
  )
  return response.data
}
