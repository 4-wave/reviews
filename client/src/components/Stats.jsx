/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { IoMdStar } from 'react-icons/io';
import { IconContext } from 'react-icons';

const WrappReviews = styled.ul`
  top:400px;
  padding-top:20px;
`;

const Reviews = styled.h2`
  font-family: 'Montserrat', sans-serif;
  size: 24px;
  color: #484848; 
`;

const NumFont = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  size: 14px;
  color: #484848;
`;

const ReviewsHeader = styled.div`
  display: grid;
  grid-template-columns: 45% 10% 45%;
  width: 130px;
  padding: 10px 5px 25px 5px;
  margin-left: -5px;
  grid-template-rows: 1fr;
  grid-column-gap: 20px
  grid-row-gap: 20px
  justify-items: stretch
  align-items: start
  font-family: 'Montserrat', sans-serif;
  font-weight: light;
  color: #484848;
`;

const HorBarColor = styled.div`
  color: rgb(235, 235, 235);
`;

const OuterContainer = styled.div`
  display: grid;
  width: 600px;
  height: 200px;
  grid-template-rows: 49% 2% 49%;
  padding: 10px;
  border: 1px solid #ededed;
  border-radius: 10px;
  -moz-box-shadow: 0 0 3px #ccc;
  -webkit-box-shadow: 0 0 3px #ccc;
  box-shadow: 0 0 3px #ccc;
`;

const MidLine = styled.div`
  border-bottom: 1px solid rgb(235, 235, 235);
`;

const InnerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 12% 1fr 12%;
  grid-template-rows: 1fr 1fr 1fr;
  font-family: 'Montserrat', sans-serif;
  padding: 10px;
  size: 18px;
  color: #484848; 
`;

const Stats = ({
  listing: {
    overall_rating_avg, communication_rating_avg, cleanliness_rating_avg,
    hospitality_total, stylish_total, sparkling_clean_total, quick_responses_total,
    amazing_amenities_total, check_in_rating_avg, accuracy_rating_avg, value_rating_avg, location_rating_avg,
  },
  count: count
}) => (
  <WrappReviews>
    <Reviews>Reviews</Reviews>
    <IconContext.Provider value={{ color: '#008489' }}>
      <ReviewsHeader>
        <div>
          <IoMdStar />
          <NumFont>
            {overall_rating_avg}
          </NumFont>
        </div>
        <HorBarColor>
          <div>|</div>
        </HorBarColor>
        <div>
          <NumFont>
            {count}
            &nbsp;
          </NumFont>
            Reviews
        </div>
      </ReviewsHeader>
    </IconContext.Provider>
    <OuterContainer>
      <InnerContainer>
        <div>Check-in </div>
        <div>
          &nbsp;
          &nbsp;
          &nbsp;
          <NumFont>
            {check_in_rating_avg}
          </NumFont>
        </div>
        <div>Accuracy </div>
        <div>
          &nbsp;
          &nbsp;
          &nbsp;
          <NumFont>
            {accuracy_rating_avg}
          </NumFont>
        </div>
        <div>Communication </div>
        <div>
          &nbsp;
          &nbsp;
          &nbsp;
          <NumFont>
            {communication_rating_avg}
          </NumFont>
        </div>
        <div>Cleanliness </div>
        <div>
          &nbsp;
          &nbsp;
          &nbsp;
          <NumFont>
            {cleanliness_rating_avg}
          </NumFont>
        </div>
        <div>Location </div>
        <div>
          &nbsp;
          &nbsp;
          &nbsp;
          <NumFont>
            {location_rating_avg}
          </NumFont>
        </div>
        <div>Value </div>
        <div>
          &nbsp;
          &nbsp;
          &nbsp;
          <NumFont>
            {value_rating_avg}
          </NumFont>
        </div>
      </InnerContainer>
      <MidLine />
      <InnerContainer>
        <div>Stylish space </div>
        <div>
            🛋
          <NumFont>
            {stylish_total}
          </NumFont>
        </div>
        <div>Quick responses </div>
        <div>
           💬
          <NumFont>
            {quick_responses_total}
          </NumFont>
        </div>
        <div>Sparkling clean </div>
        <div>
          🛁
          <NumFont>
            {sparkling_clean_total}
          </NumFont>
        </div>
        <div>Amazing amenities </div>
        <div>
          ☕️
          <NumFont>
            {amazing_amenities_total}
          </NumFont>
        </div>
        <div>Outstanding hospitality</div>
        <div>
          ♥️
          <NumFont>
            {hospitality_total}
          </NumFont>
        </div>
      </InnerContainer>
    </OuterContainer>
  </WrappReviews>
);

export default Stats;
