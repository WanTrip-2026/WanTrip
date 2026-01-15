<template>
  <main class="relative w-full h-screen overflow-hidden">
    <header
      class="fixed top-0 left-0 min-h-[90px] w-full bg-white/45 backdrop-blur-md p-2.5 border border-white/50 shadow-md z-50"
    >
      <div class="flex justify-center">
        <div class="w-full max-w-6xl">
          <div class="flex flex-col gap-4 md:flex-row">
            <a href="/">
              <svg
                width="168"
                height="44"
                viewBox="0 0 168 44"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                class="mx-auto h-full"
              >
                <path
                  d="M25.9471 38.2725C25.305 38.4567 24.6818 38.6267 24.0456 38.4803C23.5925 38.3858 23.1553 38.2267 22.7473 38.008C20.7998 36.8803 18.8759 35.7219 16.9308 34.5776C16.764 34.4852 16.6246 34.3504 16.5266 34.1868C16.4285 34.0232 16.3754 33.8366 16.3725 33.6459C16.3748 33.549 16.3467 33.4538 16.2921 33.3737C16.2374 33.2936 16.1591 33.2327 16.068 33.1996C15.9545 33.1399 15.8442 33.0745 15.7375 33.0035C15.4094 33.3578 15.0812 33.718 14.7401 34.0663C13.9954 34.8315 13.1739 35.494 12.1564 35.8671C11.6474 36.0635 11.0925 36.1091 10.5583 35.9982C10.0626 35.8931 9.87374 35.5636 10.0862 35.1007C10.2896 34.6839 10.5137 34.2776 10.7578 33.8833C11.7351 32.2435 12.7163 30.6056 13.7015 28.9698C14.0178 28.4478 14.327 28.3793 14.8747 28.6533C15.957 29.1929 17.0075 29.8141 18.1299 30.2522C20.0609 31.0055 22.0332 31.6503 23.9949 32.3246C24.3844 32.458 24.4811 32.3647 24.4764 31.9597C24.4623 30.9063 24.4103 29.8519 24.4351 28.7997C24.4623 27.6626 24.5236 26.523 24.6381 25.3918C24.7703 24.0751 24.9757 22.7656 25.1527 21.4536C25.169 21.3576 25.1906 21.2626 25.2177 21.1691C24.916 21.3094 24.6057 21.4305 24.2888 21.5316C23.7116 21.6804 23.1899 21.5422 22.8028 21.0675C22.5825 20.8029 22.3888 20.5174 22.2244 20.2149C21.8573 19.5253 22.0226 18.8333 22.6611 18.3669C22.8998 18.1841 23.1654 18.0395 23.4484 17.9382C23.989 17.7635 24.4245 17.4447 24.8435 17.0821C25.4336 16.5696 26.0368 16.0619 26.6482 15.5706C26.8474 15.4081 26.9951 15.191 27.0731 14.946C27.9371 12.5311 28.9368 10.1789 30.3189 8.00611C31.8462 5.60663 33.6521 3.45748 35.9844 1.79484C37.1906 0.93282 38.5137 0.293979 39.9974 0.0826065C42.4111 -0.262202 44.4507 0.469926 46.0535 2.32622C47.399 3.88613 48.06 5.76486 48.5085 7.73688C48.9901 9.86241 49.0597 12.0245 48.9618 14.1902C48.8804 15.9279 48.665 17.6567 48.3173 19.3612C47.4311 23.7569 46.068 28.0428 44.2524 32.1427C43.2816 34.3851 42.0537 36.5072 40.5934 38.4662C39.4332 40.0013 38.1537 41.4183 36.5674 42.5318C35.5925 43.2155 34.5326 43.7316 33.3535 43.917C31.4048 44.2216 29.6945 43.6879 28.2581 42.3169C27.1604 41.2671 26.4877 39.9647 26.0356 38.5311C26.0085 38.4496 25.9801 38.3693 25.9471 38.2725ZM47.2244 21.3214C47.2381 21.3027 47.2496 21.2825 47.2586 21.2612C47.4392 20.3507 47.6127 19.4391 47.8062 18.5322C47.8346 18.4432 47.8323 18.3473 47.7998 18.2598C47.7672 18.1723 47.7064 18.0981 47.6268 18.0492C47.0107 17.5769 46.3899 17.1128 45.7986 16.611C44.5002 15.5069 43.0685 14.6342 41.3996 14.2209C40.8866 14.0837 40.3594 14.0072 39.8286 13.993C39.1204 13.9871 38.4783 14.2871 37.8823 14.6649C36.5084 15.5317 35.4036 16.6925 34.3626 17.9182C33.0702 19.445 31.8085 20.999 30.5373 22.5436C30.2327 22.912 29.94 23.291 29.6343 23.6748L37.4704 25.7236L42.2458 20.2752L40.558 19.0093L41.7171 17.6407L47.2244 21.3214ZM42.934 33.6648C43.3612 32.6446 43.785 31.6231 44.2181 30.6052C44.3763 30.2333 44.3196 29.8873 44.1544 29.5425C43.6894 28.56 42.9139 27.9448 41.8859 27.6531C40.3031 27.2115 38.7144 26.7923 37.1245 26.3742C34.4984 25.6846 31.8698 25.0068 29.246 24.3137C29.0182 24.2534 28.8978 24.3042 28.781 24.4943C28.132 25.5295 27.8267 26.7433 27.9087 27.9625C27.9689 28.9166 28.3018 29.7798 29.0135 30.4423C30.3354 31.6857 31.9383 32.04 33.6757 31.7707C35.2408 31.5263 36.7905 31.1803 38.3473 30.8792C38.789 30.7799 39.2469 30.7772 39.6897 30.8711C40.1325 30.9651 40.5499 31.1535 40.9133 31.4236C41.7312 32.0264 42.4186 32.7889 42.934 33.6648ZM27.3127 29.2638C27.2242 29.3901 27.1474 29.494 27.0766 29.6015C26.444 30.5663 25.8172 31.5334 25.1799 32.4946C24.8423 33.0024 24.4245 33.1559 23.8438 32.9917C23.4814 32.8902 23.1226 32.7745 22.7662 32.6528C21.4773 32.2088 20.1896 31.7648 18.9054 31.309C18.6752 31.2275 18.5513 31.25 18.4144 31.4767C17.9907 32.1758 17.5445 32.8618 17.0901 33.5396C16.9485 33.7498 16.9721 33.849 17.1869 33.9766C18.9573 35.0204 20.716 36.0832 22.4888 37.1223C23.0046 37.4258 23.5381 37.7128 24.1566 37.7635C25.3923 37.8545 26.4204 37.4093 27.2371 36.4989C27.9453 35.716 28.611 34.9047 29.2897 34.1005C29.789 33.5101 30.2788 32.9079 30.7993 32.2785C29.1445 31.8298 27.8462 30.989 27.3127 29.2638ZM26.0616 19.1085L26.6517 18.7093C27.9988 17.7969 29.3412 16.8841 30.6789 15.971C30.7712 15.9098 30.8749 15.8678 30.9838 15.8475C31.0927 15.8272 31.2046 15.829 31.3127 15.8529C31.7034 15.9119 32.0976 15.9462 32.493 15.9851C33.2461 16.0595 34.0003 16.1186 34.7509 16.2118C34.8202 16.2251 34.8916 16.2204 34.9585 16.1983C35.0254 16.1762 35.0856 16.1374 35.1334 16.0855C35.6326 15.6226 36.1319 15.1597 36.6465 14.7133C36.9404 14.4595 37.2626 14.241 37.5907 13.9895C36.4435 13.9104 35.3293 13.836 34.2139 13.7533C33.4585 13.7002 32.7019 13.6577 31.9501 13.5715C31.4579 13.5148 30.9917 13.5715 30.5892 13.8395C29.2342 14.737 27.8906 15.6505 26.5585 16.5803C25.9955 16.9747 25.4785 17.434 24.9674 17.8426L26.0616 19.1085ZM48.3539 10.8165C48.2359 10.0513 48.1178 9.33339 47.9998 8.61661C47.9881 8.52194 47.9444 8.43413 47.8759 8.36775C47.8074 8.30138 47.7183 8.26044 47.6233 8.25173C47.0497 8.13128 46.459 8.11608 45.88 8.20686C44.8697 8.37218 44.0092 8.79728 43.3624 9.62388C42.6117 10.5768 42.3096 11.6797 42.2919 12.8665C42.2754 13.9918 42.1125 13.7203 43.1866 14.1583C43.4557 14.2682 43.7295 14.3426 44.0128 14.2516C44.4589 14.1052 44.9062 13.9541 45.3418 13.7793C45.9319 13.5431 46.201 13.0885 46.2305 12.4544C46.273 11.5558 46.7369 10.9948 47.5643 10.8272C47.7933 10.7835 48.0293 10.8154 48.3539 10.8154V10.8165ZM44.5049 14.7748C44.5049 14.7925 44.5049 14.8043 44.5144 14.8078C44.8826 15.0759 45.271 15.3203 45.6144 15.6179C46.0264 15.9721 46.4406 16.1398 46.9635 15.8836C47.0353 15.8547 47.1108 15.8361 47.1878 15.8281C47.7933 15.7253 48.1072 15.3203 48.2406 14.7653C48.3186 14.4381 48.3621 14.1037 48.3704 13.7675C48.3858 13.1393 48.3775 12.5087 48.3433 11.8781C48.3313 11.8004 48.3019 11.7264 48.2574 11.6616C48.2128 11.5967 48.1542 11.5428 48.086 11.5038C47.9383 11.4289 47.7707 11.403 47.6073 11.4297C47.4439 11.4565 47.2933 11.5345 47.1772 11.6526C47.0389 11.7911 46.9408 11.9645 46.8932 12.1543C46.8456 12.3441 46.8503 12.5433 46.9069 12.7307C46.9836 13.046 47.2409 13.1688 47.5348 13.2337C47.6351 13.2562 47.7343 13.2892 47.8334 13.3176V13.3884C47.7236 13.4498 47.6186 13.5538 47.5053 13.5632C47.2692 13.5833 47.0331 13.5467 46.7971 13.5455C46.7168 13.5455 46.6023 13.5573 46.561 13.6104C46.0441 14.2918 45.2792 14.5268 44.5049 14.7736V14.7748ZM14.6067 29.3311C14.5702 29.2886 14.5418 29.2248 14.5064 29.2225C14.4182 29.2016 14.3255 29.2094 14.242 29.2449C14.1514 29.3233 14.0765 29.4183 14.0213 29.5248C12.9197 31.3291 11.8204 33.1342 10.7236 34.9401C10.6666 35.0259 10.6194 35.1178 10.5831 35.2141C10.5666 35.2625 10.5831 35.3593 10.6162 35.3794C10.6451 35.3909 10.6762 35.396 10.7073 35.3946C10.7385 35.3932 10.7689 35.3852 10.7967 35.3711C10.8463 35.3384 10.8869 35.2938 10.9148 35.2412C11.2264 34.7878 11.5557 34.3462 11.8425 33.8774C12.7407 32.4131 13.6224 30.9382 14.5111 29.4681C14.5418 29.4256 14.5713 29.3842 14.6067 29.3311ZM23.7553 18.4401C24.3206 18.6314 24.6039 19.0577 24.6806 19.621C24.742 20.072 24.5284 20.2267 24.0964 20.1051C23.9995 20.0876 23.8996 20.1061 23.8155 20.1571C23.7718 20.1819 23.7494 20.2988 23.7647 20.3625C23.8827 20.8349 24.4209 21.025 24.7715 20.6825C24.9895 20.4426 25.1869 20.1846 25.3617 19.9114C25.4344 19.8183 25.4727 19.7029 25.4701 19.5848C25.4675 19.4666 25.4242 19.353 25.3475 19.2632C25.1534 19.0025 24.9408 18.7563 24.7113 18.5263C24.3867 18.1992 24.1872 18.1909 23.7553 18.4401ZM16.7136 32.9374L17.8467 31.1661C17.3368 30.9016 17.338 30.9028 17.0311 31.3456C16.7537 31.7471 16.4716 32.1439 16.1895 32.5465L16.7136 32.9374ZM15.5805 30.8367C15.5843 30.7768 15.576 30.7168 15.556 30.6603C15.536 30.6037 15.5048 30.5518 15.4642 30.5076C15.4236 30.4635 15.3745 30.428 15.3198 30.4034C15.2652 30.3788 15.2061 30.3655 15.1461 30.3643C15.0224 30.3705 14.9057 30.424 14.8203 30.5138C14.7349 30.6035 14.6873 30.7228 14.6873 30.8467C14.6873 30.9707 14.7349 31.0899 14.8203 31.1797C14.9057 31.2695 15.0224 31.323 15.1461 31.3291C15.2676 31.3177 15.3801 31.2605 15.4608 31.169C15.5415 31.0775 15.5843 30.9586 15.5805 30.8367ZM23.7494 19.1344C23.4661 19.5159 23.2088 19.8619 22.9503 20.2078L23.0058 20.248C23.3964 19.9941 23.8332 19.4037 23.7494 19.1344ZM23.2772 18.864C22.85 19.0719 22.5891 19.4155 22.6458 19.7048C22.8948 19.4226 23.1875 19.223 23.2784 18.864H23.2772Z"
                  fill="black"
                />
                <path
                  d="M163.47 16.8896C166.261 16.8897 168 19.4597 168 23.4335C168 27.7696 165.93 30.5478 162.771 30.5478C160.674 30.5477 159.95 29.3001 159.665 28.0283C159.561 27.5623 159.483 27.4843 159.354 27.4843C159.224 27.4845 159.173 27.5626 159.173 27.9501C159.171 30.884 160.672 32.6243 160.672 34.0263C160.672 35.35 159.43 35.9999 157.799 35.9999C156.168 35.9999 155.007 35.35 155.007 33.3261C155.007 31.6122 155.805 29.794 155.805 26.4443C155.805 21.5389 154.356 19.9542 154.355 18.8642C154.355 17.7742 155.805 16.8896 157.073 16.8896C158.867 16.8899 159.894 18.6557 158.601 20.9394C158.367 21.3554 158.401 21.4337 158.471 21.5117C158.6 21.5636 158.704 21.4859 158.884 21.122C159.376 20.136 160.385 16.8896 163.47 16.8896ZM93.2432 10.9492C93.2732 10.9492 95.9621 10.966 96.1426 13.832C96.3218 17.5964 92.2314 29.5398 90.4189 31.7978C89.6433 32.7597 88.4014 33.0703 87.4941 33.0703C83.5345 33.0702 84.5709 28.0866 84.7764 26.3203C84.88 25.4644 84.8024 25.3336 84.6729 25.3076C84.5433 25.2816 84.4934 25.3598 84.3379 26.1376C83.9231 28.6037 83.845 33.0703 79.7812 33.0703C78.0985 33.0702 77.0639 31.9798 76.1826 29.54C74.9863 26.2421 73.0239 13.5988 70.5137 13.5976C69.1179 13.5976 69.012 15.4401 70.332 17.2841C72.1443 19.884 71.3685 22.556 68.7266 22.582C66.8642 22.6079 65 21.3335 65 17.7255C65.0001 13.6757 67.3289 11.2334 71.1611 11.2333C76.8301 11.2333 78.1241 16.6879 78.6426 18.79C80.3753 26.0599 80.3234 26.3458 79.5996 27.5898C79.4003 27.9797 79.401 28.1102 79.4189 28.2402C79.4371 28.3698 79.5745 28.3691 79.8594 27.9794C81.1793 25.9013 82.5508 22.0074 81.3086 18.4755C80.1124 15.1797 82.1367 13.9579 83.9014 13.9579C85.1437 13.9581 87.2674 14.6085 88.3281 19.8261C88.5316 20.9367 89.2289 24.7521 87.2373 27.7997C87.1897 27.8616 87.1571 27.9347 87.1436 28.0117C87.1301 28.0885 87.1356 28.1678 87.1592 28.2421C87.211 28.3459 87.2888 28.3452 87.5977 27.9814C89.6433 25.6195 89.8768 22.582 89.9805 20.582C90.3175 13.7279 89.6181 10.9492 93.2432 10.9492ZM140.104 8.56927C142.297 7.58326 143.055 7.92201 143.294 9.24603C143.527 10.7781 143.062 13.6081 139.956 14.246C138.636 14.5059 135.893 14.4458 134.648 13.624C135.037 15.6243 134.08 21.4379 134.08 23.0478C134.08 28.4239 135.244 28.268 135.244 29.332C135.244 30.3959 134.028 31.3319 132.164 31.332C130.118 31.332 128.953 30.2395 128.953 28.0595C128.953 26.2415 129.731 23.8794 129.731 21.3076C129.731 18.7358 128.953 16.6359 128.953 14.662C128.953 13.52 129.369 12.4034 130.922 12.4814C131.284 12.5053 131.336 12.4557 131.336 12.3779C131.336 12.2999 131.284 12.2477 131.025 12.1777C130.343 11.9717 129.541 12.0233 128.815 12.1533C125.245 12.6973 125.115 14.5156 126.643 15.6835C128.997 17.4835 127.47 20.8252 124.727 20.8515C122.966 20.8775 121.104 19.6059 121.104 16.2822C121.104 12.1541 124.08 9.50583 128.608 9.5058C131.611 9.5058 135.495 10.6472 140.104 8.56927ZM151.452 16.8974C153.109 16.8975 154.195 17.5462 154.195 19.0781C154.195 20.3781 153.418 22.3761 153.418 23.622V23.8222C153.426 27.4578 154.584 27.4579 154.584 28.5478C154.584 29.6378 153.368 30.5477 151.607 30.5478C149.717 30.5478 148.527 29.4561 148.526 27.6923C148.526 26.2645 149.324 25.0421 149.324 23.8222V23.622C149.324 22.8861 149.047 21.8875 148.819 20.9365C148.489 22.0916 147.587 22.9406 146.345 23.0019C145.133 23.0697 144.329 22.3155 144.484 21.4335C144.614 20.8097 144.124 20.7841 143.942 20.7841C143.009 20.7841 142.363 21.9022 142.363 23.6142V23.8134C142.363 27.6133 143.398 26.9299 143.657 27.9677C143.942 29.1897 142.518 30.54 140.68 30.54C139.178 30.5398 137.858 29.6033 137.858 27.4755C137.858 26.2556 138.297 25.0333 138.297 23.8134V23.6142C138.301 22.936 138.224 22.2591 138.066 21.5995C137.704 20.0159 136.978 19.4959 136.978 18.6142C136.978 17.6522 137.885 16.8994 139.282 16.8994C140.479 16.8994 141.456 17.4721 141.638 18.3281C141.793 19.0021 141.533 20.1463 141.039 20.9501C140.84 21.288 140.78 21.496 140.987 21.496C141.065 21.496 141.143 21.4439 141.4 20.9501C142.645 18.4323 144.532 16.8996 146.396 16.8994C147.648 16.8994 148.309 17.5894 148.645 18.3642C148.995 17.3336 150.093 16.8974 151.452 16.8974ZM118.668 16.6777C122.552 16.6777 121.051 21.8175 121.051 23.2197V23.6093C121.051 27.3991 122.086 26.7259 122.319 27.7636C122.63 28.9836 121.181 30.3339 119.368 30.3339C117.867 30.3339 116.521 29.3994 116.521 27.2695C116.521 26.0496 116.962 24.8292 116.962 23.6093V23.4101C116.962 21.6101 116.728 20.58 115.615 20.58C114.088 20.5803 113.881 22.5022 113.881 23.4101V23.6093C113.881 27.3991 114.915 26.726 115.175 27.7636C115.46 28.9835 114.037 30.3337 112.198 30.3339C110.697 30.3339 109.376 29.3995 109.376 27.2695C109.376 26.0496 109.815 24.8292 109.815 23.6093V23.4101C109.821 22.7278 109.743 22.0471 109.584 21.3837C109.286 20.0851 108.744 19.5018 108.56 18.8456C108.355 19.7463 107.356 20.8822 107.356 23.3759C107.356 26.2314 108.598 27.5034 108.599 28.4394C108.599 29.4254 107.175 30.3339 105.881 30.3339C104.12 30.3339 103.09 28.544 104.354 26.2841C104.613 25.8421 104.587 25.7639 104.509 25.7119C104.353 25.662 104.25 25.738 104.095 26.1015C103.604 27.0635 102.593 30.3338 99.4863 30.3339C96.7167 30.3339 94.9814 27.7636 94.9814 23.7656C94.9815 19.4298 97.0274 16.6779 100.186 16.6777C102.281 16.6777 103.034 17.8974 103.293 19.1953C103.423 19.6633 103.492 19.7421 103.63 19.7421C103.767 19.742 103.809 19.6633 103.783 19.3515C103.422 17.7158 104.431 16.6779 105.854 16.6777C106.991 16.6777 108.202 17.3516 108.518 18.1513C108.659 17.3123 109.524 16.6856 110.8 16.6855C111.996 16.6855 112.974 17.2562 113.155 18.1142C113.311 18.7882 113.051 19.9295 112.557 20.7353C112.357 21.0733 112.298 21.2802 112.505 21.2802C112.583 21.2802 112.661 21.2293 112.918 20.7353C114.166 18.2097 116.598 16.6779 118.668 16.6777ZM162.044 21.7997C160.905 21.7997 160.182 22.8377 160.182 24.1357C160.182 25.4335 160.931 26.446 162.069 26.4462C163.266 26.4462 163.908 25.3037 163.908 24.1357C163.908 22.8357 163.159 21.7998 162.044 21.7997ZM100.91 20.7773C99.7138 20.7773 99.0479 21.9198 99.0479 23.0878C99.0479 24.3618 99.8234 25.3994 100.962 25.3994C102.076 25.3992 102.774 24.3597 102.774 23.0878C102.774 21.8159 102.051 20.7775 100.91 20.7773ZM151.426 11.1474C151.941 11.1363 152.447 11.2797 152.881 11.5585C153.314 11.8373 153.656 12.239 153.86 12.7128C154.065 13.1868 154.124 13.7117 154.03 14.2197C153.937 14.7276 153.694 15.1961 153.334 15.5654C152.974 15.9345 152.512 16.188 152.008 16.2929C151.504 16.3977 150.98 16.3492 150.503 16.1542C150.026 15.9592 149.617 15.6268 149.33 15.1982C149.043 14.7696 148.89 14.2645 148.89 13.748C148.884 13.4092 148.946 13.0724 149.071 12.7578C149.197 12.4433 149.382 12.1565 149.619 11.915C149.856 11.6734 150.139 11.4816 150.45 11.3505C150.762 11.2195 151.096 11.1516 151.434 11.1513L151.426 11.1474Z"
                  fill="black"
                />
              </svg>
            </a>

            <label
              class="flex-[1.2] relative rounded-[20px] bg-white px-5 py-3 flex flex-col gap-1 shadow-[0_10px_25px_rgba(47,61,77,0.08)] ring-1 ring-primary/10 group cursor-pointer transition-all hover:ring-accent/50"
            >
              <p class="text-xs font-bold leading-tight text-primary/70">想去哪</p>
              <div class="relative">
                <input
                  v-model="keyword"
                  class="w-full bg-transparent text-sm outline-none appearance-none cursor-pointer pr-8 font-medium text-primary group-hover:text-main_800 transition-colors"
                  type="text"
                  placeholder="想住哪～"
                />
              </div>
            </label>

            <DatePicker v-model.range="range" :columns="2" color="teal">
              <template #default="{ inputValue, inputEvents }">
                <label
                  class="flex-[0.7] rounded-[20px] bg-white px-5 py-3 flex flex-col gap-1 shadow-[0_10px_25px_rgba(47,61,77,0.08)] ring-1 ring-primary/10 cursor-pointer transition-all hover:ring-accent/50"
                  v-on="inputEvents.start"
                >
                  <p class="text-xs font-bold leading-tight text-primary/70">入住退房日期</p>
                  <input
                    :value="inputValue.start ? `${inputValue.start} - ${inputValue.end}` : ''"
                    class="w-full bg-transparent text-sm outline-none pointer-events-none placeholder:text-primary/35 font-medium"
                    placeholder="點選選擇日期"
                    readonly
                  />
                </label>
              </template>
            </DatePicker>

            <div class="relative flex-1" ref="peoplePickerRef">
              <label
                @click="isPeoplePickerOpen = !isPeoplePickerOpen"
                class="rounded-[20px] bg-white px-5 py-3 flex flex-col gap-1 shadow-[0_10px_25px_rgba(47,61,77,0.08)] ring-1 ring-primary/10 transition-all hover:ring-accent/50 cursor-pointer"
              >
                <p class="text-xs font-bold leading-tight text-primary/70">人數、需求</p>
                <div class="min-h-[24px] flex items-center justify-between">
                  <span class="text-sm font-medium text-primary">{{ peopleDisplayText }}</span>
                  <svg
                    class="h-4 w-4 text-primary/30 transition-transform duration-300"
                    :class="{ 'rotate-180': isPeoplePickerOpen }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </label>

              <transition name="fade">
                <div
                  v-if="isPeoplePickerOpen"
                  class="absolute top-[calc(100%+8px)] left-0 z-[100] w-full rounded-[30px] bg-white p-6 shadow-2xl ring-1 ring-primary/5"
                >
                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <span class="text-sm font-bold text-primary">成人</span>
                      <div class="flex items-center gap-3">
                        <button
                          @click.stop="peopleConfig.adults > 1 ? peopleConfig.adults-- : null"
                          type="button"
                          class="w-8 h-8 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary/5"
                        >
                          -
                        </button>
                        <span class="text-sm font-medium w-4 text-center">{{
                          peopleConfig.adults
                        }}</span>
                        <button
                          @click.stop="peopleConfig.adults++"
                          type="button"
                          class="w-8 h-8 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary/5"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-sm font-bold text-primary">孩童</span>
                      <div class="flex items-center gap-3">
                        <button
                          @click.stop="peopleConfig.children > 0 ? peopleConfig.children-- : null"
                          type="button"
                          class="w-8 h-8 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary/5"
                        >
                          -
                        </button>
                        <span class="text-sm font-medium w-4 text-center">{{
                          peopleConfig.children
                        }}</span>
                        <button
                          @click.stop="peopleConfig.children++"
                          type="button"
                          class="w-8 h-8 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary/5"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <label
                      class="flex items-center justify-between pt-2 border-t border-gray-50 cursor-pointer"
                    >
                      <span class="text-sm font-bold text-primary">可帶寵物</span>
                      <input
                        type="checkbox"
                        v-model="peopleConfig.hasPet"
                        class="w-5 h-5 accent-accent cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              </transition>
            </div>
            <button
              @click="fetchHotels"
              class="w-32 items-center px-8 py-3 rounded-[20px] bg-primary hover:bg-main_800 shadow text-lg font-medium text-white transition"
            >
              搜尋
            </button>
          </div>
        </div>
      </div>
    </header>
    <!-- 地圖 -->
    <div class="absolute inset-0 bg-[#e5e3df] z-0 overflow-hidden">
      <div id="map" class="w-full h-full"></div>
    </div>
    <div class="flex gap-3 fixed top-[100px] ml-5">
      <button
        @click="goBackToList"
        class="items-center px-8 py-3 rounded-[18px] bg-primary hover:bg-main_800 shadow text-sm font-medium text-white transition"
      >
        <FontAwesomeIcon :icon="['fas', 'chevron-left']" />
        返回搜尋結果列表
      </button>
      <button
        @click="isFilterOpen = !isFilterOpen"
        class="items-center px-8 py-3 rounded-[18px] bg-primary hover:bg-main_800 shadow text-sm font-medium text-white transition"
      >
        篩選
      </button>
    </div>
    <div class="fixed bottom-[200px] right-[10px] z-10">
      <button
        @click="toggleMapType"
        class="w-[40px] h-[40px] bg-white rounded-[20px] shadow-[0_1px_4px_-1px_rgba(0,0,0,0.3)] hover:bg-[#ebebeb] transition-colors flex items-center justify-center"
      >
        <div class="text-base">
          {{ currentMapType === 'roadmap' ? '🛰️' : '🗺️' }}
        </div>
      </button>
    </div>
    <!-- 飯店列表 -->
    <aside
      :class="[
        'fixed top-[145px] bg-white  z-20 shadow-xl transition-transform duration-500 ease-in-out flex flex-col self-start h-[calc(100vh-170px)] my-2.5 ml-5 rounded-[20px] rounded-tr-none',
        isListOpen ? 'translate-x-0' : '-translate-x-[420px]',
      ]"
      class="w-[400px]"
    >
      <button
        @click="isListOpen = !isListOpen"
        :class="[
          'absolute top-0 z-20 bg-white border shadow-md flex items-center justify-center text-primary hover:text-main_800 transition-all duration-500 ease-in-out',
          isListOpen
            ? 'left-full w-8 h-12 rounded-r-lg border-l-0'
            : 'left-[420px] w-12 h-12 rounded-lg',
        ]"
      >
        <FontAwesomeIcon :icon="isListOpen ? ['fas', 'chevron-left'] : ['fas', 'chevron-right']" />
      </button>
      <div
        v-show="isListOpen"
        class="relative flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar"
      >
        <div
          v-if="isMapLoading"
          class="absolute inset-0 z-10 bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center rounded-[20px]"
        >
          <div class="animate-spin">
            <FontAwesomeIcon :icon="['fas', 'circle-notch']" spin class="text-accent/60 text-5xl" />
          </div>
          <p class="text-primary font-bold mt-4">搜尋中 ···</p>
        </div>

        <div
          v-else-if="!isMapLoading && hotels.length === 0"
          class="flex flex-col items-center justify-center h-full py-10 text-center"
        >
          <div class="bg-accent/10 rounded-full p-5 mb-5">
            <FontAwesomeIcon :icon="['fas', 'magnifying-glass']" class="text-4xl text-accent/60" />
          </div>
          <h3 class="text-lg font-bold text-primary">找不到符合的飯店</h3>
          <p class="text-primary/60 text-sm mt-1">請嘗試變更關鍵字或篩選條件</p>

          <button
            @click="resetSearch"
            class="mt-6 px-6 py-2 bg-primary text-white rounded-full hover:bg-main_800 transition shadow-md"
          >
            查看所有飯店
          </button>
        </div>

        <div
          v-for="hotel in hotels"
          :key="hotel.id"
          @mouseenter="handleHotelHover(hotel.id, true)"
          @mouseleave="handleHotelHover(hotel.id, false)"
          class="bg-white w-full h-[180px] rounded-[20px] border border-gray-200 overflow-hidden flex flex-row hover:shadow-lg transition-shadow duration-300"
        >
          <a :href="`/hotels/${hotel.id}`" target="_blank" class="contents">
            <div class="aspect-[2/3] relative flex-shrink-0">
              <img :src="hotel.image_url" :alt="hotel.name" class="w-full h-full object-cover" />
              <button
                class="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-[20px] h-[32px] w-[80px] text-[10px] bg-primary opacity-80 hover:opacity-100 text-white transition whitespace-nowrap"
              >
                <i class="fa-solid fa-plus mr-1"></i>加入比較
              </button>
            </div>

            <div class="relative flex-1 flex flex-col justify-between p-4 min-w-0">
              <p class="absolute top-4 right-4 p-2 rounded-full bg-primary text-white text-xs">
                {{ hotel.star_rating }}.0
              </p>

              <div class="flex flex-col gap-1 pr-10">
                <h3 class="text-lg font-bold text-black truncate">
                  {{ hotel.name }}
                </h3>

                <div class="flex flex-col">
                  <div class="flex gap-0.5 mb-1">
                    <svg
                      v-for="(n, index) in starCount(hotel.star_rating)"
                      :key="index"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                      class="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                    >
                      <path
                        d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"
                      />
                    </svg>
                  </div>
                  <p class="text-gray-500 text-xs">{{ hotel.city }}{{ hotel.district }}</p>
                  <p class="text-[10px] text-gray-400">6616 則評論</p>
                </div>
              </div>

              <div class="flex justify-between items-end">
                <div class="text-[#D14D4D] text-xl font-bold">
                  NT${{ hotel.min_price?.toLocaleString() ?? '0' }}
                </div>
                <div class="flex gap-2">
                  <button
                    class="bg-primary text-white p-2 rounded-full hover:bg-main_800 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      class="w-4 h-4 fill-current"
                    >
                      <path
                        d="M378.9 80c-27.3 0-53 13.1-69 35.2l-34.4 47.6c-4.5 6.2-11.7 9.9-19.4 9.9s-14.9-3.7-19.4-9.9l-34.4-47.6c-16-22.1-41.7-35.2-69-35.2-47 0-85.1 38.1-85.1 85.1 0 49.9 32 98.4 68.1 142.3 41.1 50 91.4 94 125.9 120.3 3.2 2.4 7.9 4.2 14 4.2s10.8-1.8 14-4.2c34.5-26.3 84.8-70.4 125.9-120.3 36.2-43.9 68.1-92.4 68.1-142.3 0-47-38.1-85.1-85.1-85.1zM271 87.1c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1 0 68.6-42.9 128.9-79.1 172.8-44.1 53.6-97.3 100.1-133.8 127.9-12.3 9.4-27.5 14.1-43.1 14.1s-30.8-4.7-43.1-14.1C176.4 438 123.2 391.5 79.1 338 42.9 294.1 0 233.7 0 165.1 0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1l15 20.7 15-20.7z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </aside>

    <!-- 篩選列表 -->
    <transition name="fade">
      <aside v-show="isFilterOpen" class="fixed inset-0 z-[999]" @click="isFilterOpen = false">
        <!-- 半透明遮罩 -->
        <div class="absolute inset-0 bg-[#020408]/60 transition-opacity duration-300"></div>
        <div
          class="fixed top-0 left-0 h-full w-[285px] bg-white z-[1000] shadow-xl overflow-y-auto transform transition-transform duration-300"
          :class="{ '-translate-x-full': !isFilterOpen, 'translate-x-0': isFilterOpen }"
          @click.stop
        >
          <div class="flex flex-col gap-5 p-5">
            <h3 class="font-bold text-xl text-dark mb-[20px]">篩選條件</h3>
            <div class="flex flex-col gap-5">
              <!-- Price Filter -->
              <h4 class="font-medium text-dark">每晚預算<br /></h4>
              <div class="flex flex-col gap-2">
                <!-- 滑桿 -->
                <div class="relative h-2 w-full bg-main_100 rounded-full">
                  <!-- 已選範圍 -->
                  <div
                    class="absolute h-2 bg-main_300 rounded-full"
                    :style="{
                      left: `${(priceRange.min / maxPrice) * 100}%`,
                      right: `${100 - (priceRange.max / maxPrice) * 100}%`,
                    }"
                  ></div>

                  <!-- 左滑塊 -->
                  <input
                    type="range"
                    :min="minPrice"
                    :max="maxPrice"
                    :step="step"
                    v-model.number="priceRange.min"
                    class="absolute w-full h-2 bg-transparent pointer-events-none appearance-none"
                  />

                  <!-- 右滑塊 -->
                  <input
                    type="range"
                    :min="minPrice"
                    :max="maxPrice"
                    :step="step"
                    v-model.number="priceRange.max"
                    class="absolute w-full h-2 bg-transparent pointer-events-none appearance-none"
                  />
                </div>
                <!-- 顯示數值 -->
                <div class="flex justify-between mt-2">
                  <input
                    type="number"
                    v-model.number="priceRange.min"
                    :min="minPrice"
                    :max="maxPrice"
                    :step="step"
                    class="border border-gray-300 rounded-full p-1 w-24 text-dark_900 text-center"
                  />
                  <input
                    type="number"
                    v-model.number="priceRange.max"
                    :min="minPrice"
                    :max="maxPrice"
                    :step="step"
                    class="border border-gray-300 rounded-full p-1 w-24 text-dark_900 text-center"
                  />
                </div>
              </div>

              <!-- Option Filter -->
              <div
                class="border-b-[1px] pb-[20px] border-main_800 border-solid last:border-b-0"
                v-for="HotelMenu in HotelFiltered"
                :key="HotelMenu.key"
              >
                <div class="flex justify-between items-center mb-2">
                  <h4 class="font-medium text-base text-dark_900">{{ HotelMenu.title }}</h4>
                  <button
                    class="text-xs text-dark_500 hover:text-primary"
                    @click="clearOptions(HotelMenu.key)"
                  >
                    清除
                  </button>
                </div>
                <div class="space-y-2">
                  <label
                    class="flex cursor-pointer text-sm text-dark_900 items-center"
                    v-for="option in HotelMenu.options.slice(
                      0,
                      expandedMenus.includes(HotelMenu.key) ? HotelMenu.options.length : 4,
                    )"
                    :key="option"
                  >
                    <input
                      type="checkbox"
                      class="mr-2 text-dark_900 focus:ring-primary"
                      :value="option"
                      v-model="HotelMenu.selected"
                    />
                    <span>
                      {{ HotelMenu.key === 'star_rating' ? `${option} 星級` : option }}
                    </span>
                  </label>
                  <button
                    v-if="HotelMenu.options.length > 4 && !expandedMenus.includes(HotelMenu.key)"
                    class="text-dark_500 hover:text-primary text-sm mt-1"
                    @click="toggleMenu(HotelMenu.key)"
                  >
                    展開更多選項
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </transition>
  </main>
