import styled from 'styled-components'

export const Loading = styled.div`
  color: #FFF;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`

export const IssueFilter = styled.select`
  margin: 30px auto;
  display: flex;

  background: #7159c1;
  border: 0;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #EEE;
`

export const IssueList = styled.ul`
  margin-top: 30px;
  border-top: 1px solid #EEE;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #EEE;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left:15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }
      }

      span {
        background: #EEE;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  button {
    background: #7159c1;
    border: 0;
    padding: 0 15px;
    margin-left: 10px;
    border-radius: 4px;

    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
  }

  small {
    flex-basis: 100%;
    text-align: center;
    margin-bottom: 30px;
  }
`
