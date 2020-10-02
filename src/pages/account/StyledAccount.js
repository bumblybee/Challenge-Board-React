import styled from "styled-components";

const StyledUserMessage = styled.h1`
  padding: 1rem;
  color: #dcdddefb;
  text-shadow: 0 2px 14px #809bffee;
  font-family: "Roboto Slab", serif;
  font-size: 1.9rem;
`;

const StyledCategoryH3 = styled.h3`
  color: #809bffee;
  font-family: "Roboto", serif;
  font-size: 1.7rem;
  padding: 0.5rem 0 0.5rem;
  border-bottom: 4px solid #809bffee;

  @media (max-width: 620px) {
    font-size: 1.3rem;
  }
`;

const StyledQuestionTitle = styled.h4`
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
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
  height: 100%;
  margin: 0 auto;
  display: grid;
  padding: 0.9rem;
  background: #2f3136;
  grid-template-columns: repeat(3, 1fr);
  overflow-y: scroll;
  border-radius: 6px;
  /* border: 4px inset rgba(0, 0, 0, 0.2); */
  border-style: inset;
  border-width: 12px;
  border-top-color: rgba(0, 0, 0, 0.06);
  border-left-color: rgba(0, 0, 0, 0.06);
  border-right-color: #3a3c42;
  border-bottom-color: #3a3c42;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 0.4rem;
    border-width: 8px;
  }
`;

const StyledPostList = styled.ul`
  padding: 0 0 1rem;
  margin-bottom: 0.5rem;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  border-left: 4px solid #809bffee;
  border-top: 4px solid #809bffee;
  border-bottom: 4px solid #809bffee;
  border-right: 4px solid #809bffee;

  :not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  :not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  @media (max-width: 1024px) {
    border-right: 4px solid #809bffee;
    padding: 0;
    margin-bottom: 0;
    :first-child {
      border-top-right-radius: 6px;
    }

    :not(:first-child) {
      border-top-right-radius: 0;
      border-top-left-radius: 0;
    }

    :not(:last-child) {
      border-bottom: none;
      border-bottom-left-radius: 0;
    }
  }

  @media (max-width: 620px) {
    padding: 0;
    height: auto;
  }
`;

const StyledAccountPost = styled.li`
  margin: 0 auto;
  padding: 1rem;
  white-space: pre-wrap;
  text-align: ${(props) => (props.noLength ? "center" : "left")};

  transition: transform 0.1s ease-in;
  :hover {
    cursor: ${(props) => (props.noLength ? "default" : "pointer")};
    transform: ${(props) => (props.noLength ? "" : "scale(0.99)")};
    box-shadow: ${(props) =>
      props.noLength ? "" : "inset 0 0 10px rgba(0, 0, 0, 0.3);"};
  }

  p {
    font-weight: 300;
  }

  @media (max-width: 620px) {
    width: 100%;
    margin: 0 auto;

    :not(:last-of-type) {
      border-bottom: 0.5px inset #fff;
    }
  }
`;

export const StyledHr = styled.hr`
  display: none;
  @media (max-width: 620px) {
    border: 0.5px inset transparent;

    display: block;
    margin: 0 auto;
  }
`;

export const StyledDate = styled.div`
  color: #7d8088;
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
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
