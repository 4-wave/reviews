/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React from 'react';
import styled from 'styled-components';
import ShowMoreText from 'react-show-more-text';

const moment = require('moment');

const Wrapper = styled.div`
  display: grid;
  width: 600px;
`;

const Crop = styled.img`
  border-radius: 50%;
`;

const User = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  grid-template-rows: 1fr;
  width: 350px
`;

const NameDate = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  height: 50px;
`;

const Review = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2fr;
  border-bottom: 1px solid rgb(235, 235, 235);
  padding: 9px;
`;

const OwnersRes = styled.div`
  display: grid;
  grid-template-columns: 3% 97%;
  padding: 10px;
  grid-template-rows: 1fr;
`;

const Blank = styled.div``;

const DateFont = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: extra-light;
  size: 8px;
  color: #484848;
`;

const NameFont = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  size: 16px;
  color: #484848; 
`;

const ReviewFont = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: light;
  size: 14px;
  color: #484848; 
`;

const OwnersResFont = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: semi-bold;
  size: 12px;
  color: #484848; 
`;


const ReviewsEntry = ({
  review: {
    name,
    image,
    date,
    review,
    ownersName,
    ownersImage,
    ownersResponseDate,
    response,
  },
}) => (
  <Wrapper>
    <dl>
      <User>
        <div>
          <Crop src={image} width="50" height="50" alt="" />
        </div>
        <NameDate>
          <div>
            <NameFont>
              {name}
            </NameFont>
          </div>
          <div>
            <DateFont>
              {moment(date).format('MMMM YYYY')}
            </DateFont>
          </div>
        </NameDate>
      </User>
      <Review>
        <ReviewFont>
          <div>
            <ShowMoreText
              lines={3}
              more="Read more"
              expanded={false}
            >
              {review}
            </ShowMoreText>
          </div>
        </ReviewFont>
        {ownersName
          ?
          (
            <OwnersRes>
              <Blank />
              <div>
                <dt>
                  <Crop src={ownersImage} width="34" height="34" alt="" />
                </dt>
                <dt>
                  <OwnersResFont>
                    Response from:
                    &nbsp;
                    <NameFont>
                      {ownersName}
                    </NameFont>
                  </OwnersResFont>
                </dt>
                <dt>
                  <ReviewFont>
                    {response}
                  </ReviewFont>
                </dt>
                <dt>
                  <DateFont>
                    {moment(ownersResponseDate).format('MMMM YYYY')}
                  </DateFont>
                </dt>
              </div>
            </OwnersRes>
          )
          : null}
      </Review>
    </dl>
  </Wrapper>
);

export default ReviewsEntry;
