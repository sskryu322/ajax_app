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
    // メモが重複投稿されないように3,4行目でpreventDefault()プリベントデフォルトメソッドを使う
  });
};

window.addEventListener('load', post);