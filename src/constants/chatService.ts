const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const chatService = {
  async sendMessage(userQuery: string) {
    // 如果 userQuery 完全是空的或亂碼，直接擋掉
    if (!userQuery.trim()) throw new Error('請輸入問題喔！')

    const response = await fetch(`${SUPABASE_URL}/functions/v1/chat-ai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ANON_KEY}`,
      },
      // 確保 query 被正確包裝
      body: JSON.stringify({
        query: userQuery,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      // 根據錯誤狀態碼給予不同提示
      if (response.status === 429) throw new Error('阿萬太忙了，請稍等一下再問喔！')
      throw new Error('阿萬暫時收不到訊號...')
    }

    return await response.json()
  },
}
