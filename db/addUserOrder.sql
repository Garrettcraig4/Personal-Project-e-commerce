INSERT INTO userorders
    (total,usercity,useraddress,userstate,userzip ,usercountry)
VALUES
    ($1, $2, $3, $4, $5, $6)
RETURNING id;






