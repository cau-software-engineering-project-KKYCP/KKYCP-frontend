// Fetch API를 사용하여 회원가입 폼 제출 이벤트 처리
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault(); // 폼의 기본 제출 동작을 막음

        const formData = new FormData(this); // 폼 데이터를 FormData 객체로 생성
        const data = new URLSearchParams(formData); // URLSearchParams로 변환

        // 백엔드 회원가입 API 호출
        fetch('/api/signup', {
            method: 'POST',
            body: data,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            if (response.ok) {
                // 회원가입 성공 시 로그인 페이지로 이동
                console.log("response 201");
                //window.location.href = 'login.html';
            } else {
                return response.text().then(text => { throw new Error(text); });
                console.log("실패");
            }
            console.log(response)
        })
        .catch(error => {
            alert('회원가입 실패: ' + error.message);
            console.log(error)
        });

        
    });
});