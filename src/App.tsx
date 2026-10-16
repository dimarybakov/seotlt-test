// import { FormEvent, useCallback, useEffect, useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import { NewsList } from './components/NewsList/NewsList';
// import { INews } from './types/types';
// import { NEWS_LOCALSTORAGE_KEY } from './const/const';
// import { mockNewsList } from './mock/mockNews';
// import { AddNewsForm } from './components/AddNewsForm/AddNewsForm';

import { useCallback, useState } from 'react';
import Logo from './assets/icons/logo.svg?react';
import { Button, Flex } from '@maxhub/max-ui';

import './App.css';

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

  const app = window.WebApp;

  // подтверждение закрытия мини-приложения
  app.enableClosingConfirmation();

  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [userPhone, setUserPhone] = useState<string | undefined>(undefined);
  const [initData, setInitData] = useState<string | undefined>(undefined);

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
          {initData && (
            <p style={{ textWrap: 'wrap', width: '200px' }}>
              InitData: {initData}
            </p>
          )}
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
