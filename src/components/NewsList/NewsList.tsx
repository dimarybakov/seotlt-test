import { INews } from '../../types/types';
import { NewsItem } from '../NewsItem/NewsItem';
import cls from './NewsList.module.scss';

interface NewsListProps {
  newsList: INews[];
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export const NewsList = (props: NewsListProps) => {
  const { newsList, onDelete, onEdit } = props;
  return (
    <div className={cls.news_list}>
      {newsList.map((news) => (
        <NewsItem
          key={news.id}
          news={news}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
