export interface Policy {
  title: string
  content?: string
  items?: string[]
  type: 'text' | 'list'
  highlight: boolean
}

export const POLICIES: Policy[] = [
  {
    title: '【兌換方式】',
    content: '請出示訂單編號至1樓櫃檯更換正式門票。',
    type: 'text',
    highlight: false,
  },
  {
    title: '【退改政策】',
    items: [
      '如需更改日期，請於出發前 3 天聯繫客服。',
      '出發前 24 小時內取消，將收取 100% 手續費。',
      '若因不可抗力因素（如颱風）導致活動取消，將全額退款。',
    ],
    type: 'list',
    highlight: true,
  },
  {
    title: '【注意事項】',
    items: [
      '禁止攜帶危險物品及外食入場。',
      '場內禁止吸菸，違者將依相關法規處罰。',
      '若患有心臟病、高血壓等疾病，請自行斟酌身體狀況。',
      '兒童需由成人全程陪同。',
    ],
    type: 'list',
    highlight: false,
  },
]

export const DINING_FAQS = [
  {
    question: '請問有服裝規定嗎？',
    answer: '請穿著半正式休閒服（Smart Casual）。男士請勿穿著背心、短褲、拖鞋；女士請勿穿著拖鞋。',
  },
  {
    question: '請問兒童如何收費？',
    answer: '0-11歲(含)兒童半價；12歲(含)以上以成人計費。詳細收費依現場公告為準。',
  },
  {
    question: '可以指定靠窗座位嗎？',
    answer:
      '座位依現場安排為主，無法保證指定靠窗座位。若有特殊需求請於訂單備註，將視現場狀況盡量協助。',
  },
]

export const DEFAULT_FAQS = [
  {
    question: '如何使用此票券？',
    answer: '請於現場出示 QR Code 或訂單確認信即可入場/兌換。',
  },
  {
    question: '可以取消或退款嗎？',
    answer: '請參考該產品的退改政策，通常在指定時間前取消可獲全額退款。',
  },
  {
    question: '需要提前預約嗎？',
    answer: '部分體驗需要提前預約場次，請詳閱產品說明或憑證資訊。',
  },
]
