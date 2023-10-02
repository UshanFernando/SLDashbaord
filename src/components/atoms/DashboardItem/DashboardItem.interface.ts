interface IDashboardItem {
  colors: string[];
  title: string;
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  value?: string;
}

export default IDashboardItem;
