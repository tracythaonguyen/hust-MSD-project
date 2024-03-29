DROP TABLE IF EXISTS account CASCADE;
DROP TABLE IF EXISTS learner CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS video CASCADE;
DROP TABLE IF EXISTS track CASCADE;
DROP TABLE IF EXISTS tag CASCADE;
DROP TABLE IF EXISTS tag_to_video CASCADE;
DROP TABLE IF EXISTS history CASCADE;
DROP TABLE IF EXISTS progress CASCADE;
DROP TABLE IF EXISTS favorite CASCADE;
DROP TABLE IF EXISTS feedback CASCADE;


CREATE TABLE account (
  account_id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  user_role VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL
);

CREATE TABLE learner (
  learner_id SERIAL PRIMARY KEY,
  dob DATE,
  occupation VARCHAR(100),
  address VARCHAR(255),
  phone_number INT,
  account_id INT REFERENCES account(account_id),
  total_score INT DEFAULT 0
);

CREATE TABLE category (
  category_id SERIAL PRIMARY KEY,
  category_name VARCHAR(100) NOT NULL,
  category_description TEXT NOT NULL
);

CREATE TABLE video (
  video_id SERIAL PRIMARY KEY,
  video_title VARCHAR(255) NOT NULL,
  category_id INT REFERENCES category(category_id),
  level VARCHAR(50),
  source_link TEXT NOT NULL,
  link_img TEXT,
  description TEXT NOT NULL,
  view INT DEFAULT 0,
  upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE track (
  track_id INT,
  video_id INT REFERENCES video(video_id),
  start_time FLOAT NOT NULL,
  end_time FLOAT NOT NULL,
  transcript TEXT NOT NULL,
  PRIMARY KEY (video_id, track_id)
);


CREATE TABLE tag (
  tag_id SERIAL PRIMARY KEY,
  tag_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE tag_to_video (
  tag_id INT REFERENCES tag(tag_id),
  video_id INT REFERENCES video(video_id),
  PRIMARY KEY(tag_id, video_id)
);

CREATE TABLE history (
  history_id SERIAL PRIMARY KEY,
  learner_id INT REFERENCES learner(learner_id),
  video_id INT,
  track_id INT,
  -- track_score INT CHECK (track_score >= 0 AND track_score <= 100),
  completed INT CHECK (completed >= 0 AND completed <= 1) DEFAULT 0,
  FOREIGN KEY (video_id, track_id) REFERENCES track(video_id, track_id)
);

-- progress TABLE
CREATE TABLE progress (
  progress_id SERIAL PRIMARY KEY,
  learner_id INT REFERENCES learner(learner_id),
  video_id INT,
  highest_score INT DEFAULT 0,
  click_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorite (
  favorite_id SERIAL PRIMARY KEY,
  learner_id INT REFERENCES learner(learner_id),
  video_id INT REFERENCES video(video_id)
);

CREATE TABLE feedback(
  feedback_id SERIAL PRIMARY KEY,
  learner_id INT REFERENCES learner(learner_id),
  video_id INT REFERENCES video(video_id),
  content VARCHAR(500) NOT NULL,
  feedback_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);