</template>

<script setup lang="ts">
/// <reference types="@types/google.maps" />
import { reactive, ref, shallowRef, watch, computed, onMounted, onUnmounted } from 'vue'
import { DatePicker } from 'v-calendar'
import 'v-calendar/style.css'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { MarkerClusterer, SuperClusterAlgorithm } from '@googlemaps/markerclusterer'

interface Hotel {
  id: string
  name: string
  city: string
  district: string
  star_rating: number
  min_price: number
  facilities?: string[]
  address?: string
  image_url?: string
  latitude: number
  longitude: number
}

interface PriceRange {
  min: number
  max: number
}

interface FilterMenu {
  key: string
  title: string
  options: string[]
  selected: string[]
}

declare global {
  interface Window {
    initMap?: (() => void) | null
    google: typeof google.maps
  }
}

const router = useRouter()
const markerMap = new Map<string | number, google.maps.marker.AdvancedMarkerElement>()
const mapInstance = shallowRef<google.maps.Map | null>(null)

let clusterer: MarkerClusterer | null = null

let closeTimeout: number | null = null
let currentOpenedMarker: google.maps.marker.AdvancedMarkerElement | null = null

const isMapLoading = ref(true)
const hotels = ref<Hotel[]>([])
const keyword = ref('')
const error = ref<string | null>(null)
const facilities = ref<FacilityName[]>([])

