import React, { useEffect } from 'react';
import Loading from '../loading';
import HeartIcon from '@/assets/svg/newIcons/heart';
import HeartFillIcon from '@/assets/svg/newIcons/heartFill';
import { FavoriteColors } from '@/components/marketHome/intro/orderInformation/enum';
import style from './favoriteIcon.module.scss';

type Props = {
  isFavorite: boolean;
  loading?: boolean;
  size?: number;
  color?: FavoriteColors;
} & React.SVGProps<SVGSVGElement>;

const FavoriteIcon = ({ isFavorite, loading, size, color = FavoriteColors.RED, ...svgAttribute }: Props) => {
  return loading ? (
    <Loading size={size} />
  ) : isFavorite ? (
    <HeartFillIcon width={size} height={size} className={color && style[color]} {...svgAttribute} />
  ) : (
    <HeartIcon width={size} height={size} {...svgAttribute} />
  );
};

export default FavoriteIcon;
