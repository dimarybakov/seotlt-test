import type { TypedPromise } from './helpers';

export type MaxInitDataUnsafe = {
  /**
   * Уникальный идентификатор сессии мини-приложения
   */
  query_id: string;
  /**
   * Время получения данных с бэкенда
   */
  auth_date: number;
  /**
   * Хэш переданных параметров, который можно использовать для проверки их достоверности
   */
  hash: string;
  /**
   * Объект с дополнительными данными
   */
  start_param: string;
  /**
   * Объект с данными о пользователе, который открывает мини-приложение
   */
  user: MaxUser;
  /**
   * Объект с данными о чате, из которого открыто мини-приложение
   */
  chat: MaxChat;
};

export type MaxUser = {
  /**
   * Уникальный идентификатор пользователя MAX
   */
  id: number;
  /**
   * Имя пользователя
   */
  first_name: string;
  /**
   * Фамилия пользователя
   */
  last_name: string;
  /**
   * Ник пользователя
   */
  username: string;
  /**
   * Язык интерфейса MAX
   */
  language_code: string;
  /**
   * Ссылка на фото профиля пользователя
   */
  photo_url: string;
};

export type MaxChat = {
  /**
   * Идентификатор чата
   */
  id: number;
  /**
   * Тип чата
   */
  type: string;
};

export type MaxPlatform = 'ios' | 'android' | 'desktop' | 'web';

/**
 * Управляет кнопкой Назад в шапке мини-приложения
 */
export interface MaxBackButton {
  /**
   * Задаёт состояние false по умолчанию
   */
  isVisible: boolean;

  /**
   * Устанавливает обработчик событий
   * @param callback
   */
  onClick(callback: FunctionLike): void;

  /**
   * Убирает обработчик событий нажатия кнопки
   * @param callback
   */
  offClick(callback: FunctionLike): void;

  /**
   * Делает кнопку Назад активной и видимой
   */
  show(): void;

  /**
   * Скрывает кнопку Назад
   */
  hide(): void;
}

/**
 * Объект для управления возможностью делать скриншоты / записывать экран
 */
export interface MaxScreenCapture {
  /**
   * Геттер, который позволяет узнать, разрешено ли делать скриншоты / запись экрана в данный момент
   *     true — запрещено
   *     false — разрешено
   *     false по умолчанию
   */
  isScreenCaptureEnabled: boolean;

  /**
   * Включить запрет на скриншоты / запись экрана
   */
  enableScreenCapture(): void;

  /**
   * Отключить запрет на скриншоты / запись экрана
   */
  disableScreenCapture(): void;
}

/**
 * Объект для управления тактильными виброоткликами
 */
export interface MaxHapticFeedback {
  /**
   * Метод сообщает, что произошло воздействие.
   *
   * Приложение MAX может воспроизвести соответствующие тактильные эффекты на основе переданного значения стиля.
   *
   * Стиль может иметь одно из следующих значений:
   *
   * soft — мягкая вибрация
   * light — лёгкая вибрация
   * medium — средняя вибрация
   * heavy — сильная вибрация
   * rigid — жёсткая вибрация
   *
   * @param impactStyle
   * @param disableVibrationFallback
   */
  impactOccurred(
    impactStyle: 'soft' | 'light' | 'medium' | 'heavy' | 'rigid',
    disableVibrationFallback: boolean,
  ): void;

  /**
   * Метод сообщает, что событие или действие выполнены успешно, не удалось или выдано предупреждение.
   *
   * Приложение MAХ может воспроизводить соответствующие тактильные сигналы на основе переданного значения типа.
   *
   * Тип может быть одним из следующих значений:
   *
   * error — Указывает, что задача или действие не удалось
   * success — Указывает, что задача или действие были успешно завершены
   * warning — Указывает, что задача или действие вызвали предупреждение
   *
   * @param notificationType
   * @param disableVibrationFallback
   */
  notificationOccurred(
    notificationType: 'error' | 'success' | 'warning',
    disableVibrationFallback: boolean,
  ): void;