const generateStarHtml = (rating: number) => {
  const starSvg = `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      class="w-3 h-3 inline-block"
      fill="currentColor"
      style="width: 12px; height: 12px; color: #facc15; margin-right: 1px; flex-shrink: 0;"
    >
      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.8 33.8-2.3s14.8-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
    </svg>`
  return Array(Math.floor(rating)).fill(starSvg).join('')
}

const starOptions = computed(() => ['5', '4', '3', '2'])

const HotelFiltered = reactive<FilterMenu[]>([
  { key: 'star_rating', title: '星級', options: starOptions.value, selected: [] },
  {
    key: 'reviews',
    title: '評價',
    options: ['好極了: 9分以上', '非常好: 8分以上', '好: 7分以上', '令人愉悅: 6分以上'],
    selected: [],
  },
  { key: 'types', title: '住宿類型', options: [], selected: [] },
  {
    key: 'policies',
    title: '付款政策',
    options: ['免費取消', '立即付款', '延後付款', '到店付款'],
    selected: [],
  },
  { key: 'facilities', title: '設施＆服務', options: [], selected: [] },
  {
    key: 'districts',
    title: '地區',
    options: ['中正區', '中山區', '萬華區', '大同區', '松山區'],
    selected: [],
  },
  {
    key: 'distance',
    title: '距離市中心',
    options: [
      '位於市中心',
      '距市中心1.5公里內',
      '距市中心1.5-3公里內',
      '距市中心3-5公里內',
      '距市中心5公里以上',
    ],
    selected: [],
  },
])

