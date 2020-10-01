import styled from "styled-components";

const StyledUserMessage = styled.h1`
  padding: 1rem;
  color: #dcdddefb;
  text-shadow: 0 2px 14px #809bff;
  font-family: "Roboto Slab", serif;
  font-size: 1.9rem;
`;

const StyledCategoryH3 = styled.h3`
  color: #809bffee;
  font-family: "Roboto", serif;
  font-size: 1.7rem;
  padding: 0.5rem 0 0.5rem;
  border-bottom: 3px solid #809bffee;
  @media (max-width: 620px) {
    font-size: 1.3rem;
  }
`;

const StyledQuestionTitle = styled.h4`
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const StyledAccountDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  width: 80%;
  margin: 3rem auto;
  padding: 1rem;
  text-align: center;
  background-color: #3a3c42;
  height: 85vh;

  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035);

  @media (max-width: 620px) {
    width: 96%;
    margin: 1rem auto;
    height: 90vh;
  }
`;

const StyledAccountPostsDiv = styled.div`
  width: 100%;
  height: 110%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  overflow-y: scroll;
  border-radius: 6px;
  /* border-bottom-right-radius: 6px; */
  border: 4px inset rgba(0, 0, 0, 0.2);
  border-radius: 6px;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const StyledPostList = styled.ul`
  background: #2f3136;
  padding: 0 0 1rem;
  width: 100%;
  height: 100%;
  box-shadow: inset -5px 0 rgba(0, 0, 0, 0.1);

  @media (max-width: 620px) {
    padding: 0;

    :not(:last-child) {
      margin-bottom: 1.5rem;
      border-right: none;
    }
  }
`;

const StyledAccountPost = styled.li`
  margin: 0 auto;
  padding: 1rem;
  /* border-radius: 6px; */
  white-space: pre-wrap;
  /* border-bottom: 1px inset rgba(0, 0, 0, 0.05); */

  transition: transform 0.1s ease-in;
  :hover {
    cursor: ${(props) => (props.noLength ? "default" : "pointer")};
    transform: ${(props) => (props.noLength ? "" : "scale(0.99)")};
    box-shadow: ${(props) =>
      props.noLength ? "" : "inset 1px 2px 8px rgba(0, 0, 0, 0.3)"};
  }

  :active {
    box-shadow: ${(props) =>
      props.noLength ? "" : "0 1px 2px rgba(0, 0, 0, 0.1)"};
    transform: scale(1);
  }

  p {
    font-weight: 300;
  }

  @media (max-width: 620px) {
    width: 100%;
    margin: 0 auto;
  }
`;

export const StyledHr = styled.hr`
  display: none;
  @media (max-width: 620px) {
    border: 0.5px inset rgba(0, 0, 0, 0.3);

    display: block;
    margin: 0 auto;
  }
`;

export {
  StyledUserMessage,
  StyledCategoryH3,
  StyledQuestionTitle,
  StyledAccountDiv,
  StyledAccountPostsDiv,
  StyledAccountPost,
  StyledPostList,
};
