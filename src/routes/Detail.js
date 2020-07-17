import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

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
      title
      medium_cover_image
      description_full
      language
      rating
    }
  }
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) },
  });
  if (loading) {
    return "loading";
  }

  if (data && data.movie) {
    return data.movie.title;
  }
};