function starCount(stars: number) {
  return stars
}

function goBackToList() {
  router.push('/hotels/search')
}

type FacilityName = string

const peopleConfig = reactive({
  adults: 2,
  children: 0,
  hasPet: false,
})

const range = ref({
  start: new Date(),
  end: new Date(new Date().setDate(new Date().getDate() + 1)),
})

const minPrice = 0
const maxPrice = 15000
const step = 500

const priceRange = ref<PriceRange>({
  min: minPrice,
  max: maxPrice,
})

// 確認價錢範圍的最小.最大值
watch(
  () => [priceRange.value.min, priceRange.value.max] as [number, number],
  ([min, max]) => {
    if (min < minPrice) priceRange.value.min = minPrice
    if (max > maxPrice) priceRange.value.max = maxPrice

    if (max - min < step) {
      priceRange.value.max = min + step
    }
  },
)

const currentMapType = ref('roadmap')

const toggleMapType = () => {
  if (!mapInstance.value) return

  const newType = currentMapType.value === 'roadmap' ? 'hybrid' : 'roadmap'
  mapInstance.value.setMapTypeId(newType)
  currentMapType.value = newType
}

const isPeoplePickerOpen = ref(false)
const peoplePickerRef = ref<HTMLElement | null>(null)

const peopleDisplayText = computed(() => {
  let text = `${peopleConfig.adults} 位成人`
  if (peopleConfig.children > 0) text += `｜${peopleConfig.children} 位孩童`
  if (peopleConfig.hasPet) text += `｜帶寵物`
  return text
})

