export const REGIONS = [
  {
    key: 'north',
    label: '北部',
    img: 'https://res.cloudinary.com/wantrip/image/upload/v1767452852/%E5%9F%8E%E5%B8%82-tp_zyi27w.jpg',
  },
  {
    key: 'central',
    label: '中部',
    img: 'https://res.cloudinary.com/wantrip/image/upload/v1767445157/640x480_image636446327579990356_qeu0ii.jpg',
  },
  {
    key: 'south',
    label: '南部',
    img: 'https://res.cloudinary.com/wantrip/image/upload/v1767445160/%E7%86%B1%E9%96%80%E5%9F%8E%E5%B8%821_ybmlyx.jpg',
  },
  {
    key: 'east',
    label: '東部',
    img: 'https://res.cloudinary.com/wantrip/image/upload/v1767445159/%E5%9F%8E%E5%B8%821_bl2w6i.jpg',
  },
  {
    key: 'islands',
    label: '離島',
    img: 'https://res.cloudinary.com/wantrip/image/upload/v1767452852/%E5%9F%8E%E5%B8%82-%E5%B3%B6_qnxq42.jpg',
  },
]

export const STAY_KEYWORDS = [
  '台北住宿',
  '台中住宿',
  '台南住宿',
  '高雄住宿',
  '花蓮住宿',
  '蘭嶼住宿',
  '綠島住宿',
  '澎湖住宿',
  '遊樂園',
  '博物館',
  '步道健行',
] as const

export const REGION_CITIES: Record<string, string[]> = {
  north: ['台北市', '新北市', '基隆市', '桃園市', '新竹市', '新竹縣', '宜蘭縣'],
  central: ['苗栗縣', '台中市', '彰化縣', '南投縣', '雲林縣'],
  south: ['嘉義市', '嘉義縣', '台南市', '高雄市', '屏東縣'],
  east: ['花蓮縣', '台東縣'],
  islands: ['澎湖縣', '金門縣', '連江縣'],
}
