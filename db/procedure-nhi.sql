-- Function: check history and/or add new records to history

-- Drop the function add_history
DROP FUNCTION IF EXISTS add_history(INT, INT);

CREATE OR REPLACE FUNCTION add_history(p_video_id INT, p_learner_id INT)
RETURNS TABLE (
    history_id INT,
    learner_id INT,
    video_id INT,
    track_id INT,
    completed INT
) AS $$
DECLARE
    v_track_id INT;
BEGIN
    -- Check if there is already a row with the given learner_id and video_id
    IF EXISTS (SELECT 1 FROM history WHERE history.learner_id = p_learner_id AND history.video_id = p_video_id) THEN
        RETURN QUERY SELECT * FROM history WHERE history.completed = 0 AND history.video_id = p_video_id AND history.learner_id = p_learner_id ORDER BY history.track_id LIMIT 1;
    ELSE
        BEGIN
            -- Iterate over track_ids related to the given video_id
            FOR v_track_id IN (SELECT track.track_id FROM track WHERE track.video_id = p_video_id) LOOP
                -- Insert a new history row
                BEGIN
                    INSERT INTO history (learner_id, video_id, track_id, completed)
                    VALUES (p_learner_id, p_video_id, v_track_id, 0)
                    RETURNING * INTO 
                        history_id,
                        learner_id,
                        video_id,
                        track_id,
                        completed;

                    -- Return the inserted row
                    RETURN ;
                EXCEPTION
                    WHEN others THEN
                        -- Handle the exception (e.g., raise a notice or log the error)
                        RAISE NOTICE 'Failed to insert row with invalid learner_id: %', p_learner_id;
                END;
            END LOOP;
        END;
    END IF;
END;
$$ LANGUAGE plpgsql;


-- Test case
DO $$ 
DECLARE
    result_row history;
BEGIN
    -- Test Case 1: Insert a new history row
    RAISE NOTICE 'Test Case 1:';
    SELECT * FROM add_history(1, 4) INTO result_row;
    IF result_row IS NOT NULL THEN
        RAISE NOTICE 'Row added successfully. History ID: %, Learner ID: %, Video ID: %, Track ID: %, Completed: %',
            result_row.history_id, result_row.learner_id, result_row.video_id, result_row.track_id, result_row.completed;
    ELSE
        RAISE NOTICE 'Row not added due to duplicate key violation or other error.';
    END IF;

    -- Test Case 2: Try to insert again (should return an existing row)
    RAISE NOTICE 'Test Case 2:';
    SELECT * FROM add_history(1, 4) INTO result_row;
    IF result_row IS NULL THEN
        RAISE NOTICE 'Row added successfully (existing row retrieved). History ID: %, Learner ID: %, Video ID: %, Track ID: %, Completed: %',
            result_row.history_id, result_row.learner_id, result_row.video_id, result_row.track_id, result_row.completed;
    ELSE
        RAISE NOTICE 'Row not added or retrieved due to error.';
    END IF;

    -- Test Case 3: Try to insert with an invalid learner_id (should catch an exception)
    RAISE NOTICE 'Test Case 3:';
    BEGIN
        SELECT * FROM add_history(1, 999) INTO result_row;
    EXCEPTION
        WHEN others THEN
            RAISE NOTICE 'Error caught while trying to insert with an invalid learner_id.';
    END;

END $$;

-- ############################
-- ############################
-- Function: Refresh records in history
DROP FUNCTION IF EXISTS refresh_history(INT, INT);
CREATE OR REPLACE FUNCTION refresh_history(p_video_id INT, p_learner_id INT)
RETURNS INT AS $$
BEGIN
    -- Check if there is a row with the given learner_id and video_id
    IF EXISTS (SELECT 1 FROM history WHERE history.learner_id = p_learner_id AND history.video_id = p_video_id) THEN
        -- Update the existing record
        UPDATE history
        SET completed = 0
        WHERE history.learner_id = p_learner_id AND history.video_id = p_video_id;
        
        -- Return success indicator
        RETURN 1;
    ELSE
        -- If no existing record found, return failure indicator
        RETURN 0;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- test case
DO $$ 
DECLARE
    result INT;
BEGIN
    -- Test Case 1: Refresh an existing record
    RAISE NOTICE 'Test Case 1:';
    result := refresh_history(1, 3);
    IF result = 1 THEN
        RAISE NOTICE 'Row refreshed successfully.';
    ELSE
        RAISE NOTICE 'No record found to refresh.';
    END IF;

    -- Test Case 2: Try to refresh a non-existing record
    RAISE NOTICE 'Test Case 2:';
    result := refresh_history(1, 999);
    IF result = 1 THEN
        RAISE NOTICE 'Row refreshed successfully.';
    ELSE
        RAISE NOTICE 'No record found to refresh.';
    END IF;
END $$;


select * from history