const isListOpen = ref(true)
const isFilterOpen = ref(false)

const expandedMenus = ref<string[]>([]) // 儲存哪些 option 已展開

function toggleMenu(key: string) {
  if (expandedMenus.value.includes(key)) {
    expandedMenus.value = expandedMenus.value.filter((k) => k !== key)
  } else {
    expandedMenus.value.push(key)
  }
}

const resetSearch = () => {
  keyword.value = ''
  fetchHotels()
}

let infoWindow: google.maps.InfoWindow

const renderMarkers = async () => {
  if (!mapInstance.value || !window.google) return

  if (clusterer) {
    clusterer.clearMarkers()
  }
  markerMap.clear()

  // 確保載入 marker 函式庫
  const { AdvancedMarkerElement, CollisionBehavior } = (await google.maps.importLibrary(
    'marker',
  )) as google.maps.MarkerLibrary

  const markers: google.maps.marker.AdvancedMarkerElement[] = []

  hotels.value.forEach((hotel) => {
    const lat = Number(hotel.latitude)
    const lng = Number(hotel.longitude)
    if (isNaN(lat) || isNaN(lng)) return

    const priceTag = document.createElement('div')
    priceTag.className = `
            custom-price-tag
            bg-primary text-white
            px-2 py-1
            rounded-lg
            font-bold
            cursor-pointer
            shadow-[0_2px_6px_rgba(0,0,0,0.3)]
            whitespace-nowrap
            text-sm
            transition-all duration-200
        `
    priceTag.innerText = `NT$ ${Number(hotel.min_price).toLocaleString()}`

    const marker = new AdvancedMarkerElement({
      position: { lat: Number(hotel.latitude), lng: Number(hotel.longitude) },
      content: priceTag,
      title: hotel.name,
      collisionBehavior: CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY,
      zIndex: 1000000 - Number(hotel.min_price),
    })

    priceTag.addEventListener('mouseenter', () => {
      if (!infoWindow) return
      priceTag.classList.add('scale-110', 'bg-[#D14D4D]', 'z-[9999]')
      priceTag.classList.remove('bg-primary')

      if (closeTimeout) {
        clearTimeout(closeTimeout)
        closeTimeout = null
      }

      if (currentOpenedMarker === marker) return

      const newContent = `
        <div class="clickable-card cursor-pointer">
          <div class="bg-white rounded-[20px] p-2 w-[340px] box-border">
            <div class="flex bg-white rounded-[12px] border border-gray-200 overflow-hidden h-[132px]">
              <div class="w-[100px] flex-shrink-0">
                <img 
                    src="${hotel.image_url}" 
                    class="w-full h-full object-cover" 
                    onerror="this.onerror=null; this.src='https://placehold.co/400x300?text=No+Image';"
                 />              
              </div>
              <div class="relative flex-1 p-3 flex flex-col justify-between min-w-0">
                <div class="min-w-0">
                  <div class="flex items-start justify-between gap-2">
                    <h3 class="m-0 text-base font-bold text-black truncate pr-8">
                      ${hotel.name}
                    </h3>
                    <div class="bg-[#2F3D4D] text-white p-2 rounded-full text-[10px]">
                        ${hotel.star_rating}.0
                    </div>
                </div>

                  <div class="flex gap-0.5 my-1">
                    ${generateStarHtml(hotel.star_rating)}
                  </div>
                  <p class="m-0 text-slate-500 text-xs">
                    ${hotel.city}${hotel.district}
                  </p>
                  <p class="text-[10px] text-gray-400">6616 則評論</p>
                  <div class="text-[#D14D4D] text-base font-bold mt-2">
                    NT$ ${hotel.min_price.toLocaleString()}
                  </div>
              </div>
            </div>
          </div>
        </div>
      `
      infoWindow.setContent(newContent)
      infoWindow.open({ anchor: marker, map: mapInstance.value })
      currentOpenedMarker = marker

      setTimeout(() => {
        const card = document.querySelector('.clickable-card')
        if (card) {
          card.addEventListener('click', () => {
            window.open(`/hotels/${hotel.id}`, '_blank')
          })
        }
      }, 0)
    })

    priceTag.addEventListener('mouseleave', () => {
      priceTag.classList.remove('scale-110', 'bg-[#D14D4D]', 'z-[9999]')
      priceTag.classList.add('bg-primary')

      closeTimeout = window.setTimeout(() => {
        infoWindow.close()
        currentOpenedMarker = null
      }, 200)
    })

    markerMap.set(hotel.id, marker)
    markers.push(marker)
  })

  if (markers.length > 0) {
    const customRenderer = {
      render: ({ count, position }: { count: number; position: google.maps.LatLng }) => {
        const container = document.createElement('div')
        // 根據飯店數量決定圓圈大小
        const size = count < 10 ? 40 : 50

        container.style.width = `${size}px`
        container.style.height = `${size}px`
        container.className = `
            bg-[#F8FDFF]/50
            text-primary
            rounded-full
            flex items-center justify-center
            font-bold text-sm
            shadow-lg
            border border-primary
            cursor: pointer;
            backdrop-blur-sm
            transition-all duration-200
        `
        container.addEventListener('mouseenter', () => {
          container.classList.add('scale-110', 'bg-[#D14D4D]', 'text-white')
          container.classList.remove('bg-[#F8FDFF]/50', 'text-primary')
        })

        container.addEventListener('mouseleave', () => {
          container.classList.remove('scale-110', 'bg-[#D14D4D]', 'text-white')
          container.classList.add('bg-[#F8FDFF]/50', 'text-primary')
        })
        container.innerText = `${count}`

        return new google.maps.marker.AdvancedMarkerElement({
          position,
          content: container,
        })
      },
    }
    if (clusterer) {
      clusterer.clearMarkers()
      clusterer.addMarkers(markers)
    } else {
      clusterer = new MarkerClusterer({
        map: mapInstance.value,
        markers,
        renderer: customRenderer,
        algorithm: new SuperClusterAlgorithm({
          radius: 60,
          maxZoom: 14,
        }),
      })
    }
  } else if (clusterer) {
    // 如果沒標記了，清空地圖
    clusterer.clearMarkers()
  }
}

