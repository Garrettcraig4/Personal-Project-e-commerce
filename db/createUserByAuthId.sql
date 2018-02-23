INSERT INTO users
    (authid,name,email)
VALUES
    ($1, $2, $3)
RETURNING *;