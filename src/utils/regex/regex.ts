export const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const validPassword = /^[a-zA-Z0-9](.[a-zA-Z0-9-_!@]*)$/; // Допустимы латинские буквы, цифры и -_!@

export const fullName =
	/^[а-яА-ЯёЁa-zA-Z]+ [а-яА-ЯёЁa-zA-Z]+ ?[а-яА-ЯёЁa-zA-Z]+$/; // Допустим кириллица и латинские буквы. Минимум два слова!

export const validTelegram = /^[a-zA-Z0-9](.[a-zA-Z0-9_.]*)$/; // Вводите ник после /.Допустимы латинские буквы,цифры и _!

export const validPhone = /^[+](.[0-9-]*)$/; // Первый символ +. Допустимы цифры и - !
