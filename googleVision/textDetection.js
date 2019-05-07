import googleVisionConfig from '../googleVisionConfig.js';
import axios from 'axios';

export default async function sendToGoogle(uri) {
  try {
    console.log('starting....');
    // console.log('URI', uri);
    let body = JSON.stringify({
      requests: [
        {
          features: [{ type: 'TEXT_DETECTION', maxResults: 1 }],
          image: {
            content: uri,
          },
        },
      ],
    });
    let response = await axios.post(
      'https://vision.googleapis.com/v1/images:annotate?key=' +
        googleVisionConfig.API_KEY,
      body
    );
    let responseJson = await response.json();
    console.log(responseJson);
  } catch (error) {
    console.log(error);
  }
}
