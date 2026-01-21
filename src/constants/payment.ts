import iconVisa from '@/assets/pay_img/visa-classic-svgrepo-com.svg'
import iconMastercard from '@/assets/pay_img/mastercard-svgrepo-com.svg'
import iconJcb from '@/assets/pay_img/jcb-svgrepo-com.svg'
import iconApplePay from '@/assets/pay_img/apple-pay-svgrepo-com.svg'
import iconLinePay from '@/assets/pay_img/LINE_Pay_logo_(2019).svg.png'
// import iconJkoPay from '@/assets/pay_img/uBKC2XeyRaWsA2sgjVFxTohcqQi6mmypd0MMWxdI.png'

export type PaymentKey = 'credit' | 'linepay'

export const PAYMENT_OPTIONS: Array<{
  key: PaymentKey
  label: string
  icons: Array<{ src: string; alt: string; large?: boolean }>
}> = [
  {
    key: 'credit',
    label: '信用卡 | ATM轉帳 | Apple Pay | 街口支付',
    icons: [
      { src: iconVisa, alt: 'VISA', large: true },
      { src: iconMastercard, alt: 'Mastercard', large: true },
      { src: iconJcb, alt: 'JCB', large: true },
      // { src: iconAmex, alt: 'AMEX', large: true },
      { src: iconApplePay, alt: 'Apple Pay', large: true },
      // { src: iconJkoPay, alt: '街口支付' },
    ],
  },
  { key: 'linepay', label: 'Line Pay', icons: [{ src: iconLinePay, alt: 'LINE Pay' }] },
]

export const ECPAY_METHODS = [
  'credit',
  'atm',
  'applepay',
  'jkopay',
  '711',
  'familymart',
  'ipass money',
]
