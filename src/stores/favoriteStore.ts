import { defineStore } from 'pinia'
import axios from 'axios'

export interface Product {
    id: number | string;
    name: string;
    imageUrl: string;
    price: number;
    venue?: string;
    category?: string;
    date?: string;
    address?: string;
    rating?: number;
    [key: string]: unknown;
}

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favorites: new Map<string | number, Product>(), // 修正為 Map 儲存完整物件
    loaded: false
  }),

  getters: {
    isFavorite: (state) => {
      return (id: number | string) => state.favorites.has(id)
    },
    favoriteList: (state): Product[] => {
      return Array.from(state.favorites.values())
    }
  },

  actions: {
    async fetchFavorites() {
      // 嘗試從 LocalStorage 讀取 (Mock Mode / Cache)
      const localData = localStorage.getItem('wantrip_favorites');
      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          if (Array.isArray(parsed)) {
             parsed.forEach((item: Product) => {
                 if (item && item.id) {
                     this.favorites.set(item.id, item);
                 }
             });
          }
        } catch (e) {
          console.error('Failed to parse local favorites', e);
        }
      }

      const token = localStorage.getItem('token')
      if (token) {
           try {
              const res = await axios.get<{ id: number; product?: Product }[]>(
                '/api/favorites',
                {
                  headers: { Authorization: `Bearer ${token}` }
                }
              )
              // 如果後端只回傳 ID，我們可能無法顯示列表，除非另外 fetch。
              // 假設後端未來會回傳完整資訊，或者我們暫時僅依賴 LocalStorage 做為展示。
              // 這裡採混合策略：如果後端有回傳 product details 則更新，否則保留 local。
              res.data.forEach(item => {
                  if (item.product) {
                      this.favorites.set(item.id, item.product); // Assuming backend structure
                  } else {
                     // If backend only returns ID, strictly speaking we can't show it in the list without fetching details.
                     // For now, we trust LocalStorage contains the details deemed as "Favorites" by the user in this session.
                  }
              })
           } catch (e) {
               console.warn('Failed to fetch from API, using local only.', e);
           }
      }

      this.loaded = true
    },

    async toggleFavorite(product: Product) {
      const id = product.id;
      const token = localStorage.getItem('token')

      const isFav = this.favorites.has(id);

      // Optimistic Update
      if (isFav) {
          this.favorites.delete(id);
      } else {
          this.favorites.set(id, product);
      }

      // Sync to LocalStorage
      this.saveToLocal();

      if (!token) return; // Guest mode supports local favorites too

      try {
        if (isFav) {
          await axios.delete(
            `/api/favorites/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          )
        } else {
          await axios.post('/api/favorites', { hotelId: id }, { // Note: Backend seems to expect hotelId? Adapt as needed.
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }
          })
        }
      } catch (e) {
        console.error('API sync failed', e);
        // Rollback on critical failure? Or just keep local?
        // Keeping local is better UX for now.
      }
    },

    saveToLocal() {
        localStorage.setItem('wantrip_favorites', JSON.stringify(Array.from(this.favorites.values())));
    },

    clear() {
      this.favorites.clear()
      this.loaded = false
      localStorage.removeItem('wantrip_favorites');
    }
  }
})

