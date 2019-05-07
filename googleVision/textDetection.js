import googleVisionConfig from '../googleVisionConfig.js';

export default async function sendToGoogle() {
  try {
    console.log('starting....');
    this.setState({ uploading: true });
    let { image } = this.state;
    let body = JSON.stringify({
      requests: [
        {
          features: [{ type: 'TEXT_DETECTION', maxResults: 1 }],
          image: {
            content: image.base64,
          },
        },
      ],
    });
    let response = await fetch(
      'https://vision.googleapis.com/v1/images:annotate?key=' +
        googleVisionConfig.API_KEY,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: body,
      }
    );
    let responseJson = await response.json();
    this.setState({
      googleResponse: responseJson,
      uploading: false,
    });
    console.log(this.state.googleResponse.responses[0].fullTextAnnotation.text);
  } catch (error) {
    console.error(error);
  }
}
