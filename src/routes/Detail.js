import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

/*
    GraphQL 서버에 보내는 쿼리에 인자가 없을때는 별도의 이름 지정없이 쿼리를 작성하면 된다.
    하지만 인자가 있을 경우, 
    Client쪽(apollo 쪽)에서 쿼리를 지칭하는 별도의 명칭 지정이 필요하다.(Server와는 무관)

    예) 
    query 쿼리명칭($파라미터명: 파라미터타입){
        실제 서버쪽에 보내는 쿼리
    }
*/
const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      description_full
      language
      rating
      isLiked @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) },
  });

  return (
    <Container>
      <Column>
        <Title>
          {loading
            ? "Loading..."
            : data
            ? `${data.movie.title} ${data.movie.isLiked ? "😍" : "😥"}`
            : ""}
        </Title>
        {!loading && (
          <>
            <Subtitle>
              {data?.movie?.language} · {data?.movie?.rating}
            </Subtitle>
            <Description>{data?.movie?.description_full}</Description>
          </>
        )}
      </Column>
      <Poster bg={data?.movie?.medium_cover_image}></Poster>
    </Container>
  );
};
