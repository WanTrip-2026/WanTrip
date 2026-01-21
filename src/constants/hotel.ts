export interface Review {
  id: number
  memberName: string
  memberLocation: string
  memberType: string
  rating: number
  roomType: string
  nights: number
  stayDate: string
  title: string
  comment: string
  photos?: string[]
  date: string
}

export const REVIEWS: Review[] = [
  {
    id: 1,
    memberName: 'Christin',
    memberLocation: '台灣',
    memberType: '商務旅客',
    rating: 10,
    roomType: '經典特大床間',
    nights: 1,
    stayDate: '2024年12月',
    title: '非常棒的住宿體驗！',
    comment: '房間舒適整潔，員工服務親切，交通便利，自分還會再來！',
    photos: [
      'https://res.cloudinary.com/wantrip/image/upload/v1768879258/review_qm2vxb.jpg',
      'https://res.cloudinary.com/wantrip/image/upload/v1768879794/review3_snzhxx.png',
    ],
    date: '2024/12/05',
  },
  {
    id: 2,
    memberName: 'Jason',
    memberLocation: '香港',
    memberType: '休閒旅客',
    rating: 9,
    roomType: '豪華雙人房- 含陽台',
    nights: 2,
    stayDate: '2024年11月',
    title: '位置優越，早餐豐富',
    comment: '飯店位置很好，走路就能到捷運站，早餐種類多樣且美味，房間有陽台景觀佳。',
    photos: ['https://res.cloudinary.com/wantrip/image/upload/v1768879485/reviews1_iautz4.png'],
    date: '2024/11/18',
  },
  {
    id: 3,
    memberName: 'Sophia',
    memberLocation: '新加坡',
    memberType: '家庭旅客',
    rating: 8,
    roomType: '家庭套房- 帶兩張雙人床',
    nights: 3,
    stayDate: '2024年10月',
    title: '適合帶小孩入住',
    comment: '房間寬敞，床鋪舒適，帶孩子入住很方便，附近有商場和公園。',
    photos: ['https://res.cloudinary.com/wantrip/image/upload/v1768879937/reviews5_m1c6no.png'],
    date: '2024/10/12',
  },
  {
    id: 4,
    memberName: 'Emily',
    memberLocation: '日本',
    memberType: '情侶旅客',
    rating: 10,
    roomType: '浪漫套房- 含按摩浴缸',
    nights: 1,
    stayDate: '2024年09月',
    title: '非常浪漫的住宿體驗',
    comment: '房間布置浪漫，浴室有按摩浴缸，適合慶祝紀念日，服務也非常周到。',
    photos: [
      'https://res.cloudinary.com/wantrip/image/upload/v1768879395/review1_bc0zlx.jpg',
      'https://res.cloudinary.com/wantrip/image/upload/v1768879885/review4_kkq4f0.jpg',
      'https://res.cloudinary.com/wantrip/image/upload/v1768880008/review6_zjglqp.png',
    ],
    date: '2024/09/22',
  },
  {
    id: 5,
    memberName: 'Michael',
    memberLocation: '台灣',
    memberType: '商務旅客',
    rating: 7,
    roomType: '單人商務房',
    nights: 2,
    stayDate: '2024年08月',
    title: '房間整潔，但空調有點吵',
    comment: '整體住宿還不錯，房間乾淨，唯獨空調運作聲音稍大，影響睡眠。',
    photos: [],
    date: '2024/08/30',
  },
]
