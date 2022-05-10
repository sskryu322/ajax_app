const buildHTML = (XHR) => {
  // 下のpostはcreateアクションのjsonのキーと投稿されたメモの内容が紐づいている
  const item = XHR.response.post;
  // 変数itemに格納されたメモの情報を変数htmlに格納しブラウザに描画する
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post (){
  const submit = document.getElementById("submit");
  // eはイベントオブジェクト 「投稿ボタンをクリックした」という情報を持ったオブジェクトということ
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    // フォームの要素を取得
    const form = document.getElementById("form");
    // フォームの内容を取得 FormDataフォームデータオブジェクト
    const formData = new FormData(form);
    // 非同期通信のためのリクエストを送信 XMLHttpRequestエックスエムエル エイチティーティーピー リクエストオブジェクト
    const XHR = new XMLHttpRequest();
    // リクエストの内容を記述open()オープンメソッド
    // 第一引数にはHTTPメソッド、第二引数にはパス、第三引数には非同期通信であるかをtrueかfalseで記述
    XHR.open("POST", "/posts", true);
    // サーバーからのレスポンスの形式をJSONに指定 responseTypeレスポンスタイププロパティ
    XHR.responseType = "json";
    // フォームの内容をサーバー側に送信 send()センドメソッド
    XHR.send(formData);
    // 注意点：通常リクエストと二重で送られてしまうので
    // メモが重複投稿されないように20,21行目でpreventDefault()プリベントデフォルトメソッドを使う
    // ↓レスポンスの受信に成功したときの処理を記述 onloadプロパティとは、リクエストの送信が成功したときに呼び出されるプロパティ
    XHR.onload = () => {
      // レスポンスに何らかの問題があった場合の処理を記述 200はHTTPステータスコードのリクエストが成功した場合
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        // return nullはjavascriptの処理から抜け出すコード。エラーの場合は以降の処理をストップできる。
        return null;
      };
      // 新しいメモを挿入するための要素を取得して、変数listに格納しています。
      const list = document.getElementById("list");
      // 投稿を表示後に投稿入力欄に残ったままの内容を消すために入力内容をformTextに格納する。
      const formText = document.getElementById("content");
      // insertAdjacentHTMLインサート アジェイセント エイチティーエムエルメソッド
      // HTMLをある要素の指定した箇所に挿入するメソッドです。
      // 第一引数にHTMLを挿入したい位置、第二引数に挿入したいHTMLを記述します。
      // beforebegin:要素の直前 afterbegin:要素内部の、最初の子要素の直前 beforeend:要素内部の、最後の子要素の直後 afterend:要素の直後
      // <挿入したい要素名>.insertAdjacentHTML(挿入したい位置,挿入したいHTML);
      list.insertAdjacentHTML("afterend", buildHTML(XHR)); 
      // 変数formTextに格納されている投稿欄に入力した内容を空にして投稿完了したら残ったままにしないようにする。
      formText.value = ""; 
    };
  });
};

window.addEventListener('load', post);