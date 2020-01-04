\connect reviews;
DROP SCHEMA IF EXISTS reviews_schema CASCADE;
CREATE SCHEMA reviews_schema;

CREATE TABLE IF NOT EXISTS reviews_schema.users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(45),
  image VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS reviews_schema.owners (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(45),
  image VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS reviews_schema.owner_responses (
  id SERIAL PRIMARY KEY NOT NULL,
  response VARCHAR(2000),
  review_id INT,
  owner_id INT,
  date VARCHAR(60)
);

CREATE TABLE IF NOT EXISTS reviews_schema.listings (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(45),
  overall_rating_avg DECIMAL(4, 2),
  communication_rating_avg DECIMAL(4, 1),
  cleanliness_rating_avg DECIMAL(4, 1),
  check_in_rating_avg DECIMAL(4, 1),
  accuracy_rating_avg DECIMAL(4, 1),
  location_rating_avg DECIMAL(4, 1),
  value_rating_avg DECIMAL(4, 1),
  quick_responses_total INT,
  sparkling_clean_total INT,
  amazing_amenities_total INT,
  stylish_total INT,
  hospitality_total INT,
  owner_id SERIAL
);

CREATE TABLE IF NOT EXISTS reviews_schema.reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  date VARCHAR(60),
  review VARCHAR(2000),
  overall_rating INT,
  cleanliness_rating INT,
  communication_rating INT,
  check_in_rating INT,
  accuracy_rating INT,
  value_rating INT,
  location_rating INT,
  quick_responses BOOLEAN,
  sparkling_clean BOOLEAN,
  amazing_amenities BOOLEAN,
  stylish BOOLEAN,
  hospitality BOOLEAN,
  user_id SERIAL,
  listing_id SERIAL
);

CREATE TABLE IF NOT EXISTS reviews_schema.user_reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id SERIAL,
  listing_id SERIAL,
  review_id SERIAL,
  owner_id SERIAL
);

ALTER TABLE reviews_schema.owners_responses 
ADD FOREIGN KEY (review_id)
REFERENCES reviews_schema.reviews(id);

ALTER TABLE reviews_schema.owners_responses
ADD FOREIGN KEY (owner_id)
REFERENCES reviews_schema.owners(id);

ALTER TABLE reviews_schema.listings
ADD FOREIGN KEY (owner_id)
REFERENCES reviews_schema.owners(id);

ALTER TABLE reviews_schema.reviews
ADD FOREIGN KEY (listing_id)
REFERENCES reviews_schema.listings(id);

ALTER TABLE reviews_schema.reviews
ADD FOREIGN KEY (user_id)
REFERENCES reviews_schema.users(id);

CREATE INDEX owner_responses_owner_id ON reviews_schema.owner_responses(owner_id);

CREATE INDEX reviews_listing_id ON reviews_schema.reviews(listing_id);
CREATE INDEX reviews_user_id ON reviews_schema.reviews(user_id);

CREATE INDEX listings_owner_id ON reviews_schema.listings(owner_id);

CREATE INDEX user_reviews_user_id ON reviews_schema.user_reviews(user_id);
CREATE INDEX user_reviews_listing_id ON reviews_schema.user_reviews(listing_id);
CREATE INDEX user_reviews_review_id ON reviews_schema.user_reviews(review_id);
CREATE INDEX user_reviews_owner_id ON reviews_schema.user_reviews(owner_id);