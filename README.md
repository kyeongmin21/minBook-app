# 📖 프로젝트 소개 (minBook - App)
minBook App은 읽고 싶은 책을 저장하고, 읽은 책에 대한 간단한 한줄평과 느낀점을 기록할 수 있는 나만의 독서 기록 앱입니다.

홈 화면에서는 카카오 도서 검색 API를 통해 다양한 책 목록을 확인할 수 있으며,

관심 있는 책은 위시리스트에 저장하고 읽은 후에는 간단한 리뷰를 남길 수 있습니다.

독서를 더 편하고 기록하기 쉽게 만들기 위해 제작한 개인 프로젝트입니다.

<br/><br/>

## 💡 프로젝트를 만들게 된 계기

평소에 읽고 싶은 책이 생기면 아이폰 메모장에 따로 적어두는 습관이 있었습니다.

하지만 시간이 지나면서 메모가 늘어나고 정리가 어려워지는 불편함이 있었습니다.

그래서

> "읽고 싶은 책을 한 곳에서 관리하고, 읽은 책에 대한 기록도 남길 수 있는 앱을 직접 만들어보면 어떨까?"

라는 생각으로 공부도 할 겸 이 프로젝트를 시작하게 되었습니다.

<br/><br/>

## 🛠 기술 스택

- React Native
- Expo
- Zustand (상태 관리)
- AsyncStorage (로컬 데이터 저장)
- Kakao Book Search API ([링크](https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide#search-book) , REST API 키)
- Supabase

<br/><br/>

## Get started
1. Start the app

   ```bash
   npx expo start
   ```

2. Start the web (앱을 웹에서 확인하고 싶을 때)
    ```
   npx expo start --web
   ```
