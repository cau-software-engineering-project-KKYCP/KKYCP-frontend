# 웹 테스트 가이드
---

0. Spring boot 서버가 켜져있다는 전제 하에 진행합니다.
1. **Node.js 20**버전 설치
2. **KKYCP-fronted** 디렉토리로 이동 후 ```npm install ``` 터미널에 입력
3. 설치가 완료되면 ``` npm start ``` 터미널에 입력
4. 서버 실행이 완료되면  http://localhost:3030/login.html 로 이동 후 테스트 진행
   - http://localhost:3030으로 이동할 경우 server 관리자 페이지로 이동됨.   
5. 테스트 admin 계정 (ID : admin, PW : admin), 직접 계정 생성해도 됩니다.

<br>

## 테스트 시 주의사항
---
1. login을 하지않고 나머지 과정 테스트하려 하면 오류 발생함.
