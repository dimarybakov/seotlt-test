import React, { FormEvent, useState } from 'react';
import cls from './AddNewsForm.module.scss';

interface AddNewsFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>, text: string) => void;
}

export const AddNewsForm = (props: AddNewsFormProps) => {
  const { onSubmit } = props;
  const [text, setText] = useState<string>('');

  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <form className={cls.add_form} onSubmit={(e) => onSubmit(e, text)}>
      <label htmlFor="news_text">Enter a news</label>
      <textarea
        className={cls.text}
        value={text}
        id="news_text"
        onChange={changeHandler}
      ></textarea>
      <button type="submit" className={cls.add_button}>
        Add news
      </button>
    </form>
  );
};
