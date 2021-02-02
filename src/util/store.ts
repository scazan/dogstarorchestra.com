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
      content_type: contentType,
      limit: 1000,
    })
  .then((response) => response.items)
  .catch((error) => {
    console.error(error)
  })
}

export const getEntries = (contentTypes: string[]) => {
  return Promise.all(contentTypes.map((contentType) => {
    return fetchEntriesForContentType(contentType);
  }));
};

export const getEntry = (id: string|number) => client.getEntry(`${id}`)
  .catch(console.error);

export const getEventsBySlug = (slug: string) => client.getEntries({content_type: 'festivalEvent', 'fields.slug[in]': slug})
  .catch(console.error);

export const getPagesBySlug = (slug: string) => client.getEntries({content_type: 'page', 'fields.slug[in]': slug})
  .catch(console.error);

export const state = {
  backgroundColor: `hsl(${parseInt((Math.random() * 357).toString(), 10)}, 100%, 92%, 1)`,
};
