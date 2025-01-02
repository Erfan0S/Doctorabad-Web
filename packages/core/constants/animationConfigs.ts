import { MotionProps } from 'framer-motion';

export const slideLeftAnimation: MotionProps = {
  initial: { x: '-100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
  transition: { type: 'spring', duration: 0.7, bounce: 0.2 },
};

export const slideRightAnimation: MotionProps = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '100%', opacity: 0 },
  transition: { type: 'spring', duration: 0.7, bounce: 0.2 },
};

export const fadeInAnimation: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

export const mobileNavListReplace: MotionProps = {
  initial: { x: '-100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '100%', opacity: 0, position: 'absolute' },
  transition: { type: 'spring', duration: 0.5, bounce: 0.1 },
};