const fetchHotels = async () => {
  try {
    isMapLoading.value = true
    error.value = null
    const apiUrl = import.meta.env.VITE_API_BASE_URL
    const params = new URLSearchParams()

    // 第一步：先組裝篩選參數
    params.append('page', '1')
    params.append('limit', '1000')

    if (keyword.value.trim()) {
      params.append('keyword', keyword.value.trim())
    }

    // 處理星級、設施、類型等篩選
    const selectedFacilities = HotelFiltered.find((m) => m.key === 'facilities')?.selected ?? []
    if (selectedFacilities.length > 0) params.append('facility_names', selectedFacilities.join(','))

    const selectedTypes = HotelFiltered.find((m) => m.key === 'types')?.selected ?? []
    if (selectedTypes.length > 0) params.append('types', selectedTypes.join(','))

    const selectedStars = HotelFiltered.find((m) => m.key === 'star_rating')?.selected ?? []
    if (selectedStars.length > 0) {
      const starNums = selectedStars.map((s) => parseInt(s, 10)).filter((n) => Number.isFinite(n))
      if (starNums.length > 0) params.append('star_ratings', starNums.join(','))
    }

    // 第二步：去後端拿「篩選後」的資料
    const res = await fetch(`${apiUrl}/hotels?${params.toString()}`)
    if (!res.ok) throw new Error('取得飯店失敗')

    const data = await res.json()
    hotels.value = (data.hotels || []).map((h: Hotel) => ({
      ...h,
      image_url:
        h.image_url ||
        'https://images.trvl-media.com/lodging/1000000/30000/25200/25187/adae54af.jpg',
    }))

    // 第三步：資料拿到了，才開始畫地圖標記
    await renderMarkers()

    if (hotels.value.length === 0) {
    } else if (keyword.value.trim()) {
      moveMapToKeyword(keyword.value.trim())
    }
  } catch (err: unknown) {
    console.error(err)
    error.value = '搜尋飯店時發生錯誤'
  } finally {
    isMapLoading.value = false
  }
}

