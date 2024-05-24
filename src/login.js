// base64 인코딩 함수
function base64Encode(str) {
    return btoa(str);
}
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    
    if(loginForm){
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault(); // 폼의 기본 제출 동작을 방지

            // FormData 객체를 사용하여 폼 데이터를 준비
            const formData = new FormData(loginForm);
            const object = {};
            formData.forEach((value, key) => object[key] = value);
            const loginData = new URLSearchParams(object).toString(); // URLSearchParams를 사용하여 x-www-form-urlencoded 형식으로 변환

            // fetch API를 사용하여 로그인 요청
            fetch("/api/login", {
                method: "POST",
                headers: {
                    "Accept": "application/x-www-form-urlencoded",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: loginData,
                credentials : 'include',
            })
            .then(response => {
                if (response.ok) {
                    return response.json(); // 로그인 성공 시, JSON 응답을 기대함
                }
                throw new Error('로그인 실패');
            })
            .then(json => {
                console.log('로그인 성공:', json);
                // 성공 처리 로직, 예를 들어 페이지 리다이렉트
            })
            .catch(error => {
                console.error('로그인 에러:', error);
            });
        });
    }
});