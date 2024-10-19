import Axios from 'axios'

// const BASE_URL = process.env.NODE_ENV === 'production'
//     ? ''
//     : '//localhost:3001'
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3001/api/'
    
var axios = Axios.create({
  withCredentials: true
})

export const boundService = {
  postBoundToAlgoquest
}

async function postBoundToAlgoquest(mainBound,bounds){
  const apiUrl = `${BASE_URL}algoquest`;

  // Data to send in the request body
  const data = {mainBound,bounds };
  
  // Make a POST request
  return axios.post(apiUrl, data)
    .then((response) => {
      console.log('Post created successfully:', response.data);
      return response.data
    })
    .catch((error) => {
      console.error('Error creating post:', error.message);
    });
}