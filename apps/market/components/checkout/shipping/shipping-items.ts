import postLogo from '@/assets/img/post.png'

export const shippingItemsData = [
    {
        id: 1,
        title: 'دریافت از گنجه',
        image: postLogo,
        description: 'ارسال ۱ روز کاری پس از ثبت سفارش',
        price: 10000,
        active: false
    },
    {
        id: 2,
        title: 'پست پیشتاز',
        image: postLogo,
        description: 'ارسال تا ۵ روز کاری پس از ثبت سفارش',
        price: 25000,
        active: true
    },
    {
        id: 3,
        title: 'پیک موتوری',
        image: postLogo,
        description: 'ارسال در شهر تهران بر اساس نرخ نامه',
        price: 35000,
        active: false
    },
    {
        id: 4,
        title: 'ارسال با تیپاکس',
        image: postLogo,
        description: 'ارسال سریع کمتر از ۷۲ ساعت از زمان سفارش',
        price: 45000,
        active: false
    },
]