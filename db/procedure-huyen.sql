CREATE OR REPLACE FUNCTION update_learner_score()
RETURNS TRIGGER AS $$
DECLARE
    video_level VARCHAR(50);
    score_increment INT;
BEGIN
    -- Retrieve the level of the video
    SELECT level INTO video_level FROM video WHERE video_id = NEW.video_id;

    -- Determine the score increment based on the level of the video
    CASE video_level
        WHEN 'Easy' THEN score_increment := 1;
        WHEN 'Medium' THEN score_increment := 2;
        WHEN 'Hard' THEN score_increment := 3;
        ELSE score_increment := 0; -- Default case if the level is not defined
    END CASE;

    UPDATE learner SET total_score = total_score + score_increment WHERE learner_id = NEW.learner_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_score
AFTER UPDATE OF completed ON history
FOR EACH ROW
WHEN (NEW.completed = 1)
EXECUTE PROCEDURE update_learner_score();

select * from history
INSERT INTO history (learner_id, video_id, track_id)
VALUES 
(3, 1, 1),
(3, 2, 1);
UPDATE history SET completed = 1 WHERE learner_id = 3 AND video_id = 1 AND track_id = 1;
select * from learner;
UPDATE history SET completed = 1 WHERE learner_id = 3 AND video_id = 2 AND track_id = 1;