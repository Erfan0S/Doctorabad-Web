export const lockPageScroll = (isLocked: boolean) => {
  const activeStyle = {
    paddingRight: window.innerWidth - document.body.clientWidth + 'px',
    overflowY: 'hidden',
  };
  const defaultStyle = {
    paddingRight: 0,
    overflowY: 'unset',
  };

  const pageHasScroll = document.body.scrollHeight > window.innerHeight;
  Object.assign(
    window.document.documentElement.style,
    isLocked && pageHasScroll ? activeStyle : defaultStyle
  );
};
