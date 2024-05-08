const cookieVal = $persistentStore.read('v2ex_cookie')

function sign() {
  let url = {
    url: `https://www.v2ex.com/mission/daily`,
    headers: {
      Cookie: cookieVal
    }
  }
  $httpClient.get(url, (error, response, data) => {
    if (data.indexOf('每日登录奖励已领取') >= 0) {
      let msg = `V2EX 签到结果: 今天已经签过了`
      console.log(`${msg}`)
      $notification.post(msg)
    } else {
      signAgain(data.match(/<input[^>]*\/mission\/daily\/redeem\?once=(\d+)[^>]*>/)[1])
    }
  })
  $done({})
}

function signAgain(code) {
  let url = {
    url: `https://www.v2ex.com/mission/daily/redeem?once=${code}`,
    headers: { Cookie: cookieVal }
  }
  $httpClient.get(url, (error, response, data) => {
    if (data.indexOf('每日登录奖励已领取') >= 0) {
      let msg = `V2EX 签到结果: 签到成功`
      console.log(`${msg}`)
    } else {
      let msg = `V2EX 签到结果: 签到失败`
      console.log(`签到失败: ${cookieName}, error: ${error}, response: ${response}, data: ${data}`)
    }
    $notification.post(msg)
  })
}

sign({})
