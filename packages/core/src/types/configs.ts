export type MobileTabsConfig = {
  id: string;
  title: string;
  url?: string;
};

export interface MobileTabsConfigWithContent extends MobileTabsConfig {
  content: React.ReactNode;
}
