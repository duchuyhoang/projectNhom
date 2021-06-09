import { CNAvatar } from '@Components/shared/CNAvatar/CNAvatar';
import CNStar from '@Components/shared/CNStar/CNStar';
import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const Avatar = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  margin-right: 25px;
  img {
    width: 100%;
    height: auto;
  }
`;
const CommentBox = styled.div`
  flex: 1 1 auto;
`;
const CommentAuthor = styled.div``;
const FlexMiddle = styled.div`
  display: flex;
  align-items: center;
`;
const NameComment = styled.div`
  margin-right: 15px;
  font-weight: 700;
  font-size: 16px;
`;
const CommentDate = styled.div`
  color: #777777;
  margin-bottom: 10px;
`;
const CommentText = styled.div``;

function CommentItem({ data }) {
  return (
    <Item>
      <Avatar>
        <img
          src={
            data.img === '' || null
              ? 'https://secure.gravatar.com/avatar/?s=70&d=mm&r=g'
              : data.img
          }
        />
      </Avatar>
      <CommentBox>
        <CommentAuthor>
          <FlexMiddle>
            <NameComment>{data.name}</NameComment>
            <CNStar values={data.starValue} readOnly size="small" />
          </FlexMiddle>
          <CommentDate>{data.date}</CommentDate>
          <CommentText>{data.text}</CommentText>
        </CommentAuthor>
      </CommentBox>
    </Item>
  );
}

export default CommentItem;
