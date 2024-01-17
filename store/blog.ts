import { create } from 'zustand'
import { Backend_URL } from '@/lib/Contants';

export const BlogState = create((set, get) => ({
  posts: [],

  filter: 'All',
  setFilter: (newFilter: any) => set({ filter: newFilter }),
  toggleChecked: (id: any) => {
    // @ts-ignore
    const newPosts = get().posts.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item,
    );
    set({ posts: newPosts });
  },


  getData: async () => {
    try {
      const response = await fetch(Backend_URL + '/blog', );
      if (!response.ok) {
        throw new Error(
          `An error occurred while fetching data from the server. Status code ${response.status}`,
        );
      }
      const data = await response.json();
      set({ posts: data });
    } catch (error) {
      console.error(error);
    }
  },

}))