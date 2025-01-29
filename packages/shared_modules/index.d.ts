declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.{jpg,jpeg,png,gif,svg}" {
  const content: string;
  export default content;
}
