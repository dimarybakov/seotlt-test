// import { FormEvent, useCallback, useEffect, useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import { NewsList } from './components/NewsList/NewsList';
// import { INews } from './types/types';
// import { NEWS_LOCALSTORAGE_KEY } from './const/const';
// import { mockNewsList } from './mock/mockNews';
// import { AddNewsForm } from './components/AddNewsForm/AddNewsForm';

import { useCallback, useEffect, useState } from 'react';
import Logo from './assets/icons/logo.svg?react';
import { Button, Flex } from '@maxhub/max-ui';

import './App.css';
import axios from 'axios';

function App() {
  // const [news, setNews] = useState<INews[]>([]);

  // useEffect(() => {
  //   const newsItems = localStorage.getItem(NEWS_LOCALSTORAGE_KEY);
  //   if (newsItems) {
  //     setNews(JSON.parse(newsItems) as INews[]);
  //   } else {
  //     setNews(mockNewsList);
  //     localStorage.setItem(NEWS_LOCALSTORAGE_KEY, JSON.stringify(mockNewsList));
  //   }
  // }, []);

  // const deleteHandler = useCallback((id: string) => {
  //   setNews((prevState) => {
  //     const newState = prevState.filter((el) => el.id !== id);
  //     localStorage.setItem(NEWS_LOCALSTORAGE_KEY, JSON.stringify(newState));
  //     return newState;
  //   });
  // }, []);

  // const addHandler = useCallback(
  //   (event: FormEvent<HTMLFormElement>, text: string) => {
  //     event.preventDefault();

  //     setNews((prevState) => {
  //       const newState = [{ id: uuidv4(), text }, ...prevState];
  //       localStorage.setItem(NEWS_LOCALSTORAGE_KEY, JSON.stringify(newState));
  //       return newState;
  //     });
  //   },
  //   [],
  // );

  // const editHandler = (id: string, text: string) => {
  //   setNews((prevState) => {
  //     const newState = prevState.map((news) =>
  //       news.id === id ? { ...news, text } : news,
  //     );
  //     localStorage.setItem(NEWS_LOCALSTORAGE_KEY, JSON.stringify(newState));
  //     return newState;
  //   });
  // };

  const api = axios.create({
    baseURL: 'https://flk-dev.vostok-electra.ru',
  });

  const maxAppInitData =
    'chat=%7B%22id%22%3A123164143%2C%22type%22%3A%22DIALOG%22%7D&hash=69eca68f146a5d57af336c7c89c1548ee4d57cbe1eff1507504129c632b2f6ca&auth_date=1792669262&query_id=2752eb23-84db-40f7-9d99-a56d28053578&user=%7B%22id%22%3A193198152%2C%22first_name%22%3A%22%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9%22%2C%22last_name%22%3A%22%D0%A0%D1%8B%D0%B1%D0%B0%D0%BA%D0%BE%D0%B2%22%2C%22username%22%3Anull%2C%22language_code%22%3A%22ru%22%2C%22photo_url%22%3Anull%7D&ip=93.120.209.221&start_param=';

  const app = window.WebApp;

  // подтверждение закрытия мини-приложения
  app.enableClosingConfirmation();

  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [userPhone, setUserPhone] = useState<string | undefined>(undefined);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [initData, setInitData] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function getSessionId() {
      try {
        const { data } = await api.post('/api/miniapp/CreateSession', {
          phone: '79103979903',
          initData: maxAppInitData,
        });

        if (data.sessionId) {
          setSessionId(data.sessionId);
        }
      } catch (error) {
        console.log(error);
        setError(JSON.stringify(error));
      }
    }

    getSessionId();
  });

  const handleClick = useCallback(() => {
    setUserId(app?.initDataUnsafe?.user?.id);
    const name =
      app?.initDataUnsafe?.user?.username ??
      app?.initDataUnsafe?.user?.first_name;
    setUsername(name);
    setInitData(app?.initData);
    window.WebApp.requestContact().then(({ phone }) => {
      setUserPhone(phone);
    });
  }, [
    app?.initData,
    app?.initDataUnsafe?.user?.first_name,
    app?.initDataUnsafe?.user?.id,
    app?.initDataUnsafe?.user?.username,
  ]);

  return (
    <>
      <div className="wrapper">
        {/* <Icon Svg={LogoIcon} /> */}
        <Logo width={100} height={100} />
        <h1 className="logo">ЭК Восток</h1>
        <Flex direction="column" align="center" justify="center" gap={10}>
          <Button>Мои лицевые счета</Button>
          <Button>Прием показаний</Button>
          <Button>Оплата</Button>
          <Button>Прием оплат по исполнительным документам</Button>
          <Button onClick={handleClick}>Показать данные пользователя</Button>
          {userId && <p>ID: {userId}</p>}
          {username && <p>Username: {username}</p>}
          {userPhone && <p>Phone: {userPhone}</p>}
          {initData && <p>InitData: {initData}</p>}
          {sessionId && <p>SessionId: {sessionId}</p>}
          {error && <p>Error: {error}</p>}
        </Flex>

        {/* <AddNewsForm onSubmit={addHandler} />
        <NewsList
          newsList={news}
          onDelete={deleteHandler}
          onEdit={editHandler}
        /> */}
      </div>
    </>
  );
}

export default App;
