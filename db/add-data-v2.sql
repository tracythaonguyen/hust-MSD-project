
-- Reset the serial sequence of account_id in the account table
SELECT setval('account_account_id_seq', (SELECT COALESCE(MAX(account_id), 1) FROM account), false);
SELECT setval('category_category_id_seq',(SELECT COALESCE(MAX(category_id), 1) FROM category), false);
SELECT setval('learner_learner_id_seq',(SELECT COALESCE(MAX(learner_id), 1) FROM learner), false);
SELECT setval('favorite_favorite_id_seq',(SELECT COALESCE(MAX(favorite_id), 1) FROM favorite), false);
SELECT setval('history_history_id_seq',(SELECT COALESCE(MAX(history_id), 1) FROM history), false);
SELECT setval('progress_progress_id_seq',(SELECT COALESCE(MAX(progress_id), 1) FROM progress), false);
SELECT setval('tag_tag_id_seq',(SELECT COALESCE(MAX(tag_id), 1) FROM tag), false);
SELECT setval('video_video_id_seq',(SELECT COALESCE(MAX(video_id), 1) FROM video), false);
-- Insert data into the account table
INSERT INTO account (username, password, email, user_role, first_name, last_name)
VALUES
('admin', 'password123', 'admin@gmail.com', 'admin', 'Ad', 'Min'),
('jane_smith', 'password123456', 'jane.smith@example.com', 'learner', 'Jane', 'Smith'),
('sam_black', 'passwordsam987', 'sam.black@example.com', 'learner', 'Sam', 'Black'),
('lisa_green', 'greenpassword234', 'lisa.green@example.com', 'learner', 'Lisa', 'Green'),
('alex_brown', 'alexbrownpass', 'alex.brown@example.com', 'learner', 'Alex', 'Brown');

-- Insert data into the learner table
INSERT INTO learner (age, occupation, account_id)
VALUES
(25, 'Software Developer', 2),
(22, 'Graphic Designer', 3),
(28, 'Data Analyst', 4),
(30, 'Researcher', 5);

-- Insert data into the category table
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

-- Insert data into the video table
INSERT INTO video(video_title, category_id, level, source_link)
VALUES
('Brooklyn Nine-Nine',1,'Medium','https://www.youtube.com/watch?v=LUE48DT8MyY'),
('Mini cheesecakes', 2, 'Medium', 'https://www.youtube.com/watch?v=3NE6rb1n8iU');

-- Insert data into the track table
INSERT INTO track (track_id, video_id, start_time, end_time, transcript)
VALUES
(1, 1, 0, 1.07, 'Sir do you have a minute'),
(2, 1, 1.07, 2.55, 'I wanted to apologize'),
(3, 1, 2.55, 6.1, 'Being back at work has been weird');

-- Insert data into the tag table
INSERT INTO tag (tag_name)
VALUES
('Education'),
('Fashion'),
('Language Learning'),
('DIY'),
('Science'),
('Travel'),
('Music'),
('Technology'),
('Cooking'),
('Comedy');

-- Insert data into the tag_to_video table
INSERT INTO tag_to_video (tag_id, video_id)
VALUES
(10, 1),
(3, 2),
(9, 2);

-- Insert data into the history table
INSERT INTO history (learner_id, video_id, track_id, completed)
VALUES
(2, 1, 1,0),
(2, 1, 2,0),
(2, 1, 3,0),
(4, 1, 1,1),
(4, 1, 2,1),
(4, 1, 3,0);

-- Insert data into the progress table
INSERT INTO progress (learner_id, video_id, highest_score)
VALUES 
(2, 1, 30),
(4, 1, 10);

-- Insert data into the favorite table
INSERT INTO favorite (learner_id, video_id)
VALUES 
  (1, 1),
  (2, 2);

-- Insert data into the CPA table
INSERT INTO CPA (learner_id, total_score)
VALUES 
  (2, 30),
  (4, 10);
