import * as contentful from 'contentful'
import config from '../config';

const client = contentful.createClient({
  accessToken: config.ACCESS_TOKEN,
  space: config.SPACE_ID,
});

export const fetchContentTypes = () => {
  return client.getContentTypes()
  .then((response) => response.items)
  .catch((error) => {
    console.error(error)
  })
};

export const fetchEntriesForContentType = (contentType: any) => {
  return client.getEntries({
      content_type: contentType
    })
  .then((response) => response.items)
  .catch((error) => {
    console.error(error)
  })
}

export const displayEntries = (contentTypes: string[]) => {
  return Promise.all(contentTypes.map((contentType) => {
    return fetchEntriesForContentType(contentType);
  }));
}
