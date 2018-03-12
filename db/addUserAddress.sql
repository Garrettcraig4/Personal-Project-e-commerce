
-- update
UPDATE userorders 
SET
    usercity = $1,useraddress = $2 ,userstate = $3 ,userzip =$4 ,usercountry = $5

WHERE id = $6