  /**
   * Метод сообщает, что пользователь изменил выбор.
   *
   * Приложение MAХ может воспроизвести соответствующие тактильные сигналы.
   *
   * Не используйте эту обратную связь, когда пользователь делает или подтверждает выбор; используйте ее только при изменении выбора.
   */
  selectionChanged: boolean;
}

/**
 * Этот объект предоставляет мини-приложению доступ к хранилищу данных, ассоциированному с конкретным пользователем MАХ.
 *
 * Методы DeviceStorage не поддерживаются в веб-версии
 */
export interface MaxDeviceStorage {
  /**
   * Сохраняет переданную пару «ключ-значение» в локальном хранилище устройства
   * @param key
   * @param value
   */
  setItem(key: string, value: string): void;

  /**
   * Получает значение из локального хранилища устройства по указанному ключу
   * @param key
   */
  getItem(key: string): void;

  /**
   * Удаляет значение из локального хранилища устройства по указанному ключу
   * @param key
   */
  removeItem(key: string): void;

  /**
   * Очищает все ключи, ранее сохранённые ботом в локальном хранилище устройства
   */
  clear(): void;
}

/**
 * Этот объект предоставляет мини-приложению доступ к защищённому хранилищу данных
 *
 * Методы SecureStorage не поддерживаются в веб-версии
 */
export interface MaxSecureStorage {
  /**
   * Сохраняет переданную пару «ключ-значение» в защищённом хранилище устройства
   * @param key
   * @param value
   */
  setItem(key: string, value: string): void;

  /**
   * Получает значение из защищённого хранилища устройства по указанному ключу
   * @param key
   */
  getItem(key: string): void;

  /**
   * Удаляет значение из защищённого хранилища устройства по указанному ключу
   * @param key
   */
  removeItem(key: string): void;
}

/**
 * Этот объект нужен для аутентификации, когда доступ к данным в keychain получается через биометрические идентификаторы
 * Перед первым использованием этого объекта его необходимо инициализировать с помощью метода init.
 */
export interface MaxBiometricManager {
  /**
   * Была ли ранее проведена первичная инициализация
   */
  isInited: boolean;

  /**
   * Первичная инициализация биометрии
   * Проверяем доступность биометрии на устройстве
   * Проверяем предоставлен ли доступ
   *
   * Вызывается единожды при самом первом использовании.
   */
  init(): void;

  /**
   * Доступна ли биометрия на устройстве пользователя, который запустил мини-приложение
   *
   * false, если пользователь отказался предоставить доступ к биометрии
   */
  isBiometricAvailable: boolean;

  /**
   * fingerprint
   * faceid
   * unknown
   *
   * Если пользователь отказался предоставить доступ к биометрии, biometricType=["unknown"]
   * Для android всегда ["unknown"]
   */
  biometricType: ('fingerprint' | 'faceid' | 'unknown')[];

  /**
   * Идентификатор устройства (можно использовать для сопоставления токена с устройством)
   *
   * null, если пользователь отказался предоставить доступ к биометрии
   */
  deviceId: string | null;

  /**
   * Был ли ранее отправлен запрос на предоставление доступа к биометрии устройства
   *
   * false, если пользователь отказался предоставить доступ к биометрии
   */
  isAccessRequested: boolean;

  /**
   * Предоставлен ли доступ к биометрии
   *
   * false, если пользователь отказался предоставить доступ к биометрии
   */
  isAccessGranted: boolean;

  /**
   * Есть ли токен в безопасном хранилище устройства
   *
   * false, если пользователь отказался предоставить доступ к биометрии
   */
  isBiometricTokenSaved: boolean;

  /**
   * Запросить доступ на использование биометрии на устройстве
   */
  requestAccess(): void;

  /**
   * Для запуска процесса аутентификации
   */
  authenticate(): void;

  /**
   * Метод, который обновляет биометрический токен в безопасном хранилище на устройстве
   *
   * Чтобы удалить токен, передайте пустую строку.
   */
  updateBiometricToken(): void;

  /**
   * Предложение перейти в настройки MAХ на экран приватности, чтобы дать доступ к биометрии устройства для мини-приложения.
   *
   * Вызывает закрытие мини-приложение.
   */
  openSettings(): void;
}