onMounted(async () => {
  isMapLoading.value = true
  try {
    const apiUrl = import.meta.env.VITE_API_BASE_URL
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID

    if (!apiKey) {
      console.error('Google Maps API Key 遺失！')
      return
    }
    // 同步抓飯店與設施資料（統一用 axios）
    const [facilitiesRes, hotelsRes] = await Promise.all([
      axios.get(`${apiUrl}/facilities`),
      axios.get(`${apiUrl}/hotels`, {
        params: {
          page: 1,
          limit: 1000,
        },
      }),
    ])

    const rawHotels = hotelsRes.data

    hotels.value = Array.isArray(rawHotels?.hotels) ? rawHotels.hotels : []

    if (!facilitiesRes.data) {
      throw new Error('取得設施資料失敗')
    }

    facilities.value = facilitiesRes.data

    const facilityMenu = HotelFiltered.find((m) => m.key === 'facilities')
    if (facilityMenu) {
      facilityMenu.options = facilities.value
    }

    const typesRes = await axios.get(`${apiUrl}/hotel_types`)
    const types: string[] = typesRes.data
    const typeMenu = HotelFiltered.find((m) => m.key === 'types')
    if (typeMenu) {
      typeMenu.options = types
    }

    const runMapInitialization = async () => {
      const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 25.033964, lng: 121.564468 },
        zoom: 12,
        mapId: mapId,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        zoomControl: true,
      })
      mapInstance.value = map

      infoWindow = new google.maps.InfoWindow({
        disableAutoPan: true,
        headerDisabled: true,
      })

      setupInfoWindowDomListener()
      await fetchHotels()
    }

    // 設定全域回呼，給 Google Maps 載入完成後呼叫
    window.initMap = runMapInitialization

    // 檢查是否已經載入過腳本，防止重複載入導致 Element already defined
    if (window.google && window.google.maps) {
      runMapInitialization()
    } else {
      if (!document.getElementById('google-maps-script')) {
        const script = document.createElement('script')
        script.id = 'google-maps-script'
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=marker,places`
        script.async = true
        script.defer = true
        document.head.appendChild(script)
      }
    }

    // 放入 domready 監聽
    function setupInfoWindowDomListener() {
      infoWindow.addListener('domready', () => {
        const el = document.querySelector('.gm-style-iw.gm-style-iw-c') as HTMLElement | null
        if (el) {
          el.style.padding = '0'
          el.style.backgroundColor = 'white'
          el.style.border = 'none'
          el.style.borderRadius = '12px'
          el.style.boxShadow =
            '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
        }

        const contentEl = document.querySelector('.gm-style-iw-d') as HTMLElement | null
        if (contentEl) {
          contentEl.style.overflow = 'hidden'
          contentEl.style.maxHeight = 'none'
          contentEl.style.maxWidth = '350px'

          contentEl.addEventListener('mouseenter', () => {
            if (closeTimeout) {
              clearTimeout(closeTimeout)
              closeTimeout = null
            }
          })

          contentEl.addEventListener('mouseleave', () => {
            infoWindow.close()
          })
        }
      })
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) console.error(err.response?.data || err.message)
    else if (err instanceof Error) console.error(err.message)
    else console.error(err)

    error.value = '初始化資料時發生錯誤'
  } finally {
    isMapLoading.value = false
  }
})

onUnmounted(() => {
  window.initMap = null
})

const moveMapToKeyword = async (searchKeyword: string) => {
  if (!window.google || !mapInstance.value || !searchKeyword) return
  const map = mapInstance.value
  const geocoder = new google.maps.Geocoder()

  geocoder.geocode({ address: searchKeyword }, (results, status) => {
    if (status === 'OK' && results && results[0]) {
      const location = results[0].geometry.location
      const viewport = results[0].geometry.viewport

      // 1. 先平滑移動到中心
      map.panTo(location)

      if (viewport) {
        // 2. 執行範圍縮放
        map.fitBounds(viewport, {
          top: 150,
          bottom: 150,
          left: 480,
          right: 80,
        })

        google.maps.event.addListenerOnce(map, 'idle', () => {
          if (map.getZoom()! < 14) {
            map.setZoom(14)
            map.panTo(location)
          }
        })
      } else {
        map.setZoom(15)
      }
    } else {
      console.warn('Google 找不到該地名，嘗試搜尋飯店名稱...')

      const matchedHotel = hotels.value.find((h) =>
        h.name.toLowerCase().includes(searchKeyword.toLowerCase()),
      )

      if (matchedHotel && matchedHotel.latitude && matchedHotel.longitude) {
        const position = {
          lat: Number(matchedHotel.latitude),
          lng: Number(matchedHotel.longitude),
        }
        map.panTo(position)
        map.setZoom(16)
      } else {
        console.error('地名與飯店名稱皆無法定位：' + status)
      }
    }
  })
}

const handleHotelHover = (hotelId: string | number, isHover: boolean) => {
  const marker = markerMap.get(hotelId)
  if (!marker || !marker.content) return

  const element = marker.content as HTMLElement

  if (isHover) {
    element.classList.add('scale-110', 'bg-[#D14D4D]', 'z-[9999]', 'shadow-xl')
    element.classList.remove('bg-primary')
    if (mapInstance.value && marker.position) {
      mapInstance.value.panTo(marker.position)
      mapInstance.value.setZoom(18)
    }
  } else {
    element.classList.remove('scale-110', 'bg-[#D14D4D]', 'z-[9999]', 'shadow-xl')
    element.classList.add('bg-primary')
  }
}

watch(
  () =>
    HotelFiltered.map((m) => ({
      key: m.key,
      selected: [...m.selected],
    })),
  fetchHotels,
  { deep: true },
)

function clearOptions(key: string) {
  const menu = HotelFiltered.find((m) => m.key === key)
  if (menu) {
    menu.selected = [] // 清空勾選
  }
}
</script>

<style scoped>
@keyframes slide-in-left {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.animate-slide-in-left {
  animation: slide-in-left 0.3s ease-out forwards;
}

/* 隱藏捲軸但保持滾動功能 */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.price-marker:hover {
  transform: scale(1.2);
  transition: transform 0.2s ease;
}
</style>
