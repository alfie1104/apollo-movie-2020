import ApolloClient from "apollo-boost";
/*
    Apollo-Boost는 graphQL yoga처럼 모든 것을 다 설정해둔 package임(클라이언트 사이드. 서버사이드는 graphQL Yoga사용)
    한편, Apollo를 이용하면 GraphQL 요청을 보낼 때 별도로 POST 메시지 생성을 해줄 필요가 없음
    원래는 AXIOS나 FETCH 메소드로 POST방식으로 graphQL 쿼리나 뮤테이션을 보내야함
*/

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
    Mutation: {
      toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
        cache.writeData({
          id: `Movie:${id}`,
          data: {
            isLiked: !isLiked,
          },
        });
      },
    },
  },
});

export default client;
