const cookieVal = $request.headers['Cookie'] || $request.headers['cookie']

if (cookieVal) {
  let cookie = $persistentStore.write(cookieVal, 'v2ex_cookie')
  if (cookie) {
    $notification.post('V2EX', 'cookie写入成功')
    console.log('V2EX Cookie:')
    console.log(cookieVal)
  }
}

$done({})
