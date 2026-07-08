import { memo, useState } from 'react';
import { INews } from '../../types/types';
import cls from './NewsItem.module.scss';

interface NewsItemProps {
  news: INews;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export const NewsItem = memo((props: NewsItemProps) => {
  const { news, onDelete, onEdit } = props;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editNews, setEditNews] = useState<string>(news.text);

  const editClickHandler = () => {
    setIsEdit(true);
  };

  const saveClickHandler = () => {
    onEdit(news.id, editNews);
    setIsEdit(false);
    setEditNews('');
  };

  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditNews(event.target.value);
  };

  return (
    <>
      <div className={cls.news_card}>
        {isEdit ? (
          <textarea
            className={cls.edit_textarea}
            value={editNews}
            onChange={changeHandler}
          ></textarea>
        ) : (
          <p className={cls.text}>{news.text}</p>
        )}

        <div className={cls.buttons}>
          {isEdit ? (
            <button onClick={saveClickHandler}>Save</button>
          ) : (
            <button onClick={editClickHandler}>Edit</button>
          )}

          <button onClick={() => onDelete(news.id)}>Delete</button>
        </div>
      </div>
    </>
  );
});
