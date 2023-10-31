-- Create Account table
CREATE TABLE Account (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL unique,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    user_role VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
);

-- Create Learner table
CREATE TABLE Learner (
    learner_id INT AUTO_INCREMENT PRIMARY KEY,
    age INT,
    occupation VARCHAR(255),
    account_id INT,
    FOREIGN KEY (account_id) REFERENCES Account(account_id)
);

-- Create Tag table
CREATE TABLE Tag (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(255) NOT NULL
);

-- Create Topic table
CREATE TABLE Topic (
    topic_id INT AUTO_INCREMENT PRIMARY KEY,
    topic_name VARCHAR(255) NOT NULL
);

-- Create Video table
CREATE TABLE Video (
    video_id INT AUTO_INCREMENT PRIMARY KEY,
    video_title VARCHAR(255),
    topic_id INT,
    level VARCHAR(255),
    source_link VARCHAR(255),
    tag_id INT,
    FOREIGN KEY (topic_id) REFERENCES Topic(topic_id),
    FOREIGN KEY (tag_id) REFERENCES Tag(tag_id)
);

-- Create Track table
CREATE TABLE Track (
    video_id INT,
    track_id INT,
    start_time TIME,
    end_time TIME,
    transcript TEXT,
    PRIMARY KEY (video_id, track_id),
    FOREIGN KEY (video_id) REFERENCES Video(video_id)
);
-- Create History table
CREATE TABLE History (
    learner_id INT,
    video_id INT,
    timestamp DATETIME,
    FOREIGN KEY (learner_id) REFERENCES Learner(learner_id),
    FOREIGN KEY (video_id) REFERENCES Video(video_id)
);

-- Create Favorite table
CREATE TABLE Favorite (
    learner_id INT,
    video_id INT,
    PRIMARY KEY (learner_id, video_id),
    FOREIGN KEY (learner_id) REFERENCES Learner(learner_id),
    FOREIGN KEY (video_id) REFERENCES Video(video_id)
);