export interface MaxWebApp {
  /**
   * Строка со стартовыми параметрами в URL-кодировке. Содержит данные о пользователе в виде строки для валидации на стороне сервера. Подробнее о валидации — в разделе Валидация данных (https://dev.max.ru/docs/webapps/validation)
   */
  initData: string;
  /**
   * Объект со стартовыми параметрами, который не должен использоваться для валидации пользователей
   */
  initDataUnsafe: MaxInitDataUnsafe;
  /**
   * Платформа, с которой запущено мини-приложение.
   * Возможные значения: ios, android, desktop, web
   */
  platform: MaxPlatform;
  /**
   * Версия приложения MAX, с которого запущено мини-приложение.
   * Имеет формат <year>.<build_number — возрастающий счётчик>.<patch_version — для патчей>, например 25.9.16
   */
  version: string;

  /**
   * Подпишет на событие с использованием callback
   * @param eventName
   * @param callback
   */
  onEvent<E extends keyof MaxBridgeEvents>(
    eventName: E,
    callback: (eventData: MaxBridgeEvents[E]['eventData']) => void,
  ): void;

  /**
   * Отпишет callback от события
   * @param eventName
   * @param callback
   */
  offEvent<E extends keyof MaxBridgeEvents>(
    eventName: E,
    callback: (eventData: MaxBridgeEvents[E]['eventData']) => void,
  ): void;

  /**
   * Сообщит MAX, что мини-приложение готово к работе
   */
  ready(): void;

  /**
   * Закроет мини-приложение
   */
  close(): void;

  /**
   * Запросит телефон у пользователя в нативном диалоговом окне
   * Описание метода https://dev.max.ru/docs/webapps/bridge#%D0%97%D0%B0%D0%BF%D1%80%D0%BE%D1%81%20%D0%BD%D0%BE%D0%BC%D0%B5%D1%80%D0%B0%20%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0
   *
   * Возможные ошибки
   * Если пользователь отказывается поделиться номером телефона или запрос завершился ошибкой, возвращает:
   * 01	user_refused_provide_phone_number	Пользователь отказался предоставить номер телефона
   * 02	request_error	Ошибка при выполнении запроса (нет сети / не ответил backend)
   */
  requestContact(): TypedPromise<
    {
      phone: string;
      authDate: string;
      hash: string;
    },
    {
      error: {
        code:
          | 'client.request_phone.user_refused_provide_phone_number'
          | 'client.request_phone.request_error';
      };
    }
  >;

  /**
   * Управляет кнопкой Назад в шапке мини-приложения
   */
  BackButton: MaxBackButton;

  /**
   * Объект для управления возможностью делать скриншоты / записывать экран
   */
  ScreenCapture: MaxScreenCapture;

  /**
   * Объект для управления тактильными виброоткликами
   */
  HapticFeedback: MaxHapticFeedback;

  /**
   * Этот объект предоставляет мини-приложению доступ к хранилищу данных, ассоциированному с конкретным пользователем MАХ.
   *
   * Методы DeviceStorage не поддерживаются в веб-версии
   */
  DeviceStorage: MaxDeviceStorage;

  /**
   * Этот объект предоставляет мини-приложению доступ к защищённому хранилищу данных
   *
   * Методы SecureStorage не поддерживаются в веб-версии
   */
  SecureStorage: MaxSecureStorage;

  /**
   * Этот объект нужен для аутентификации, когда доступ к данным в keychain получается через биометрические идентификаторы
   * Перед первым использованием этого объекта его необходимо инициализировать с помощью метода init.
   */
  BiometricManager: MaxBiometricManager;

  /**
   * Включит предупреждение о риске потерять заполненные данные, если закрыть мини-приложение
   */
  enableClosingConfirmation(): void;

  /**
   * Выключит предупреждение о риске потерять заполненные данные, если закрыть мини-приложение
   */
  disableClosingConfirmation(): void;

  /**
   * Откроет ссылку во внешнем браузере
   *
   * Чтобы обезопасить процесс, перед вызовом метода MAX Bridge проверяет клик пользователя в мини-приложении. Если клика не было, перехода по ссылке не будет
   */
  openLink(url: string): void;

