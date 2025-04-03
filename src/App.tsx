import { FormEvent, useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.scss';
import { NewsList } from './components/NewsList/NewsList';
import { INews } from './types/types';
import { NEWS_LOCALSTORAGE_KEY } from './const/const';
import { mockNewsList } from './mock/mockNews';
import { AddNewsForm } from './components/AddNewsForm/AddNewsForm';

function App() {
  const [news, setNews] = useState<INews[]>([]);

  useEffect(() => {
    const newsItems = localStorage.getItem(NEWS_LOCALSTORAGE_KEY);
    if (newsItems) {
      setNews(JSON.parse(newsItems) as INews[]);
    } else {
      setNews(mockNewsList);
      localStorage.setItem(NEWS_LOCALSTORAGE_KEY, JSON.stringify(mockNewsList));
    }
  }, []);

  const deleteHandler = useCallback((id: string) => {
    setNews((prevState) => {
      const newState = prevState.filter((el) => el.id !== id);
      localStorage.setItem(NEWS_LOCALSTORAGE_KEY, JSON.stringify(newState));
      return newState;
    });
  }, []);

  const addHandler = useCallback(
    (event: FormEvent<HTMLFormElement>, text: string) => {
      event.preventDefault();

      setNews((prevState) => {
        const newState = [{ id: uuidv4(), text }, ...prevState];
        localStorage.setItem(NEWS_LOCALSTORAGE_KEY, JSON.stringify(newState));
        return newState;
      });
    },
    [],
  );

  const editHandler = (id: string, text: string) => {
    setNews((prevState) => {
      const newState = prevState.map((news) =>
        news.id === id ? { ...news, text } : news,
      );
      localStorage.setItem(NEWS_LOCALSTORAGE_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <>
      <div className="wrapper">
        <h1>Fake News</h1>
        <AddNewsForm onSubmit={addHandler} />
        <NewsList
          newsList={news}
          onDelete={deleteHandler}
          onEdit={editHandler}
        />
      </div>
    </>
  );
}

export default App;
