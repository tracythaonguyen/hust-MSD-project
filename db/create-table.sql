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
  age INT,
  occupation VARCHAR(100),
  account_id INT REFERENCES account(account_id)
);

CREATE TABLE category (
  category_id SERIAL PRIMARY KEY,
  category_name VARCHAR(100) NOT NULL
);

CREATE TABLE video (
  video_id SERIAL PRIMARY KEY,
  video_title VARCHAR(255) NOT NULL,
  category_id INT REFERENCES category(category_id),
  level VARCHAR(50),
  source_link TEXT NOT NULL
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
  video_id INT REFERENCES video(video_id),
  last_watched_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE progress (
  progress_id SERIAL PRIMARY KEY,
  learner_id INT REFERENCES learner(learner_id),
  video_id INT REFERENCES video(video_id),
  track_id INT,
  score INT CHECK (score >= 0 AND score <= 100),
  last_updated_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (video_id, track_id) REFERENCES track(video_id, track_id)
);


CREATE TABLE favorite (
  favorite_id SERIAL PRIMARY KEY,
  learner_id INT REFERENCES learner(learner_id),
  video_id INT REFERENCES video(video_id)
);

select * from category;
select * from video;
INSERT INTO category (category_name)
VALUES
('Movies'),
('News'),
('Interview'),
('Podcast'),
('Vlog'),
('Presentation'),
('Talkshow'),
('Animations');

INSERT INTO video(video_title, category_id, level, source_link)
VALUES
('Brooklyn Nine-Nine',1,'Medium','https://www.youtube.com/watch?v=LUE48DT8MyY'),
('Mini cheesecakes', 2, 'Medium', 'https://www.youtube.com/watch?v=3NE6rb1n8iU');

INSERT INTO track (track_id, video_id, start_time, end_time, transcript)
VALUES
(1, 1, 0, 1.07, 'Sir do you have a minute'),
(2, 1, 1.07, 2.55, 'I wanted to apologize'),
(3, 1, 2.55, 6.1, 'Being back at work has been weird');

INSERT INTO tag (tag_name)
VALUES
('Education'),
('Fashion'),
('Language Learning');

INSERT INTO tag_to_video (tag_id, video_id)
VALUES
(1, 1),
(1, 2),
(2, 2);

select * from track

