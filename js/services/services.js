// ф-ція 'сервіс' (її краще в окрему папку і файли)
// ф-ція налаштовує запрос (посила на сервер запросс => получа в-дь => транс в джсон)
const postData = async (url, data) => {
  // await - знач дожидаємся  закінч запросу
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: data,
  });
  //  повертаєм результат, щоб далі його обробити через then, бо це проміс
  //  коли перевів, тільки поді повертає
  return await res.json();
};

const getResourse = async (url) => {
  let res = await fetch(url);
  // .ok - чи все норм?
  // .status -
  // якщо не ок бо футч не розуміє 404
  if (!res.ok) {
    // викидаю помилку
    // выполнение текущей функции будет остановлено (инструкции после throw не будут выполнены)
    throw new Error(`Could not fetch ${url}, status ${res.status}`);
  }
  //  повертаю результат виконання в форматі json
  return await res.json();
};

export { postData, getResourse };
