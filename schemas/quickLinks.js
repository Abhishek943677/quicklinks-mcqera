import {defineField, defineType} from 'sanity'
import { CustomAsyncSelect } from '../components/AsyncSelect';

export default defineType({
  name: 'quicklinks',
  title: 'QuickLinks',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    
    defineField({
      name: 'branch',
      title: 'Branch',
      type: 'array',
        of: [{ type: 'string' }],
      options: {
        list: [],  // Initially an empty array
        url:"https://kyg93shv.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22branch%22%5D+%7B+title%7D&perspective=published",
        formatResponse: (json) => {
          // Ensure json.result is an array
          const results = Array.isArray(json.result) ? json.result : [];

          if (results.length === 0) {
            console.warn('No results found or results are not in expected format.');
          }

          // Return formatted data
          return results.map((item) => {
            if (item && typeof item.title === 'string') {
              return {
                title: item.title,
                value: item.title,
              };
            } else {
              console.warn('Unexpected item format:', item);
              return {
                title: 'Unknown branch',
                value: 'unknown-branch',
              };
            }
          });
        },
      },
      components: {
        input: CustomAsyncSelect,  // Custom input component to handle async data
      },
    }),
    defineField({
      name: 'examname',
      title: 'Exam Name',
      type: 'array',
        of: [{ type: 'string' }],
      options: {
        list: [],  // Initially an empty array
        url: 'https://kyg93shv.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22exam%22%5D+%7B+examname%7D&perspective=published',  // Your API URL
        formatResponse: (json) => {

          // Ensure json.result is an array
          const results = Array.isArray(json.result) ? json.result : [];

          if (results.length === 0) {
            console.warn('No results found or results are not in expected format.');
          }

          // Return formatted data
          return results.map((item) => {
            if (item && typeof item.examname === 'string') {
              return {
                title: item.examname,
                value: item.examname,
              };
            } else {
              console.warn('Unexpected item format:', item);
              return {
                title: 'Unknown Exam',
                value: 'unknown-exam',
              };
            }
          });
        },
      },
      components: {
        input: CustomAsyncSelect,  // Custom input component to handle async data
      },
    }),
    
    
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200)+"-"+Date.now(),
      },
    }),

    defineField({
      name: 'details',
      title: 'Details about the quicklinks',
      type: 'blockContent',
    }),

    defineField({
      name: 'question',
      title: 'Question',
      type: 'array',
      of: [{type: 'questions'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle:'category'
    },
  },
})
