export type MobileHomeHeaderDataConfig = {
  id: string;
  title: string;
  url: string;
};

export interface MobileHomeHeaderDataConfigWithContent
  extends MobileHomeHeaderDataConfig {
  content: React.ReactNode;
}
