import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabaseClient'
import { useAuthStore } from '@/stores/auth'

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
    type: 'hotel' | 'ticket';
    city?: string;
    [key: string]: unknown;
}

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favorites: new Map<string | number, Product>(), // Key: id
    loaded: false
  }),

  getters: {
    isFavorite: (state) => {
      return (id: number | string) => state.favorites.has(id)
    },
    favoriteList: (state): Product[] => {
      return Array.from(state.favorites.values())
    },
    hotelCount: (state): number => {
        return Array.from(state.favorites.values()).filter(p => p.type === 'hotel').length;
    },
    ticketCount: (state): number => {
        return Array.from(state.favorites.values()).filter(p => p.type === 'ticket').length;
    }
  },

  actions: {
    async fetchFavorites() {
      const startLocal = localStorage.getItem('wantrip_favorites');
      if (startLocal) {
        try {
          const parsed = JSON.parse(startLocal);
          if (Array.isArray(parsed)) {
             parsed.forEach((item: Product) => {
                 if (item && item.id) this.favorites.set(item.id, item);
             });
          }
        } catch (e) {
          console.error('[Favorites] Local parse error', e);
        }
      }

      const authStore = useAuthStore()
      if (authStore.user) {
           try {
              // Fetch from profiles table
              const { data, error } = await supabase
                .from('profiles')
                .select('favorites')
                .eq('id', authStore.user.id)
                .single();

              if (error) throw error;

              if (data && data.favorites && Array.isArray(data.favorites)) {
                  this.favorites.clear();
                  data.favorites.forEach((item: Product) => {
                      if (item && item.id) {
                          this.favorites.set(item.id, item);
                      }
                  });
              }
           } catch (e) {
               console.warn('[Favorites] Supabase fetch error', e);
           }
      }

      this.loaded = true
      this.saveToLocal();
    },

    async toggleFavorite(product: Product) {
      const id = product.id;
      const type = product.type;
      const authStore = useAuthStore();
      const user = authStore.user;

      const isFav = this.favorites.has(id);

      if (!isFav) {
          // Check limits
          if (type === 'hotel' && this.hotelCount >= 10) {
              alert('飯店收藏已達上限 (10 筆)');
              return;
          }
           if (type === 'ticket' && this.ticketCount >= 10) {
              alert('票券收藏已達上限 (10 筆)');
              return;
          }
      }

      // Optimistic Update
      if (isFav) {
          this.favorites.delete(id);
      } else {
          this.favorites.set(id, product);
      }

      this.saveToLocal();

      if (!user) return;

      try {
        // Prepare array for JSONB column
        const favoritesArray = Array.from(this.favorites.values());

        const { error } = await supabase
          .from('profiles')
          .update({ favorites: favoritesArray })
          .eq('id', user.id);

        if (error) throw error;

      } catch (e) {
        console.error('[Favorites] Sync failed', e);
        // Rollback local state on error
        if (isFav) this.favorites.set(id, product);
        else this.favorites.delete(id);
        alert('同步收藏失敗，請稍後再試');
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
