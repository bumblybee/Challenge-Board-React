import styled from "styled-components";

const StyledHelloH1 = styled.h1`
  text-align: center;
  padding: 2rem 0;
  color: #fff;
  font-family: "Arial", "Helvetica", sans-serif;
`;

const StyledCategoryH3 = styled.h3`
  color: #809bff;
  font-family: "Roboto-Slab", serif;
  font-size: 1.5rem;
  @media (max-width: 620px) {
    font-size: 1.2rem;
  }
`;

const StyledQuestionTitle = styled.h4`
  margin-bottom: 0.5rem;
`;

const StyledAccountDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  width: 80%;
  margin: 3rem auto;
  padding: 1rem;
  text-align: center;
  background-color: #2f3136;
  height: 85vh;

  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035);

  @media (max-width: 620px) {
    width: 90%;
    margin: 1rem auto;
    height: 90vh;
  }
`;

const StyledAccountPostsDiv = styled.div`
  width: 90%; 
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  overflow-y: scroll;
  border-radius: 6px;
  border-bottom-right-radius: 6px;

   @media (max-width: 620px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  }
`;

const StyledPostList = styled.ul`
  background: #2f3136;
  padding: 0 0.5rem 1rem;
  width: 100%;
  margin-bottom: 1rem;
`;

const StyledAccountPost = styled.li`
  margin: 0.5rem auto 0;
  padding: 1rem;
  background: #3a3c42;

  border-radius: 6px;

  transition: transform 0.1s ease-in;
  :hover {
    cursor: pointer;
    transform: scale(0.99);
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  }
`;

export {
  StyledHelloH1,
  StyledCategoryH3,
  StyledQuestionTitle,
  StyledAccountDiv,
  StyledAccountPostsDiv,
  StyledAccountPost,
  StyledPostList,
};