  /**
   * Откроет диплинк вида https://max.ru/<some-url> из мини-приложения внутри MAX. Если передать ссылку другого вида, метод откроет её во внешнем браузере
   *
   * Чтобы обезопасить процесс, перед вызовом метода MAX Bridge проверяет клик пользователя в мини-приложении. Если клика не было, перехода по ссылке не будет
   */
  openMaxLink(url: string): void;

  /**
   * Вызовет нативный экран шеринга
   *
   * Чтобы обезопасить процесс, перед вызовом метода MAX Bridge проверяет клик пользователя в мини-приложении. Если клика не было, экран шеринга не откроется
   * @param text
   * @param link
   */
  shareContent(text: string, link: string): void;

  /**
   * Откроет экран шеринга внутри MAX
   *
   * Чтобы обезопасить процесс, перед вызовом метода MAX Bridge проверяет клик пользователя в мини-приложении. Если клика не было, экран шеринга не откроется
   *
   * Для шеринга файла или медиа бот, на котором работает мини-приложение, предварительно отправляет контент пользователю через POST /messages (https://dev.max.ru/docs-api/methods/POST/messages).
   * Шеринг медиа работает как пересылка сообщения, поэтому поддерживается любой тип контента:
   * Бот отправляет контент пользователю — например, медиафайл или открытку
   * Мини-приложение получает идентификатор этого сообщения (mid)
   * В мини-приложении вызывается shareMaxContent({ mid, chatType }), где mid — идентификатор сообщения от бота, а chatType — тип чата:
   * • DIALOG — для диалога, личного чата между двумя пользователями
   * • CHAT — для группового чата. Пользователь должен быть участником чата
   * Пользователь выбирает, куда отправить контент — сообщение пересылается в выбранный чат
   * В метод передаются либо text и/или link, либо mid и chatType. Если при шеринге медиа или файла передать text или link, они будут проигнорированы
   */
  shareMaxContent(
    share: { text: string; link: string } | { mid: string; chatType: string },
  ): void;

  /**
   * Скачает файл по переданной ссылке. Ссылка должна быть вида https://..
   *
   * Чтобы обезопасить процесс, перед вызовом метода MAX Bridge проверяет клик пользователя в мини-приложении. Если клика не было, файл не будет скачен
   *
   * @param url
   * @param file_name
   */
  downloadFile(url: string, file_name: string): void;

  /**
   * Установит яркость экрана на максимум. Клиент поддержит максимальную яркость 30 секунд, затем восстановит исходное значение
   */
  requestScreenMaxBrightness(): void;

  /**
   * Восстановит яркость экрана до исходного значения
   */
  restoreScreenBrightness(): void;

  /**
   * Откроет камеру для считывания QR-кода.
   *
   * Клиент вернет результат в виде строки, если QR-код был найден и распознан
   * fileSelect = true — доступен также выбор из галереи
   * fileSelect = false — доступно сканирование только через камеру
   *
   *
   * Если fileSelect не передан — по умолчанию считается true
   * @param fileSelect
   */
  openCodeReader(fileSelect: boolean): void;
}

type FunctionLike = () => void;

type MaxBridgeEventsDef<EventData, BridgeResponse> = {
  eventData: EventData;
  bridgeResponse: BridgeResponse;
};

