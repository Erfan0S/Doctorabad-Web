import Image from 'next/image';
import archiveEmptyState from '@/assets/img/archive-empty-state.png';
import style from './ArchiveEmptyState.module.scss';

const ArchiveEmptyState = () => {
    return (
        <div className={style.archiveEmptyState}>
            <Image src={archiveEmptyState} alt="ArchiveEmptyState" width={100} height={100} />
            <p>گفتند یافت می نشود جسته ایم ما<br/>گفت آن که یافت می نشود، آنم آرزوست</p>
            <p>فیلترهای کمتری اعمال کنین تا نتایج بیشتر پیدا بشه!<br/>یا تو جستجوی کلمه موردنظر بیشتر دقت کنین!</p>
            <p>اگه آخرشم پیدا نشد غصه نداره که؛ به کدخدا بگین!</p>
        </div>
    );
};

export default ArchiveEmptyState;
