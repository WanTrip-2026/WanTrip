import { defineStore } from 'pinia'
import axios from 'axios'

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favorites: new Set<number>(), // 收藏的 product / hotel id
    loaded: false
  }),

  getters: {
    isFavorite: (state) => {
      return (id: number) => state.favorites.has(id)
    }
  },

  actions: {
    async fetchFavorites() {
      const token = localStorage.getItem('token')
      if (!token) return

      const res = await axios.get<{ id: number }[]>(
        '/api/favorites',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      this.favorites = new Set(res.data.map(item => item.id))
      this.loaded = true
    },

    async toggleFavorite(id: number) {
      const token = localStorage.getItem('token')
      if (!token) return

      if (this.favorites.has(id)) {
        await axios.delete(
          `/api/favorites/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        this.favorites.delete(id)
      } else {
        await axios.post('/api/favorites', { hotelId: id }, {
          withCredentials: true
        })
        this.favorites.add(id)
      }
    },

    clear() {
      this.favorites.clear()
      this.loaded = false
    }
  }
})