export type MaxBridgeEvents = {
  /**
   * Просигнализирует нативному приложению, что мини-приложение готово к работе
   *
   * Если контент мини-приложения не был загружен за 15 секунд — клиент отобразит экран с ошибкой "нет сети"
   *
   * Если контент мини-приложения был загружен ИЛИ было вызвано событие WebAppReady на платформе — платформа отображает загруженную страницу
   *
   * Мини-приложению не требуется промис со стороны нативного клиента
   */
  WebAppReady: MaxBridgeEventsDef<never, never>;

  /**
   * Просигнализирует нативному приложению, что мини-приложение должно быть закрыто
   *
   * Мини-приложению не требуется промис со стороны нативного клиента
   */
  WebAppClose: MaxBridgeEventsDef<never, never>;

  /**
   * Управляет поведением кнопки назад, которая может отображаться в заголовке мини-приложения в интерфейсе MAX
   *
   * isVisible = true — кнопка назад отображается
   *
   * isVisible = false — кнопка назад не отображается	isVisible: boolean
   */
  WebAppSetupBackButton: MaxBridgeEventsDef<{ isVisible: boolean }, never>;

  /**
   * Получив это событие, клиенты покажут пользователю сообщение о том, что мини-приложение просит поделиться номером телефона
   *
   * Мини-приложению требуется промис со стороны нативного клиента
   */
  WebAppRequestPhone: MaxBridgeEventsDef<never, { phone: string }>;

  /**
   * Управляет поведением окна с запущенным мини-приложением
   *
   * needConfirmation = true — клиент запросит подтверждение пользователя с помощью всплывающего окна «Внесенные вами изменения могут быть не сохранены»
   *
   * needConfirmation = false — клиент не будет запрашивать
   *
   * Если явно не передано — запрашиваться не будет.
   */
  WebAppSetupClosingBehavior: MaxBridgeEventsDef<
    { needConfirmation: boolean },
    never
  >;

  /**
   * Уведомление о том, что кнопка Назад была нажата пользователем
   */
  WebAppBackButtonPressed: MaxBridgeEventsDef<never, never>;

  /**
   * Откроет ссылку во внешнем браузере
   *
   * Вызывается методом openLink() в объекте Window.WebApp
   *
   * В случае успеха:
   *
   * { status: "opened" }
   *
   * В случае ошибки:
   *
   * { error: { code: "client.open_link.<reason>" } }
   *
   * Возможные значения reason:
   * parse_link_error — передана неправильная ссылка
   * user_gesture_required — необходимо активное действие (клик) пользователя в мини-приложении
   */
  WebAppOpenLink: MaxBridgeEventsDef<
    { url: string },
    | { status: 'opened' }
    | {
        error: {
          code:
            | 'client.open_link.parse_link_error'
            | 'client.open_link.user_gesture_required';
        };
      }
  >;

  /**
   * Открытие диплинка вида https://max.ru/<some-url> из мини-приложения внутри MAX
   *
   * Если передать ссылку другого вида, метод откроет её во внешнем браузере
   *
   * Вызывается методом openMaxLink() в объекте Window.WebApp
   *
   * В случае успеха:
   *
   * { status: "opened" }
   *
   * В случае ошибки:
   *
   * { error: { code: "client.open_max_link.<reason>" } }
   *
   * Возможные значения reason:
   * parse_link_error — передана неправильная ссылка
   * user_gesture_required — необходимо активное действие (клик) пользователя в мини-приложении
   */
  WebAppOpenMaxLink: MaxBridgeEventsDef<
    { url: string },
    | { status: 'opened' }
    | {
        error: {
          code:
            | 'client.open_max_link.parse_link_error'
            | 'client.open_max_link.user_gesture_required';
        };
      }
  >;

  /**
   * Откроет нативный шеринг из мини-приложения
   *
   * Вызывается методом shareContent() в объекте Window.WebApp
   *
   * { requestId: string, text: string, link: string } - Максимальная длина — 200 символов
   *
   * В случае успеха:
   *
   * { requestId: string, status: "shared" }
   *
   * Если экран шеринга был закрыт:
   *
   * { requestId: string, status: "cancelled" }
   *
   * В случае ошибки:
   *
   * { error: { code: "client.web_app_share.<reason>" } }
   *
   * Возможные значения reason:
   * too_large_text — слишком длинный текст
   * too_large_link — слишком длинная ссылка
   * invalid_request — не передан хотя бы один параметр
   * user_gesture_required — необходимо активное действие (клик) пользователя в мини-приложении
   */
  WebAppShare: MaxBridgeEventsDef<
    { requestId: string; text: string; link: string },
    | { requestId: string; status: 'shared' }
    | { requestId: string; status: 'cancelled' }
    | {
        error: {
          code:
            | 'client.web_app_share.too_large_text'
            | 'client.web_app_share.too_large_link'
            | 'client.web_app_share.invalid_request'
            | 'client.web_app_share.user_gesture_required';
        };
      }
  >;

  /**
   * Откроет нативный шеринг из мини-приложения в личные или групповые чаты MAХ
   *
   * Вызывается методом shareMaxContent() в объекте Window.WebApp
   *
   * { requestId: string, text: string, link: string, mid: string, chatType: string }
   *
   * При шеринге сообщения с текстом и/или ссылкой в eventDataбудут переданы
   * text и/или link
   *
   * При шеринге сообщения с файлом или медиа бот, на котором работает мини-приложение, предварительно отправит этот контент пользователю:
   * mid — идентификатор сообщения от бота пользователю
   * chatType — тип чата:
   * • DIALOG — для диалога, личного чата между двумя пользователями
   * • CHAT — для группового чата. Пользователь должен быть участником чата
   * В метод передаются либо text и/или link, либо mid и chatType. Если при шеринге медиа или файла передать text или link, они будут проигнорированы
   *
   * В случае успеха:
   *
   * { requestId: string, status: "shared" }
   *
   * Если экран шеринга был закрыт:
   *
   * { requestId: string, status: "cancelled" }
   *
   * В случае ошибки:
   *
   * { error: { code: "client.web_app_max_share.<reason>" } }
   *
   * Возможные значения reason:
   * too_large_text — слишком длинный текст
   * too_large_link — слишком длинная ссылка
   * invalid_request — параметры переданы некорректно или один из параметров mid / chatType отсутствует в кэше
   * user_gesture_required — необходимо активное действие (клик) пользователя в мини-приложении
   */
  WebAppMaxShare: MaxBridgeEventsDef<
    {
      requestId: string;
      text?: string;
      link?: string;
      mid: string;
      chatType: 'DIALOG' | 'CHAT';
    },
    | { requestId: string; status: 'shared' }
    | { requestId: string; status: 'cancelled' }
    | { error: { code: 'client.web_app_max_share.<reason>' } }
  >;

  /**
   * Скачает файлы на устройство пользователя
   *
   * Вызывается методом downloadFile() в объекте Window.WebApp
   *
   * В случае успеха:
   *
   * { requestId: string, status: "downloading" }
   *
   * Если скачивание отменено пользователем:
   *
   * { requestId: string, status: "cancelled" }
   *
   * В случае ошибки:
   *
   * { error: { code: "client.download_file.<reason>" } }
   *
   * Возможные значения reason:
   * download_failed  — скачивание завершилось ошибкой
   * invalid_request — отсутствует один из параметров или протокол ссылки на файл отличен от https
   * user_gesture_required — необходимо активное действие (клик) пользователя в мини-приложении
   */
  WebAppDownloadFile: MaxBridgeEventsDef<
    { requestId: string; url: string; file_name: string },
    | { requestId: string; status: 'downloading' }
    | { requestId: string; status: 'cancelled' }
    | { error: { code: 'client.download_file.<reason>' } }
  >;

  /**
   * Управление возможностью делать скриншоты / записывать экран
   *
   * В случае успеха:
   *
   * { requestId: string, isScreenCaptureEnabled: boolean }
   *
   * Возможные значения isScreenCaptureEnabled:
   * true — разрешить делать скриншоты / запись экрана
   * false — запретить делать скриншоты / запись экрана
   *
   *
   */
  WebAppSetupScreenCaptureBehavior: MaxBridgeEventsDef<
    { requestId: string; isScreenCaptureEnabled: boolean },
    { requestId: string; isScreenCaptureEnabled: boolean }
  >;

  /**
   * Управление яркостью экрана
   *
   * maxBrightness: true — установит максимальную яркость. Клиент поддержит максимальную яркость 30 секунд, затем восстановит исходное значение
   *
   * maxBrightness: false — восстановит яркость экрана до исходного значения
   */
  WebAppChangeScreenBrightness: MaxBridgeEventsDef<
    { requestId: string; maxBrightness: boolean },
    never
  >;

  /**
   * В случае когда произошел тактильный отклик и необходимо вызвать вибрацию
   *
   * В случае успеха:
   *
   * { requestId: string, impactStyle: string, disableVibrationFallback: boolean }
   *
   * Возможные значения impactStyle:
   * soft — мягкая вибрация
   * light — лёгкая вибрация
   * medium — средняя вибрация
   * heavy — сильная вибрация
   * rigid — жёсткая вибрация
   *
   *
   * disableVibrationFallback — разрешение использовать вибрацию с постоянной амплитудой на устройствах, которые не поддерживают вибрацию с переменной амплитудой. Значение по умолчанию: false.
   *
   *
   * В случае успеха:
   *
   * { requestId: string, status: "impactOccured" }
   *
   * В случае ошибки:
   *
   * { error: { code: "client.haptic_feedback_impact.<reason>" } }
   *
   * Возможные значения reason:
   * not_supported — haptic feedback недоступен на устройстве
   * invalid_impact_style — передан неизвестный impact style
   */
  WebAppHapticFeedbackImpact: MaxBridgeEventsDef<
    {
      requestId: string;
      impactStyle: string;
      disableVibrationFallback: boolean;
    },
    | { requestId: string; status: 'impactOccured' }
    | { error: { code: 'client.haptic_feedback_impact.<reason>' } }
  >;

  /**
   * В случае когда событие или действие выполнены успешно, не выполнены или выдано предупреждение
   *
   * В случае успеха:
   *
   * { requestId: string, fileSelect: boolean }
   *
   * Возможные значения notificationType:
   * error — Укажет, что задача или действие не удалось
   * success — Укажет, что задача или действие были успешно завершены
   * warning — Укажет, что задача или действие вызвали предупреждение
   *
   *
   * disableVibrationFallback — разрешение использовать вибрацию с постоянной амплитудой на устройствах, которые не поддерживают вибрацию с переменной амплитудой. Значение по умолчанию: false.
   *
   *
   * В случае успеха:
   *
   * { requestId: string, status: "notificationOccured" }
   *
   * В случае ошибки:
   *
   * { error: { code: "client.haptic_feedback_notification.<reason>" } }
   *
   * Возможные значения reason:
   * not_supported — haptic feedback недоступен на устройстве
   * invalid_notification_type — передан неизвестный notification type
   */
  WebAppHapticFeedbackNotification: MaxBridgeEventsDef<
    { requestId: string; fileSelect: boolean },
    | { requestId: string; status: 'notificationOccured' }
    | { error: { code: 'client.haptic_feedback_notification.<reason>' } }
  >;

  /**
   * Сообщит генератору виброотклика, что пользователь изменил выбор
   *
   * В случае успеха:
   *
   * { requestId: string, disableVibrationFallback: boolean }
   *
   * disableVibrationFallback — разрешение использовать вибрацию с постоянной амплитудой на устройствах, которые не поддерживают вибрацию с переменной амплитудой. Значение по умолчанию: false.
   *
   *
   * В случае успеха:
   *
   * { requestId: string, status: "selectionChanged" }
   *
   * В случае ошибки:
   *
   * { error: { code: "client.haptic_feedback_selection_change.<reason>" } }
   *
   * Возможные значения reason:
   * not_supported — haptic feedback недоступен на устройстве
   */
  WebAppHapticFeedbackSelectionChange: MaxBridgeEventsDef<
    { requestId: string; disableVibrationFallback: boolean },
    | { requestId: string; status: 'selectionChanged' }
    | { error: { code: 'client.haptic_feedback_selection_change.<reason>' } }
  >;

  /**
   * Откроет камеру для считывания QR-кода и получит результат сканирования
   *
   * Клиент не имеет возможности ответить, что код не был найден
   *
   * В случае успеха:
   *
   * { requestId: string, fileSelect: boolean }
   *
   * fileSelect = true — доступен также выбор из галереи
   * fileSelect = false — доступно сканирование только через камеру
   *
   *
   * В случае успеха:
   *
   * { requestId: string, value: string }
   *
   * В случае ошибки:
   *
   * { error: { code: "client.open_code_reader.<reason>" } }
   *
   * Возможные значения reason:
   * not_supported — на устройстве нет камеры
   * permission_denied — пользователь не дал доступ к камере
   * cancelled — пользователь закрыл камеру
   */
  WebAppOpenCodeReader: MaxBridgeEventsDef<
    { requestId: string; fileSelect: boolean },
    | { requestId: string; value: string }
    | { error: { code: 'client.open_code_reader.<reason>' } }
  >;
};
