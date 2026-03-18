const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// 모듈 해석 우선순위(Condition Names) 설정
// 웹 환경에서 브라우저 호환 모듈을 우선적으로 선택하도록 강제함
// https://velog.io/@hyun_jun/React-Native-Web-Expo%EC%97%90%EC%84%9C-import.meta-%EC%98%A4%EB%A5%98%EC%99%80-Zustand-persist-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0-%EA%B2%BD%ED%97%98
config.resolver.unstable_conditionNames = [
    "browser",       // 1순위: 브라우저 환경용 모듈
    "require",       // 2순위: CommonJS 방식
    "react-native",  // 3순위: 리액트 네이티브 환경용
];

module.exports = config;

